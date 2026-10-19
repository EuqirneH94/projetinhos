"""Actual Chromium QA. No game state, simulation clock or skeleton injection.

Run only after the reviewed export AND production build are ready. A private,
synthetic SQLite fixture is created outside the repository. Screenshots may
pause RAF only after a completed frame; clips and recording never use that
pause. Deliberate 404 fault injection is reported separately from normal runs.
"""
import argparse, base64, hashlib, json, os, pathlib, subprocess, sys, threading, time, urllib.request
from websockets.sync.client import connect as websocket_connect
from playwright.sync_api import sync_playwright

P = pathlib.Path('/workspace/edf-naquiro-production')
BASE = pathlib.Path('/workspace/projetinhos/jogos/ecos-dos-farois')
E = P / 'evidence/browser-reviewed'
E.mkdir(parents=True, exist_ok=True)
# Use the installed, ordinary FFmpeg executable for Playwright's WebM writer.
# No remote browser/codec download is needed and no privileged paths are edited.
PLAYWRIGHT_RUNTIME=P/'support/playwright-runtime'
(PLAYWRIGHT_RUNTIME/'ffmpeg-1011').mkdir(parents=True,exist_ok=True)
ffmpeg_link=PLAYWRIGHT_RUNTIME/'ffmpeg-1011/ffmpeg-linux'
if not ffmpeg_link.exists():ffmpeg_link.symlink_to('/usr/bin/ffmpeg')
os.environ['PLAYWRIGHT_BROWSERS_PATH']=str(PLAYWRIGHT_RUNTIME)
PORT = 18931
URL = f'http://127.0.0.1:{PORT}'
NODE = '/workspace/edf-001-b11/runtime/node-v24.14.0-linux-x64/bin/node'
RESULT = {'platform': sys.platform, 'renderer': 'Chromium ANGLE SwiftShader software',
          'scope': 'Actual lab and legacy public entry flow. No Windows or physical GPU claim.',
          'tests': {}, 'screenshots': [], 'errors': [], 'console': [], 'responses': []}
def note(k, value=''):
    print(k, str(value)[:1400], flush=True)
def save():
    (E/f"result-{RESULT.get('mode','unknown')}.json").write_text(json.dumps(RESULT, ensure_ascii=False, indent=2))
def check(name, value, detail=None):
    RESULT['tests'][name] = {'passed': bool(value), 'detail': detail}
    save(); note(name, RESULT['tests'][name])
    if not value:
        raise AssertionError(name)
def health():
    with urllib.request.urlopen(URL+'/health', timeout=5) as r:
        return json.load(r)
def hashes():
    paths = ['client/src/character-lab.ts', 'client/src/character-runtime.ts',
             'client/src/scene.ts', 'server/src/server.ts', 'shared/types.ts',
             'client/public/art/characters/naquiro/naquiro-male.gltf',
             'client/public/art/characters/naquiro/naquiro-male.bin',
             'client/dist/art/characters/naquiro/naquiro-male.bin']
    return {n: hashlib.sha256((BASE/n).read_bytes()).hexdigest() for n in paths}

RAF_CAPTURE = '''(()=>{const native=requestAnimationFrame.bind(window);const s={paused:false,blocked:false,queue:[]};window.__reviewCapture=s;window.requestAnimationFrame=cb=>native(t=>{if(s.paused){s.blocked=true;s.queue.push(cb);}else cb(t);});s.renderOne=()=>{s.blocked=false;for(const cb of s.queue.splice(0))native(t=>cb(t));};s.resume=()=>{s.paused=false;s.blocked=false;for(const cb of s.queue.splice(0))native(t=>cb(t));};})();'''

def observe(page, stage):
    page.on('pageerror', lambda err: (RESULT['errors'].append({'stage':stage,'message':str(err)}),save()))
    page.on('console', lambda msg: (RESULT['console'].append({'stage':stage,'type':msg.type,'message':msg.text[:800]}),save()) if msg.type in ['warning','error'] else None)
    page.on('response', lambda response: (RESULT['responses'].append({'stage':stage,'status':response.status,'path':response.url.removeprefix(URL)}),save()) if response.status>=400 or '/art/characters/' in response.url else None)
    def ws_open(ws):
        def record(direction, payload):
            try: message=json.loads(payload)
            except Exception: return
            # Never retain return keys, account tokens, credentials or full state.
            typ=message.get('type')
            summary={'stage':stage,'direction':direction,'type':typ}
            if typ=='notice': summary['message']=message.get('text','')[:200]
            if typ=='move': summary.update({'x':message.get('x'),'z':message.get('z')})
            events=RESULT.setdefault('websocketEvents',[])
            if typ!='state' or not any(e.get('stage')==stage and e.get('type')=='state' for e in events):
                events.append(summary); save()
        ws.on('framesent',lambda payload:record('sent',payload))
        ws.on('framereceived',lambda payload:record('received',payload))
        ws.on('close',lambda: (RESULT.setdefault('websocketEvents',[]).append({'stage':stage,'type':'socket_close'}),save()))
    page.on('websocket',ws_open)
    page.set_default_timeout(45000)

def static_capture(page, name, width=1280, height=720, metric='window.edfMetrics'):
    previous_viewport=page.viewport_size
    page.evaluate('()=>{window.__reviewCapture.paused=true}')
    page.wait_for_function('()=>window.__reviewCapture.blocked',polling=150,timeout=45000)
    page.set_viewport_size({'width':width,'height':height})
    # ResizeObserver can resize/clear the WebGL backing buffer AFTER the first
    # RAF of a viewport change. Await the real backing dimensions first, then
    # complete two real frames so the compositor owns the newly sized image.
    page.wait_for_function('''()=>{const c=document.querySelector('#character,#world');const p=Math.min(devicePixelRatio,window.edfMetrics?.economical?1:1.35);return c.width===Math.floor(c.clientWidth*p)&&c.height===Math.floor(c.clientHeight*p)}''',polling=100,timeout=45000)
    page.evaluate('()=>window.__reviewCapture.renderOne()')
    page.wait_for_function('()=>window.__reviewCapture.blocked',polling=150,timeout=45000)
    page.evaluate('()=>window.__reviewCapture.renderOne()')
    page.wait_for_function('()=>window.__reviewCapture.blocked',polling=150,timeout=45000)
    cdp=page.context.new_cdp_session(page)
    data=cdp.send('Page.captureScreenshot',{'format':'png','fromSurface':False,'captureBeyondViewport':False})
    filename=f'{name}-{width}x{height}.png'
    (E/filename).write_bytes(base64.b64decode(data['data']));cdp.detach()
    RESULT['screenshots'].append({'file':filename,'metrics':page.evaluate(metric),
       'method':'Actual completed application frame. RAF held only for static resize/capture. Not an FPS measurement.'})
    save();note('CAPTURE',filename)
    page.set_viewport_size(previous_viewport)
    page.evaluate('()=>window.__reviewCapture.resume()')

def configure(page, nickname, race='naquiros', cls='errante', query='?character=naquiro-male'):
    note('CONFIGURE_BEGIN',{'nickname':nickname,'race':race,'class':cls,'query':query})
    page.goto(URL+'/'+query,wait_until='domcontentloaded')
    page.wait_for_selector('#entry-form')
    # Invoke ordinary DOM controls only. No direct renderer/network/world API.
    page.evaluate('''({race,cls})=>{document.querySelector('#quality').click();document.querySelector('[data-faction="confluencia"]').click();const r=document.querySelector('#race');r.value=race;r.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector(`[data-class="${cls}"]`).click();}''',{'race':race,'cls':cls})
    page.wait_for_function('(race)=>document.querySelector("#race").value===race&&window.edfMetrics?.faction==="confluencia"&&window.edfMetrics?.character?.status!=="loading"',arg=race,polling=200,timeout=90000)
    note('CONFIGURE_PREVIEW_READY',page.evaluate('window.edfMetrics'))
    page.evaluate('''(nickname)=>{document.querySelector('#nickname').value=nickname;document.querySelector('#entry-form').requestSubmit();}''',nickname)
    note('CONFIGURE_SUBMITTED')
    try:
        page.wait_for_function('()=>window.edfMetrics?.localPlayerZ!==null&&!document.querySelector("#hud").hidden',polling=200,timeout=90000)
    except Exception:
        RESULT['configureFailureDiagnostic']=page.evaluate('''()=>({metrics:window.edfMetrics,entryHidden:document.querySelector('#entry')?.hidden,hudHidden:document.querySelector('#hud')?.hidden,entryError:document.querySelector('#entry-error')?.textContent,networkText:document.querySelector('#network-text')?.textContent,networkOverlayHidden:document.querySelector('#network-overlay')?.hidden,nicknameValidity:document.querySelector('#nickname')?.checkValidity(),race:document.querySelector('#race')?.value,quality:document.querySelector('#quality')?.textContent})''')
        RESULT['configureFailureHealth']=health();save();note('CONFIGURE_FAILURE',RESULT['configureFailureDiagnostic'])
        raise
    note('CONFIGURE_ENTERED',page.evaluate('window.edfMetrics'))

def lab(browser):
    ctx=browser.new_context(viewport={'width':640,'height':480})
    ctx.add_init_script(RAF_CAPTURE)
    page=ctx.new_page();observe(page,'lab')
    try:
        page.goto(URL+'/character-lab.html',wait_until='domcontentloaded')
        page.wait_for_function('()=>window.edfCharacterLab?.loaded===true',polling=150,timeout=60000)
        initial=page.evaluate('window.edfCharacterLab');RESULT['labInitial']=initial;save()
        check('lab_has_11_clips',len(initial['clips'])==11,initial['clips'])
        progression=[]
        for clip in initial['clips']:
            page.select_option('#clip',clip['name'])
            if not page.evaluate('window.edfCharacterLab.playing'):
                page.locator('#play').click()
            page.wait_for_function('(name)=>window.edfCharacterLab.currentClip===name&&window.edfCharacterLab.currentTime>0',arg=clip['name'],polling=100,timeout=20000)
            first=page.evaluate('window.edfCharacterLab.currentTime')
            # Real RAF elapsed time only; no fake dt, animation action, or bone data.
            page.wait_for_function('({name,first})=>window.edfCharacterLab.currentClip===name&&Math.abs(window.edfCharacterLab.currentTime-first)>.05',arg={'name':clip['name'],'first':first},polling=100,timeout=20000)
            last=page.evaluate('window.edfCharacterLab.currentTime')
            progression.append({'clip':clip['name'],'first':first,'last':last,'duration':clip['duration'],'advanced':abs(last-first)>.05})
        check('all_11_lab_clips_advance_real_time',all(x['advanced'] for x in progression),progression)
        page.select_option('#clip','Idle')
        page.locator('#timeline').evaluate('(el)=>{el.value="0.4";el.dispatchEvent(new Event("input",{bubbles:true}))}')
        page.wait_for_function('()=>!window.edfCharacterLab.playing&&Math.abs(window.edfCharacterLab.currentTime-.4)<.002',polling=100)
        check('timeline_seek_pauses_at_requested_position',True,page.evaluate('window.edfCharacterLab'))
        for view in ['front','side','back','face','hands','feet']:
            page.locator(f'[data-view="{view}"]').click()
            static_capture(page,f'lab-{view}',metric='window.edfCharacterLab')
        page.locator('#wireframe').check()
        page.wait_for_function('()=>window.edfCharacterLab.wireframe===true',polling=100)
        check('wireframe_control',True)
        static_capture(page,'lab-wireframe',metric='window.edfCharacterLab')
        page.locator('#wireframe').uncheck()
        page.locator('[data-view="front"]').click()
        static_capture(page,'lab-front',1920,1080,metric='window.edfCharacterLab')
        check('lab_textures_loaded',initial['textures']>=6,{'gpuTextures':initial['textures'],'assetTextures':initial['stats']['textures']})
        check('lab_no_unhandled_browser_errors',not [e for e in RESULT['errors'] if e['stage']=='lab'])
        check('lab_no_csp_errors',not [m for m in RESULT['console'] if m['stage']=='lab' and ('Content Security Policy' in m['message'] or 'Refused to' in m['message'])])
    finally:
        ctx.close()

def face_preview(browser):
    """Small real-engine color review before the full browser regression run."""
    ctx=browser.new_context(viewport={'width':640,'height':480});ctx.add_init_script(RAF_CAPTURE)
    page=ctx.new_page();observe(page,'face_preview')
    try:
        page.goto(URL+'/character-lab.html',wait_until='domcontentloaded')
        page.wait_for_function('()=>window.edfCharacterLab?.loaded===true',polling=150,timeout=60000)
        page.select_option('#clip','Idle')
        page.locator('#timeline').evaluate('(el)=>{el.value="0.4";el.dispatchEvent(new Event("input",{bubbles:true}))}')
        page.wait_for_function('()=>!window.edfCharacterLab.playing&&Math.abs(window.edfCharacterLab.currentTime-.4)<.002',polling=100)
        page.locator('[data-view="face"]').click();static_capture(page,'review-face',metric='window.edfCharacterLab')
        page.locator('[data-view="front"]').click();static_capture(page,'review-front',metric='window.edfCharacterLab')
        page.locator('#character').scroll_into_view_if_needed();rect=page.locator('#character').bounding_box()
        page.mouse.move(rect['x']+rect['width']*.45,rect['y']+rect['height']*.5);page.mouse.down(button='left')
        page.mouse.move(rect['x']+rect['width']*.45+rect['height']/8,rect['y']+rect['height']*.5,steps=8);page.mouse.up(button='left')
        static_capture(page,'review-three-quarter',metric='window.edfCharacterLab')
        check('color_review_asset_loaded',page.evaluate('window.edfCharacterLab.loaded'))
        check('color_review_no_unhandled_errors',not RESULT['errors'])
        RESULT['visualColorApproval']='Pending human/root visual inspection; structural load is not color acceptance.'
    finally:ctx.close()

def gameplay(browser, fault=False, stage_name=None):
    stage=stage_name or ('fallback404' if fault else 'world')
    ctx=browser.new_context(viewport={'width':320,'height':240})
    ctx.add_init_script(RAF_CAPTURE)
    if fault:
        ctx.route('**/art/characters/naquiro/naquiro-male.gltf',lambda route:route.fulfill(status=404,body='Injected QA 404; fixture only',content_type='text/plain'))
    page=ctx.new_page();observe(page,stage)
    try:
        configure(page,'QAOrfao' if fault else 'QARealNaquiro')
        expected='fallback' if fault else 'loaded'
        page.wait_for_function('(expected)=>window.edfMetrics?.character?.status===expected',arg=expected,polling=200,timeout=60000)
        check(stage+'_entry_retains_gameplay',True,page.evaluate('window.edfMetrics'))
        if not fault:
            static_capture(page,stage+'-naquiro',1280,720)
            static_capture(page,stage+'-naquiro',1920,1080)
        initial=page.evaluate('window.edfMetrics')
        page.locator('#world').focus()
        focus=page.evaluate('''()=>({activeElement:document.activeElement?.id,activeTag:document.activeElement?.tagName,documentFocus:document.hasFocus(),hidden:document.hidden,openPanels:['help','dialog','bag','audio-panel','death','network-overlay'].filter(id=>!document.getElementById(id).hidden),metrics:window.edfMetrics})''')
        RESULT[stage+'FocusBeforeMovement']=focus;save();note('MOVEMENT_FOCUS',focus)
        page.keyboard.down('w')
        try:
            page.wait_for_function('(z)=>window.edfMetrics.localPlayerZ<z-2',arg=initial['localPlayerZ'],polling=150,timeout=90000)
        except Exception as error:
            RESULT[stage+'MovementTimeoutDiagnostic']={'error':str(error),'metrics':page.evaluate('window.edfMetrics'),'focus':page.evaluate('''()=>({activeElement:document.activeElement?.id,activeTag:document.activeElement?.tagName,documentFocus:document.hasFocus(),hidden:document.hidden,networkHidden:document.getElementById('network-overlay').hidden,networkText:document.getElementById('network-text').textContent})'''),'health':health()};save();note('MOVEMENT_TIMEOUT',RESULT[stage+'MovementTimeoutDiagnostic'])
            raise
        finally:
            page.keyboard.up('w')
        moved=page.evaluate('window.edfMetrics');check(stage+'_actual_keyboard_movement',moved['localPlayerZ']<initial['localPlayerZ']-2,{'before':initial,'after':moved})
        if not fault:
            page.keyboard.press('i');page.wait_for_selector('#bag:not([hidden])')
            check('inventory_preserved',page.locator('#inventory-slots').is_visible(),page.locator('#bag-capacity').inner_text())
            page.keyboard.press('Escape');page.keyboard.press('j');page.wait_for_selector('#dialog:not([hidden])')
            check('quest_journal_preserved','Os caminhos e a luz' in page.locator('#dialog-content').inner_text(),page.locator('#dialog-content').inner_text())
            page.keyboard.press('Escape')
            before=page.evaluate('window.edfMetrics.cameraDistance')
            page.locator('#world').focus();page.mouse.move(160,110);page.mouse.wheel(0,-320)
            page.wait_for_function('(d)=>Math.abs(window.edfMetrics.cameraDistance-d)>.1',arg=before,polling=150,timeout=20000)
            check('real_camera_zoom',True,{'before':before,'after':page.evaluate('window.edfMetrics.cameraDistance')})
            check(stage+'_no_unhandled_browser_errors',not [e for e in RESULT['errors'] if e['stage']==stage])
            check(stage+'_no_csp_errors',not [m for m in RESULT['console'] if m['stage']==stage and ('Content Security Policy' in m['message'] or 'Refused to' in m['message'])])
        RESULT[stage+'Health']=health();save()
    finally:
        ctx.close()

def retained(browser, query, race, cls, expected, name):
    ctx=browser.new_context(viewport={'width':320,'height':240});page=ctx.new_page();observe(page,name)
    try:
        configure(page,'QAPreservado',race,cls,query)
        page.wait_for_function('(expected)=>window.edfMetrics?.character?.status===expected',arg=expected,polling=200,timeout=30000)
        check(name,True,page.evaluate('window.edfMetrics'))
    finally:ctx.close()

class PublicPeer:
    """Second real player using the public WS protocol, no direct game mutation.

    Authentication/return keys are never recorded. Only public ID and positions
    are retained in evidence. Its socket has a separate reader thread so browser
    waits cannot make this peer's movement commands or server queue hang.
    """
    def __init__(self):
        self.ws=websocket_connect(URL.replace('http:','ws:')+'/ws',origin=URL)
        self.id=None;self.players=[];self.direction=0;self.closed=False;self.seq=0
        self.ws.send(json.dumps({'type':'join','nickname':'QASegundoRig','factionId':'confluencia','raceId':'naquiros','classId':'errante','appearance':0}))
        self.thread=threading.Thread(target=self.read,daemon=True);self.thread.start()
        self.sender=threading.Thread(target=self.move,daemon=True);self.sender.start()
    def read(self):
        try:
            for raw in self.ws:
                m=json.loads(raw)
                if m['type']=='welcome':self.id=m['id']
                if m['type']=='state':
                    self.players=[{'id':p['id'],'x':p['x'],'z':p['z']} for p in m['players']]
        except Exception:
            if not self.closed:raise
    def move(self):
        while not self.closed:
            if self.id:
                try:self.ws.send(json.dumps({'type':'move','seq':self.seq,'x':self.direction,'z':0}));self.seq+=1
                except Exception:
                    if not self.closed:raise
            # Protocol cadence; not a persistence wait or a fake animation clock.
            time.sleep(.08)
    def close(self):
        self.closed=True;self.ws.close();self.thread.join(timeout=3);self.sender.join(timeout=3)

def two_players(browser):
    ctx=browser.new_context(viewport={'width':320,'height':240});page=ctx.new_page();observe(page,'two_players');peer=None
    try:
        configure(page,'QAPrimeiroRig')
        page.wait_for_function('()=>window.edfMetrics?.character?.status==="loaded"',polling=150,timeout=60000)
        peer=PublicPeer()
        page.wait_for_function('()=>window.edfMetrics?.characters?.filter(c=>c.status==="loaded").length===2',polling=200,timeout=60000)
        before=page.evaluate('window.edfMetrics.characters')
        peer.direction=1
        samples=[];deadline=time.monotonic()+10
        while time.monotonic()<deadline:
            page.wait_for_timeout(200)
            samples.append(page.evaluate('window.edfMetrics.characters'))
            if any(c['id']==peer.id and c['x']>4 for c in samples[-1]):break
        peer.direction=0
        after=samples[-1]
        old={c['id']:c for c in before};new={c['id']:c for c in after}
        peer_delta=abs(new[peer.id]['x']-old[peer.id]['x'])
        other_ids=[i for i in old if i!=peer.id]
        local_delta=max(abs(new[i]['x']-old[i]['x'])+abs(new[i]['z']-old[i]['z']) for i in other_ids)
        check('two_rigs_have_distinct_public_ids',len(old)==2 and len(set(old))==2,before)
        check('two_rigs_positions_are_independent',peer_delta>2 and local_delta<.2,{'before':before,'after':after,'peerDelta':peer_delta,'stationaryLocalDelta':local_delta})
        distinct_actions=any(len({c['clip'] for c in snap})>1 for snap in samples)
        RESULT['twoPlayerSamples']=samples;RESULT['twoPlayerDistinctClipsObserved']=distinct_actions
        RESULT['twoPlayerAnimationLimit']='Separate skeleton/mixer instances are unit-tested. Actual software-rendered movement may stay Idle when frame gap exceeds 250 ms; no fake dt is injected.'
        save();note('TWO_PLAYER_CLIPS_OBSERVED',distinct_actions)
    finally:
        if peer:peer.close()
        ctx.close()

def video(browser):
    """Continuous actual rendering/video. No RAF wrapper, pauses or fake clock."""
    video_dir=E/'continuous-gameplay';video_dir.mkdir(exist_ok=True)
    ctx=browser.new_context(viewport={'width':640,'height':480},record_video_dir=str(video_dir),record_video_size={'width':640,'height':480})
    page=ctx.new_page();observe(page,'continuous_video')
    try:
        configure(page,'QAVideoReal')
        page.wait_for_function('()=>window.edfMetrics?.character?.status==="loaded"',polling=200,timeout=60000)
        start=page.evaluate('window.edfMetrics');start_wall=time.monotonic()
        page.locator('#world').focus();page.keyboard.down('w')
        try:page.wait_for_function('(z)=>window.edfMetrics.localPlayerZ<z-4',arg=start['localPlayerZ'],polling=200,timeout=30000)
        finally:page.keyboard.up('w')
        moved=page.evaluate('window.edfMetrics')
        page.mouse.move(340,245);page.mouse.down(button='right');page.mouse.move(410,255,steps=5);page.mouse.up(button='right')
        page.keyboard.press('i');page.wait_for_selector('#bag:not([hidden])');page.keyboard.press('Escape')
        # Wait for a real application frame after the final input, not a fixed sleep.
        page.wait_for_function('()=>document.querySelector("#bag").hidden&&window.edfMetrics.localPlayerZ!==null',polling=150)
        RESULT['video']={'start':start,'moved':moved,'final':page.evaluate('window.edfMetrics'),'continuousWallSeconds':time.monotonic()-start_wall,'method':'Playwright continuous WebM capture of actual Chromium compositor; no RAF pause, simulation clock/state changes, or synthetic bone posing. Renderer is software, not GPU/FPS acceptance.'}
        check('continuous_video_actual_keyboard_displacement',moved['localPlayerZ']<start['localPlayerZ']-4)
    finally:
        ctx.close()
    RESULT['video']['files']=[p.name for p in video_dir.glob('*.webm')];save()

def lab_video(browser):
    """Actual lab Run playback and one ordinary mouse orbit; no RAF override."""
    video_dir=E/'continuous-lab';video_dir.mkdir(exist_ok=True)
    ctx=browser.new_context(viewport={'width':960,'height':720},record_video_dir=str(video_dir),record_video_size={'width':960,'height':720})
    page=ctx.new_page();observe(page,'continuous_lab_video')
    try:
        page.goto(URL+'/character-lab.html',wait_until='domcontentloaded')
        page.wait_for_function('()=>window.edfCharacterLab?.loaded===true',polling=150,timeout=60000)
        page.select_option('#clip','Run')
        page.wait_for_function('()=>window.edfCharacterLab.currentClip==="Run"&&window.edfCharacterLab.currentTime>0',polling=150,timeout=20000)
        first=page.evaluate('window.edfCharacterLab');start_wall=time.monotonic()
        rect=page.locator('#character').bounding_box()
        # OrbitControls maps horizontal drag of one canvas HEIGHT to a full
        # 2*pi turn. Use real pointer events in 24 increments, one actual
        # animation advance between increments. No camera/bone data is assigned.
        distance=rect['height'];start_x=rect['x']+rect['width']-12;y=rect['y']+rect['height']*.45
        if start_x-distance<rect['x']+2:raise RuntimeError('Lab viewport does not fit a complete pointer orbit')
        page.mouse.move(start_x,y);page.mouse.down(button='left')
        times=[]
        try:
            for step in range(1,25):
                previous=page.evaluate('window.edfCharacterLab.currentTime')
                page.mouse.move(start_x-distance*step/24,y)
                page.wait_for_function('(previous)=>Math.abs(window.edfCharacterLab.currentTime-previous)>.01',arg=previous,polling=100,timeout=20000)
                times.append(page.evaluate('window.edfCharacterLab.currentTime'))
        finally:page.mouse.up(button='left')
        last=page.evaluate('window.edfCharacterLab')
        RESULT['labVideo']={'first':first,'last':last,'clipTimesDuringMouseOrbit':times,'pointerHorizontalDistance':distance,'canvasHeight':rect['height'],'continuousWallSeconds':time.monotonic()-start_wall,'method':'Playwright continuous WebM of actual lab Run clip and ordinary pointer orbit. One canvas-height horizontal drag (OrbitControls 2*pi mapping), with 24 real clip-advance observations. No RAF pause, camera/state/clock/bone assignment. Software renderer; not GPU/FPS acceptance.'}
        check('continuous_lab_video_run_advances_during_pointer_orbit',len(times)==24 and last['currentClip']=='Run')
        check('continuous_lab_video_no_unhandled_errors',not [e for e in RESULT['errors'] if e['stage']=='continuous_lab_video'])
    finally:ctx.close()
    RESULT['labVideo']['files']=[p.name for p in video_dir.glob('*.webm')];save()

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--mode',choices=['face','lab','world','fallback','retained','two','video','labvideo','all'],default='all');args=parser.parse_args()
    RESULT['hashesBefore']=hashes();RESULT['mode']=args.mode
    RESULT['ffmpeg']=subprocess.run(['/usr/bin/ffmpeg','-version'],capture_output=True,text=True).stdout.splitlines()[0]
    save()
    fixture=P/'fixtures'/f'browser-reviewed-{args.mode}-{int(time.time())}.sqlite';fixture.parent.mkdir(exist_ok=True)
    env=os.environ.copy();env.pop('ACCOUNTS_DB_PATH',None);env.update({'HOST':'127.0.0.1','PORT':str(PORT),'ALLOWED_ORIGINS':URL,'DB_PATH':str(fixture)})
    log=open(E/f'server-{args.mode}.log','w');server=subprocess.Popen([NODE,'build/server/src/index.js'],cwd=BASE,env=env,stdout=log,stderr=subprocess.STDOUT)
    try:
        deadline=time.monotonic()+20
        while True:
            try:RESULT['healthBefore']=health();break
            except Exception:
                if server.poll() is not None:raise RuntimeError('Own QA server exited')
                if time.monotonic()>deadline:raise RuntimeError('Own QA server readiness timeout')
                time.sleep(.1)
        with sync_playwright() as p:
            browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage','--disable-features=CDPScreenshotNewSurface'])
            RESULT['browser']=browser.version;save()
            try:
                if args.mode=='face':face_preview(browser)
                if args.mode in ['lab','all']:lab(browser)
                if args.mode in ['world','all']:gameplay(browser)
                if args.mode in ['fallback','all']:
                    gameplay(browser,True)
                    # A fresh context performs the actual successful reload; no route intercept.
                    retained(browser,'?character=naquiro-male','naquiros','errante','loaded','new_context_after_404_recovers_real_asset')
                if args.mode in ['retained','all']:
                    retained(browser,'','naquiros','errante','disabled','no_query_keeps_existing_actor')
                    retained(browser,'?character=naquiro-male','naquiros','sentinela','ineligible','other_class_keeps_existing_actor')
                    retained(browser,'?character=naquiro-male','eluvios','errante','ineligible','other_race_keeps_existing_actor')
                if args.mode in ['two','all']:two_players(browser)
                if args.mode in ['video','all']:video(browser)
                if args.mode in ['labvideo','all']:lab_video(browser)
            finally:browser.close()
        RESULT['healthAfter']=health();RESULT['completed']=True
    except Exception as error:
        RESULT['completed']=False;RESULT['failure']=str(error);raise
    finally:
        if server.poll() is None:
            server.terminate()
            try:server.wait(timeout=8)
            except subprocess.TimeoutExpired:server.kill();server.wait(timeout=5)
        log.close();RESULT['ownServerExit']=server.returncode;RESULT['hashesAfter']=hashes();RESULT['selectedSourceFilesUnchanged']=RESULT['hashesBefore']==RESULT['hashesAfter'];save();note('DONE',{'completed':RESULT.get('completed'),'errors':len(RESULT['errors'])})
if __name__=='__main__':main()
