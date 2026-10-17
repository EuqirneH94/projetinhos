import{F as El}from"./identity-fyB6oboV.js";const dn={x:2,z:14,name:"Bancada de Alquimia",range:3.2},Mi={id:"tonico-caminho",name:"Tônico do caminho",materialCost:2,coinCost:3},Id={name:"Seiva clara"},Fr={minHp:.2,maxHp:.4,range:8,duration:8e3},Os={vigilia:"A Vigília",confluencia:"A Confluência"},Tl={valdarios:"Valdários",kordranios:"Kordrânios",eluvios:"Elúvios",naquiros:"Náquiros"},$a={sentinela:"Sentinela",arcanista:"Arcanista",errante:"Errante",ressonante:"Ressonante"},Ld={sentinela:"Placas, escudo e combate próximo. Sustente a linha e proteja seus aliados.",arcanista:"Runas e energia fluida. Concentre o Nexo em descargas à distância.",errante:"Arco, couro e mobilidade. Escolha seu alvo e controle a distância.",ressonante:"Tecido, foco e ressonância. Alterne ataques, proteção e restauração."},Nd={factionId:"vigilia",raceId:"valdarios",classId:"sentinela",appearance:0},Bs=["attack","cleave","nova","guard","focus"],Ut=(s,e,t,n,i,r={})=>({name:s,damage:e,cost:t,cooldown:n,range:i,...r}),Ms={sentinela:{attack:Ut("Golpe de guarda",15,0,750,2.9),cleave:Ut("Impacto do escudo",31,25,5e3,3.5),nova:Ut("Onda protetora",23,35,9e3,4.1,{area:!0}),guard:Ut("Barreira protetora",0,20,13e3,0,{shield:6500}),focus:Ut("Fôlego da Vigília",0,25,16e3,0,{heal:48})},arcanista:{attack:Ut("Faísca rúnica",13,0,1100,15),cleave:Ut("Descarga Arcana",38,24,4800,17,{cast:1100}),nova:Ut("Anel de ressonância",29,34,9500,5.8,{area:!0}),guard:Ut("Véu rúnico",0,23,14e3,0,{shield:5e3}),focus:Ut("Recomposição arcana",0,27,16e3,0,{heal:42,cast:1300})},errante:{attack:Ut("Disparo preciso",14,0,1e3,17),cleave:Ut("Flecha especial",34,22,4500,19,{cast:650}),nova:Ut("Rajada do bosque",23,32,9500,7,{area:!0}),guard:Ut("Passo cauteloso",0,18,14e3,0,{shield:4500}),focus:Ut("Fôlego do caminho",0,25,16e3,0,{heal:45})},ressonante:{attack:Ut("Nota de impacto",12,0,1100,14),cleave:Ut("Pulso dissonante",30,20,4500,16,{cast:850}),nova:Ut("Onda harmônica",22,30,9e3,5.8,{area:!0}),guard:Ut("Manto harmônico",0,20,13e3,0,{shield:6e3}),focus:Ut("Pulso de cura",0,25,7e3,14,{heal:68,cast:800})}},Dd={sentinela:"dawnSword",arcanista:"dawnStaff",errante:"dawnBow",ressonante:"dawnFocus"},Fi={vigilia:{name:"Capitã Elara",title:"Guarda dos caminhos",zone:"Refúgio da Vigília",wild:"Bosque das Ressonâncias",companions:["Borin","Mestre Orven"]},confluencia:{name:"Lyssara",title:"Guardiã dos fluxos",zone:"Clareira da Confluência",wild:"Jardins dos Ecos",companions:["Neral","Sáren"]}},Lr=[{id:"eco-1",x:-21,z:-8},{id:"eco-2",x:22,z:-25},{id:"eco-3",x:-3,z:-35}];function Ot(s,e){const t=Math.max(0,Math.abs(s)-31)/14,n=Math.max(0,-e-4)/45;return Math.sin(s*.12)*Math.sin(e*.11)*.34*n+t*t*2.1}function Oi(s){return s.factionId??"vigilia"}const Fc="186",Ud=0,wl=1,Fd=2,or=1,Od=2,ir=3,Ti=0,rn=1,$t=2,ri=0,cr=1,Ea=2,Al=3,Rl=4,Bd=5,xs=100,kd=101,zd=102,Vd=103,Hd=104,Gd=200,Wd=201,Xd=202,qd=203,gh=204,_h=205,$d=206,Yd=207,Kd=208,Jd=209,Zd=210,Qd=211,jd=212,ef=213,tf=214,Vo=0,Ho=1,Go=2,_r=3,Wo=4,Xo=5,qo=6,$o=7,xh=0,nf=1,sf=2,Gn=0,vh=1,yh=2,Mh=3,Oc=4,Sh=5,bh=6,Eh=7,Cl="attached",rf="detached",Th=300,Xi=301,Ts=302,Ya=303,Ka=304,Ba=306,qi=1e3,Vn=1001,Ta=1002,Vt=1003,wh=1004,sr=1005,Ht=1006,ma=1007,ti=1008,fn=1009,Ah=1010,Rh=1011,xr=1012,Bc=1013,Wn=1014,yn=1015,Xn=1016,kc=1017,zc=1018,vr=1020,Ch=35902,Ph=35899,Ih=1021,Lh=1022,Mn=1023,oi=1026,ki=1027,Vc=1028,Hc=1029,$i=1030,Gc=1031,Wc=1033,ga=33776,_a=33777,xa=33778,va=33779,Yo=35840,Ko=35841,Jo=35842,Zo=35843,Qo=36196,jo=37492,ec=37496,tc=37488,nc=37489,wa=37490,ic=37491,sc=37808,rc=37809,ac=37810,oc=37811,cc=37812,lc=37813,uc=37814,hc=37815,dc=37816,fc=37817,pc=37818,mc=37819,gc=37820,_c=37821,xc=36492,vc=36494,yc=36495,Mc=36283,Sc=36284,Aa=36285,bc=36286,yr=2300,Mr=2301,Ja=2302,Pl=2303,Il=2400,Ll=2401,Nl=2402,af=2500,of=0,Nh=1,Ec=2,cf=3200,Tc=0,lf=1,Ei="",kt="srgb",mn="srgb-linear",Ra="linear",ft="srgb",Za=7680,uf=519,hf=512,df=513,ff=514,Xc=515,pf=516,mf=517,qc=518,gf=519,Dh=35044,Dl="300 es",Hn=2e3,Sr=2001;function _f(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function xf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function br(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function vf(){const s=br("canvas");return s.style.display="block",s}const Ul={};function Ca(...s){const e="THREE."+s.shift();console.log(e,...s)}function Uh(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function De(...s){s=Uh(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function $e(...s){s=Uh(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Ss(...s){const e=s.join(" ");e in Ul||(Ul[e]=!0,De(...s))}function yf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Mf={[Vo]:Ho,[Go]:qo,[Wo]:$o,[_r]:Xo,[Ho]:Vo,[qo]:Go,[$o]:Wo,[Xo]:_r};class Ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fl=1234567;const lr=Math.PI/180,ws=180/Math.PI;function Sn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[s&255]+Jt[s>>8&255]+Jt[s>>16&255]+Jt[s>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function tt(s,e,t){return Math.max(e,Math.min(t,s))}function $c(s,e){return(s%e+e)%e}function Sf(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function bf(s,e,t){return s!==e?(t-s)/(e-s):0}function ur(s,e,t){return(1-t)*s+t*e}function Ef(s,e,t,n){return ur(s,e,1-Math.exp(-t*n))}function Tf(s,e=1){return e-Math.abs($c(s,e*2)-e)}function wf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Af(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Rf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Cf(s,e){return s+Math.random()*(e-s)}function Pf(s){return s*(.5-Math.random())}function If(s){s!==void 0&&(Fl=s);let e=Fl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Lf(s){return s*lr}function Nf(s){return s*ws}function Df(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Uf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ff(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Of(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*d,c*h,o*l);break;case"YZY":s.set(c*h,o*u,c*d,o*l);break;case"ZXZ":s.set(c*d,c*h,o*u,o*l);break;case"XZX":s.set(o*u,c*g,c*f,o*l);break;case"YXY":s.set(c*f,o*u,c*g,o*l);break;case"ZYZ":s.set(c*g,c*f,o*u,o*l);break;default:De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Cn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Hi={DEG2RAD:lr,RAD2DEG:ws,generateUUID:Sn,clamp:tt,euclideanModulo:$c,mapLinear:Sf,inverseLerp:bf,lerp:ur,damp:Ef,pingpong:Tf,smoothstep:wf,smootherstep:Af,randInt:Rf,randFloat:Cf,randFloatSpread:Pf,seededRandom:If,degToRad:Lf,radToDeg:Nf,isPowerOfTwo:Df,ceilPowerOfTwo:Uf,floorPowerOfTwo:Ff,setQuaternionFromProperEuler:Of,normalize:pt,denormalize:Cn};class oe{static{oe.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ci{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],d=n[i+3],h=r[a+0],f=r[a+1],g=r[a+2],y=r[a+3];if(d!==y||c!==h||l!==f||u!==g){let p=c*h+l*f+u*g+d*y;p<0&&(h=-h,f=-f,g=-g,y=-y,p=-p);let m=1-o;if(p<.9995){const M=Math.acos(p),T=Math.sin(M);m=Math.sin(m*M)/T,o=Math.sin(o*M)/T,c=c*m+h*o,l=l*m+f*o,u=u*m+g*o,d=d*m+y*o}else{c=c*m+h*o,l=l*m+f*o,u=u*m+g*o,d=d*m+y*o;const M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],d=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-o*f,e[t+2]=l*g+u*f+o*h-c*d,e[t+3]=u*g-o*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),d=o(r/2),h=c(n/2),f=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{static{R.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ol.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ol.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-r*i),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=i+c*d+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qa.copy(this).projectOnVector(e),this.sub(Qa)}reflect(e){return this.sub(Qa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qa=new R,Ol=new ci;class Ke{static{Ke.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],y=i[0],p=i[3],m=i[6],M=i[1],T=i[4],x=i[7],E=i[2],b=i[5],C=i[8];return r[0]=a*y+o*M+c*E,r[3]=a*p+o*T+c*b,r[6]=a*m+o*x+c*C,r[1]=l*y+u*M+d*E,r[4]=l*p+u*T+d*b,r[7]=l*m+u*x+d*C,r[2]=h*y+f*M+g*E,r[5]=h*p+f*T+g*b,r[8]=h*m+f*x+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*r,f=l*r-a*c,g=t*d+n*h+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(i*l-u*n)*y,e[2]=(o*n-i*a)*y,e[3]=h*y,e[4]=(u*t-i*c)*y,e[5]=(i*r-o*t)*y,e[6]=f*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ss("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ja.makeScale(e,t)),this}rotate(e){return Ss("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ja.makeRotation(-e)),this}translate(e,t){return Ss("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ja=new Ke,Bl=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bf(){const s={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ft&&(i.r=ai(i.r),i.g=ai(i.g),i.b=ai(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ft&&(i.r=bs(i.r),i.g=bs(i.g),i.b=bs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ei?Ra:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[mn]:{primaries:e,whitePoint:n,transfer:Ra,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:n,transfer:ft,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),s}const at=Bf();function ai(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function bs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ji;class kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ji===void 0&&(ji=br("canvas")),ji.width=e.width,ji.height=e.height;const i=ji.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ji}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ai(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ai(t[n]/255)*255):t[n]=ai(t[n]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zf=0;class Yc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(eo(i[a].image)):r.push(eo(i[a]))}else r=eo(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function eo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?kf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}let Vf=0;const to=new R;class Gt extends Ji{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=Vn,i=Vn,r=Ht,a=ti,o=Mn,c=fn,l=Gt.DEFAULT_ANISOTROPY,u=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Sn(),this.name="",this.source=new Yc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(to).x}get height(){return this.source.getSize(to).y}get depth(){return this.source.getSize(to).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Th)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qi:e.x=e.x-Math.floor(e.x);break;case Vn:e.x=e.x<0?0:1;break;case Ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qi:e.y=e.y-Math.floor(e.y);break;case Vn:e.y=e.y<0?0:1;break;case Ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Th;Gt.DEFAULT_ANISOTROPY=1;class vt{static{vt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],y=c[2],p=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-y)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+y)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,x=(f+1)/2,E=(m+1)/2,b=(u+h)/4,C=(d+y)/4,v=(g+p)/4;return T>x&&T>E?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=b/n,r=C/n):x>E?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=b/i,r=v/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=C/r,i=v/r),this.set(n,i,r,t),this}let M=Math.sqrt((p-g)*(p-g)+(d-y)*(d-y)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-y)/M,this.z=(h-u)/M,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hf extends Ji{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ht,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},r=new Gt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ht,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Yc(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class In extends Hf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Fh extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gf extends Gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Je{static{Je.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,c,l,u,d,h,f,g,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,u,d,h,f,g,y,p)}set(e,t,n,i,r,a,o,c,l,u,d,h,f,g,y,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=g,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/es.setFromMatrixColumn(e,0).length(),r=1/es.setFromMatrixColumn(e,1).length(),a=1/es.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=a*u,f=a*d,g=o*u,y=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-y*l,t[9]=-o*c,t[2]=y-h*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,f=c*d,g=l*u,y=l*d;t[0]=h+y*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=y+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,f=c*d,g=l*u,y=l*d;t[0]=h-y*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=y-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,f=a*d,g=o*u,y=o*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+y,t[1]=c*d,t[5]=y*l+h,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,f=a*l,g=o*c,y=o*l;t[0]=c*u,t[4]=y-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-y*d}else if(e.order==="XZY"){const h=a*c,f=a*l,g=o*c,y=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+y,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wf,e,Xf)}lookAt(e,t,n){const i=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),di.crossVectors(n,un),di.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),di.crossVectors(n,un)),di.normalize(),Or.crossVectors(un,di),i[0]=di.x,i[4]=Or.x,i[8]=un.x,i[1]=di.y,i[5]=Or.y,i[9]=un.y,i[2]=di.z,i[6]=Or.z,i[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],y=n[6],p=n[10],m=n[14],M=n[3],T=n[7],x=n[11],E=n[15],b=i[0],C=i[4],v=i[8],A=i[12],P=i[1],I=i[5],k=i[9],G=i[13],F=i[2],V=i[6],K=i[10],L=i[14],Y=i[3],W=i[7],Q=i[11],te=i[15];return r[0]=a*b+o*P+c*F+l*Y,r[4]=a*C+o*I+c*V+l*W,r[8]=a*v+o*k+c*K+l*Q,r[12]=a*A+o*G+c*L+l*te,r[1]=u*b+d*P+h*F+f*Y,r[5]=u*C+d*I+h*V+f*W,r[9]=u*v+d*k+h*K+f*Q,r[13]=u*A+d*G+h*L+f*te,r[2]=g*b+y*P+p*F+m*Y,r[6]=g*C+y*I+p*V+m*W,r[10]=g*v+y*k+p*K+m*Q,r[14]=g*A+y*G+p*L+m*te,r[3]=M*b+T*P+x*F+E*Y,r[7]=M*C+T*I+x*V+E*W,r[11]=M*v+T*k+x*K+E*Q,r[15]=M*A+T*G+x*L+E*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],y=e[7],p=e[11],m=e[15],M=c*f-l*h,T=o*f-l*d,x=o*h-c*d,E=a*f-l*u,b=a*h-c*u,C=a*d-o*u;return t*(y*M-p*T+m*x)-n*(g*M-p*E+m*b)+i*(g*T-y*E+m*C)-r*(g*x-y*b+p*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+i*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],y=e[13],p=e[14],m=e[15],M=t*o-n*a,T=t*c-i*a,x=t*l-r*a,E=n*c-i*o,b=n*l-r*o,C=i*l-r*c,v=u*y-d*g,A=u*p-h*g,P=u*m-f*g,I=d*p-h*y,k=d*m-f*y,G=h*m-f*p,F=M*G-T*k+x*I+E*P-b*A+C*v;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/F;return e[0]=(o*G-c*k+l*I)*V,e[1]=(i*k-n*G-r*I)*V,e[2]=(y*C-p*b+m*E)*V,e[3]=(h*b-d*C-f*E)*V,e[4]=(c*P-a*G-l*A)*V,e[5]=(t*G-i*P+r*A)*V,e[6]=(p*x-g*C-m*T)*V,e[7]=(u*C-h*x+f*T)*V,e[8]=(a*k-o*P+l*v)*V,e[9]=(n*P-t*k-r*v)*V,e[10]=(g*b-y*x+m*M)*V,e[11]=(d*x-u*b-f*M)*V,e[12]=(o*A-a*I-c*v)*V,e[13]=(t*I-n*A+i*v)*V,e[14]=(y*T-g*E-p*M)*V,e[15]=(u*E-d*T+h*M)*V,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,d=o+o,h=r*l,f=r*u,g=r*d,y=a*u,p=a*d,m=o*d,M=c*l,T=c*u,x=c*d,E=n.x,b=n.y,C=n.z;return i[0]=(1-(y+m))*E,i[1]=(f+x)*E,i[2]=(g-T)*E,i[3]=0,i[4]=(f-x)*b,i[5]=(1-(h+m))*b,i[6]=(p+M)*b,i[7]=0,i[8]=(g+T)*C,i[9]=(p-M)*C,i[10]=(1-(h+y))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=es.set(i[0],i[1],i[2]).length();const o=es.set(i[4],i[5],i[6]).length(),c=es.set(i[8],i[9],i[10]).length();r<0&&(a=-a),wn.copy(this);const l=1/a,u=1/o,d=1/c;return wn.elements[0]*=l,wn.elements[1]*=l,wn.elements[2]*=l,wn.elements[4]*=u,wn.elements[5]*=u,wn.elements[6]*=u,wn.elements[8]*=d,wn.elements[9]*=d,wn.elements[10]*=d,t.setFromRotationMatrix(wn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,r,a,o=Hn,c=!1){const l=this.elements,u=2*r/(t-e),d=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let g,y;if(c)g=r/(a-r),y=a*r/(a-r);else if(o===Hn)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Sr)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Hn,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-i),h=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,y;if(c)g=1/(a-r),y=a/(a-r);else if(o===Hn)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===Sr)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const es=new R,wn=new Je,Wf=new R(0,0,0),Xf=new R(1,1,1),di=new R,Or=new R,un=new R,zl=new Je,Vl=new ci;class wi{constructor(e=0,t=0,n=0,i=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Kc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qf=0;const Hl=new R,ts=new ci,Kn=new Je,Br=new R,ks=new R,$f=new R,Yf=new ci,Gl=new R(1,0,0),Wl=new R(0,1,0),Xl=new R(0,0,1),ql={type:"added"},Kf={type:"removed"},ns={type:"childadded",child:null},no={type:"childremoved",child:null};class Tt extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new R,t=new wi,n=new ci,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Je},normalMatrix:{value:new Ke}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.multiply(ts),this}rotateOnWorldAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.premultiply(ts),this}rotateX(e){return this.rotateOnAxis(Gl,e)}rotateY(e){return this.rotateOnAxis(Wl,e)}rotateZ(e){return this.rotateOnAxis(Xl,e)}translateOnAxis(e,t){return Hl.copy(e).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gl,e)}translateY(e){return this.translateOnAxis(Wl,e)}translateZ(e){return this.translateOnAxis(Xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Br.copy(e):Br.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(ks,Br,this.up):Kn.lookAt(Br,ks,this.up),this.quaternion.setFromRotationMatrix(Kn),i&&(Kn.extractRotation(i.matrixWorld),ts.setFromRotationMatrix(Kn),this.quaternion.premultiply(ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ql),ns.child=e,this.dispatchEvent(ns),ns.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kf),no.child=e,this.dispatchEvent(no),no.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ql),ns.child=e,this.dispatchEvent(ns),ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,$f),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,Yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Tt.DEFAULT_UP=new R(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ut extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jf={type:"move"};class io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const y of e.hand.values()){const p=t.getJointPose(y,n),m=this._getHandJoint(l,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jf)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ut;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Oh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},kr={h:0,s:0,l:0};function so(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=$c(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=so(a,r,e+1/3),this.g=so(a,r,e),this.b=so(a,r,e-1/3)}return at.colorSpaceToWorking(this,i),this}setStyle(e,t=kt){function n(r){r!==void 0&&parseFloat(r)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const n=Oh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return at.workingToColorSpace(Zt.copy(this),e),Math.round(tt(Zt.r*255,0,255))*65536+Math.round(tt(Zt.g*255,0,255))*256+Math.round(tt(Zt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Zt.copy(this),t);const n=Zt.r,i=Zt.g,r=Zt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=kt){at.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,i=Zt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(kr);const n=ur(fi.h,kr.h,t),i=ur(fi.s,kr.s,t),r=ur(fi.l,kr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new ze;ze.NAMES=Oh;class Jc{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new Jc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Zf extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const An=new R,Jn=new R,ro=new R,Zn=new R,is=new R,ss=new R,$l=new R,ao=new R,oo=new R,co=new R,lo=new vt,uo=new vt,ho=new vt;class vn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),An.subVectors(e,t),i.cross(An);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){An.subVectors(i,t),Jn.subVectors(n,t),ro.subVectors(e,t);const a=An.dot(An),o=An.dot(Jn),c=An.dot(ro),l=Jn.dot(Jn),u=Jn.dot(ro),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(a,Zn.y),c.addScaledVector(o,Zn.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return lo.setScalar(0),uo.setScalar(0),ho.setScalar(0),lo.fromBufferAttribute(e,t),uo.fromBufferAttribute(e,n),ho.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(lo,r.x),a.addScaledVector(uo,r.y),a.addScaledVector(ho,r.z),a}static isFrontFacing(e,t,n,i){return An.subVectors(n,t),Jn.subVectors(e,t),An.cross(Jn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),An.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return vn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;is.subVectors(i,n),ss.subVectors(r,n),ao.subVectors(e,n);const c=is.dot(ao),l=ss.dot(ao);if(c<=0&&l<=0)return t.copy(n);oo.subVectors(e,i);const u=is.dot(oo),d=ss.dot(oo);if(u>=0&&d<=u)return t.copy(i);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(is,a);co.subVectors(e,r);const f=is.dot(co),g=ss.dot(co);if(g>=0&&f<=g)return t.copy(r);const y=f*l-c*g;if(y<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ss,o);const p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return $l.subVectors(r,i),o=(d-u)/(d-u+(f-g)),t.copy(i).addScaledVector($l,o);const m=1/(p+y+h);return a=y*m,o=h*m,t.copy(n).addScaledVector(is,a).addScaledVector(ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class bn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Rn):Rn.fromBufferAttribute(r,a),Rn.applyMatrix4(e.matrixWorld),this.expandByPoint(Rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Rn),Rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zs),Vr.subVectors(this.max,zs),rs.subVectors(e.a,zs),as.subVectors(e.b,zs),os.subVectors(e.c,zs),pi.subVectors(as,rs),mi.subVectors(os,as),Ri.subVectors(rs,os);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Ri.z,Ri.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Ri.z,0,-Ri.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Ri.y,Ri.x,0];return!fo(t,rs,as,os,Vr)||(t=[1,0,0,0,1,0,0,0,1],!fo(t,rs,as,os,Vr))?!1:(Hr.crossVectors(pi,mi),t=[Hr.x,Hr.y,Hr.z],fo(t,rs,as,os,Vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Qn=[new R,new R,new R,new R,new R,new R,new R,new R],Rn=new R,zr=new bn,rs=new R,as=new R,os=new R,pi=new R,mi=new R,Ri=new R,zs=new R,Vr=new R,Hr=new R,Ci=new R;function fo(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ci.fromArray(s,r);const o=i.x*Math.abs(Ci.x)+i.y*Math.abs(Ci.y)+i.z*Math.abs(Ci.z),c=e.dot(Ci),l=t.dot(Ci),u=n.dot(Ci);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ft=new R,Gr=new oe;let Qf=0;class Qt extends Ji{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Dh,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gr.fromBufferAttribute(this,t),Gr.applyMatrix3(e),this.setXY(t,Gr.x,Gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Bh extends Qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class kh extends Qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class nt extends Qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const jf=new bn,Vs=new R,po=new R;class qn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jf.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vs.subVectors(e,this.center);const t=Vs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Vs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vs.copy(e.center).add(po)),this.expandByPoint(Vs.copy(e.center).sub(po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ep=0;const _n=new Je,mo=new Tt,cs=new R,hn=new bn,Hs=new bn,qt=new R;class At extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_f(e)?kh:Bh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return mo.lookAt(e),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Hs.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(hn.min,Hs.min),hn.expandByPoint(qt),qt.addVectors(hn.max,Hs.max),hn.expandByPoint(qt)):(hn.expandByPoint(Hs.min),hn.expandByPoint(Hs.max))}hn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)qt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(qt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)qt.fromBufferAttribute(o,l),c&&(cs.fromBufferAttribute(e,l),qt.add(cs)),i=Math.max(i,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Qt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new R,c[v]=new R;const l=new R,u=new R,d=new R,h=new oe,f=new oe,g=new oe,y=new R,p=new R;function m(v,A,P){l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,P),h.fromBufferAttribute(r,v),f.fromBufferAttribute(r,A),g.fromBufferAttribute(r,P),u.sub(l),d.sub(l),f.sub(h),g.sub(h);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(I),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(I),o[v].add(y),o[A].add(y),o[P].add(y),c[v].add(p),c[A].add(p),c[P].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,A=M.length;v<A;++v){const P=M[v],I=P.start,k=P.count;for(let G=I,F=I+k;G<F;G+=3)m(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const T=new R,x=new R,E=new R,b=new R;function C(v){E.fromBufferAttribute(i,v),b.copy(E);const A=o[v];T.copy(A),T.sub(E.multiplyScalar(E.dot(A))).normalize(),x.crossVectors(b,A);const I=x.dot(c[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,I)}for(let v=0,A=M.length;v<A;++v){const P=M[v],I=P.start,k=P.count;for(let G=I,F=I+k;G<F;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new R,r=new R,a=new R,o=new R,c=new R,l=new R,u=new R,d=new R;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),y=e.getX(h+1),p=e.getX(h+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,p),u.subVectors(a,r),d.subVectors(i,r),u.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,p),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(i,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let f=0,g=0;for(let y=0,p=c.length;y<p;y++){o.isInterleavedBufferAttribute?f=c[y]*o.data.stride+o.offset:f=c[y]*u;for(let m=0;m<u;m++)h[g++]=l[f++]}return new Qt(h,u,d)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],f=e(h,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Dh,this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const en=new R;class Er{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),i=pt(i,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ca("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Er(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ca("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const go=new R,tp=new R,np=new Ke;class Si{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=go.subVectors(n,t).cross(tp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(go),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||np.getNormalMatrix(e),i=this.coplanarPoint(go).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let ip=0;class En extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=cr,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gh,this.blendDst=_h,this.blendEquation=xs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Za,this.stencilZFail=Za,this.stencilZPass=Za,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Si().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new oe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Zc extends En{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ls;const Gs=new R,us=new R,hs=new R,ds=new oe,Ws=new oe,Vh=new Je,Wr=new R,Xs=new R,Xr=new R,Yl=new oe,_o=new oe,Kl=new oe;class vs extends Tt{constructor(e=new Zc){if(super(),this.isSprite=!0,this.type="Sprite",ls===void 0){ls=new At;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zh(t,5);ls.setIndex([0,1,2,0,2,3]),ls.setAttribute("position",new Er(n,3,0,!1)),ls.setAttribute("uv",new Er(n,2,3,!1))}this.geometry=ls,this.material=e,this.center=new oe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),us.setFromMatrixScale(this.matrixWorld),Vh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),hs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&us.multiplyScalar(-hs.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;qr(Wr.set(-.5,-.5,0),hs,a,us,i,r),qr(Xs.set(.5,-.5,0),hs,a,us,i,r),qr(Xr.set(.5,.5,0),hs,a,us,i,r),Yl.set(0,0),_o.set(1,0),Kl.set(1,1);let o=e.ray.intersectTriangle(Wr,Xs,Xr,!1,Gs);if(o===null&&(qr(Xs.set(-.5,.5,0),hs,a,us,i,r),_o.set(0,1),o=e.ray.intersectTriangle(Wr,Xr,Xs,!1,Gs),o===null))return;const c=e.ray.origin.distanceTo(Gs);c<e.near||c>e.far||t.push({distance:c,point:Gs.clone(),uv:vn.getInterpolation(Gs,Wr,Xs,Xr,Yl,_o,Kl,new oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function qr(s,e,t,n,i,r){ds.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ws.x=r*ds.x-i*ds.y,Ws.y=i*ds.x+r*ds.y):Ws.copy(ds),s.copy(e),s.x+=Ws.x,s.y+=Ws.y,s.applyMatrix4(Vh)}const jn=new R,xo=new R,$r=new R,Yr=new R;class Ps{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){xo.copy(e).add(t).multiplyScalar(.5),$r.copy(t).sub(e).normalize(),Yr.copy(this.origin).sub(xo);const r=e.distanceTo(t)*.5,a=-this.direction.dot($r),o=Yr.dot(this.direction),c=-Yr.dot($r),l=Yr.lengthSq(),u=Math.abs(1-a*a);let d,h,f,g;if(u>0)if(d=a*c-o,h=a*o-c,g=r*u,d>=0)if(h>=-g)if(h<=g){const y=1/u;d*=y,h*=y,f=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(xo).addScaledVector($r,h),f}intersectSphere(e,t){if(e.radius<0)return null;jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),i=jn.dot(jn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,i=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,i=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,i,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,g=t.x-a.x,y=t.y-a.y,p=t.z-a.z,m=n.x-a.x,M=n.y-a.y,T=n.z-a.z,x=Math.abs(c),E=Math.abs(l),b=Math.abs(u);let C,v,A,P,I,k,G,F,V,K,L,Y;if(x>=E&&x>=b?(A=c,k=d,V=g,Y=m,c>=0?(C=l,v=u,P=h,I=f,G=y,F=p,K=M,L=T):(C=u,v=l,P=f,I=h,G=p,F=y,K=T,L=M)):E>=b?(A=l,k=h,V=y,Y=M,l>=0?(C=u,v=c,P=f,I=d,G=p,F=g,K=T,L=m):(C=c,v=u,P=d,I=f,G=g,F=p,K=m,L=T)):(A=u,k=f,V=p,Y=T,u>=0?(C=c,v=l,P=d,I=h,G=g,F=y,K=m,L=M):(C=l,v=c,P=h,I=d,G=y,F=g,K=M,L=m)),A===0)return null;const W=C/A,Q=v/A,te=1/A,Ie=P-W*k,Te=I-Q*k,Ze=G-W*V,Ye=F-Q*V,st=K-W*Y,ee=L-Q*Y,ie=st*Ye-ee*Ze,pe=Ie*ee-Te*st,Ve=Ze*Te-Ye*Ie;if(i){if(ie<0||pe<0||Ve<0)return null}else if((ie<0||pe<0||Ve<0)&&(ie>0||pe>0||Ve>0))return null;const be=ie+pe+Ve;if(be===0)return null;const He=te*(ie*k+pe*V+Ve*Y);return(be>0?He<0:He>0)?null:this.at(He/be,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nn extends En{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=xh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jl=new Je,Pi=new Ps,Kr=new qn,Zl=new R,Jr=new R,Zr=new R,Qr=new R,vo=new R,jr=new R,Ql=new R,ea=new R;class Et extends Tt{constructor(e=new At,t=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){jr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],d=r[c];u!==0&&(vo.fromBufferAttribute(d,e),a?jr.addScaledVector(vo,u):jr.addScaledVector(vo.sub(t),u))}t.add(jr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(r),Pi.copy(e.ray).recast(e.near),!(Kr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Kr,Zl)===null||Pi.origin.distanceToSquared(Zl)>(e.far-e.near)**2))&&(Jl.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(Jl),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const p=h[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),T=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let x=M,E=T;x<E;x+=3){const b=o.getX(x),C=o.getX(x+1),v=o.getX(x+2);i=ta(this,m,e,n,l,u,d,b,C,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){const M=o.getX(p),T=o.getX(p+1),x=o.getX(p+2);i=ta(this,a,e,n,l,u,d,M,T,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const p=h[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),T=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let x=M,E=T;x<E;x+=3){const b=x,C=x+1,v=x+2;i=ta(this,m,e,n,l,u,d,b,C,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let p=g,m=y;p<m;p+=3){const M=p,T=p+1,x=p+2;i=ta(this,a,e,n,l,u,d,M,T,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function sp(s,e,t,n,i,r,a,o){let c;if(e.side===rn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===Ti,o),c===null)return null;ea.copy(o),ea.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(ea);return l<t.near||l>t.far?null:{distance:l,point:ea.clone(),object:s}}function ta(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Jr),s.getVertexPosition(c,Zr),s.getVertexPosition(l,Qr);const u=sp(s,e,t,n,Jr,Zr,Qr,Ql);if(u){const d=new R;vn.getBarycoord(Ql,Jr,Zr,Qr,d),i&&(u.uv=vn.getInterpolatedAttribute(i,o,c,l,d,new oe)),r&&(u.uv1=vn.getInterpolatedAttribute(r,o,c,l,d,new oe)),a&&(u.normal=vn.getInterpolatedAttribute(a,o,c,l,d,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new R,materialIndex:0};vn.getNormal(Jr,Zr,Qr,h.normal),u.face=h,u.barycoord=d}return u}const qs=new vt,jl=new vt,eu=new vt,rp=new vt,tu=new Je,na=new R,yo=new qn,nu=new Je,Mo=new Ps;class ap extends Et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Cl,this.bindMatrix=new Je,this.bindMatrixInverse=new Je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new bn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,na),this.boundingBox.expandByPoint(na)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new qn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,na),this.boundingSphere.expandByPoint(na)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yo.copy(this.boundingSphere),yo.applyMatrix4(i),e.ray.intersectsSphere(yo)!==!1&&(nu.copy(i).invert(),Mo.copy(e.ray).applyMatrix4(nu),!(this.boundingBox!==null&&Mo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Mo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new vt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Cl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rf?this.bindMatrixInverse.copy(this.bindMatrix).invert():De("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;jl.fromBufferAttribute(i.attributes.skinIndex,e),eu.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(qs.copy(t),t.set(0,0,0,0)):(qs.set(...t,1),t.set(0,0,0)),qs.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=eu.getComponent(r);if(a!==0){const o=jl.getComponent(r);tu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(rp.copy(qs).applyMatrix4(tu),a)}}return t.isVector4&&(t.w=qs.w),t.applyMatrix4(this.bindMatrixInverse)}}class Hh extends Tt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Qc extends Gt{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Vt,u=Vt,d,h){super(null,a,o,c,l,u,i,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const iu=new Je,op=new Je;class jc{constructor(e=[],t=[]){this.uuid=Sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){De("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:op;iu.multiplyMatrices(o,t[r]),iu.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new jc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Qc(t,e,e,Mn,yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(De("Skeleton: No bone found with UUID:",r),a=new Hh),this.bones.push(a),this.boneInverses.push(new Je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Pa extends Qt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const fs=new Je,su=new Je,ia=[],ru=new bn,cp=new Je,$s=new Et,Ys=new qn;class wc extends Et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,cp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new bn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fs),ru.copy(e.boundingBox).applyMatrix4(fs),this.boundingBox.union(ru)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fs),Ys.copy(e.boundingSphere).applyMatrix4(fs),this.boundingSphere.union(Ys)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ys.copy(this.boundingSphere),Ys.applyMatrix4(n),e.ray.intersectsSphere(Ys)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,fs),su.multiplyMatrices(n,fs),$s.matrixWorld=su,$s.raycast(e,ia);for(let a=0,o=ia.length;a<o;a++){const c=ia[a];c.instanceId=r,c.object=this,t.push(c)}ia.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Pa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qc(new Float32Array(i*this.count),i,this.count,Vc,yn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ii=new qn,lp=new oe(.5,.5),sa=new R;class el{constructor(e=new Si,t=new Si,n=new Si,i=new Si,r=new Si,a=new Si){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hn,n=!1){const i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],f=r[7],g=r[8],y=r[9],p=r[10],m=r[11],M=r[12],T=r[13],x=r[14],E=r[15];if(i[0].setComponents(l-a,f-u,m-g,E-M).normalize(),i[1].setComponents(l+a,f+u,m+g,E+M).normalize(),i[2].setComponents(l+o,f+d,m+y,E+T).normalize(),i[3].setComponents(l-o,f-d,m-y,E-T).normalize(),n)i[4].setComponents(c,h,p,x).normalize(),i[5].setComponents(l-c,f-h,m-p,E-x).normalize();else if(i[4].setComponents(l-c,f-h,m-p,E-x).normalize(),t===Hn)i[5].setComponents(l+c,f+h,m+p,E+x).normalize();else if(t===Sr)i[5].setComponents(c,h,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(e){Ii.center.set(0,0,0);const t=lp.distanceTo(e.center);return Ii.radius=.7071067811865476+t,Ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(sa.x=i.normal.x>0?e.max.x:e.min.x,sa.y=i.normal.y>0?e.max.y:e.min.y,sa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(sa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gh extends En{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ia=new R,La=new R,au=new Je,Ks=new Ps,ra=new qn,So=new R,ou=new R;class tl extends Tt{constructor(e=new At,t=new Gh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Ia.fromBufferAttribute(t,i-1),La.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ia.distanceTo(La);e.setAttribute("lineDistance",new nt(n,1))}else De("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ra.copy(n.boundingSphere),ra.applyMatrix4(i),ra.radius+=r,e.ray.intersectsSphere(ra)===!1)return;au.copy(i).invert(),Ks.copy(e.ray).applyMatrix4(au);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=f,p=g-1;y<p;y+=l){const m=u.getX(y),M=u.getX(y+1),T=aa(this,e,Ks,c,m,M,y);T&&t.push(T)}if(this.isLineLoop){const y=u.getX(g-1),p=u.getX(f),m=aa(this,e,Ks,c,y,p,g-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=f,p=g-1;y<p;y+=l){const m=aa(this,e,Ks,c,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){const y=aa(this,e,Ks,c,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function aa(s,e,t,n,i,r,a){const o=s.geometry.attributes.position;if(Ia.fromBufferAttribute(o,i),La.fromBufferAttribute(o,r),t.distanceSqToSegment(Ia,La,So,ou)>n)return;So.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(So);if(!(l<e.near||l>e.far))return{distance:l,point:ou.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const cu=new R,lu=new R;class up extends tl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)cu.fromBufferAttribute(t,i),lu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+cu.distanceTo(lu);e.setAttribute("lineDistance",new nt(n,1))}else De("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class hp extends tl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class nl extends En{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const uu=new Je,Ac=new Ps,oa=new qn,ca=new R;class Wh extends Tt{constructor(e=new At,t=new nl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(i),oa.radius+=r,e.ray.intersectsSphere(oa)===!1)return;uu.copy(i).invert(),Ac.copy(e.ray).applyMatrix4(uu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=h,y=f;g<y;g++){const p=l.getX(g);ca.fromBufferAttribute(d,p),hu(ca,p,c,i,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=h,y=f;g<y;g++)ca.fromBufferAttribute(d,g),hu(ca,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function hu(s,e,t,n,i,r,a){const o=Ac.distanceSqToPoint(s);if(o<t){const c=new R;Ac.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Xh extends Gt{constructor(e=[],t=Xi,n,i,r,a,o,c,l,u){super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class il extends Gt{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tr extends Gt{constructor(e,t,n=Wn,i,r,a,o=Vt,c=Vt,l,u=oi,d=1){if(u!==oi&&u!==ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class dp extends Tr{constructor(e,t=Wn,n=Xi,i,r,a=Vt,o=Vt,c,l=oi){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qh extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Is extends At{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(u,3)),this.setAttribute("uv",new nt(d,2));function g(y,p,m,M,T,x,E,b,C,v,A){const P=x/C,I=E/v,k=x/2,G=E/2,F=b/2,V=C+1,K=v+1;let L=0,Y=0;const W=new R;for(let Q=0;Q<K;Q++){const te=Q*I-G;for(let Ie=0;Ie<V;Ie++){const Te=Ie*P-k;W[y]=Te*M,W[p]=te*T,W[m]=F,l.push(W.x,W.y,W.z),W[y]=0,W[p]=0,W[m]=b>0?1:-1,u.push(W.x,W.y,W.z),d.push(Ie/C),d.push(1-Q/v),L+=1}}for(let Q=0;Q<v;Q++)for(let te=0;te<C;te++){const Ie=h+te+V*Q,Te=h+te+V*(Q+1),Ze=h+(te+1)+V*(Q+1),Ye=h+(te+1)+V*Q;c.push(Ie,Te,Ye),c.push(Te,Ze,Ye),Y+=6}o.addGroup(f,Y,A),f+=Y,h+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Rt extends At{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],d=[],h=[],f=[];let g=0;const y=[],p=n/2;let m=0;M(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(f,2));function M(){const x=new R,E=new R;let b=0;const C=(t-e)/n;for(let v=0;v<=r;v++){const A=[],P=v/r,I=P*(t-e)+e;for(let k=0;k<=i;k++){const G=k/i,F=G*c+o,V=Math.sin(F),K=Math.cos(F);E.x=I*V,E.y=-P*n+p,E.z=I*K,d.push(E.x,E.y,E.z),x.set(V,C,K).normalize(),h.push(x.x,x.y,x.z),f.push(G,1-P),A.push(g++)}y.push(A)}for(let v=0;v<i;v++)for(let A=0;A<r;A++){const P=y[A][v],I=y[A+1][v],k=y[A+1][v+1],G=y[A][v+1];(e>0||A!==0)&&(u.push(P,I,G),b+=3),(t>0||A!==r-1)&&(u.push(I,k,G),b+=3)}l.addGroup(m,b,0),m+=b}function T(x){const E=g,b=new oe,C=new R;let v=0;const A=x===!0?e:t,P=x===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,p*P,0),h.push(0,P,0),f.push(.5,.5),g++;const I=g;for(let k=0;k<=i;k++){const F=k/i*c+o,V=Math.cos(F),K=Math.sin(F);C.x=A*K,C.y=p*P,C.z=A*V,d.push(C.x,C.y,C.z),h.push(0,P,0),b.x=V*.5+.5,b.y=K*.5*P+.5,f.push(b.x,b.y),g++}for(let k=0;k<i;k++){const G=E+k,F=I+k;x===!0?u.push(F,F+1,G):u.push(F+1,F,G),v+=3}l.addGroup(m,v,x===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class on extends Rt{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new on(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Nr extends At{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),l(n),u(),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(r.slice(),3)),this.setAttribute("uv",new nt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const T=new R,x=new R,E=new R;for(let b=0;b<t.length;b+=3)f(t[b+0],T),f(t[b+1],x),f(t[b+2],E),c(T,x,E,M)}function c(M,T,x,E){const b=E+1,C=[];for(let v=0;v<=b;v++){C[v]=[];const A=M.clone().lerp(x,v/b),P=T.clone().lerp(x,v/b),I=b-v;for(let k=0;k<=I;k++)k===0&&v===b?C[v][k]=A:C[v][k]=A.clone().lerp(P,k/I)}for(let v=0;v<b;v++)for(let A=0;A<2*(b-v)-1;A++){const P=Math.floor(A/2);A%2===0?(h(C[v][P+1]),h(C[v+1][P]),h(C[v][P])):(h(C[v][P+1]),h(C[v+1][P+1]),h(C[v+1][P]))}}function l(M){const T=new R;for(let x=0;x<r.length;x+=3)T.x=r[x+0],T.y=r[x+1],T.z=r[x+2],T.normalize().multiplyScalar(M),r[x+0]=T.x,r[x+1]=T.y,r[x+2]=T.z}function u(){const M=new R;for(let T=0;T<r.length;T+=3){M.x=r[T+0],M.y=r[T+1],M.z=r[T+2];const x=p(M)/2/Math.PI+.5,E=m(M)/Math.PI+.5;a.push(x,1-E)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){const T=a[M+0],x=a[M+2],E=a[M+4],b=Math.max(T,x,E),C=Math.min(T,x,E);b>.9&&C<.1&&(T<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),E<.2&&(a[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function f(M,T){const x=M*3;T.x=e[x+0],T.y=e[x+1],T.z=e[x+2]}function g(){const M=new R,T=new R,x=new R,E=new R,b=new oe,C=new oe,v=new oe;for(let A=0,P=0;A<r.length;A+=9,P+=6){M.set(r[A+0],r[A+1],r[A+2]),T.set(r[A+3],r[A+4],r[A+5]),x.set(r[A+6],r[A+7],r[A+8]),b.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),v.set(a[P+4],a[P+5]),E.copy(M).add(T).add(x).divideScalar(3);const I=p(E);y(b,P+0,M,I),y(C,P+2,T,I),y(v,P+4,x,I)}}function y(M,T,x,E){E<0&&M.x===1&&(a[T]=M.x-1),x.x===0&&x.z===0&&(a[T]=E/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.vertices,e.indices,e.radius,e.detail)}}class Na extends Nr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Na(e.radius,e.detail)}}class $n{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){De("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const u=n[i],h=n[i+1]-u,f=(a-u)/h;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new oe:new R);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],r=[],a=[],o=new R,c=new Je;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),h<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(tt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(tt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class sl extends $n{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new oe){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,f=l-this.aY;c=h*u-f*d+this.aX,l=h*d+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class fp extends sl{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function rl(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,d){let h=(a-r)/l-(o-r)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+d)+(c-o)/d;h*=u,f*=u,i(a,o,h,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const du=new R,fu=new R,bo=new rl,Eo=new rl,To=new rl;class $h extends $n{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%r]:(fu.subVectors(i[0],i[1]).add(i[0]),l=fu);const d=i[o%r],h=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(du.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=du),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);y<1e-4&&(y=1),g<1e-4&&(g=y),p<1e-4&&(p=y),bo.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,g,y,p),Eo.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,g,y,p),To.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,g,y,p)}else this.curveType==="catmullrom"&&(bo.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),Eo.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),To.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return n.set(bo.calc(c),Eo.calc(c),To.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function pu(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function pp(s,e){const t=1-s;return t*t*e}function mp(s,e){return 2*(1-s)*s*e}function gp(s,e){return s*s*e}function hr(s,e,t,n){return pp(s,e)+mp(s,t)+gp(s,n)}function _p(s,e){const t=1-s;return t*t*t*e}function xp(s,e){const t=1-s;return 3*t*t*s*e}function vp(s,e){return 3*(1-s)*s*s*e}function yp(s,e){return s*s*s*e}function dr(s,e,t,n,i){return _p(s,e)+xp(s,t)+vp(s,n)+yp(s,i)}class Yh extends $n{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,i.x,r.x,a.x,o.x),dr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mp extends $n{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,i.x,r.x,a.x,o.x),dr(e,i.y,r.y,a.y,o.y),dr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Kh extends $n{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sp extends $n{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jh extends $n{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(hr(e,i.x,r.x,a.x),hr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zh extends $n{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(hr(e,i.x,r.x,a.x),hr(e,i.y,r.y,a.y),hr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qh extends $n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(pu(o,c.x,l.x,u.x,d.x),pu(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new oe().fromArray(i))}return this}}var Da=Object.freeze({__proto__:null,ArcCurve:fp,CatmullRomCurve3:$h,CubicBezierCurve:Yh,CubicBezierCurve3:Mp,EllipseCurve:sl,LineCurve:Kh,LineCurve3:Sp,QuadraticBezierCurve:Jh,QuadraticBezierCurve3:Zh,SplineCurve:Qh});class bp extends $n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Da[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Da[i.type]().fromJSON(i))}return this}}class mu extends bp{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Kh(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Jh(this.currentPoint.clone(),new oe(e,t),new oe(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new Yh(this.currentPoint.clone(),new oe(e,t),new oe(n,i),new oe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Qh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){const l=new sl(e,t,n,i,r,a,o,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ni extends mu{constructor(e){super(e),this.uuid=Sn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new mu().fromJSON(i))}return this}}function Ep(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=jh(s,0,i,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Cp(s,e,r,t)),s.length>80*t){o=s[0],c=s[1];let u=o,d=c;for(let h=t;h<i;h+=t){const f=s[h],g=s[h+1];f<o&&(o=f),g<c&&(c=g),f>u&&(u=f),g>d&&(d=g)}l=Math.max(u-o,d-c),l=l!==0?32767/l:0}return wr(r,a,t,o,c,l,0),a}function jh(s,e,t,n,i){let r;if(i===zp(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=gu(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=gu(a/n|0,s[a],s[a+1],r);return r&&As(r,r.next)&&(Rr(r),r=r.next),r}function Yi(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(As(t,t.next)||Ct(t.prev,t,t.next)===0)){if(Rr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function wr(s,e,t,n,i,r,a){if(!s)return;!a&&r&&Dp(s,n,i,r);let o=s;for(;s.prev!==s.next;){const c=s.prev,l=s.next;if(r?wp(s,n,i,r):Tp(s)){e.push(c.i,s.i,l.i),Rr(s),s=l.next,o=l.next;continue}if(s=l,s===o){a?a===1?(s=Ap(Yi(s),e),wr(s,e,t,n,i,r,2)):a===2&&Rp(s,e,t,n,i,r):wr(Yi(s),e,t,n,i,r,1);break}}}function Tp(s){const e=s.prev,t=s,n=s.next;if(Ct(e,t,n)>=0)return!1;const i=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(i,r,a),d=Math.min(o,c,l),h=Math.max(i,r,a),f=Math.max(o,c,l);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&rr(i,o,r,c,a,l,g.x,g.y)&&Ct(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function wp(s,e,t,n){const i=s.prev,r=s,a=s.next;if(Ct(i,r,a)>=0)return!1;const o=i.x,c=r.x,l=a.x,u=i.y,d=r.y,h=a.y,f=Math.min(o,c,l),g=Math.min(u,d,h),y=Math.max(o,c,l),p=Math.max(u,d,h),m=Rc(f,g,e,t,n),M=Rc(y,p,e,t,n);let T=s.prevZ,x=s.nextZ;for(;T&&T.z>=m&&x&&x.z<=M;){if(T.x>=f&&T.x<=y&&T.y>=g&&T.y<=p&&T!==i&&T!==a&&rr(o,u,c,d,l,h,T.x,T.y)&&Ct(T.prev,T,T.next)>=0||(T=T.prevZ,x.x>=f&&x.x<=y&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&rr(o,u,c,d,l,h,x.x,x.y)&&Ct(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;T&&T.z>=m;){if(T.x>=f&&T.x<=y&&T.y>=g&&T.y<=p&&T!==i&&T!==a&&rr(o,u,c,d,l,h,T.x,T.y)&&Ct(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=y&&x.y>=g&&x.y<=p&&x!==i&&x!==a&&rr(o,u,c,d,l,h,x.x,x.y)&&Ct(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Ap(s,e){let t=s;do{const n=t.prev,i=t.next.next;!As(n,i)&&td(n,t,t.next,i)&&Ar(n,i)&&Ar(i,n)&&(e.push(n.i,t.i,i.i),Rr(t),Rr(t.next),t=s=i),t=t.next}while(t!==s);return Yi(t)}function Rp(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Op(a,o)){let c=nd(a,o);a=Yi(a,a.next),c=Yi(c,c.next),wr(a,e,t,n,i,r,0),wr(c,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Cp(s,e,t,n){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,c=r<a-1?e[r+1]*n:s.length,l=jh(s,o,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Fp(l))}i.sort(Pp);for(let r=0;r<i.length;r++)t=Ip(i[r],t);return t}function Pp(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Ip(s,e){const t=Lp(s,e);if(!t)return e;const n=nd(t,s);return Yi(n,n.next),Yi(t,t.next)}function Lp(s,e){let t=e;const n=s.x,i=s.y;let r=-1/0,a;if(As(s,t))return t;do{if(As(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&ed(i<l?n:r,i,c,l,i<l?r:n,i,t.x,t.y)){const d=Math.abs(i-t.y)/(n-t.x);Ar(t,s)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&Np(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function Np(s,e){return Ct(s.prev,s,e.prev)<0&&Ct(e.next,s,s.next)<0}function Dp(s,e,t,n){let i=s;do i.z===0&&(i.z=Rc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Up(i)}function Up(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function Rc(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Fp(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function ed(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function rr(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&ed(s,e,t,n,i,r,a,o)}function Op(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Bp(s,e)&&(Ar(s,e)&&Ar(e,s)&&kp(s,e)&&(Ct(s.prev,s,e.prev)||Ct(s,e.prev,e))||As(s,e)&&Ct(s.prev,s,s.next)>0&&Ct(e.prev,e,e.next)>0)}function Ct(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function As(s,e){return s.x===e.x&&s.y===e.y}function td(s,e,t,n){const i=ua(Ct(s,e,t)),r=ua(Ct(s,e,n)),a=ua(Ct(t,n,s)),o=ua(Ct(t,n,e));return!!(i!==r&&a!==o||i===0&&la(s,t,e)||r===0&&la(s,n,e)||a===0&&la(t,s,n)||o===0&&la(t,e,n))}function la(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ua(s){return s>0?1:s<0?-1:0}function Bp(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&td(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Ar(s,e){return Ct(s.prev,s,s.next)<0?Ct(s,e,s.next)>=0&&Ct(s,s.prev,e)>=0:Ct(s,e,s.prev)<0||Ct(s,s.next,e)<0}function kp(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function nd(s,e){const t=Cc(s.i,s.x,s.y),n=Cc(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function gu(s,e,t,n){const i=Cc(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Rr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Cc(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zp(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Vp{static triangulate(e,t,n=2){return Ep(e,t,n)}}class ii{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return ii.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];_u(e),xu(n,e);let a=e.length;t.forEach(_u);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,xu(n,t[c]);const o=Vp.triangulate(n,i);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function _u(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function xu(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class Gi extends At{constructor(e=new ni([new oe(.5,.5),new oe(-.5,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let o=0,c=e.length;o<c;o++){const l=e[o];a(l)}this.setAttribute("position",new nt(i,3)),this.setAttribute("uv",new nt(r,2)),this.computeVertexNormals();function a(o){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Hp;let T,x=!1,E,b,C,v;if(m){T=m.getSpacedPoints(u),x=!0,h=!1;const ne=m.isCatmullRomCurve3?m.closed:!1;E=m.computeFrenetFrames(u,ne),b=new R,C=new R,v=new R}h||(p=0,f=0,g=0,y=0);const A=o.extractPoints(l);let P=A.shape;const I=A.holes;if(!ii.isClockWise(P)){P=P.reverse();for(let ne=0,le=I.length;ne<le;ne++){const ue=I[ne];ii.isClockWise(ue)&&(I[ne]=ue.reverse())}}function G(ne){const ue=10000000000000001e-36;let he=ne[0];for(let fe=1;fe<=ne.length;fe++){const Be=fe%ne.length,Ue=ne[Be],Ge=Ue.x-he.x,qe=Ue.y-he.y,N=Ge*Ge+qe*qe,U=Math.max(Math.abs(Ue.x),Math.abs(Ue.y),Math.abs(he.x),Math.abs(he.y)),H=ue*U*U;if(N<=H){ne.splice(Be,1),fe--;continue}he=Ue}}G(P),I.forEach(G);const F=I.length,V=P;for(let ne=0;ne<F;ne++){const le=I[ne];P=P.concat(le)}function K(ne,le,ue){return le||$e("ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(le,ue)}const L=P.length;function Y(ne,le,ue){let he,fe,Be;const Ue=ne.x-le.x,Ge=ne.y-le.y,qe=ue.x-ne.x,N=ue.y-ne.y,U=Ue*Ue+Ge*Ge,H=Ue*N-Ge*qe;if(Math.abs(H)>Number.EPSILON){const w=Math.sqrt(U),_=Math.sqrt(qe*qe+N*N),D=le.x-Ge/w,z=le.y+Ue/w,$=ue.x-N/_,Z=ue.y+qe/_,ce=(($-D)*N-(Z-z)*qe)/(Ue*N-Ge*qe);he=D+Ue*ce-ne.x,fe=z+Ge*ce-ne.y;const j=he*he+fe*fe;if(j<=2)return new oe(he,fe);Be=Math.sqrt(j/2)}else{let w=!1;Ue>Number.EPSILON?qe>Number.EPSILON&&(w=!0):Ue<-Number.EPSILON?qe<-Number.EPSILON&&(w=!0):Math.sign(Ge)===Math.sign(N)&&(w=!0),w?(he=-Ge,fe=Ue,Be=Math.sqrt(U)):(he=Ue,fe=Ge,Be=Math.sqrt(U/2))}return new oe(he/Be,fe/Be)}const W=[];for(let ne=0,le=V.length,ue=le-1,he=ne+1;ne<le;ne++,ue++,he++)ue===le&&(ue=0),he===le&&(he=0),W[ne]=Y(V[ne],V[ue],V[he]);const Q=[];let te,Ie=W.concat();for(let ne=0,le=F;ne<le;ne++){const ue=I[ne];te=[];for(let he=0,fe=ue.length,Be=fe-1,Ue=he+1;he<fe;he++,Be++,Ue++)Be===fe&&(Be=0),Ue===fe&&(Ue=0),te[he]=Y(ue[he],ue[Be],ue[Ue]);Q.push(te),Ie=Ie.concat(te)}let Te;if(p===0)Te=ii.triangulateShape(V,I);else{const ne=[],le=[];for(let ue=0;ue<p;ue++){const he=ue/p,fe=f*Math.cos(he*Math.PI/2),Be=g*Math.sin(he*Math.PI/2)+y;for(let Ue=0,Ge=V.length;Ue<Ge;Ue++){const qe=K(V[Ue],W[Ue],Be);pe(qe.x,qe.y,-fe),he===0&&ne.push(qe)}for(let Ue=0,Ge=F;Ue<Ge;Ue++){const qe=I[Ue];te=Q[Ue];const N=[];for(let U=0,H=qe.length;U<H;U++){const w=K(qe[U],te[U],Be);pe(w.x,w.y,-fe),he===0&&N.push(w)}he===0&&le.push(N)}}Te=ii.triangulateShape(ne,le)}const Ze=Te.length,Ye=g+y;for(let ne=0;ne<L;ne++){const le=h?K(P[ne],Ie[ne],Ye):P[ne];x?(C.copy(E.normals[0]).multiplyScalar(le.x),b.copy(E.binormals[0]).multiplyScalar(le.y),v.copy(T[0]).add(C).add(b),pe(v.x,v.y,v.z)):pe(le.x,le.y,0)}for(let ne=1;ne<=u;ne++)for(let le=0;le<L;le++){const ue=h?K(P[le],Ie[le],Ye):P[le];x?(C.copy(E.normals[ne]).multiplyScalar(ue.x),b.copy(E.binormals[ne]).multiplyScalar(ue.y),v.copy(T[ne]).add(C).add(b),pe(v.x,v.y,v.z)):pe(ue.x,ue.y,d/u*ne)}for(let ne=p-1;ne>=0;ne--){const le=ne/p,ue=f*Math.cos(le*Math.PI/2),he=g*Math.sin(le*Math.PI/2)+y;for(let fe=0,Be=V.length;fe<Be;fe++){const Ue=K(V[fe],W[fe],he);pe(Ue.x,Ue.y,d+ue)}for(let fe=0,Be=I.length;fe<Be;fe++){const Ue=I[fe];te=Q[fe];for(let Ge=0,qe=Ue.length;Ge<qe;Ge++){const N=K(Ue[Ge],te[Ge],he);x?pe(N.x,N.y+T[u-1].y,T[u-1].x+ue):pe(N.x,N.y,d+ue)}}}st(),ee();function st(){const ne=i.length/3;if(h){let le=0,ue=L*le;for(let he=0;he<Ze;he++){const fe=Te[he];Ve(fe[2]+ue,fe[1]+ue,fe[0]+ue)}le=u+p*2,ue=L*le;for(let he=0;he<Ze;he++){const fe=Te[he];Ve(fe[0]+ue,fe[1]+ue,fe[2]+ue)}}else{for(let le=0;le<Ze;le++){const ue=Te[le];Ve(ue[2],ue[1],ue[0])}for(let le=0;le<Ze;le++){const ue=Te[le];Ve(ue[0]+L*u,ue[1]+L*u,ue[2]+L*u)}}n.addGroup(ne,i.length/3-ne,0)}function ee(){const ne=i.length/3;let le=0;ie(V,le),le+=V.length;for(let ue=0,he=I.length;ue<he;ue++){const fe=I[ue];ie(fe,le),le+=fe.length}n.addGroup(ne,i.length/3-ne,1)}function ie(ne,le){let ue=ne.length;for(;--ue>=0;){const he=ue;let fe=ue-1;fe<0&&(fe=ne.length-1);for(let Be=0,Ue=u+p*2;Be<Ue;Be++){const Ge=L*Be,qe=L*(Be+1),N=le+he+Ge,U=le+fe+Ge,H=le+fe+qe,w=le+he+qe;be(N,U,H,w)}}}function pe(ne,le,ue){c.push(ne),c.push(le),c.push(ue)}function Ve(ne,le,ue){He(ne),He(le),He(ue);const he=i.length/3,fe=M.generateTopUV(n,i,he-3,he-2,he-1);ot(fe[0]),ot(fe[1]),ot(fe[2])}function be(ne,le,ue,he){He(ne),He(le),He(he),He(le),He(ue),He(he);const fe=i.length/3,Be=M.generateSideWallUV(n,i,fe-6,fe-3,fe-2,fe-1);ot(Be[0]),ot(Be[1]),ot(Be[3]),ot(Be[1]),ot(Be[2]),ot(Be[3])}function He(ne){i.push(c[ne*3+0]),i.push(c[ne*3+1]),i.push(c[ne*3+2])}function ot(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Gp(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Da[i.type]().fromJSON(i)),new Gi(n,e.options)}}const Hp={generateTopUV:function(s,e,t,n,i){const r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[i*3],u=e[i*3+1];return[new oe(r,a),new oe(o,c),new oe(l,u)]},generateSideWallUV:function(s,e,t,n,i,r){const a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],d=e[n*3+2],h=e[i*3],f=e[i*3+1],g=e[i*3+2],y=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new oe(a,1-c),new oe(l,1-d),new oe(h,1-g),new oe(y,1-m)]:[new oe(o,1-c),new oe(u,1-d),new oe(f,1-g),new oe(p,1-m)]}};function Gp(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class fr extends Nr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new fr(e.radius,e.detail)}}class al extends At{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=tt(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/t,d=new R,h=new oe,f=new R,g=new R,y=new R;let p=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:p=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,f.x=m*1,f.y=-p,f.z=m*0,y.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(y.x,y.y,y.z);break;default:p=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),c.push(f.x,f.y,f.z),y.copy(g)}for(let M=0;M<=t;M++){const T=n+M*u*i,x=Math.sin(T),E=Math.cos(T);for(let b=0;b<=e.length-1;b++){d.x=e[b].x*x,d.y=e[b].y,d.z=e[b].x*E,a.push(d.x,d.y,d.z),h.x=M/t,h.y=b/(e.length-1),o.push(h.x,h.y);const C=c[3*b+0]*x,v=c[3*b+1],A=c[3*b+0]*E;l.push(C,v,A)}}for(let M=0;M<t;M++)for(let T=0;T<e.length-1;T++){const x=T+M*e.length,E=x,b=x+e.length,C=x+e.length+1,v=x+1;r.push(E,b,v),r.push(C,v,b)}this.setIndex(r),this.setAttribute("position",new nt(a,3)),this.setAttribute("uv",new nt(o,2)),this.setAttribute("normal",new nt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new al(e.points,e.segments,e.phiStart,e.phiLength)}}class Lt extends Nr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Lt(e.radius,e.detail)}}class zn extends At{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,d=e/o,h=t/c,f=[],g=[],y=[],p=[];for(let m=0;m<u;m++){const M=m*h-a;for(let T=0;T<l;T++){const x=T*d-r;g.push(x,-M,0),y.push(0,0,1),p.push(T/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<o;M++){const T=M+l*m,x=M+l*(m+1),E=M+1+l*(m+1),b=M+1+l*m;f.push(T,x,b),f.push(x,E,b)}this.setIndex(f),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zn(e.width,e.height,e.widthSegments,e.heightSegments)}}class pr extends At{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/i,f=new R,g=new oe;for(let y=0;y<=i;y++){for(let p=0;p<=n;p++){const m=r+p/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let y=0;y<i;y++){const p=y*(n+1);for(let m=0;m<n;m++){const M=m+p,T=M,x=M+n+1,E=M+n+2,b=M+1;o.push(T,x,b),o.push(x,E,b)}}this.setIndex(o),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Cr extends At{constructor(e=new ni([new oe(0,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new nt(i,3)),this.setAttribute("normal",new nt(r,3)),this.setAttribute("uv",new nt(a,2));function l(u){const d=i.length/3,h=u.extractPoints(t);let f=h.shape;const g=h.holes;ii.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){const M=g[p];ii.isClockWise(M)===!0&&(g[p]=M.reverse())}const y=ii.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){const M=g[p];f=f.concat(M)}for(let p=0,m=f.length;p<m;p++){const M=f[p];i.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let p=0,m=y.length;p<m;p++){const M=y[p],T=M[0]+d,x=M[1]+d,E=M[2]+d;n.push(T,x,E),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Wp(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const a=t[e.shapes[i]];n.push(a)}return new Cr(n,e.curveSegments)}}function Wp(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Ki extends At{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new R,h=new R,f=[],g=[],y=[],p=[];for(let m=0;m<=n;m++){const M=[],T=m/n,x=a+T*o,E=e*Math.cos(x),b=Math.sqrt(e*e-E*E);let C=0;m===0&&a===0?C=.5/t:m===n&&c===Math.PI&&(C=-.5/t);for(let v=0;v<=t;v++){const A=v/t,P=i+A*r;d.x=-b*Math.cos(P),d.y=E,d.z=b*Math.sin(P),g.push(d.x,d.y,d.z),h.copy(d).normalize(),y.push(h.x,h.y,h.z),p.push(A+C,1-T),M.push(l++)}u.push(M)}for(let m=0;m<n;m++)for(let M=0;M<t;M++){const T=u[m][M+1],x=u[m][M],E=u[m+1][M],b=u[m+1][M+1];(m!==0||a>0)&&f.push(T,x,b),(m!==n-1||c<Math.PI)&&f.push(x,E,b)}this.setIndex(f),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Pn extends At{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const c=[],l=[],u=[],d=[],h=new R,f=new R,g=new R;for(let y=0;y<=n;y++){const p=a+y/n*o;for(let m=0;m<=i;m++){const M=m/i*r;f.x=(e+t*Math.cos(p))*Math.cos(M),f.y=(e+t*Math.cos(p))*Math.sin(M),f.z=t*Math.sin(p),l.push(f.x,f.y,f.z),h.x=e*Math.cos(M),h.y=e*Math.sin(M),g.subVectors(f,h).normalize(),u.push(g.x,g.y,g.z),d.push(m/i),d.push(y/n)}}for(let y=1;y<=n;y++)for(let p=1;p<=i;p++){const m=(i+1)*y+p-1,M=(i+1)*(y-1)+p-1,T=(i+1)*(y-1)+p,x=(i+1)*y+p;c.push(m,M,x),c.push(M,T,x)}this.setIndex(c),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(u,3)),this.setAttribute("uv",new nt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}class ol extends At{constructor(e=new Zh(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,c=new R,l=new oe;let u=new R;const d=[],h=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(f,2));function y(){for(let T=0;T<t;T++)p(T);p(r===!1?t:0),M(),m()}function p(T){u=e.getPointAt(T/t,u);const x=a.normals[T],E=a.binormals[T];for(let b=0;b<=i;b++){const C=b/i*Math.PI*2,v=Math.sin(C),A=-Math.cos(C);c.x=A*x.x+v*E.x,c.y=A*x.y+v*E.y,c.z=A*x.z+v*E.z,c.normalize(),h.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,d.push(o.x,o.y,o.z)}}function m(){for(let T=1;T<=t;T++)for(let x=1;x<=i;x++){const E=(i+1)*(T-1)+(x-1),b=(i+1)*T+(x-1),C=(i+1)*T+x,v=(i+1)*(T-1)+x;g.push(E,b,v),g.push(b,C,v)}}function M(){for(let T=0;T<=t;T++)for(let x=0;x<=i;x++)l.x=T/t,l.y=x/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ol(new Da[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Rs(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];if(vu(i))i.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(vu(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function tn(s){const e={};for(let t=0;t<s.length;t++){const n=Rs(s[t]);for(const i in n)e[i]=n[i]}return e}function vu(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Xp(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function id(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const qp={clone:Rs,merge:tn};var $p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ln extends En{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$p,this.fragmentShader=Yp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rs(e.uniforms),this.uniformsGroups=Xp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new ze().setHex(i.value);break;case"v2":this.uniforms[n].value=new oe().fromArray(i.value);break;case"v3":this.uniforms[n].value=new R().fromArray(i.value);break;case"v4":this.uniforms[n].value=new vt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Je().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Kp extends Ln{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Bt extends En{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yn extends Bt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Jp extends En{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zp extends En{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function bi(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function ya(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function Qp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function yu(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function jp(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Ls{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class em extends Ls{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Il,endingEnd:Il}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ll:r=e,o=2*t-n;break;case Nl:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ll:a=e,c=2*n-t;break;case Nl:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),y=g*g,p=y*g,m=-h*p+2*h*y-h*g,M=(1+h)*p+(-1.5-2*h)*y+(-.5+h)*g+1,T=(-1-f)*p+(1.5+f)*y+.5*g,x=f*p-f*y;for(let E=0;E!==o;++E)r[E]=m*a[u+E]+M*a[l+E]+T*a[c+E]+x*a[d+E];return r}}class tm extends Ls{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[l+h]*d+a[c+h]*u;return r}}class nm extends Ls{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class im extends Ls{interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,d=this.outTangents;if(!u||!d){const g=(n-t)/(i-t),y=1-g;for(let p=0;p!==o;++p)r[p]=a[l+p]*y+a[c+p]*g;return r}const h=o*2,f=e-1;for(let g=0;g!==o;++g){const y=a[l+g],p=a[c+g],m=f*h+g*2,M=d[m],T=d[m+1],x=e*h+g*2,E=u[x],b=u[x+1],C=rm(n,t,M,E,i);r[g]=sd(C,y,T,b,p)}return r}}function sd(s,e,t,n,i){const r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function sm(s,e,t,n,i){const r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function rm(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){const o=sd(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;const c=sm(r,e,t,n,i);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}class Nn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=bi(t,this.TimeBufferType),this.values=bi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:bi(e.times,Array),values:bi(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),ya(e.settings)&&(n.settings={inTangents:bi(e.settings.inTangents,Array),outTangents:bi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new nm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new tm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new em(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new im(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case yr:t=this.InterpolantFactoryMethodDiscrete;break;case Mr:t=this.InterpolantFactoryMethodLinear;break;case Ja:t=this.InterpolantFactoryMethodSmooth;break;case Pl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return De("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return yr;case this.InterpolantFactoryMethodLinear:return Mr;case this.InterpolantFactoryMethodSmooth:return Ja;case this.InterpolantFactoryMethodBezier:return Pl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;ya(this.settings)&&(Mu(this.settings.inTangents,e),Mu(this.settings.outTangents,e))}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){$e("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){$e("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&xf(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){$e("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ja,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const d=o*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){const y=t[d+g];if(y!==t[h+g]||y!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const d=o*n,h=a*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,ya(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}}function Mu(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}Nn.prototype.ValueTypeName="";Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=Mr;class Ns extends Nn{constructor(e,t,n){super(e,t,n)}}Ns.prototype.ValueTypeName="bool";Ns.prototype.ValueBufferType=Array;Ns.prototype.DefaultInterpolation=yr;Ns.prototype.InterpolantFactoryMethodLinear=void 0;Ns.prototype.InterpolantFactoryMethodSmooth=void 0;class rd extends Nn{constructor(e,t,n,i){super(e,t,n,i)}}rd.prototype.ValueTypeName="color";class Pr extends Nn{constructor(e,t,n,i){super(e,t,n,i)}}Pr.prototype.ValueTypeName="number";class am extends Ls{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)ci.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Ir extends Nn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new am(this.times,this.values,this.getValueSize(),e)}}Ir.prototype.ValueTypeName="quaternion";Ir.prototype.InterpolantFactoryMethodSmooth=void 0;class Ds extends Nn{constructor(e,t,n){super(e,t,n)}}Ds.prototype.ValueTypeName="string";Ds.prototype.ValueBufferType=Array;Ds.prototype.DefaultInterpolation=yr;Ds.prototype.InterpolantFactoryMethodLinear=void 0;Ds.prototype.InterpolantFactoryMethodSmooth=void 0;class Ua extends Nn{constructor(e,t,n,i){super(e,t,n,i)}}Ua.prototype.ValueTypeName="vector";class om{constructor(e="",t=-1,n=[],i=af){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Sn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(lm(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Nn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=Qp(c);c=yu(c,1,u),l=yu(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Pr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function cm(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Pr;case"vector":case"vector2":case"vector3":case"vector4":return Ua;case"color":return rd;case"quaternion":return Ir;case"bool":case"boolean":return Ns;case"string":return Ds}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function lm(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cm(s.type);if(s.times===void 0){const n=[],i=[];jp(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),ya(s.settings)&&(t.settings={inTangents:bi(s.settings.inTangents,Float32Array),outTangents:bi(s.settings.outTangents,Float32Array)}),t}const si={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Su(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Su(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Su(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class um{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const hm=new um;class Us{constructor(e){this.manager=e!==void 0?e:hm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Us.DEFAULT_MATERIAL_NAME="__DEFAULT";const ei={};class dm extends Error{constructor(e,t){super(e),this.response=t}}class ad extends Us{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=si.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ei[e]!==void 0){ei[e].push({onLoad:t,onProgress:n,onError:i});return}ei[e]=[],ei[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&De("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=ei[e],d=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=h?parseInt(h):0,g=f!==0;let y=0;const p=new ReadableStream({start(m){M();function M(){d.read().then(({done:T,value:x})=>{if(T)m.close();else{y+=x.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:f});for(let b=0,C=u.length;b<C;b++){const v=u[b];v.onProgress&&v.onProgress(E)}m.enqueue(x),M()}},T=>{m.error(T)})}}});return new Response(p)}else throw new dm(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{si.add(`file:${e}`,l);const u=ei[e];delete ei[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=ei[e];if(u===void 0)throw this.manager.itemError(e),l;delete ei[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ps=new WeakMap;class fm extends Us{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=si.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=ps.get(a);d===void 0&&(d=[],ps.set(a,d)),d.push({onLoad:t,onError:i})}return a}const o=br("img");function c(){u(),t&&t(this);const d=ps.get(this)||[];for(let h=0;h<d.length;h++){const f=d[h];f.onLoad&&f.onLoad(this)}ps.delete(this),r.manager.itemEnd(e)}function l(d){u(),i&&i(d),si.remove(`image:${e}`);const h=ps.get(this)||[];for(let f=0;f<h.length;f++){const g=h[f];g.onError&&g.onError(d)}ps.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),si.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class pm extends Us{constructor(e){super(e)}load(e,t,n,i){const r=new Gt,a=new fm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class ka extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class mm extends ka{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const wo=new Je,bu=new R,Eu=new R;class cl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new el,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;bu.setFromMatrixPosition(e.matrixWorld),t.position.copy(bu),Eu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Eu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){wo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(wo,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,c=i?i.x/r.x:0,l=i?i.y/r.y:0;e.coordinateSystem===Sr||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ha=new R,da=new ci,Fn=new R;class od extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ha,da,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,da,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ha,da,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,da,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gi=new R,Tu=new oe,wu=new oe;class sn extends od{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gi.x,gi.y).multiplyScalar(-e/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gi.x,gi.y).multiplyScalar(-e/gi.z)}getViewSize(e,t){return this.getViewBounds(e,Tu,wu),t.subVectors(wu,Tu)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class gm extends cl{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ws*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class _m extends ka{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new gm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class xm extends cl{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}}class cd extends ka{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new xm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class za extends od{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class vm extends cl{constructor(){super(new za(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ld extends ka{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new vm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class mr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ao=new WeakMap;class ym extends Us{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&De("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&De("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=si.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Ao.has(a)===!0?(i&&i(Ao.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return si.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ao.set(c,l),si.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});si.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ms=-90,gs=1;class Mm extends Tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new sn(ms,gs,e,t);i.layers=this.layers,this.add(i);const r=new sn(ms,gs,e,t);r.layers=this.layers,this.add(r);const a=new sn(ms,gs,e,t);a.layers=this.layers,this.add(a);const o=new sn(ms,gs,e,t);o.layers=this.layers,this.add(o);const c=new sn(ms,gs,e,t);c.layers=this.layers,this.add(c);const l=new sn(ms,gs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Sm extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ll="\\[\\]\\.:\\/",bm=new RegExp("["+ll+"]","g"),ul="[^"+ll+"]",Em="[^"+ll.replace("\\.","")+"]",Tm=/((?:WC+[\/:])*)/.source.replace("WC",ul),wm=/(WCOD+)?/.source.replace("WCOD",Em),Am=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ul),Rm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ul),Cm=new RegExp("^"+Tm+wm+Am+Rm+"$"),Pm=["material","materials","bones","map"];class Im{constructor(e,t,n){const i=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class mt{constructor(e,t,n){this.path=t,this.parsedPath=n||mt.parseTrackName(t),this.node=mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new mt.Composite(e,t,n):new mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(bm,"")}static parseTrackName(e){const t=Cm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Pm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){De("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}mt.Composite=Im;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Au=new Je;class Lm{constructor(e,t,n=0,i=1/0){this.ray=new Ps(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Kc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$e("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Au.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Au),this}intersectObject(e,t=!0,n=[]){return Pc(e,this,n,t),n.sort(Ru),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Pc(e[i],this,n,t);return n.sort(Ru),n}}function Ru(s,e){return s.distance-e.distance}function Pc(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)Pc(r[a],e,t,!0)}}class ud{static{ud.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}}function Cu(s,e,t,n){const i=Nm(n);switch(t){case Ih:return s*e;case Vc:return s*e/i.components*i.byteLength;case Hc:return s*e/i.components*i.byteLength;case $i:return s*e*2/i.components*i.byteLength;case Gc:return s*e*2/i.components*i.byteLength;case Lh:return s*e*3/i.components*i.byteLength;case Mn:return s*e*4/i.components*i.byteLength;case Wc:return s*e*4/i.components*i.byteLength;case ga:case _a:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case xa:case va:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ko:case Zo:return Math.max(s,16)*Math.max(e,8)/4;case Yo:case Jo:return Math.max(s,8)*Math.max(e,8)/2;case Qo:case jo:case tc:case nc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ec:case wa:case ic:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case sc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case rc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case ac:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case oc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case cc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case lc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case uc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case hc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case dc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case fc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case pc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case mc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case gc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case _c:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case xc:case vc:case yc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Mc:case Sc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Aa:case bc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nm(s){switch(s){case fn:case Ah:return{byteLength:1,components:1};case xr:case Rh:case Xn:return{byteLength:2,components:1};case kc:case zc:return{byteLength:2,components:4};case Wn:case Bc:case yn:return{byteLength:4,components:1};case Ch:case Ph:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fc}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fc);function hd(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Dm(s){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=s.createBuffer();s.bindBuffer(c,h),s.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(s.bindBuffer(l,o),d.length===0)s.bufferSubData(l,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){const g=d[h],y=d[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,d[h]=y)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){const y=d[f];s.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Om=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$m=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Km=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,e0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,t0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,n0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,i0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,s0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,r0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,a0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,o0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,l0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,h0="gl_FragColor = linearToOutputTexel( gl_FragColor );",d0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,f0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,p0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,m0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,x0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,v0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,y0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,b0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,T0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,w0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,A0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,R0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,C0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,P0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,N0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,D0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,U0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,F0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,B0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,k0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,X0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,q0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,J0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ug=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Eg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Pg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ug=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Gg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,e_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,n_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,i_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,a_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,u_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,h_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,f_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,p_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Um,alphahash_pars_fragment:Fm,alphamap_fragment:Om,alphamap_pars_fragment:Bm,alphatest_fragment:km,alphatest_pars_fragment:zm,aomap_fragment:Vm,aomap_pars_fragment:Hm,batching_pars_vertex:Gm,batching_vertex:Wm,begin_vertex:Xm,beginnormal_vertex:qm,bsdfs:$m,iridescence_fragment:Ym,bumpmap_pars_fragment:Km,clipping_planes_fragment:Jm,clipping_planes_pars_fragment:Zm,clipping_planes_pars_vertex:Qm,clipping_planes_vertex:jm,color_fragment:e0,color_pars_fragment:t0,color_pars_vertex:n0,color_vertex:i0,common:s0,cube_uv_reflection_fragment:r0,defaultnormal_vertex:a0,displacementmap_pars_vertex:o0,displacementmap_vertex:c0,emissivemap_fragment:l0,emissivemap_pars_fragment:u0,colorspace_fragment:h0,colorspace_pars_fragment:d0,envmap_fragment:f0,envmap_common_pars_fragment:p0,envmap_pars_fragment:m0,envmap_pars_vertex:g0,envmap_physical_pars_fragment:A0,envmap_vertex:_0,fog_vertex:x0,fog_pars_vertex:v0,fog_fragment:y0,fog_pars_fragment:M0,gradientmap_pars_fragment:S0,lightmap_pars_fragment:b0,lights_lambert_fragment:E0,lights_lambert_pars_fragment:T0,lights_pars_begin:w0,lights_toon_fragment:R0,lights_toon_pars_fragment:C0,lights_phong_fragment:P0,lights_phong_pars_fragment:I0,lights_physical_fragment:L0,lights_physical_pars_fragment:N0,lights_fragment_begin:D0,lights_fragment_maps:U0,lights_fragment_end:F0,lightprobes_pars_fragment:O0,logdepthbuf_fragment:B0,logdepthbuf_pars_fragment:k0,logdepthbuf_pars_vertex:z0,logdepthbuf_vertex:V0,map_fragment:H0,map_pars_fragment:G0,map_particle_fragment:W0,map_particle_pars_fragment:X0,metalnessmap_fragment:q0,metalnessmap_pars_fragment:$0,morphinstance_vertex:Y0,morphcolor_vertex:K0,morphnormal_vertex:J0,morphtarget_pars_vertex:Z0,morphtarget_vertex:Q0,normal_fragment_begin:j0,normal_fragment_maps:eg,normal_pars_fragment:tg,normal_pars_vertex:ng,normal_vertex:ig,normalmap_pars_fragment:sg,clearcoat_normal_fragment_begin:rg,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:og,iridescence_pars_fragment:cg,opaque_fragment:lg,packing:ug,premultiplied_alpha_fragment:hg,project_vertex:dg,dithering_fragment:fg,dithering_pars_fragment:pg,roughnessmap_fragment:mg,roughnessmap_pars_fragment:gg,shadowmap_pars_fragment:_g,shadowmap_pars_vertex:xg,shadowmap_vertex:vg,shadowmask_pars_fragment:yg,skinbase_vertex:Mg,skinning_pars_vertex:Sg,skinning_vertex:bg,skinnormal_vertex:Eg,specularmap_fragment:Tg,specularmap_pars_fragment:wg,tonemapping_fragment:Ag,tonemapping_pars_fragment:Rg,transmission_fragment:Cg,transmission_pars_fragment:Pg,uv_pars_fragment:Ig,uv_pars_vertex:Lg,uv_vertex:Ng,worldpos_vertex:Dg,background_vert:Ug,background_frag:Fg,backgroundCube_vert:Og,backgroundCube_frag:Bg,cube_vert:kg,cube_frag:zg,depth_vert:Vg,depth_frag:Hg,distance_vert:Gg,distance_frag:Wg,equirect_vert:Xg,equirect_frag:qg,linedashed_vert:$g,linedashed_frag:Yg,meshbasic_vert:Kg,meshbasic_frag:Jg,meshlambert_vert:Zg,meshlambert_frag:Qg,meshmatcap_vert:jg,meshmatcap_frag:e_,meshnormal_vert:t_,meshnormal_frag:n_,meshphong_vert:i_,meshphong_frag:s_,meshphysical_vert:r_,meshphysical_frag:a_,meshtoon_vert:o_,meshtoon_frag:c_,points_vert:l_,points_frag:u_,shadow_vert:h_,shadow_frag:d_,sprite_vert:f_,sprite_frag:p_},ye={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},kn={basic:{uniforms:tn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:tn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:tn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:tn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:tn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new ze(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:tn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:tn([ye.points,ye.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:tn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:tn([ye.common,ye.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:tn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:tn([ye.sprite,ye.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:tn([ye.common,ye.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:tn([ye.lights,ye.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};kn.physical={uniforms:tn([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const fa={r:0,b:0,g:0},m_=new Je,dd=new Ke;dd.set(-1,0,0,0,1,0,0,0,1);function g_(s,e,t,n,i,r){const a=new ze(0);let o=i===!0?0:1,c,l,u=null,d=0,h=null;function f(M){let T=M.isScene===!0?M.background:null;if(T&&T.isTexture){const x=M.backgroundBlurriness>0;T=e.get(T,x)}return T}function g(M){let T=!1;const x=f(M);x===null?p(a,o):x&&x.isColor&&(p(x,1),T=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(M,T){const x=f(T);x&&(x.isCubeTexture||x.mapping===Ba)?(l===void 0&&(l=new Et(new Is(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:Rs(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(m_.makeRotationFromEuler(T.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(dd),l.material.toneMapped=at.getTransfer(x.colorSpace)!==ft,(u!==x||d!==x.version||h!==s.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,h=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Et(new zn(2,2),new Ln({name:"BackgroundMaterial",uniforms:Rs(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=at.getTransfer(x.colorSpace)!==ft,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||h!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,h=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,T){M.getRGB(fa,id(s)),t.buffers.color.setClear(fa.r,fa.g,fa.b,T,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,T=1){a.set(M),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:g,addToRenderList:y,dispose:m}}function __(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=h(null);let r=i,a=!1;function o(I,k,G,F,V){let K=!1;const L=d(I,F,G,k);r!==L&&(r=L,l(r.object)),K=f(I,F,G,V),K&&g(I,F,G,V),V!==null&&e.update(V,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(I,k,G,F),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return s.createVertexArray()}function l(I){return s.bindVertexArray(I)}function u(I){return s.deleteVertexArray(I)}function d(I,k,G,F){const V=F.wireframe===!0;let K=n[k.id];K===void 0&&(K={},n[k.id]=K);const L=I.isInstancedMesh===!0?I.id:0;let Y=K[L];Y===void 0&&(Y={},K[L]=Y);let W=Y[G.id];W===void 0&&(W={},Y[G.id]=W);let Q=W[V];return Q===void 0&&(Q=h(c()),W[V]=Q),Q}function h(I){const k=[],G=[],F=[];for(let V=0;V<t;V++)k[V]=0,G[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:G,attributeDivisors:F,object:I,attributes:{},index:null}}function f(I,k,G,F){const V=r.attributes,K=k.attributes;let L=0;const Y=G.getAttributes();for(const W in Y)if(Y[W].location>=0){const te=V[W];let Ie=K[W];if(Ie===void 0&&(W==="instanceMatrix"&&I.instanceMatrix&&(Ie=I.instanceMatrix),W==="instanceColor"&&I.instanceColor&&(Ie=I.instanceColor)),te===void 0||te.attribute!==Ie||Ie&&te.data!==Ie.data)return!0;L++}return r.attributesNum!==L||r.index!==F}function g(I,k,G,F){const V={},K=k.attributes;let L=0;const Y=G.getAttributes();for(const W in Y)if(Y[W].location>=0){let te=K[W];te===void 0&&(W==="instanceMatrix"&&I.instanceMatrix&&(te=I.instanceMatrix),W==="instanceColor"&&I.instanceColor&&(te=I.instanceColor));const Ie={};Ie.attribute=te,te&&te.data&&(Ie.data=te.data),V[W]=Ie,L++}r.attributes=V,r.attributesNum=L,r.index=F}function y(){const I=r.newAttributes;for(let k=0,G=I.length;k<G;k++)I[k]=0}function p(I){m(I,0)}function m(I,k){const G=r.newAttributes,F=r.enabledAttributes,V=r.attributeDivisors;G[I]=1,F[I]===0&&(s.enableVertexAttribArray(I),F[I]=1),V[I]!==k&&(s.vertexAttribDivisor(I,k),V[I]=k)}function M(){const I=r.newAttributes,k=r.enabledAttributes;for(let G=0,F=k.length;G<F;G++)k[G]!==I[G]&&(s.disableVertexAttribArray(G),k[G]=0)}function T(I,k,G,F,V,K,L){L===!0?s.vertexAttribIPointer(I,k,G,V,K):s.vertexAttribPointer(I,k,G,F,V,K)}function x(I,k,G,F){y();const V=F.attributes,K=G.getAttributes(),L=k.defaultAttributeValues;for(const Y in K){const W=K[Y];if(W.location>=0){let Q=V[Y];if(Q===void 0&&(Y==="instanceMatrix"&&I.instanceMatrix&&(Q=I.instanceMatrix),Y==="instanceColor"&&I.instanceColor&&(Q=I.instanceColor)),Q!==void 0){const te=Q.normalized,Ie=Q.itemSize,Te=e.get(Q);if(Te===void 0)continue;const Ze=Te.buffer,Ye=Te.type,st=Te.bytesPerElement,ee=Ye===s.INT||Ye===s.UNSIGNED_INT||Q.gpuType===Bc;if(Q.isInterleavedBufferAttribute){const ie=Q.data,pe=ie.stride,Ve=Q.offset;if(ie.isInstancedInterleavedBuffer){for(let be=0;be<W.locationSize;be++)m(W.location+be,ie.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let be=0;be<W.locationSize;be++)p(W.location+be);s.bindBuffer(s.ARRAY_BUFFER,Ze);for(let be=0;be<W.locationSize;be++)T(W.location+be,Ie/W.locationSize,Ye,te,pe*st,(Ve+Ie/W.locationSize*be)*st,ee)}else{if(Q.isInstancedBufferAttribute){for(let ie=0;ie<W.locationSize;ie++)m(W.location+ie,Q.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ie=0;ie<W.locationSize;ie++)p(W.location+ie);s.bindBuffer(s.ARRAY_BUFFER,Ze);for(let ie=0;ie<W.locationSize;ie++)T(W.location+ie,Ie/W.locationSize,Ye,te,Ie*st,Ie/W.locationSize*ie*st,ee)}}else if(L!==void 0){const te=L[Y];if(te!==void 0)switch(te.length){case 2:s.vertexAttrib2fv(W.location,te);break;case 3:s.vertexAttrib3fv(W.location,te);break;case 4:s.vertexAttrib4fv(W.location,te);break;default:s.vertexAttrib1fv(W.location,te)}}}}M()}function E(){A();for(const I in n){const k=n[I];for(const G in k){const F=k[G];for(const V in F){const K=F[V];for(const L in K)u(K[L].object),delete K[L];delete F[V]}}delete n[I]}}function b(I){if(n[I.id]===void 0)return;const k=n[I.id];for(const G in k){const F=k[G];for(const V in F){const K=F[V];for(const L in K)u(K[L].object),delete K[L];delete F[V]}}delete n[I.id]}function C(I){for(const k in n){const G=n[k];for(const F in G){const V=G[F];if(V[I.id]===void 0)continue;const K=V[I.id];for(const L in K)u(K[L].object),delete K[L];delete V[I.id]}}}function v(I){for(const k in n){const G=n[k],F=I.isInstancedMesh===!0?I.id:0,V=G[F];if(V!==void 0){for(const K in V){const L=V[K];for(const Y in L)u(L[Y].object),delete L[Y];delete V[K]}delete G[F],Object.keys(G).length===0&&delete n[k]}}}function A(){P(),a=!0,r!==i&&(r=i,l(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:p,disableUnusedAttributes:M}}function x_(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(s.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];t.update(h,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function v_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==Mn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==fn&&C!==yn&&!v&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(De("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=s.getParameter(s.MAX_SAMPLES),b=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:T,maxFragmentUniforms:x,maxSamples:E,samples:b}}function y_(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Si,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,y=d.clipIntersection,p=d.clipShadows,m=s.get(d);if(!i||g===null||g.length===0||r&&!p)r?u(null):l();else{const M=r?0:n,T=M*4;let x=m.clippingState||null;c.value=x,x=u(g,h,T,f);for(let E=0;E!==T;++E)x[E]=t[E];m.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){const y=d!==null?d.length:0;let p=null;if(y!==0){if(p=c.value,g!==!0||p===null){const m=f+y*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let T=0,x=f;T!==y;++T,x+=4)a.copy(d[T]).applyMatrix4(M,o),a.normal.toArray(p,x),p[x+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}const ys=4,M_=6,S_=20,b_=256,Js=new za,Pu=new ze;let Ro=null,Co=0,Po=0,Io=!1;const E_=new R,Li=new R;class Iu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=E_}=r;Ro=this._renderer.getRenderTarget(),Co=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Du(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ro,Co,Po),this._renderer.xr.enabled=Io,e.scissorTest=!1,_s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ro=this._renderer.getRenderTarget(),Co=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:Xn,format:Mn,colorSpace:mn,depthBuffer:!1},i=Lu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lu(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=T_(r)),this._blurMaterial=A_(r,e,t),this._ggxMaterial=w_(r,e,t)}return i}_compileMaterial(e){const t=new Et(new At,e);this._renderer.compile(t,Js)}_sceneToCubeUV(e,t,n,i,r){const c=new sn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Pu),d.toneMapping=Gn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Et(new Is,new nn({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,p=y.material;let m=!1;const M=e.background;M?M.isColor&&(p.color.copy(M),e.background=null,m=!0):(p.color.copy(Pu),m=!0);for(let T=0;T<6;T++){const x=T%3;x===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):x===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));const E=this._cubeSize;_s(i,x*E,T>2?E:0,E,E),d.setRenderTarget(i),m&&d.render(y,c),d.render(e,c)}d.toneMapping=f,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Xi||e.mapping===Ts;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Du()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nu());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;_s(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Js)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,f=d*h,{_lodMax:g}=this,y=this._sizeLods[n],p=3*y*(n>g-ys?n-g+ys:0),m=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,_s(r,p,m,3*y,2*y),i.setRenderTarget(r),i.render(o,Js),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,_s(e,p,m,3*y,2*y),i.setRenderTarget(e),i.render(o,Js)}_blur(e,t,n,i){const r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,i,r){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;const u=this._sizeLods[i],d=3*u*(i>this._lodMax-ys?i-this._lodMax+ys:0),h=4*(this._cubeSize-u);_s(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(c,Js)}}function T_(s){const e=[],t=[];let n=s;const i=s-ys+1+M_;for(let r=0;r<i;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,f=3,g=new Float32Array(f*h*d),y=new Float32Array(f*h*d);for(let m=0;m<d;m++){const M=m%3*2/3-1,T=m>2?0:-1,x=[M,T,0,M+2/3,T,0,M+2/3,T+1,0,M,T,0,M+2/3,T+1,0,M,T+1,0];g.set(x,f*h*m);for(let E=0;E<h;E++){const b=u[E*2]*2-1,C=u[E*2+1]*2-1;m===0?Li.set(1,C,b):m===1?Li.set(-b,1,-C):m===2?Li.set(-b,C,1):m===3?Li.set(-1,C,-b):m===4?Li.set(-b,-1,C):Li.set(b,C,-1),Li.toArray(y,(m*h+E)*f)}}const p=new At;p.setAttribute("position",new Qt(g,f)),p.setAttribute("outputDirection",new Qt(y,f)),t.push(new Et(p,null)),n>ys&&n--}return{lodMeshes:t,sizeLods:e}}function Lu(s,e,t){const n=new In(s,e,t);return n.texture.mapping=Ba,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _s(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function w_(s,e,t){return new Ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:b_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Va(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function A_(s,e,t){return new Ln({name:"SphericalGaussianBlur",defines:{SAMPLES:S_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Va(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Nu(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Du(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Va(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class fd extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Xh(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Is(5,5,5),r=new Ln({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:rn,blending:ri});r.uniforms.tEquirect.value=t;const a=new Et(i,r),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=Ht),new Mm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}function R_(s){let e=new WeakMap,t=new WeakMap,n=null;function i(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){const f=h.mapping;if(f===Ya||f===Ka)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const y=new fd(g.height);return y.fromEquirectangularTexture(s,h),e.set(h,y),h.addEventListener("dispose",l),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const f=h.mapping,g=f===Ya||f===Ka,y=f===Xi||f===Ts;if(g||y){let p=t.get(h);const m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new Iu(s)),p=g?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{const M=h.image;return g&&M&&M.height>0||y&&M&&c(M)?(n===null&&(n=new Iu(s)),p=g?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,f){return f===Ya?h.mapping=Xi:f===Ka&&(h.mapping=Ts),h}function c(h){let f=0;const g=6;for(let y=0;y<g;y++)h[y]!==void 0&&f++;return f===g}function l(h){const f=h.target;f.removeEventListener("dispose",l);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function C_(s){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ss("WebGLRenderer: "+n+" extension not supported."),i}}}function P_(s,e,t,n){const i={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete i[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return i[h.id]===!0||(h.addEventListener("dispose",a),i[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const f in h)e.update(h[f],s.ARRAY_BUFFER)}function l(d){const h=[],f=d.index,g=d.attributes.position;let y=0;if(g===void 0)return;if(f!==null){const M=f.array;y=f.version;for(let T=0,x=M.length;T<x;T+=3){const E=M[T+0],b=M[T+1],C=M[T+2];h.push(E,b,b,C,C,E)}}else{const M=g.array;y=g.version;for(let T=0,x=M.length/3-1;T<x;T+=3){const E=T+0,b=T+1,C=T+2;h.push(E,b,b,C,C,E)}}const p=new(g.count>=65535?kh:Bh)(h,1);p.version=y;const m=r.get(d);m&&e.remove(m),r.set(d,p)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function I_(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,h){s.drawElements(n,h,r,d*a),t.update(h,n,1)}function l(d,h,f){f!==0&&(s.drawElementsInstanced(n,h,r,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let y=0;for(let p=0;p<f;p++)y+=h[p];t.update(y,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function L_(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function N_(s,e,t){const n=new WeakMap,i=new vt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let A=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let T=0;f===!0&&(T=1),g===!0&&(T=2),y===!0&&(T=3);let x=o.attributes.position.count*T,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const b=new Float32Array(x*E*4*d),C=new Fh(b,x,E,d);C.type=yn,C.needsUpdate=!0;const v=T*4;for(let P=0;P<d;P++){const I=p[P],k=m[P],G=M[P],F=x*E*4*P;for(let V=0;V<I.count;V++){const K=V*v;f===!0&&(i.fromBufferAttribute(I,V),b[F+K+0]=i.x,b[F+K+1]=i.y,b[F+K+2]=i.z,b[F+K+3]=0),g===!0&&(i.fromBufferAttribute(k,V),b[F+K+4]=i.x,b[F+K+5]=i.y,b[F+K+6]=i.z,b[F+K+7]=0),y===!0&&(i.fromBufferAttribute(G,V),b[F+K+8]=i.x,b[F+K+9]=i.y,b[F+K+10]=i.z,b[F+K+11]=G.itemSize===4?i.w:1)}}h={count:d,texture:C,size:new oe(x,E)},n.set(o,h),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",h.size)}return{update:r}}function D_(s,e,t,n,i){let r=new WeakMap;function a(l){const u=i.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const U_={[vh]:"LINEAR_TONE_MAPPING",[yh]:"REINHARD_TONE_MAPPING",[Mh]:"CINEON_TONE_MAPPING",[Oc]:"ACES_FILMIC_TONE_MAPPING",[bh]:"AGX_TONE_MAPPING",[Eh]:"NEUTRAL_TONE_MAPPING",[Sh]:"CUSTOM_TONE_MAPPING"};function F_(s,e,t,n,i,r){const a=new In(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new At;l.setAttribute("position",new nt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new nt([0,2,0,0,2,0],2));const u=new Kp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Et(l,u),h=new za(-1,1,1,-1,0,1);let f=null,g=null,y=!1,p,m=null,M=[],T=!1;this.setSize=function(x,E){a.setSize(x,E),o!==null&&o.setSize(x,E),c!==null&&c.setSize(x,E);for(let b=0;b<M.length;b++){const C=M[b];C.setSize&&C.setSize(x,E)}},this.setEffects=function(x){M=x,T=M.length>0&&M[0].isRenderPass===!0;const E=a.width,b=a.height;M.length>0&&o===null&&(o=new In(E,b,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),c=new In(E,b,{type:Xn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<M.length;C++){const v=M[C];v.setSize&&v.setSize(E,b)}},this.begin=function(x,E){if(y||x.toneMapping===Gn&&M.length===0)return!1;if(m=E,E!==null){const b=E.width,C=E.height;(a.width!==b||a.height!==C)&&this.setSize(b,C)}return T===!1&&x.setRenderTarget(a),p=x.toneMapping,x.toneMapping=Gn,!0},this.hasRenderPass=function(){return T},this.end=function(x,E){x.toneMapping=p,y=!0;let b=a,C=o;for(let v=0;v<M.length;v++){const A=M[v];A.enabled!==!1&&(A.render(x,C,b,E),A.needsSwap!==!1&&(b=C,C=C===o?c:o))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,u.defines={},at.getTransfer(f)===ft&&(u.defines.SRGB_TRANSFER="");const v=U_[g];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(m),x.render(d,h),m=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const pd=new Gt,Ic=new Tr(1,1),md=new Fh,gd=new Gf,_d=new Xh,Uu=[],Fu=[],Ou=new Float32Array(16),Bu=new Float32Array(9),ku=new Float32Array(4);function Fs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Uu[i];if(r===void 0&&(r=new Float32Array(i),Uu[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Wt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Xt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ha(s,e){let t=Fu[e];t===void 0&&(t=new Int32Array(e),Fu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function O_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function B_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2fv(this.addr,e),Xt(t,e)}}function k_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;s.uniform3fv(this.addr,e),Xt(t,e)}}function z_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4fv(this.addr,e),Xt(t,e)}}function V_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;ku.set(n),s.uniformMatrix2fv(this.addr,!1,ku),Xt(t,n)}}function H_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Bu.set(n),s.uniformMatrix3fv(this.addr,!1,Bu),Xt(t,n)}}function G_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Ou.set(n),s.uniformMatrix4fv(this.addr,!1,Ou),Xt(t,n)}}function W_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function X_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2iv(this.addr,e),Xt(t,e)}}function q_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3iv(this.addr,e),Xt(t,e)}}function $_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4iv(this.addr,e),Xt(t,e)}}function Y_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function K_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2uiv(this.addr,e),Xt(t,e)}}function J_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3uiv(this.addr,e),Xt(t,e)}}function Z_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4uiv(this.addr,e),Xt(t,e)}}function Q_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ic.compareFunction=t.isReversedDepthBuffer()?qc:Xc,r=Ic):r=pd,t.setTexture2D(e||r,i)}function j_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||gd,i)}function ex(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_d,i)}function tx(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||md,i)}function nx(s){switch(s){case 5126:return O_;case 35664:return B_;case 35665:return k_;case 35666:return z_;case 35674:return V_;case 35675:return H_;case 35676:return G_;case 5124:case 35670:return W_;case 35667:case 35671:return X_;case 35668:case 35672:return q_;case 35669:case 35673:return $_;case 5125:return Y_;case 36294:return K_;case 36295:return J_;case 36296:return Z_;case 35678:case 36198:case 36298:case 36306:case 35682:return Q_;case 35679:case 36299:case 36307:return j_;case 35680:case 36300:case 36308:case 36293:return ex;case 36289:case 36303:case 36311:case 36292:return tx}}function ix(s,e){s.uniform1fv(this.addr,e)}function sx(s,e){const t=Fs(e,this.size,2);s.uniform2fv(this.addr,t)}function rx(s,e){const t=Fs(e,this.size,3);s.uniform3fv(this.addr,t)}function ax(s,e){const t=Fs(e,this.size,4);s.uniform4fv(this.addr,t)}function ox(s,e){const t=Fs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function cx(s,e){const t=Fs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function lx(s,e){const t=Fs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ux(s,e){s.uniform1iv(this.addr,e)}function hx(s,e){s.uniform2iv(this.addr,e)}function dx(s,e){s.uniform3iv(this.addr,e)}function fx(s,e){s.uniform4iv(this.addr,e)}function px(s,e){s.uniform1uiv(this.addr,e)}function mx(s,e){s.uniform2uiv(this.addr,e)}function gx(s,e){s.uniform3uiv(this.addr,e)}function _x(s,e){s.uniform4uiv(this.addr,e)}function xx(s,e,t){const n=this.cache,i=e.length,r=Ha(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Ic:a=pd;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function vx(s,e,t){const n=this.cache,i=e.length,r=Ha(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||gd,r[a])}function yx(s,e,t){const n=this.cache,i=e.length,r=Ha(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||_d,r[a])}function Mx(s,e,t){const n=this.cache,i=e.length,r=Ha(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||md,r[a])}function Sx(s){switch(s){case 5126:return ix;case 35664:return sx;case 35665:return rx;case 35666:return ax;case 35674:return ox;case 35675:return cx;case 35676:return lx;case 5124:case 35670:return ux;case 35667:case 35671:return hx;case 35668:case 35672:return dx;case 35669:case 35673:return fx;case 5125:return px;case 36294:return mx;case 36295:return gx;case 36296:return _x;case 35678:case 36198:case 36298:case 36306:case 35682:return xx;case 35679:case 36299:case 36307:return vx;case 35680:case 36300:case 36308:case 36293:return yx;case 36289:case 36303:case 36311:case 36292:return Mx}}class bx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nx(t.type)}}class Ex{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sx(t.type)}}class Tx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const Lo=/(\w+)(\])?(\[|\.)?/g;function zu(s,e){s.seq.push(e),s.map[e.id]=e}function wx(s,e,t){const n=s.name,i=n.length;for(Lo.lastIndex=0;;){const r=Lo.exec(n),a=Lo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){zu(t,l===void 0?new bx(o,s,e):new Ex(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new Tx(o),zu(t,d)),t=d}}}class Ma{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);wx(o,c,this)}const i=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Vu(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const Ax=37297;let Rx=0;function Cx(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Hu=new Ke;function Px(s){at._getMatrix(Hu,at.workingColorSpace,s);const e=`mat3( ${Hu.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(s)){case Ra:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Gu(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Cx(s.getShaderSource(e),o)}else return r}function Ix(s,e){const t=Px(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Lx={[vh]:"Linear",[yh]:"Reinhard",[Mh]:"Cineon",[Oc]:"ACESFilmic",[bh]:"AgX",[Eh]:"Neutral",[Sh]:"Custom"};function Nx(s,e){const t=Lx[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const pa=new R;function Dx(){at.getLuminanceCoefficients(pa);const s=pa.x.toFixed(4),e=pa.y.toFixed(4),t=pa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ux(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function Fx(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ox(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function ar(s){return s!==""}function Wu(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xu(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Bx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(s){return s.replace(Bx,zx)}const kx=new Map;function zx(s,e){let t=et[e];if(t===void 0){const n=kx.get(e);if(n!==void 0)t=et[n],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Lc(t)}const Vx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qu(s){return s.replace(Vx,Hx)}function Hx(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function $u(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Gx={[or]:"SHADOWMAP_TYPE_PCF",[ir]:"SHADOWMAP_TYPE_VSM"};function Wx(s){return Gx[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Xx={[Xi]:"ENVMAP_TYPE_CUBE",[Ts]:"ENVMAP_TYPE_CUBE",[Ba]:"ENVMAP_TYPE_CUBE_UV"};function qx(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Xx[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const $x={[Ts]:"ENVMAP_MODE_REFRACTION"};function Yx(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":$x[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Kx={[xh]:"ENVMAP_BLENDING_MULTIPLY",[nf]:"ENVMAP_BLENDING_MIX",[sf]:"ENVMAP_BLENDING_ADD"};function Jx(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Kx[s.combine]||"ENVMAP_BLENDING_NONE"}function Zx(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Qx(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Wx(t),l=qx(t),u=Yx(t),d=Jx(t),h=Zx(t),f=Ux(t),g=Fx(r),y=i.createProgram();let p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ar).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ar).join(`
`),m.length>0&&(m+=`
`)):(p=[$u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),m=[$u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?et.tonemapping_pars_fragment:"",t.toneMapping!==Gn?Nx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Ix("linearToOutputTexel",t.outputColorSpace),Dx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ar).join(`
`)),a=Lc(a),a=Wu(a,t),a=Xu(a,t),o=Lc(o),o=Wu(o,t),o=Xu(o,t),a=qu(a),o=qu(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Dl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Dl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const T=M+p+a,x=M+m+o,E=Vu(i,i.VERTEX_SHADER,T),b=Vu(i,i.FRAGMENT_SHADER,x);i.attachShader(y,E),i.attachShader(y,b),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function C(I){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(y)||"",G=i.getShaderInfoLog(E)||"",F=i.getShaderInfoLog(b)||"",V=k.trim(),K=G.trim(),L=F.trim();let Y=!0,W=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,E,b);else{const Q=Gu(i,E,"vertex"),te=Gu(i,b,"fragment");$e("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+Q+`
`+te)}else V!==""?De("WebGLProgram: Program Info Log:",V):(K===""||L==="")&&(W=!1);W&&(I.diagnostics={runnable:Y,programLog:V,vertexShader:{log:K,prefix:p},fragmentShader:{log:L,prefix:m}})}i.deleteShader(E),i.deleteShader(b),v=new Ma(i,y),A=Ox(i,y)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(y,Ax)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rx++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=E,this.fragmentShader=b,this}let jx=0;class ev{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new tv(e),t.set(e,n)),n}}class tv{constructor(e){this.id=jx++,this.code=e,this.usedTimes=0}}function nv(s){return s===$i||s===wa||s===Aa}function iv(s,e,t,n,i,r){const a=new Kc,o=new ev,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function y(v,A,P,I,k,G){const F=I.fog,V=k.geometry,K=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,L=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Y=e.get(v.envMap||K,L),W=Y&&Y.mapping===Ba?Y.image.height:null,Q=f[v.type];v.precision!==null&&(h=n.getMaxPrecision(v.precision),h!==v.precision&&De("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const te=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ie=te!==void 0?te.length:0;let Te=0;V.morphAttributes.position!==void 0&&(Te=1),V.morphAttributes.normal!==void 0&&(Te=2),V.morphAttributes.color!==void 0&&(Te=3);let Ze,Ye,st,ee;if(Q){const St=kn[Q];Ze=St.vertexShader,Ye=St.fragmentShader}else{Ze=v.vertexShader,Ye=v.fragmentShader;const St=o.getVertexShaderStage(v),ht=o.getFragmentShaderStage(v);o.update(v,St,ht),st=St.id,ee=ht.id}const ie=s.getRenderTarget(),pe=s.state.buffers.depth.getReversed(),Ve=k.isInstancedMesh===!0,be=k.isBatchedMesh===!0,He=!!v.map,ot=!!v.matcap,ne=!!Y,le=!!v.aoMap,ue=!!v.lightMap,he=!!v.bumpMap&&v.wireframe===!1,fe=!!v.normalMap,Be=!!v.displacementMap,Ue=!!v.emissiveMap,Ge=!!v.metalnessMap,qe=!!v.roughnessMap,N=v.anisotropy>0,U=v.clearcoat>0,H=v.dispersion>0,w=v.retroreflectivity>0,_=v.iridescence>0,D=v.sheen>0,z=v.transmission>0,$=N&&!!v.anisotropyMap,Z=U&&!!v.clearcoatMap,ce=U&&!!v.clearcoatNormalMap,j=U&&!!v.clearcoatRoughnessMap,re=_&&!!v.iridescenceMap,me=_&&!!v.iridescenceThicknessMap,Fe=D&&!!v.sheenColorMap,ve=D&&!!v.sheenRoughnessMap,ge=!!v.specularMap,Oe=!!v.specularColorMap,We=!!v.specularIntensityMap,Qe=z&&!!v.transmissionMap,B=z&&!!v.thicknessMap,_e=!!v.gradientMap,se=!!v.alphaMap,xe=v.alphaTest>0,Ee=!!v.alphaHash,ae=!!v.extensions;let ke=Gn;v.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ke=s.toneMapping);const Le={shaderID:Q,shaderType:v.type,shaderName:v.name,vertexShader:Ze,fragmentShader:Ye,defines:v.defines,customVertexShaderID:st,customFragmentShaderID:ee,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:be,batchingColor:be&&k._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&k.instanceColor!==null,instancingMorph:Ve&&k.morphTexture!==null,outputColorSpace:ie===null?s.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:He,matcap:ot,envMap:ne,envMapMode:ne&&Y.mapping,envMapCubeUVHeight:W,aoMap:le,lightMap:ue,bumpMap:he,normalMap:fe,displacementMap:Be,emissiveMap:Ue,normalMapObjectSpace:fe&&v.normalMapType===lf,normalMapTangentSpace:fe&&v.normalMapType===Tc,packedNormalMap:fe&&v.normalMapType===Tc&&nv(v.normalMap.format),metalnessMap:Ge,roughnessMap:qe,anisotropy:N,anisotropyMap:$,clearcoat:U,clearcoatMap:Z,clearcoatNormalMap:ce,clearcoatRoughnessMap:j,dispersion:H,retroreflection:w,iridescence:_,iridescenceMap:re,iridescenceThicknessMap:me,sheen:D,sheenColorMap:Fe,sheenRoughnessMap:ve,specularMap:ge,specularColorMap:Oe,specularIntensityMap:We,transmission:z,transmissionMap:Qe,thicknessMap:B,gradientMap:_e,opaque:v.transparent===!1&&v.blending===cr&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:xe,alphaHash:Ee,combine:v.combine,mapUv:He&&g(v.map.channel),aoMapUv:le&&g(v.aoMap.channel),lightMapUv:ue&&g(v.lightMap.channel),bumpMapUv:he&&g(v.bumpMap.channel),normalMapUv:fe&&g(v.normalMap.channel),displacementMapUv:Be&&g(v.displacementMap.channel),emissiveMapUv:Ue&&g(v.emissiveMap.channel),metalnessMapUv:Ge&&g(v.metalnessMap.channel),roughnessMapUv:qe&&g(v.roughnessMap.channel),anisotropyMapUv:$&&g(v.anisotropyMap.channel),clearcoatMapUv:Z&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ce&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:me&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&g(v.sheenRoughnessMap.channel),specularMapUv:ge&&g(v.specularMap.channel),specularColorMapUv:Oe&&g(v.specularColorMap.channel),specularIntensityMapUv:We&&g(v.specularIntensityMap.channel),transmissionMapUv:Qe&&g(v.transmissionMap.channel),thicknessMapUv:B&&g(v.thicknessMap.channel),alphaMapUv:se&&g(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(fe||N),vertexNormals:!!V.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!V.attributes.uv&&(He||se),fog:!!F,useFog:v.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&fe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Te,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:ke,decodeVideoTexture:He&&v.map.isVideoTexture===!0&&at.getTransfer(v.map.colorSpace)===ft,decodeVideoTextureEmissive:Ue&&v.emissiveMap.isVideoTexture===!0&&at.getTransfer(v.emissiveMap.colorSpace)===ft,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===$t,flipSided:v.side===rn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ae&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&v.extensions.multiDraw===!0||be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function p(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)A.push(P),A.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(m(A,v),M(A,v),A.push(s.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function m(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numSunLights),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numSunLightShadows),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function M(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function T(v){const A=f[v.type];let P;if(A){const I=kn[A];P=qp.clone(I.uniforms)}else P=v.uniforms;return P}function x(v,A){let P=u.get(A);return P!==void 0?++P.usedTimes:(P=new Qx(s,A,v,i),l.push(P),u.set(A,P)),P}function E(v){if(--v.usedTimes===0){const A=l.indexOf(v);l[A]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function C(){o.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:T,acquireProgram:x,releaseProgram:E,releaseShaderCache:b,programs:l,dispose:C}}function sv(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function rv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Yu(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ku(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,g,y,p,m){let M=s[e];return M===void 0?(M={id:h.id,object:h,geometry:f,material:g,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:p,group:m},s[e]=M):(M.id=h.id,M.object=h,M.geometry=f,M.material=g,M.materialVariant=a(h),M.groupOrder=y,M.renderOrder=h.renderOrder,M.z=p,M.group=m),e++,M}function c(h,f,g,y,p,m,M){M.reversedDepth===!0&&(p=-p);const T=o(h,f,g,y,p,m);g.transmission>0?n.push(T):g.transparent===!0?i.push(T):t.push(T)}function l(h,f,g,y,p,m){const M=o(h,f,g,y,p,m);g.transmission>0?n.unshift(M):g.transparent===!0?i.unshift(M):t.unshift(M)}function u(h,f){t.length>1&&t.sort(h||rv),n.length>1&&n.sort(f||Yu),i.length>1&&i.sort(f||Yu)}function d(){for(let h=e,f=s.length;h<f;h++){const g=s[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:d,sort:u}}function av(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Ku,s.set(n,[a])):i>=r.length?(a=new Ku,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function ov(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new R,color:new ze};break;case"SpotLight":t={position:new R,direction:new R,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function cv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let lv=0;function uv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function hv(s){const e=new ov,t=cv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const i=new R,r=new Je,a=new Je;function o(l){let u=0,d=0,h=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,g=0,y=0,p=0,m=0,M=0,T=0,x=0,E=0,b=0,C=0,v=0,A=0,P=0;l.sort(uv);for(let k=0,G=l.length;k<G;k++){const F=l[k],V=F.color,K=F.intensity,L=F.distance;let Y=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===$i?Y=F.shadow.map.texture:Y=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)u+=V.r*K,d+=V.g*K,h+=V.b*K;else if(F.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(F.sh.coefficients[W],K);P++}else if(F.isSunLight){const W=e.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const Q=F.shadow,te=t.get(F);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=te,n.sunShadowMap[g]=Y;const Ie=Q.getViewportCount();for(let Te=0;Te<Ie;Te++)n.sunShadowMatrix[y+Te]=Q.getMatrix(Te),n.sunShadowCascade[y+Te]=Q._cascadeData[Te];y+=Ie,g++}n.sun[f]=W,f++}else if(F.isDirectionalLight){const W=e.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const Q=F.shadow,te=t.get(F);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize=Q.mapSize,n.directionalShadow[p]=te,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=F.shadow.matrix,E++}n.directional[p]=W,p++}else if(F.isSpotLight){const W=e.get(F);W.position.setFromMatrixPosition(F.matrixWorld),W.color.copy(V).multiplyScalar(K),W.distance=L,W.coneCos=Math.cos(F.angle),W.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),W.decay=F.decay,n.spot[M]=W;const Q=F.shadow;if(F.map&&(n.spotLightMap[v]=F.map,v++,Q.updateMatrices(F),F.castShadow&&A++),n.spotLightMatrix[M]=Q.matrix,F.castShadow){const te=t.get(F);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize=Q.mapSize,n.spotShadow[M]=te,n.spotShadowMap[M]=Y,C++}M++}else if(F.isRectAreaLight){const W=e.get(F);W.color.copy(V).multiplyScalar(K),W.halfWidth.set(F.width*.5,0,0),W.halfHeight.set(0,F.height*.5,0),n.rectArea[T]=W,T++}else if(F.isPointLight){const W=e.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity),W.distance=F.distance,W.decay=F.decay,F.castShadow){const Q=F.shadow,te=t.get(F);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize=Q.mapSize,te.shadowCameraNear=Q.camera.near,te.shadowCameraFar=Q.camera.far,n.pointShadow[m]=te,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=F.shadow.matrix,b++}n.point[m]=W,m++}else if(F.isHemisphereLight){const W=e.get(F);W.skyColor.copy(F.color).multiplyScalar(K),W.groundColor.copy(F.groundColor).multiplyScalar(K),n.hemi[x]=W,x++}}T>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const I=n.hash;(I.sunLength!==f||I.directionalLength!==p||I.pointLength!==m||I.spotLength!==M||I.rectAreaLength!==T||I.hemiLength!==x||I.numSunShadows!==g||I.numDirectionalShadows!==E||I.numPointShadows!==b||I.numSpotShadows!==C||I.numSpotMaps!==v||I.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=p,n.spot.length=M,n.rectArea.length=T,n.point.length=m,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+v-A,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,I.sunLength=f,I.directionalLength=p,I.pointLength=m,I.spotLength=M,I.rectAreaLength=T,I.hemiLength=x,I.numSunShadows=g,I.numDirectionalShadows=E,I.numPointShadows=b,I.numSpotShadows=C,I.numSpotMaps=v,I.numLightProbes=P,n.version=lv++)}function c(l,u){let d=0,h=0,f=0,g=0,y=0,p=0;const m=u.matrixWorldInverse;for(let M=0,T=l.length;M<T;M++){const x=l[M];if(x.isSunLight){const E=n.sun[d];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(m),d++}else if(x.isDirectionalLight){const E=n.directional[h];E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(m),h++}else if(x.isSpotLight){const E=n.spot[g];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(m),g++}else if(x.isRectAreaLight){const E=n.rectArea[y];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(x.width*.5,0,0),E.halfHeight.set(0,x.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(x.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const E=n.hemi[p];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(m),p++}}}return{setup:o,setupView:c,state:n}}function Ju(s){const e=new hv(s),t=[],n=[],i=[];function r(h){d.camera=h,t.length=0,n.length=0,i.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function c(h){i.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function dv(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Ju(s),e.set(i,[o])):r>=a.length?(o=new Ju(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const fv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mv=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],gv=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Zu=new Je,Zs=new R,No=new R;function _v(s,e,t){let n=new el;const i=new oe,r=new oe,a=new vt,o=new Jp,c=new Zp,l={},u=t.maxTextureSize,d={[Ti]:rn,[rn]:Ti,[$t]:$t},h=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:fv,fragmentShader:pv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new At;g.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Et(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=or;let m=this.type;this.render=function(b,C,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===Od&&(De("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=or);const A=s.getRenderTarget(),P=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),k=s.state;k.setBlending(ri),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const G=m!==this.type;G&&C.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(V=>V.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,V=b.length;F<V;F++){const K=b[F],L=K.shadow;if(L===void 0){De("WebGLShadowMap:",K,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;i.copy(L.mapSize);const Y=L.getFrameExtents();i.multiply(Y),r.copy(L.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/Y.x),i.x=r.x*Y.x,L.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/Y.y),i.y=r.y*Y.y,L.mapSize.y=r.y));const W=s.state.buffers.depth.getReversed();if(L.camera._reversedDepth=W,L.map===null||G===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===ir){if(K.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new In(i.x,i.y,{format:$i,type:Xn,minFilter:Ht,magFilter:Ht,generateMipmaps:!1}),L.map.texture.name=K.name+".shadowMap",L.map.depthTexture=new Tr(i.x,i.y,yn),L.map.depthTexture.name=K.name+".shadowMapDepth",L.map.depthTexture.format=oi,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Vt,L.map.depthTexture.magFilter=Vt}else K.isPointLight?(L.map=new fd(i.x),L.map.depthTexture=new dp(i.x,Wn)):(L.map=new In(i.x,i.y),L.map.depthTexture=new Tr(i.x,i.y,Wn)),L.map.depthTexture.name=K.name+".shadowMap",L.map.depthTexture.format=oi,this.type===or?(L.map.depthTexture.compareFunction=W?qc:Xc,L.map.depthTexture.minFilter=Ht,L.map.depthTexture.magFilter=Ht):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Vt,L.map.depthTexture.magFilter=Vt);L.camera.updateProjectionMatrix()}L.map.isWebGLCubeRenderTarget!==!0&&(L.map.width!==i.x||L.map.height!==i.y)&&L.map.setSize(i.x,i.y);const Q=L.map.isWebGLCubeRenderTarget?6:L.getViewportCount();K.isPointLight!==!0&&L.updateMatrices(K,v);for(let te=0;te<Q;te++){const Ie=L.getCamera(te);if(K.isPointLight){const Te=L.camera,Ze=L.matrix,Ye=K.distance||Te.far;Ye!==Te.far&&(Te.far=Ye,Te.updateProjectionMatrix()),Zs.setFromMatrixPosition(K.matrixWorld),Te.position.copy(Zs),No.copy(Te.position),No.add(mv[te]),Te.up.copy(gv[te]),Te.lookAt(No),Te.updateMatrixWorld(),Ze.makeTranslation(-Zs.x,-Zs.y,-Zs.z),Zu.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),L._frustum.setFromProjectionMatrix(Zu,Te.coordinateSystem,Te.reversedDepth)}if(L.map.isWebGLCubeRenderTarget)s.setRenderTarget(L.map,te),s.clear();else{te===0&&(s.setRenderTarget(L.map),s.clear());const Te=L.getViewport(te);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),k.viewport(a)}n=L.getFrustum(te),x(C,v,Ie,K,this.type)}L.isPointLightShadow!==!0&&this.type===ir&&M(L,v),L.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(A,P,I)};function M(b,C){const v=e.update(y);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new In(i.x,i.y,{format:$i,type:Xn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(C,null,v,h,y,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(C,null,v,f,y,null)}function T(b,C,v,A){let P=null;const I=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)P=I;else if(P=v.isPointLight===!0?c:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=P.uuid,G=C.uuid;let F=l[k];F===void 0&&(F={},l[k]=F);let V=F[G];V===void 0&&(V=P.clone(),F[G]=V,C.addEventListener("dispose",E)),P=V}if(P.visible=C.visible,P.wireframe=C.wireframe,A===ir?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:d[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const k=s.properties.get(P);k.light=v}return P}function x(b,C,v,A,P){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===ir)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const G=e.update(b),F=b.material;if(Array.isArray(F)){const V=G.groups;for(let K=0,L=V.length;K<L;K++){const Y=V[K],W=F[Y.materialIndex];if(W&&W.visible){const Q=T(b,W,A,P);b.onBeforeShadow(s,b,C,v,G,Q,Y),s.renderBufferDirect(v,null,G,Q,b,Y),b.onAfterShadow(s,b,C,v,G,Q,Y)}}}else if(F.visible){const V=T(b,F,A,P);b.onBeforeShadow(s,b,C,v,G,V,null),s.renderBufferDirect(v,null,G,V,b,null),b.onAfterShadow(s,b,C,v,G,V,null)}}const k=b.children;for(let G=0,F=k.length;G<F;G++)x(k[G],C,v,A,P)}function E(b){b.target.removeEventListener("dispose",E);for(const v in l){const A=l[v],P=b.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function xv(s,e){function t(){let B=!1;const _e=new vt;let se=null;const xe=new vt(0,0,0,0);return{setMask:function(Ee){se!==Ee&&!B&&(s.colorMask(Ee,Ee,Ee,Ee),se=Ee)},setLocked:function(Ee){B=Ee},setClear:function(Ee,ae,ke,Le,St){St===!0&&(Ee*=Le,ae*=Le,ke*=Le),_e.set(Ee,ae,ke,Le),xe.equals(_e)===!1&&(s.clearColor(Ee,ae,ke,Le),xe.copy(_e))},reset:function(){B=!1,se=null,xe.set(-1,0,0,0)}}}function n(){let B=!1,_e=!1,se=null,xe=null,Ee=null;return{setReversed:function(ae){if(_e!==ae){const ke=e.get("EXT_clip_control");ae?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),_e=ae;const Le=Ee;Ee=null,this.setClear(Le)}},getReversed:function(){return _e},setTest:function(ae){ae?ie(s.DEPTH_TEST):pe(s.DEPTH_TEST)},setMask:function(ae){se!==ae&&!B&&(s.depthMask(ae),se=ae)},setFunc:function(ae){if(_e&&(ae=Mf[ae]),xe!==ae){switch(ae){case Vo:s.depthFunc(s.NEVER);break;case Ho:s.depthFunc(s.ALWAYS);break;case Go:s.depthFunc(s.LESS);break;case _r:s.depthFunc(s.LEQUAL);break;case Wo:s.depthFunc(s.EQUAL);break;case Xo:s.depthFunc(s.GEQUAL);break;case qo:s.depthFunc(s.GREATER);break;case $o:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xe=ae}},setLocked:function(ae){B=ae},setClear:function(ae){Ee!==ae&&(Ee=ae,_e&&(ae=1-ae),s.clearDepth(ae))},reset:function(){B=!1,se=null,xe=null,Ee=null,_e=!1}}}function i(){let B=!1,_e=null,se=null,xe=null,Ee=null,ae=null,ke=null,Le=null,St=null;return{setTest:function(ht){B||(ht?ie(s.STENCIL_TEST):pe(s.STENCIL_TEST))},setMask:function(ht){_e!==ht&&!B&&(s.stencilMask(ht),_e=ht)},setFunc:function(ht,Tn,Dn){(se!==ht||xe!==Tn||Ee!==Dn)&&(s.stencilFunc(ht,Tn,Dn),se=ht,xe=Tn,Ee=Dn)},setOp:function(ht,Tn,Dn){(ae!==ht||ke!==Tn||Le!==Dn)&&(s.stencilOp(ht,Tn,Dn),ae=ht,ke=Tn,Le=Dn)},setLocked:function(ht){B=ht},setClear:function(ht){St!==ht&&(s.clearStencil(ht),St=ht)},reset:function(){B=!1,_e=null,se=null,xe=null,Ee=null,ae=null,ke=null,Le=null,St=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},d={},h={},f=new WeakMap,g=[],y=null,p=!1,m=null,M=null,T=null,x=null,E=null,b=null,C=null,v=new ze(0,0,0),A=0,P=!1,I=null,k=null,G=null,F=null,V=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,Y=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(W)[1]),L=Y>=1):W.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),L=Y>=2);let Q=null,te={};const Ie=s.getParameter(s.SCISSOR_BOX),Te=s.getParameter(s.VIEWPORT),Ze=new vt().fromArray(Ie),Ye=new vt().fromArray(Te);function st(B,_e,se,xe){const Ee=new Uint8Array(4),ae=s.createTexture();s.bindTexture(B,ae),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ke=0;ke<se;ke++)B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY?s.texImage3D(_e,0,s.RGBA,1,1,xe,0,s.RGBA,s.UNSIGNED_BYTE,Ee):s.texImage2D(_e+ke,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ee);return ae}const ee={};ee[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),ee[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ee[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(s.DEPTH_TEST),a.setFunc(_r),he(!1),fe(wl),ie(s.CULL_FACE),le(ri);function ie(B){u[B]!==!0&&(s.enable(B),u[B]=!0)}function pe(B){u[B]!==!1&&(s.disable(B),u[B]=!1)}function Ve(B,_e){return h[B]!==_e?(s.bindFramebuffer(B,_e),h[B]=_e,B===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=_e),B===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=_e),!0):!1}function be(B,_e){let se=g,xe=!1;if(B){se=f.get(_e),se===void 0&&(se=[],f.set(_e,se));const Ee=B.textures;if(se.length!==Ee.length||se[0]!==s.COLOR_ATTACHMENT0){for(let ae=0,ke=Ee.length;ae<ke;ae++)se[ae]=s.COLOR_ATTACHMENT0+ae;se.length=Ee.length,xe=!0}}else se[0]!==s.BACK&&(se[0]=s.BACK,xe=!0);xe&&s.drawBuffers(se)}function He(B){return y!==B?(s.useProgram(B),y=B,!0):!1}const ot={[xs]:s.FUNC_ADD,[kd]:s.FUNC_SUBTRACT,[zd]:s.FUNC_REVERSE_SUBTRACT};ot[Vd]=s.MIN,ot[Hd]=s.MAX;const ne={[Gd]:s.ZERO,[Wd]:s.ONE,[Xd]:s.SRC_COLOR,[gh]:s.SRC_ALPHA,[Zd]:s.SRC_ALPHA_SATURATE,[Kd]:s.DST_COLOR,[$d]:s.DST_ALPHA,[qd]:s.ONE_MINUS_SRC_COLOR,[_h]:s.ONE_MINUS_SRC_ALPHA,[Jd]:s.ONE_MINUS_DST_COLOR,[Yd]:s.ONE_MINUS_DST_ALPHA,[Qd]:s.CONSTANT_COLOR,[jd]:s.ONE_MINUS_CONSTANT_COLOR,[ef]:s.CONSTANT_ALPHA,[tf]:s.ONE_MINUS_CONSTANT_ALPHA};function le(B,_e,se,xe,Ee,ae,ke,Le,St,ht){if(B===ri){p===!0&&(pe(s.BLEND),p=!1);return}if(p===!1&&(ie(s.BLEND),p=!0),B!==Bd){if(B!==m||ht!==P){if((M!==xs||E!==xs)&&(s.blendEquation(s.FUNC_ADD),M=xs,E=xs),ht)switch(B){case cr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ea:s.blendFunc(s.ONE,s.ONE);break;case Al:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Rl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:$e("WebGLState: Invalid blending: ",B);break}else switch(B){case cr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ea:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Al:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rl:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",B);break}T=null,x=null,b=null,C=null,v.set(0,0,0),A=0,m=B,P=ht}return}Ee=Ee||_e,ae=ae||se,ke=ke||xe,(_e!==M||Ee!==E)&&(s.blendEquationSeparate(ot[_e],ot[Ee]),M=_e,E=Ee),(se!==T||xe!==x||ae!==b||ke!==C)&&(s.blendFuncSeparate(ne[se],ne[xe],ne[ae],ne[ke]),T=se,x=xe,b=ae,C=ke),(Le.equals(v)===!1||St!==A)&&(s.blendColor(Le.r,Le.g,Le.b,St),v.copy(Le),A=St),m=B,P=!1}function ue(B,_e){B.side===$t?pe(s.CULL_FACE):ie(s.CULL_FACE);let se=B.side===rn;_e&&(se=!se),he(se),B.blending===cr&&B.transparent===!1?le(ri):le(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const xe=B.stencilWrite;o.setTest(xe),xe&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ue(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ie(s.SAMPLE_ALPHA_TO_COVERAGE):pe(s.SAMPLE_ALPHA_TO_COVERAGE)}function he(B){I!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),I=B)}function fe(B){B!==Ud?(ie(s.CULL_FACE),B!==k&&(B===wl?s.cullFace(s.BACK):B===Fd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):pe(s.CULL_FACE),k=B}function Be(B){B!==G&&(L&&s.lineWidth(B),G=B)}function Ue(B,_e,se){B?(ie(s.POLYGON_OFFSET_FILL),(F!==_e||V!==se)&&(F=_e,V=se,a.getReversed()&&(_e=-_e),s.polygonOffset(_e,se))):pe(s.POLYGON_OFFSET_FILL)}function Ge(B){B?ie(s.SCISSOR_TEST):pe(s.SCISSOR_TEST)}function qe(B){B===void 0&&(B=s.TEXTURE0+K-1),Q!==B&&(s.activeTexture(B),Q=B)}function N(B,_e,se){se===void 0&&(Q===null?se=s.TEXTURE0+K-1:se=Q);let xe=te[se];xe===void 0&&(xe={type:void 0,texture:void 0},te[se]=xe),(xe.type!==B||xe.texture!==_e)&&(Q!==se&&(s.activeTexture(se),Q=se),s.bindTexture(B,_e||ee[B]),xe.type=B,xe.texture=_e)}function U(){const B=te[Q];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function H(){try{s.compressedTexImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function w(){try{s.compressedTexImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function _(){try{s.texSubImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function D(){try{s.texSubImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function z(){try{s.compressedTexSubImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function $(){try{s.compressedTexSubImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function Z(){try{s.texStorage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function ce(){try{s.texStorage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function j(){try{s.texImage2D(...arguments)}catch(B){$e("WebGLState:",B)}}function re(){try{s.texImage3D(...arguments)}catch(B){$e("WebGLState:",B)}}function me(B){return d[B]!==void 0?d[B]:s.getParameter(B)}function Fe(B,_e){d[B]!==_e&&(s.pixelStorei(B,_e),d[B]=_e)}function ve(B){Ze.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),Ze.copy(B))}function ge(B){Ye.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),Ye.copy(B))}function Oe(B,_e){let se=l.get(_e);se===void 0&&(se=new WeakMap,l.set(_e,se));let xe=se.get(B);xe===void 0&&(xe=s.getUniformBlockIndex(_e,B.name),se.set(B,xe))}function We(B,_e){const xe=l.get(_e).get(B);c.get(_e)!==xe&&(s.uniformBlockBinding(_e,xe,B.__bindingPointIndex),c.set(_e,xe))}function Qe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),u={},d={},Q=null,te={},h={},f=new WeakMap,g=[],y=null,p=!1,m=null,M=null,T=null,x=null,E=null,b=null,C=null,v=new ze(0,0,0),A=0,P=!1,I=null,k=null,G=null,F=null,V=null,Ze.set(0,0,s.canvas.width,s.canvas.height),Ye.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:pe,bindFramebuffer:Ve,drawBuffers:be,useProgram:He,setBlending:le,setMaterial:ue,setFlipSided:he,setCullFace:fe,setLineWidth:Be,setPolygonOffset:Ue,setScissorTest:Ge,activeTexture:qe,bindTexture:N,unbindTexture:U,compressedTexImage2D:H,compressedTexImage3D:w,texImage2D:j,texImage3D:re,pixelStorei:Fe,getParameter:me,updateUBOMapping:Oe,uniformBlockBinding:We,texStorage2D:Z,texStorage3D:ce,texSubImage2D:_,texSubImage3D:D,compressedTexSubImage2D:z,compressedTexSubImage3D:$,scissor:ve,viewport:ge,reset:Qe}}function vv(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oe,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(w,_){return g?new OffscreenCanvas(w,_):br("canvas")}function p(w,_,D){let z=1;const $=H(w);if(($.width>D||$.height>D)&&(z=D/Math.max($.width,$.height)),z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Z=Math.floor(z*$.width),ce=Math.floor(z*$.height);h===void 0&&(h=y(Z,ce));const j=_?y(Z,ce):h;return j.width=Z,j.height=ce,j.getContext("2d").drawImage(w,0,0,Z,ce),De("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Z+"x"+ce+")."),j}else return"data"in w&&De("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),w;return w}function m(w){return w.generateMipmaps}function M(w){s.generateMipmap(w)}function T(w){return w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(w,_,D,z,$,Z=!1){if(w!==null){if(s[w]!==void 0)return s[w];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ce;z&&(ce=e.get("EXT_texture_norm16"),ce||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=_;if(_===s.RED&&(D===s.FLOAT&&(j=s.R32F),D===s.HALF_FLOAT&&(j=s.R16F),D===s.UNSIGNED_BYTE&&(j=s.R8),D===s.UNSIGNED_SHORT&&ce&&(j=ce.R16_EXT),D===s.SHORT&&ce&&(j=ce.R16_SNORM_EXT)),_===s.RED_INTEGER&&(D===s.UNSIGNED_BYTE&&(j=s.R8UI),D===s.UNSIGNED_SHORT&&(j=s.R16UI),D===s.UNSIGNED_INT&&(j=s.R32UI),D===s.BYTE&&(j=s.R8I),D===s.SHORT&&(j=s.R16I),D===s.INT&&(j=s.R32I)),_===s.RG&&(D===s.FLOAT&&(j=s.RG32F),D===s.HALF_FLOAT&&(j=s.RG16F),D===s.UNSIGNED_BYTE&&(j=s.RG8),D===s.UNSIGNED_SHORT&&ce&&(j=ce.RG16_EXT),D===s.SHORT&&ce&&(j=ce.RG16_SNORM_EXT)),_===s.RG_INTEGER&&(D===s.UNSIGNED_BYTE&&(j=s.RG8UI),D===s.UNSIGNED_SHORT&&(j=s.RG16UI),D===s.UNSIGNED_INT&&(j=s.RG32UI),D===s.BYTE&&(j=s.RG8I),D===s.SHORT&&(j=s.RG16I),D===s.INT&&(j=s.RG32I)),_===s.RGB_INTEGER&&(D===s.UNSIGNED_BYTE&&(j=s.RGB8UI),D===s.UNSIGNED_SHORT&&(j=s.RGB16UI),D===s.UNSIGNED_INT&&(j=s.RGB32UI),D===s.BYTE&&(j=s.RGB8I),D===s.SHORT&&(j=s.RGB16I),D===s.INT&&(j=s.RGB32I)),_===s.RGBA_INTEGER&&(D===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),D===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),D===s.UNSIGNED_INT&&(j=s.RGBA32UI),D===s.BYTE&&(j=s.RGBA8I),D===s.SHORT&&(j=s.RGBA16I),D===s.INT&&(j=s.RGBA32I)),_===s.RGB&&(D===s.UNSIGNED_SHORT&&ce&&(j=ce.RGB16_EXT),D===s.SHORT&&ce&&(j=ce.RGB16_SNORM_EXT),D===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),D===s.UNSIGNED_INT_10F_11F_11F_REV&&(j=s.R11F_G11F_B10F)),_===s.RGBA){const re=Z?Ra:at.getTransfer($);D===s.FLOAT&&(j=s.RGBA32F),D===s.HALF_FLOAT&&(j=s.RGBA16F),D===s.UNSIGNED_BYTE&&(j=re===ft?s.SRGB8_ALPHA8:s.RGBA8),D===s.UNSIGNED_SHORT&&ce&&(j=ce.RGBA16_EXT),D===s.SHORT&&ce&&(j=ce.RGBA16_SNORM_EXT),D===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),D===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function E(w,_){let D;return w?_===null||_===Wn||_===vr?D=s.DEPTH24_STENCIL8:_===yn?D=s.DEPTH32F_STENCIL8:_===xr&&(D=s.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Wn||_===vr?D=s.DEPTH_COMPONENT24:_===yn?D=s.DEPTH_COMPONENT32F:_===xr&&(D=s.DEPTH_COMPONENT16),D}function b(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Vt&&w.minFilter!==Ht?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function C(w){const _=w.target;_.removeEventListener("dispose",C),A(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function v(w){const _=w.target;_.removeEventListener("dispose",v),I(_)}function A(w){const _=n.get(w);if(_.__webglInit===void 0)return;const D=w.source,z=f.get(D);if(z){const $=z[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&P(w),Object.keys(z).length===0&&f.delete(D)}n.remove(w)}function P(w){const _=n.get(w);s.deleteTexture(_.__webglTexture);const D=w.source,z=f.get(D);delete z[_.__cacheKey],a.memory.textures--}function I(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(_.__webglFramebuffer[z]))for(let $=0;$<_.__webglFramebuffer[z].length;$++)s.deleteFramebuffer(_.__webglFramebuffer[z][$]);else s.deleteFramebuffer(_.__webglFramebuffer[z]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[z])}else{if(Array.isArray(_.__webglFramebuffer))for(let z=0;z<_.__webglFramebuffer.length;z++)s.deleteFramebuffer(_.__webglFramebuffer[z]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let z=0;z<_.__webglColorRenderbuffer.length;z++)_.__webglColorRenderbuffer[z]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[z]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=w.textures;for(let z=0,$=D.length;z<$;z++){const Z=n.get(D[z]);Z.__webglTexture&&(s.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(D[z])}n.remove(w)}let k=0;function G(){k=0}function F(){return k}function V(w){k=w}function K(){const w=k;return w>=i.maxTextures&&De("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+i.maxTextures),k+=1,w}function L(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function Y(w,_){const D=n.get(w);if(w.isVideoTexture&&N(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&D.__version!==w.version){const z=w.image;if(z===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{pe(D,w,_);return}}else w.isExternalTexture&&(D.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,D.__webglTexture,s.TEXTURE0+_)}function W(w,_){const D=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&D.__version!==w.version){pe(D,w,_);return}else w.isExternalTexture&&(D.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,D.__webglTexture,s.TEXTURE0+_)}function Q(w,_){const D=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&D.__version!==w.version){pe(D,w,_);return}t.bindTexture(s.TEXTURE_3D,D.__webglTexture,s.TEXTURE0+_)}function te(w,_){const D=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&D.__version!==w.version){Ve(D,w,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+_)}const Ie={[qi]:s.REPEAT,[Vn]:s.CLAMP_TO_EDGE,[Ta]:s.MIRRORED_REPEAT},Te={[Vt]:s.NEAREST,[wh]:s.NEAREST_MIPMAP_NEAREST,[sr]:s.NEAREST_MIPMAP_LINEAR,[Ht]:s.LINEAR,[ma]:s.LINEAR_MIPMAP_NEAREST,[ti]:s.LINEAR_MIPMAP_LINEAR},Ze={[hf]:s.NEVER,[gf]:s.ALWAYS,[df]:s.LESS,[Xc]:s.LEQUAL,[ff]:s.EQUAL,[qc]:s.GEQUAL,[pf]:s.GREATER,[mf]:s.NOTEQUAL};function Ye(w,_){if(_.type===yn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ht||_.magFilter===ma||_.magFilter===sr||_.magFilter===ti||_.minFilter===Ht||_.minFilter===ma||_.minFilter===sr||_.minFilter===ti)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.TEXTURE_WRAP_S,Ie[_.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,Ie[_.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,Ie[_.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,Te[_.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,Te[_.minFilter]),_.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,Ze[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Vt||_.minFilter!==sr&&_.minFilter!==ti||_.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");s.texParameterf(w,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function st(w,_){let D=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",C));const z=_.source;let $=f.get(z);$===void 0&&($={},f.set(z,$));const Z=L(_);if(Z!==w.__cacheKey){$[Z]===void 0&&($[Z]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,D=!0),$[Z].usedTimes++;const ce=$[w.__cacheKey];ce!==void 0&&($[w.__cacheKey].usedTimes--,ce.usedTimes===0&&P(_)),w.__cacheKey=Z,w.__webglTexture=$[Z].texture}return D}function ee(w,_,D){return Math.floor(Math.floor(w/D)/_)}function ie(w,_,D,z){const Z=w.updateRanges;if(Z.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,D,z,_.data);else{Z.sort((Fe,ve)=>Fe.start-ve.start);let ce=0;for(let Fe=1;Fe<Z.length;Fe++){const ve=Z[ce],ge=Z[Fe],Oe=ve.start+ve.count,We=ee(ge.start,_.width,4),Qe=ee(ve.start,_.width,4);ge.start<=Oe+1&&We===Qe&&ee(ge.start+ge.count-1,_.width,4)===We?ve.count=Math.max(ve.count,ge.start+ge.count-ve.start):(++ce,Z[ce]=ge)}Z.length=ce+1;const j=t.getParameter(s.UNPACK_ROW_LENGTH),re=t.getParameter(s.UNPACK_SKIP_PIXELS),me=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Fe=0,ve=Z.length;Fe<ve;Fe++){const ge=Z[Fe],Oe=Math.floor(ge.start/4),We=Math.ceil(ge.count/4),Qe=Oe%_.width,B=Math.floor(Oe/_.width),_e=We,se=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(s.UNPACK_SKIP_ROWS,B),t.texSubImage2D(s.TEXTURE_2D,0,Qe,B,_e,se,D,z,_.data)}w.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,j),t.pixelStorei(s.UNPACK_SKIP_PIXELS,re),t.pixelStorei(s.UNPACK_SKIP_ROWS,me)}}function pe(w,_,D){let z=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(z=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(z=s.TEXTURE_3D);const $=st(w,_),Z=_.source;t.bindTexture(z,w.__webglTexture,s.TEXTURE0+D);const ce=n.get(Z);if(Z.version!==ce.__version||$===!0){if(t.activeTexture(s.TEXTURE0+D),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const se=at.getPrimaries(at.workingColorSpace),xe=_.colorSpace===Ei?null:at.getPrimaries(_.colorSpace),Ee=_.colorSpace===Ei||se===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment);let re=p(_.image,!1,i.maxTextureSize);re=U(_,re);const me=r.convert(_.format,_.colorSpace),Fe=r.convert(_.type);let ve=x(_.internalFormat,me,Fe,_.normalized,_.colorSpace,_.isVideoTexture);Ye(z,_);let ge;const Oe=_.mipmaps,We=_.isVideoTexture!==!0,Qe=ce.__version===void 0||$===!0,B=Z.dataReady,_e=b(_,re);if(_.isDepthTexture)ve=E(_.format===ki,_.type),Qe&&(We?t.texStorage2D(s.TEXTURE_2D,1,ve,re.width,re.height):t.texImage2D(s.TEXTURE_2D,0,ve,re.width,re.height,0,me,Fe,null));else if(_.isDataTexture)if(Oe.length>0){We&&Qe&&t.texStorage2D(s.TEXTURE_2D,_e,ve,Oe[0].width,Oe[0].height);for(let se=0,xe=Oe.length;se<xe;se++)ge=Oe[se],We?B&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,ge.width,ge.height,me,Fe,ge.data):t.texImage2D(s.TEXTURE_2D,se,ve,ge.width,ge.height,0,me,Fe,ge.data);_.generateMipmaps=!1}else We?(Qe&&t.texStorage2D(s.TEXTURE_2D,_e,ve,re.width,re.height),B&&ie(_,re,me,Fe)):t.texImage2D(s.TEXTURE_2D,0,ve,re.width,re.height,0,me,Fe,re.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){We&&Qe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,_e,ve,Oe[0].width,Oe[0].height,re.depth);for(let se=0,xe=Oe.length;se<xe;se++)if(ge=Oe[se],_.format!==Mn)if(me!==null)if(We){if(B)if(_.layerUpdates.size>0){const Ee=Cu(ge.width,ge.height,_.format,_.type);for(const ae of _.layerUpdates){const ke=ge.data.subarray(ae*Ee/ge.data.BYTES_PER_ELEMENT,(ae+1)*Ee/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,ae,ge.width,ge.height,1,me,ke)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,ge.width,ge.height,re.depth,me,ge.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,se,ve,ge.width,ge.height,re.depth,0,ge.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?B&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,ge.width,ge.height,re.depth,me,Fe,ge.data):t.texImage3D(s.TEXTURE_2D_ARRAY,se,ve,ge.width,ge.height,re.depth,0,me,Fe,ge.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{We&&Qe&&t.texStorage2D(s.TEXTURE_2D,_e,ve,Oe[0].width,Oe[0].height);for(let se=0,xe=Oe.length;se<xe;se++)ge=Oe[se],_.format!==Mn?me!==null?We?B&&t.compressedTexSubImage2D(s.TEXTURE_2D,se,0,0,ge.width,ge.height,me,ge.data):t.compressedTexImage2D(s.TEXTURE_2D,se,ve,ge.width,ge.height,0,ge.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?B&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,ge.width,ge.height,me,Fe,ge.data):t.texImage2D(s.TEXTURE_2D,se,ve,ge.width,ge.height,0,me,Fe,ge.data)}else if(_.isDataArrayTexture)if(We){if(Qe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,_e,ve,re.width,re.height,re.depth),B)if(_.layerUpdates.size>0){const se=Cu(re.width,re.height,_.format,_.type);for(const xe of _.layerUpdates){const Ee=re.data.subarray(xe*se/re.data.BYTES_PER_ELEMENT,(xe+1)*se/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,xe,re.width,re.height,1,me,Fe,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,me,Fe,re.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ve,re.width,re.height,re.depth,0,me,Fe,re.data);else if(_.isData3DTexture)We?(Qe&&t.texStorage3D(s.TEXTURE_3D,_e,ve,re.width,re.height,re.depth),B&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,me,Fe,re.data)):t.texImage3D(s.TEXTURE_3D,0,ve,re.width,re.height,re.depth,0,me,Fe,re.data);else if(_.isFramebufferTexture){if(Qe)if(We)t.texStorage2D(s.TEXTURE_2D,_e,ve,re.width,re.height);else{let se=re.width,xe=re.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(s.TEXTURE_2D,Ee,ve,se,xe,0,me,Fe,null),se>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in s){const se=s.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),re.parentNode!==se){se.appendChild(re),d.add(_),se.onpaint=xe=>{const Ee=xe.changedElements;for(const ae of d)Ee.includes(ae.image)&&(ae.needsUpdate=!0)},se.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,re);else{const Ee=s.RGBA,ae=s.RGBA,ke=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ee,ae,ke,re)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Oe.length>0){if(We&&Qe){const se=H(Oe[0]);t.texStorage2D(s.TEXTURE_2D,_e,ve,se.width,se.height)}for(let se=0,xe=Oe.length;se<xe;se++)ge=Oe[se],We?B&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,me,Fe,ge):t.texImage2D(s.TEXTURE_2D,se,ve,me,Fe,ge);_.generateMipmaps=!1}else if(We){if(Qe){const se=H(re);t.texStorage2D(s.TEXTURE_2D,_e,ve,se.width,se.height)}B&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,me,Fe,re)}else t.texImage2D(s.TEXTURE_2D,0,ve,me,Fe,re);m(_)&&M(z),ce.__version=Z.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Ve(w,_,D){if(_.image.length!==6)return;const z=st(w,_),$=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+D);const Z=n.get($);if($.version!==Z.__version||z===!0){t.activeTexture(s.TEXTURE0+D);const ce=at.getPrimaries(at.workingColorSpace),j=_.colorSpace===Ei?null:at.getPrimaries(_.colorSpace),re=_.colorSpace===Ei||ce===j?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const me=_.isCompressedTexture||_.image[0].isCompressedTexture,Fe=_.image[0]&&_.image[0].isDataTexture,ve=[];for(let ae=0;ae<6;ae++)!me&&!Fe?ve[ae]=p(_.image[ae],!0,i.maxCubemapSize):ve[ae]=Fe?_.image[ae].image:_.image[ae],ve[ae]=U(_,ve[ae]);const ge=ve[0],Oe=r.convert(_.format,_.colorSpace),We=r.convert(_.type),Qe=x(_.internalFormat,Oe,We,_.normalized,_.colorSpace),B=_.isVideoTexture!==!0,_e=Z.__version===void 0||z===!0,se=$.dataReady;let xe=b(_,ge);Ye(s.TEXTURE_CUBE_MAP,_);let Ee;if(me){B&&_e&&t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,Qe,ge.width,ge.height);for(let ae=0;ae<6;ae++){Ee=ve[ae].mipmaps;for(let ke=0;ke<Ee.length;ke++){const Le=Ee[ke];_.format!==Mn?Oe!==null?B?se&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke,0,0,Le.width,Le.height,Oe,Le.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke,Qe,Le.width,Le.height,0,Le.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke,0,0,Le.width,Le.height,Oe,We,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke,Qe,Le.width,Le.height,0,Oe,We,Le.data)}}}else{if(Ee=_.mipmaps,B&&_e){Ee.length>0&&xe++;const ae=H(ve[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,Qe,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Fe){B?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ve[ae].width,ve[ae].height,Oe,We,ve[ae].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Qe,ve[ae].width,ve[ae].height,0,Oe,We,ve[ae].data);for(let ke=0;ke<Ee.length;ke++){const St=Ee[ke].image[ae].image;B?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke+1,0,0,St.width,St.height,Oe,We,St.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke+1,Qe,St.width,St.height,0,Oe,We,St.data)}}else{B?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Oe,We,ve[ae]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Qe,Oe,We,ve[ae]);for(let ke=0;ke<Ee.length;ke++){const Le=Ee[ke];B?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke+1,0,0,Oe,We,Le.image[ae]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ke+1,Qe,Oe,We,Le.image[ae])}}}m(_)&&M(s.TEXTURE_CUBE_MAP),Z.__version=$.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function be(w,_,D,z,$,Z){const ce=r.convert(D.format,D.colorSpace),j=r.convert(D.type),re=x(D.internalFormat,ce,j,D.normalized,D.colorSpace),me=n.get(_),Fe=n.get(D);if(Fe.__renderTarget=_,!me.__hasExternalTextures){const ve=Math.max(1,_.width>>Z),ge=Math.max(1,_.height>>Z);$===s.TEXTURE_3D||$===s.TEXTURE_2D_ARRAY?t.texImage3D($,Z,re,ve,ge,_.depth,0,ce,j,null):t.texImage2D($,Z,re,ve,ge,0,ce,j,null)}t.bindFramebuffer(s.FRAMEBUFFER,w),qe(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,z,$,Fe.__webglTexture,0,Ge(_)):($===s.TEXTURE_2D||$>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,z,$,Fe.__webglTexture,Z),t.bindFramebuffer(s.FRAMEBUFFER,null)}function He(w,_,D){if(s.bindRenderbuffer(s.RENDERBUFFER,w),_.depthBuffer){const z=_.depthTexture,$=z&&z.isDepthTexture?z.type:null,Z=E(_.stencilBuffer,$),ce=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;qe(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ge(_),Z,_.width,_.height):D?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ge(_),Z,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,Z,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ce,s.RENDERBUFFER,w)}else{const z=_.textures;for(let $=0;$<z.length;$++){const Z=z[$],ce=r.convert(Z.format,Z.colorSpace),j=r.convert(Z.type),re=x(Z.internalFormat,ce,j,Z.normalized,Z.colorSpace);qe(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ge(_),re,_.width,_.height):D?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ge(_),re,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,re,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ot(w,_,D){const z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),z){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),$.__webglTexture===void 0){$.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),Ye(s.TEXTURE_CUBE_MAP,_.depthTexture);const me=r.convert(_.depthTexture.format),Fe=r.convert(_.depthTexture.type);let ve;_.depthTexture.format===oi?ve=s.DEPTH_COMPONENT24:_.depthTexture.format===ki&&(ve=s.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ve,_.width,_.height,0,me,Fe,null)}}else Y(_.depthTexture,0);const Z=$.__webglTexture,ce=Ge(_),j=z?s.TEXTURE_CUBE_MAP_POSITIVE_X+D:s.TEXTURE_2D,re=_.depthTexture.format===ki?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===oi)qe(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,re,j,Z,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,re,j,Z,0);else if(_.depthTexture.format===ki)qe(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,re,j,Z,0,ce):s.framebufferTexture2D(s.FRAMEBUFFER,re,j,Z,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(w){const _=n.get(w),D=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const z=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),z){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,z.removeEventListener("dispose",$)};z.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=z}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let z=0;z<6;z++)ot(_.__webglFramebuffer[z],w,z);else{const z=w.texture.mipmaps;z&&z.length>0?ot(_.__webglFramebuffer[0],w,0):ot(_.__webglFramebuffer,w,0)}else if(D){_.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[z]),_.__webglDepthbuffer[z]===void 0)_.__webglDepthbuffer[z]=s.createRenderbuffer(),He(_.__webglDepthbuffer[z],w,!1);else{const $=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer[z];s.bindRenderbuffer(s.RENDERBUFFER,Z),s.framebufferRenderbuffer(s.FRAMEBUFFER,$,s.RENDERBUFFER,Z)}}else{const z=w.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),He(_.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Z),s.framebufferRenderbuffer(s.FRAMEBUFFER,$,s.RENDERBUFFER,Z)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function le(w,_,D){const z=n.get(w);_!==void 0&&be(z.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),D!==void 0&&ne(w)}function ue(w){const _=w.texture,D=n.get(w),z=n.get(_);w.addEventListener("dispose",v);const $=w.textures,Z=w.isWebGLCubeRenderTarget===!0,ce=$.length>1;if(ce||(z.__webglTexture===void 0&&(z.__webglTexture=s.createTexture()),z.__version=_.version,a.memory.textures++),Z){D.__webglFramebuffer=[];for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[j]=[];for(let re=0;re<_.mipmaps.length;re++)D.__webglFramebuffer[j][re]=s.createFramebuffer()}else D.__webglFramebuffer[j]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let j=0;j<_.mipmaps.length;j++)D.__webglFramebuffer[j]=s.createFramebuffer()}else D.__webglFramebuffer=s.createFramebuffer();if(ce)for(let j=0,re=$.length;j<re;j++){const me=n.get($[j]);me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture(),a.memory.textures++)}if(w.samples>0&&qe(w)===!1){D.__webglMultisampledFramebuffer=s.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let j=0;j<$.length;j++){const re=$[j];D.__webglColorRenderbuffer[j]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,D.__webglColorRenderbuffer[j]);const me=r.convert(re.format,re.colorSpace),Fe=r.convert(re.type),ve=x(re.internalFormat,me,Fe,re.normalized,re.colorSpace,w.isXRRenderTarget===!0),ge=Ge(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,ge,ve,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+j,s.RENDERBUFFER,D.__webglColorRenderbuffer[j])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(D.__webglDepthRenderbuffer=s.createRenderbuffer(),He(D.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Z){t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture),Ye(s.TEXTURE_CUBE_MAP,_);for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0)for(let re=0;re<_.mipmaps.length;re++)be(D.__webglFramebuffer[j][re],w,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,re);else be(D.__webglFramebuffer[j],w,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(_)&&M(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let j=0,re=$.length;j<re;j++){const me=$[j],Fe=n.get(me);let ve=s.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ve=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ve,Fe.__webglTexture),Ye(ve,me),be(D.__webglFramebuffer,w,me,s.COLOR_ATTACHMENT0+j,ve,0),m(me)&&M(ve)}t.unbindTexture()}else{let j=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(j=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(j,z.__webglTexture),Ye(j,_),_.mipmaps&&_.mipmaps.length>0)for(let re=0;re<_.mipmaps.length;re++)be(D.__webglFramebuffer[re],w,_,s.COLOR_ATTACHMENT0,j,re);else be(D.__webglFramebuffer,w,_,s.COLOR_ATTACHMENT0,j,0);m(_)&&M(j),t.unbindTexture()}w.depthBuffer&&ne(w)}function he(w){const _=w.textures;for(let D=0,z=_.length;D<z;D++){const $=_[D];if(m($)){const Z=T(w),ce=n.get($).__webglTexture;t.bindTexture(Z,ce),M(Z),t.unbindTexture()}}}const fe=[],Be=[];function Ue(w){if(w.samples>0){if(qe(w)===!1){const _=w.textures,D=w.width,z=w.height;let $=s.COLOR_BUFFER_BIT;const Z=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=n.get(w),j=_.length>1;if(j)for(let me=0;me<_.length;me++)t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const re=w.texture.mipmaps;re&&re.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let me=0;me<_.length;me++){if(w.resolveDepthBuffer&&(w.depthBuffer&&($|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&($|=s.STENCIL_BUFFER_BIT)),j){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const Fe=n.get(_[me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Fe,0)}s.blitFramebuffer(0,0,D,z,0,0,D,z,$,s.NEAREST),c===!0&&(fe.length=0,Be.length=0,fe.push(s.COLOR_ATTACHMENT0+me),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(fe.push(Z),Be.push(Z),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Be)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),j)for(let me=0;me<_.length;me++){t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,ce.__webglColorRenderbuffer[me]);const Fe=n.get(_[me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,Fe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&c){const _=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function Ge(w){return Math.min(i.maxSamples,w.samples)}function qe(w){const _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(w){const _=a.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function U(w,_){const D=w.colorSpace,z=w.format,$=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||D!==mn&&D!==Ei&&(at.getTransfer(D)===ft?(z!==Mn||$!==fn)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",D)),_}function H(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=K,this.resetTextureUnits=G,this.getTextureUnits=F,this.setTextureUnits=V,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=te,this.rebindTextures=le,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=be,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function yv(s,e){function t(n,i=Ei){let r;const a=at.getTransfer(i);if(n===fn)return s.UNSIGNED_BYTE;if(n===kc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===zc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ch)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ph)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ah)return s.BYTE;if(n===Rh)return s.SHORT;if(n===xr)return s.UNSIGNED_SHORT;if(n===Bc)return s.INT;if(n===Wn)return s.UNSIGNED_INT;if(n===yn)return s.FLOAT;if(n===Xn)return s.HALF_FLOAT;if(n===Ih)return s.ALPHA;if(n===Lh)return s.RGB;if(n===Mn)return s.RGBA;if(n===oi)return s.DEPTH_COMPONENT;if(n===ki)return s.DEPTH_STENCIL;if(n===Vc)return s.RED;if(n===Hc)return s.RED_INTEGER;if(n===$i)return s.RG;if(n===Gc)return s.RG_INTEGER;if(n===Wc)return s.RGBA_INTEGER;if(n===ga||n===_a||n===xa||n===va)if(a===ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ga)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ga)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yo||n===Ko||n===Jo||n===Zo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qo||n===jo||n===ec||n===tc||n===nc||n===wa||n===ic)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qo||n===jo)return a===ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ec)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===tc)return r.COMPRESSED_R11_EAC;if(n===nc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wa)return r.COMPRESSED_RG11_EAC;if(n===ic)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===sc||n===rc||n===ac||n===oc||n===cc||n===lc||n===uc||n===hc||n===dc||n===fc||n===pc||n===mc||n===gc||n===_c)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===rc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ac)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===lc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===hc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_c)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xc||n===vc||n===yc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===xc)return a===ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mc||n===Sc||n===Aa||n===bc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Mc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Aa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Mv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class bv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new qh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ln({vertexShader:Mv,fragmentShader:Sv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ev extends Ji{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null;const y=typeof XRWebGLBinding<"u",p=new bv,m={},M=t.getContextAttributes();let T=null,x=null;const E=[],b=[],C=new oe;let v=null,A=null;const P=new sn;P.viewport=new vt;const I=new sn;I.viewport=new vt;const k=[P,I],G=new Sm;let F=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let ie=E[ee];return ie===void 0&&(ie=new io,E[ee]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(ee){let ie=E[ee];return ie===void 0&&(ie=new io,E[ee]=ie),ie.getGripSpace()},this.getHand=function(ee){let ie=E[ee];return ie===void 0&&(ie=new io,E[ee]=ie),ie.getHandSpace()};function K(ee){const ie=b.indexOf(ee.inputSource);if(ie===-1)return;const pe=E[ie];pe!==void 0&&(pe.update(ee.inputSource,ee.frame,l||a),pe.dispatchEvent({type:ee.type,data:ee.inputSource}))}function L(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",L),i.removeEventListener("inputsourceschange",Y);for(let ee=0;ee<E.length;ee++){const ie=b[ee];ie!==null&&(b[ee]=null,E[ee].disconnect(ie))}F=null,V=null,p.reset();for(const ee in m)delete m[ee];if(e.setRenderTarget(T),f=null,h=null,d=null,i=null,x=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),A!==null){const ee=A.camera;ee.fov=A.fov,ee.zoom=A.zoom,ee.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ee){if(i=ee,i!==null){if(T=e.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",L),i.addEventListener("inputsourceschange",Y),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ve=null,be=null;M.depth&&(be=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=M.stencil?ki:oi,Ve=M.stencil?vr:Wn);const He={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(He),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new In(h.textureWidth,h.textureHeight,{format:Mn,type:fn,depthTexture:new Tr(h.textureWidth,h.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const pe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new In(f.framebufferWidth,f.framebufferHeight,{format:Mn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),st.setContext(i),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Y(ee){for(let ie=0;ie<ee.removed.length;ie++){const pe=ee.removed[ie],Ve=b.indexOf(pe);Ve>=0&&(b[Ve]=null,E[Ve].disconnect(pe))}for(let ie=0;ie<ee.added.length;ie++){const pe=ee.added[ie];let Ve=b.indexOf(pe);if(Ve===-1){for(let He=0;He<E.length;He++)if(He>=b.length){b.push(pe),Ve=He;break}else if(b[He]===null){b[He]=pe,Ve=He;break}if(Ve===-1)break}const be=E[Ve];be&&be.connect(pe)}}const W=new R,Q=new R;function te(ee,ie,pe){W.setFromMatrixPosition(ie.matrixWorld),Q.setFromMatrixPosition(pe.matrixWorld);const Ve=W.distanceTo(Q),be=ie.projectionMatrix.elements,He=pe.projectionMatrix.elements,ot=be[14]/(be[10]-1),ne=be[14]/(be[10]+1),le=(be[9]+1)/be[5],ue=(be[9]-1)/be[5],he=(be[8]-1)/be[0],fe=(He[8]+1)/He[0],Be=ot*he,Ue=ot*fe,Ge=Ve/(-he+fe),qe=Ge*-he;if(ie.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(qe),ee.translateZ(Ge),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),be[10]===-1)ee.projectionMatrix.copy(ie.projectionMatrix),ee.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const N=ot+Ge,U=ne+Ge,H=Be-qe,w=Ue+(Ve-qe),_=le*ne/U*N,D=ue*ne/U*N;ee.projectionMatrix.makePerspective(H,w,_,D,N,U),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function Ie(ee,ie){ie===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(ie.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(i===null)return;let ie=ee.near,pe=ee.far;p.texture!==null&&(p.depthNear>0&&(ie=p.depthNear),p.depthFar>0&&(pe=p.depthFar)),G.near=I.near=P.near=ie,G.far=I.far=P.far=pe,(F!==G.near||V!==G.far)&&(i.updateRenderState({depthNear:G.near,depthFar:G.far}),F=G.near,V=G.far),G.layers.mask=ee.layers.mask|6,P.layers.mask=G.layers.mask&-5,I.layers.mask=G.layers.mask&-3;const Ve=ee.parent,be=G.cameras;Ie(G,Ve);for(let He=0;He<be.length;He++)Ie(be[He],Ve);be.length===2?te(G,P,I):G.projectionMatrix.copy(P.projectionMatrix),A===null&&ee.isPerspectiveCamera&&(A={camera:ee,fov:ee.fov,zoom:ee.zoom}),Te(ee,G,Ve)};function Te(ee,ie,pe){pe===null?ee.matrix.copy(ie.matrixWorld):(ee.matrix.copy(pe.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(ie.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(ie.projectionMatrix),ee.projectionMatrixInverse.copy(ie.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=ws*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(ee){c=ee,h!==null&&(h.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(G)},this.getCameraTexture=function(ee){return m[ee]};let Ze=null;function Ye(ee,ie){if(u=ie.getViewerPose(l||a),g=ie,u!==null){const pe=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Ve=!1;pe.length!==G.cameras.length&&(G.cameras.length=0,Ve=!0);for(let ne=0;ne<pe.length;ne++){const le=pe[ne];let ue=null;if(f!==null)ue=f.getViewport(le);else{const fe=d.getViewSubImage(h,le);ue=fe.viewport,ne===0&&(e.setRenderTargetTextures(x,fe.colorTexture,fe.depthStencilTexture),e.setRenderTarget(x))}let he=k[ne];he===void 0&&(he=new sn,he.layers.enable(ne),he.viewport=new vt,k[ne]=he),he.matrix.fromArray(le.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(le.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(ue.x,ue.y,ue.width,ue.height),ne===0&&(G.matrix.copy(he.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ve===!0&&G.cameras.push(he)}const be=i.enabledFeatures;if(be&&be.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const ne=d.getDepthInformation(pe[0]);ne&&ne.isValid&&ne.texture&&p.init(ne,i.renderState)}if(be&&be.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let ne=0;ne<pe.length;ne++){const le=pe[ne].camera;if(le){let ue=m[le];ue||(ue=new qh,m[le]=ue);const he=d.getCameraImage(le);ue.sourceTexture=he}}}}for(let pe=0;pe<E.length;pe++){const Ve=b[pe],be=E[pe];Ve!==null&&be!==void 0&&be.update(Ve,ie,l||a)}Ze&&Ze(ee,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const st=new hd;st.setAnimationLoop(Ye),this.setAnimationLoop=function(ee){Ze=ee},this.dispose=function(){}}}const Tv=new Je,xd=new Ke;xd.set(-1,0,0,0,1,0,0,0,1);function wv(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,id(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,M,T,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,x)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),y(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,M,T):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===rn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===rn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=e.get(m),T=M.envMap,x=M.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(Tv.makeRotationFromEuler(x)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(xd),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,M,T){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=T*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===rn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){const M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Av(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,E){const b=E.program;n.uniformBlockBinding(x,b)}function l(x,E){let b=i[x.id];b===void 0&&(p(x),b=u(x),i[x.id]=b,x.addEventListener("dispose",M));const C=E.program;n.updateUBOMapping(x,C);const v=e.render.frame;r[x.id]!==v&&(h(x),r[x.id]=v)}function u(x){const E=d();x.__bindingPointIndex=E;const b=s.createBuffer(),C=x.__size,v=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,C,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,b),b}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const E=i[x.id],b=x.uniforms,C=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let v=0,A=b.length;v<A;v++){const P=b[v];if(Array.isArray(P))for(let I=0,k=P.length;I<k;I++)f(P[I],v,I,C);else f(P,v,0,C)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,E,b,C){if(y(x,E,b,C)===!0){const v=x.__offset,A=x.value;if(Array.isArray(A)){let P=0;for(let I=0;I<A.length;I++){const k=A[I],G=m(k);g(k,x.__data,P),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(P+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,x.__data)}}function g(x,E,b){typeof x=="number"||typeof x=="boolean"?E[0]=x:x.isMatrix3?(E[0]=x.elements[0],E[1]=x.elements[1],E[2]=x.elements[2],E[3]=0,E[4]=x.elements[3],E[5]=x.elements[4],E[6]=x.elements[5],E[7]=0,E[8]=x.elements[6],E[9]=x.elements[7],E[10]=x.elements[8],E[11]=0):ArrayBuffer.isView(x)?E.set(new x.constructor(x.buffer,x.byteOffset,E.length)):x.toArray(E,b)}function y(x,E,b,C){const v=x.value,A=E+"_"+b;if(C[A]===void 0)return typeof v=="number"||typeof v=="boolean"?C[A]=v:ArrayBuffer.isView(v)?C[A]=v.slice():C[A]=v.clone(),!0;{const P=C[A];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return C[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function p(x){const E=x.uniforms;let b=0;const C=16;for(let A=0,P=E.length;A<P;A++){const I=Array.isArray(E[A])?E[A]:[E[A]];for(let k=0,G=I.length;k<G;k++){const F=I[k],V=Array.isArray(F.value)?F.value:[F.value];for(let K=0,L=V.length;K<L;K++){const Y=V[K],W=m(Y),Q=b%C,te=Q%W.boundary,Ie=Q+te;b+=te,Ie!==0&&C-Ie<W.storage&&(b+=C-Ie),F.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=b,b+=W.storage}}}const v=b%C;return v>0&&(b+=C-v),x.__size=b,x.__cache={},this}function m(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(E.boundary=16,E.storage=x.byteLength):De("WebGLRenderer: Unsupported uniform value type.",x),E}function M(x){const E=x.target;E.removeEventListener("dispose",M);const b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function T(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:c,update:l,dispose:T}}const Rv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let On=null;function Cv(){return On===null&&(On=new Qc(Rv,16,16,$i,Xn),On.name="DFG_LUT",On.minFilter=Ht,On.magFilter=Ht,On.wrapS=Vn,On.wrapT=Vn,On.generateMipmaps=!1,On.needsUpdate=!0),On}class Pv{constructor(e={}){const{canvas:t=vf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=fn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=f,p=new Set([Wc,Gc,Hc]),m=new Set([fn,Wn,xr,vr,kc,zc]),M=new Uint32Array(4),T=new Int32Array(4),x=new R;let E=null,b=null;const C=[],v=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let I=!1,k=null,G=null,F=null,V=null;this._outputColorSpace=kt;let K=0,L=0,Y=null,W=-1,Q=null;const te=new vt,Ie=new vt;let Te=null;const Ze=new ze(0);let Ye=0,st=t.width,ee=t.height,ie=1,pe=null,Ve=null;const be=new vt(0,0,st,ee),He=new vt(0,0,st,ee);let ot=!1;const ne=new el;let le=!1,ue=!1;const he=new Je,fe=new R,Be=new vt,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function qe(){return Y===null?ie:1}let N=n;function U(S,O){return t.getContext(S,O)}let H,w,_,D,z,$,Z,ce,j,re,me,Fe,ve,ge,Oe,We,Qe,B,_e,se,xe,Ee,ae;try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fc}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",Tn,!1),N===null){const O="webgl2";if(N=U(O,S),N===null)throw U(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ke()}catch(S){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",Tn,!1),$e("WebGLRenderer: "+S.message),S}function ke(){H=new C_(N),H.init(),xe=new yv(N,H),w=new v_(N,H,e,xe),_=new xv(N,H),w.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),G=N.createFramebuffer(),F=N.createFramebuffer(),V=N.createFramebuffer(),D=new L_(N),z=new sv,$=new vv(N,H,_,z,w,xe,D),Z=new R_(P),ce=new Dm(N),Ee=new __(N,ce),j=new P_(N,ce,D,Ee),re=new D_(N,j,ce,Ee,D),B=new N_(N,w,$),Oe=new y_(z),me=new iv(P,Z,H,w,Ee,Oe),Fe=new wv(P,z),ve=new av,ge=new dv(H),Qe=new g_(P,Z,_,re,g,c),We=new _v(P,re,w),ae=new Av(N,D,w,_),_e=new x_(N,H,D),se=new I_(N,H,D),D.programs=me.programs,P.capabilities=w,P.extensions=H,P.properties=z,P.renderLists=ve,P.shadowMap=We,P.state=_,P.info=D}y!==fn&&(A=new F_(y,t.width,t.height,o,i,r));const Le=new Ev(P,N);this.xr=Le,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=H.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=H.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(S){S!==void 0&&(ie=S,this.setSize(st,ee,!1))},this.getSize=function(S){return S.set(st,ee)},this.setSize=function(S,O,J=!0){if(Le.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}st=S,ee=O,t.width=Math.floor(S*ie),t.height=Math.floor(O*ie),J===!0&&(t.style.width=S+"px",t.style.height=O+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(st*ie,ee*ie).floor()},this.setDrawingBufferSize=function(S,O,J){st=S,ee=O,ie=J,t.width=Math.floor(S*J),t.height=Math.floor(O*J),this.setViewport(0,0,S,O)},this.setEffects=function(S){if(y===fn){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let O=0;O<S.length;O++)if(S[O].isOutputPass===!0){De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(te)},this.getViewport=function(S){return S.copy(be)},this.setViewport=function(S,O,J,X){S.isVector4?be.set(S.x,S.y,S.z,S.w):be.set(S,O,J,X),_.viewport(te.copy(be).multiplyScalar(ie).round())},this.getScissor=function(S){return S.copy(He)},this.setScissor=function(S,O,J,X){S.isVector4?He.set(S.x,S.y,S.z,S.w):He.set(S,O,J,X),_.scissor(Ie.copy(He).multiplyScalar(ie).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(S){_.setScissorTest(ot=S)},this.setOpaqueSort=function(S){pe=S},this.setTransparentSort=function(S){Ve=S},this.getClearColor=function(S){return S.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,J=!0){let X=0;if(S){let q=!1;if(Y!==null){const Se=Y.texture.format;q=p.has(Se)}if(q){const Se=Y.texture.type,Ae=m.has(Se),Me=Qe.getClearColor(),Ce=Qe.getClearAlpha(),Ne=Me.r,je=Me.g,rt=Me.b;Ae?(M[0]=Ne,M[1]=je,M[2]=rt,M[3]=Ce,N.clearBufferuiv(N.COLOR,0,M)):(T[0]=Ne,T[1]=je,T[2]=rt,T[3]=Ce,N.clearBufferiv(N.COLOR,0,T))}else X|=N.COLOR_BUFFER_BIT}O&&(X|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&N.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),k=S},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",Tn,!1),Qe.dispose(),ve.dispose(),ge.dispose(),z.dispose(),Z.dispose(),re.dispose(),Ee.dispose(),ae.dispose(),me.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",ml),Le.removeEventListener("sessionend",gl),Ai.stop()};function St(S){S.preventDefault(),Ca("WebGLRenderer: Context Lost."),I=!0}function ht(){Ca("WebGLRenderer: Context Restored."),I=!1;const S=D.autoReset,O=We.enabled,J=We.autoUpdate,X=We.needsUpdate,q=We.type;ke(),D.autoReset=S,We.enabled=O,We.autoUpdate=J,We.needsUpdate=X,We.type=q}function Tn(S){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Dn(S){const O=S.target;O.removeEventListener("dispose",Dn),Ed(O)}function Ed(S){Td(S),z.remove(S)}function Td(S){const O=z.get(S).programs;O!==void 0&&(O.forEach(function(J){me.releaseProgram(J)}),S.isShaderMaterial&&me.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,J,X,q,Se){O===null&&(O=Ue);const Ae=q.isMesh&&q.matrixWorld.determinantAffine()<0,Me=Rd(S,O,J,X,q);_.setMaterial(X,Ae);let Ce=J.index,Ne=1;if(X.wireframe===!0){if(Ce=j.getWireframeAttribute(J),Ce===void 0)return;Ne=2}const je=J.drawRange,rt=J.attributes.position;let Pe=je.start*Ne,dt=(je.start+je.count)*Ne;Se!==null&&(Pe=Math.max(Pe,Se.start*Ne),dt=Math.min(dt,(Se.start+Se.count)*Ne)),Ce!==null?(Pe=Math.max(Pe,0),dt=Math.min(dt,Ce.count)):rt!=null&&(Pe=Math.max(Pe,0),dt=Math.min(dt,rt.count));const Dt=dt-Pe;if(Dt<0||Dt===1/0)return;Ee.setup(q,X,Me,J,Ce);let wt,yt=_e;if(Ce!==null&&(wt=ce.get(Ce),yt=se,yt.setIndex(wt)),q.isMesh)X.wireframe===!0?(_.setLineWidth(X.wireframeLinewidth*qe()),yt.setMode(N.LINES)):yt.setMode(N.TRIANGLES);else if(q.isLine){let Kt=X.linewidth;Kt===void 0&&(Kt=1),_.setLineWidth(Kt*qe()),q.isLineSegments?yt.setMode(N.LINES):q.isLineLoop?yt.setMode(N.LINE_LOOP):yt.setMode(N.LINE_STRIP)}else q.isPoints?yt.setMode(N.POINTS):q.isSprite&&yt.setMode(N.TRIANGLES);if(q.isBatchedMesh)if(H.get("WEBGL_multi_draw"))yt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Kt=q._multiDrawStarts,we=q._multiDrawCounts,jt=q._multiDrawCount,lt=Ce?ce.get(Ce).bytesPerElement:1,gn=z.get(X).currentProgram.getUniforms();for(let Un=0;Un<jt;Un++)gn.setValue(N,"_gl_DrawID",Un),yt.render(Kt[Un]/lt,we[Un])}else if(q.isInstancedMesh)yt.renderInstances(Pe,Dt,q.count);else if(J.isInstancedBufferGeometry){const Kt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,Kt);yt.renderInstances(Pe,Dt,we)}else yt.render(Pe,Dt)};function pl(S,O,J,X){k!==null&&S.isNodeMaterial&&k.setObject(X,S),le===!0&&Oe.setState(S,J,!1),S.transparent===!0&&S.side===$t&&S.forceSinglePass===!1?(S.side=rn,S.needsUpdate=!0,Ur(S,O,X),S.side=Ti,S.needsUpdate=!0,Ur(S,O,X),S.side=$t):Ur(S,O,X)}this.compile=function(S,O,J=null){J===null&&(J=S),k!==null&&k.renderStart(S,O,J),b=ge.get(J),b.init(O),v.push(b),J.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(b.pushLight(q),q.castShadow&&b.pushShadow(q))}),S!==J&&S.traverseVisible(function(q){q.isLight&&q.layers.test(O.layers)&&(b.pushLight(q),q.castShadow&&b.pushShadow(q))}),b.setupLights(),k!==null&&k.updateLights(b.state.lightsArray),ue=this.localClippingEnabled,le=Oe.init(this.clippingPlanes,ue),le===!0&&Oe.setGlobalState(this.clippingPlanes,O),k!==null&&We.render(b.state.shadowsArray,J,O);const X=new Set;return S.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const Se=q.material;if(Se)if(Array.isArray(Se))for(let Ae=0;Ae<Se.length;Ae++){const Me=Se[Ae];pl(Me,J,O,q),X.add(Me)}else pl(Se,J,O,q),X.add(Se)}),b=v.pop(),k!==null&&k.renderEnd(),X},this.compileAsync=function(S,O,J=null){const X=this.compile(S,O,J);return new Promise(q=>{function Se(){if(X.forEach(function(Ae){const Ce=z.get(Ae).currentProgram;(Ce===void 0||Ce.isReady())&&X.delete(Ae)}),X.size===0){q(S);return}setTimeout(Se,10)}H.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Xa=null;function wd(S){Xa&&Xa(S)}function ml(){Ai.stop()}function gl(){Ai.start()}const Ai=new hd;Ai.setAnimationLoop(wd),typeof self<"u"&&Ai.setContext(self),this.setAnimationLoop=function(S){Xa=S,Le.setAnimationLoop(S),S===null?Ai.stop():Ai.start()},Le.addEventListener("sessionstart",ml),Le.addEventListener("sessionend",gl),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;k!==null&&k.renderStart(S,O);const J=Le.enabled===!0&&Le.isPresenting===!0,X=A!==null&&(Y===null||J)&&A.begin(P,Y);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(O),O=Le.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,O,Y),b=ge.get(S,v.length),b.init(O),b.state.textureUnits=$.getTextureUnits(),v.push(b),he.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ne.setFromProjectionMatrix(he,Hn,O.reversedDepth),ue=this.localClippingEnabled,le=Oe.init(this.clippingPlanes,ue),E=ve.get(S,C.length),E.init(),C.push(E),Le.enabled===!0&&Le.isPresenting===!0){const Ae=P.xr.getDepthSensingMesh();Ae!==null&&qa(Ae,O,-1/0,P.sortObjects)}qa(S,O,0,P.sortObjects),E.finish(),k!==null&&k.updateLights(b.state.lightsArray),P.sortObjects===!0&&E.sort(pe,Ve),Ge=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,Ge&&Qe.addToRenderList(E,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),le===!0&&Oe.beginShadows();const q=b.state.shadowsArray;if(We.render(q,S,O),le===!0&&Oe.endShadows(),(X&&A.hasRenderPass())===!1){const Ae=E.opaque,Me=E.transmissive;if(b.setupLights(),O.isArrayCamera){const Ce=O.cameras;if(Me.length>0)for(let Ne=0,je=Ce.length;Ne<je;Ne++){const rt=Ce[Ne];xl(Ae,Me,S,rt)}Ge&&Qe.render(S);for(let Ne=0,je=Ce.length;Ne<je;Ne++){const rt=Ce[Ne];_l(E,S,rt,rt.viewport)}}else Me.length>0&&xl(Ae,Me,S,O),Ge&&Qe.render(S),_l(E,S,O)}Y!==null&&L===0&&($.updateMultisampleRenderTarget(Y),$.updateRenderTargetMipmap(Y)),X&&A.end(P),S.isScene===!0&&S.onAfterRender(P,S,O),Ee.resetDefaultState(),W=-1,Q=null,v.pop(),v.length>0?(b=v[v.length-1],$.setTextureUnits(b.state.textureUnits),le===!0&&Oe.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,k!==null&&k.renderEnd()};function qa(S,O,J,X){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)J=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLightProbeGrid)b.pushLightProbeGrid(S);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(ne)){X&&Be.setFromMatrixPosition(S.matrixWorld).applyMatrix4(he);const Ae=re.update(S),Me=S.material;Me.visible&&E.push(S,Ae,Me,J,Be.z,null,O)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(ne))){const Ae=re.update(S),Me=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Be.copy(S.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Be.copy(Ae.boundingSphere.center)),Be.applyMatrix4(S.matrixWorld).applyMatrix4(he)),Array.isArray(Me)){const Ce=Ae.groups;for(let Ne=0,je=Ce.length;Ne<je;Ne++){const rt=Ce[Ne],Pe=Me[rt.materialIndex];Pe&&Pe.visible&&E.push(S,Ae,Pe,J,Be.z,rt,O)}}else Me.visible&&E.push(S,Ae,Me,J,Be.z,null,O)}}const Se=S.children;for(let Ae=0,Me=Se.length;Ae<Me;Ae++)qa(Se[Ae],O,J,X)}function _l(S,O,J,X){const{opaque:q,transmissive:Se,transparent:Ae}=S;b.setupLightsView(J),le===!0&&Oe.setGlobalState(P.clippingPlanes,J),X&&_.viewport(te.copy(X)),q.length>0&&Dr(q,O,J),Se.length>0&&Dr(Se,O,J),Ae.length>0&&Dr(Ae,O,J),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function xl(S,O,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[X.id]===void 0){const Pe=H.has("EXT_color_buffer_half_float")||H.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[X.id]=new In(1,1,{generateMipmaps:!0,type:Pe?Xn:fn,minFilter:ti,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}const Se=b.state.transmissionRenderTarget[X.id],Ae=X.viewport||te;Se.setSize(Ae.z*P.transmissionResolutionScale,Ae.w*P.transmissionResolutionScale);const Me=P.getRenderTarget(),Ce=P.getActiveCubeFace(),Ne=P.getActiveMipmapLevel();P.setRenderTarget(Se),P.getClearColor(Ze),Ye=P.getClearAlpha(),Ye<1&&P.setClearColor(16777215,.5),P.clear(),Ge&&Qe.render(J);const je=P.toneMapping;P.toneMapping=Gn;const rt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),b.setupLightsView(X),le===!0&&Oe.setGlobalState(P.clippingPlanes,X),Dr(S,J,X),$.updateMultisampleRenderTarget(Se),$.updateRenderTargetMipmap(Se),H.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let dt=0,Dt=O.length;dt<Dt;dt++){const wt=O[dt],{object:yt,geometry:Kt,material:we,group:jt}=wt;if(we.side===$t&&yt.layers.test(X.layers)){const lt=we.side;we.side=rn,we.needsUpdate=!0,vl(yt,J,X,Kt,we,jt),we.side=lt,we.needsUpdate=!0,Pe=!0}}Pe===!0&&($.updateMultisampleRenderTarget(Se),$.updateRenderTargetMipmap(Se))}P.setRenderTarget(Me,Ce,Ne),P.setClearColor(Ze,Ye),rt!==void 0&&(X.viewport=rt),P.toneMapping=je}function Dr(S,O,J){const X=O.isScene===!0?O.overrideMaterial:null;for(let q=0,Se=S.length;q<Se;q++){const Ae=S[q],{object:Me,geometry:Ce,group:Ne}=Ae;let je=Ae.material;je.allowOverride===!0&&X!==null&&(je=X),Me.layers.test(J.layers)&&vl(Me,O,J,Ce,je,Ne)}}function vl(S,O,J,X,q,Se){k!==null&&q.isNodeMaterial&&k.setObject(S,q),S.onBeforeRender(P,O,J,X,q,Se),S.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),q.onBeforeRender(P,O,J,X,S,Se),q.transparent===!0&&q.side===$t&&q.forceSinglePass===!1?(q.side=rn,q.needsUpdate=!0,P.renderBufferDirect(J,O,X,q,S,Se),q.side=Ti,q.needsUpdate=!0,P.renderBufferDirect(J,O,X,q,S,Se),q.side=$t):P.renderBufferDirect(J,O,X,q,S,Se),S.onAfterRender(P,O,J,X,q,Se)}function Ur(S,O,J){O.isScene!==!0&&(O=Ue);const X=z.get(S),q=b.state.lights,Se=b.state.shadowsArray,Ae=q.state.version,Me=me.getParameters(S,q.state,Se,O,J,b.state.lightProbeGridArray),Ce=me.getProgramCacheKey(Me);let Ne=X.programs;X.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,X.fog=O.fog;const je=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;X.envMap=Z.get(S.envMap||X.environment,je),X.envMapRotation=X.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Ne===void 0&&(S.addEventListener("dispose",Dn),Ne=new Map,X.programs=Ne);let rt=Ne.get(Ce);if(rt!==void 0){if(X.currentProgram===rt&&X.lightsStateVersion===Ae)return Ml(S,Me),rt}else Me.uniforms=me.getUniforms(S),k!==null&&S.isNodeMaterial&&k.build(S,J,Me),S.onBeforeCompile(Me,P),rt=me.acquireProgram(Me,Ce),Ne.set(Ce,rt),X.uniforms=Me.uniforms;const Pe=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Pe.clippingPlanes=Oe.uniform),Ml(S,Me),X.needsLights=Pd(S),X.lightsStateVersion=Ae,X.needsLights&&(Pe.ambientLightColor.value=q.state.ambient,Pe.lightProbe.value=q.state.probe,Pe.sunLights.value=q.state.sun,Pe.sunLightShadows.value=q.state.sunShadow,Pe.directionalLights.value=q.state.directional,Pe.directionalLightShadows.value=q.state.directionalShadow,Pe.spotLights.value=q.state.spot,Pe.spotLightShadows.value=q.state.spotShadow,Pe.rectAreaLights.value=q.state.rectArea,Pe.ltc_1.value=q.state.rectAreaLTC1,Pe.ltc_2.value=q.state.rectAreaLTC2,Pe.pointLights.value=q.state.point,Pe.pointLightShadows.value=q.state.pointShadow,Pe.hemisphereLights.value=q.state.hemi,Pe.sunShadowMatrix.value=q.state.sunShadowMatrix,Pe.sunShadowCascade.value=q.state.sunShadowCascade,Pe.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Pe.spotLightMatrix.value=q.state.spotLightMatrix,Pe.spotLightMap.value=q.state.spotLightMap,Pe.pointShadowMatrix.value=q.state.pointShadowMatrix),X.lightProbeGrid=b.state.lightProbeGridArray.length>0,X.currentProgram=rt,X.uniformsList=null,rt}function yl(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=Ma.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function Ml(S,O){const J=z.get(S);J.outputColorSpace=O.outputColorSpace,J.batching=O.batching,J.batchingColor=O.batchingColor,J.instancing=O.instancing,J.instancingColor=O.instancingColor,J.instancingMorph=O.instancingMorph,J.skinning=O.skinning,J.morphTargets=O.morphTargets,J.morphNormals=O.morphNormals,J.morphColors=O.morphColors,J.morphTargetsCount=O.morphTargetsCount,J.numClippingPlanes=O.numClippingPlanes,J.numIntersection=O.numClipIntersection,J.vertexAlphas=O.vertexAlphas,J.vertexTangents=O.vertexTangents,J.toneMapping=O.toneMapping}function Ad(S,O){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let J=0,X=S.length;J<X;J++){const q=S[J];if(q.texture!==null&&q.boundingBox.containsPoint(x))return q}return null}function Rd(S,O,J,X,q){O.isScene!==!0&&(O=Ue),$.resetTextureUnits();const Se=O.fog,Ae=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?O.environment:null,Me=Y===null?P.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:at.workingColorSpace,Ce=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Ne=Z.get(X.envMap||Ae,Ce),je=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,rt=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Pe=!!J.morphAttributes.position,dt=!!J.morphAttributes.normal,Dt=!!J.morphAttributes.color;let wt=Gn;X.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(wt=P.toneMapping);const yt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Kt=yt!==void 0?yt.length:0,we=z.get(X),jt=b.state.lights;if(le===!0&&(ue===!0||S!==Q)){const bt=S===Q&&X.id===W;Oe.setState(X,S,bt)}let lt=!1;X.version===we.__version?(we.needsLights&&we.lightsStateVersion!==jt.state.version||we.outputColorSpace!==Me||q.isBatchedMesh&&we.batching===!1||!q.isBatchedMesh&&we.batching===!0||q.isBatchedMesh&&we.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&we.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&we.instancing===!1||!q.isInstancedMesh&&we.instancing===!0||q.isSkinnedMesh&&we.skinning===!1||!q.isSkinnedMesh&&we.skinning===!0||q.isInstancedMesh&&we.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&we.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&we.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&we.instancingMorph===!1&&q.morphTexture!==null||we.envMap!==Ne||X.fog===!0&&we.fog!==Se||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Oe.numPlanes||we.numIntersection!==Oe.numIntersection)||we.vertexAlphas!==je||we.vertexTangents!==rt||we.morphTargets!==Pe||we.morphNormals!==dt||we.morphColors!==Dt||we.toneMapping!==wt||we.morphTargetsCount!==Kt||!!we.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,we.__version=X.version);let gn=we.currentProgram;lt===!0&&(gn=Ur(X,O,q),k&&X.isNodeMaterial&&k.onUpdateProgram(X,gn,we));let Un=!1,li=!1,Zi=!1;const _t=gn.getUniforms(),Pt=we.uniforms;if(_.useProgram(gn.program)&&(Un=!0,li=!0,Zi=!0),X.id!==W&&(W=X.id,li=!0),we.needsLights){const bt=Ad(b.state.lightProbeGridArray,q);we.lightProbeGrid!==bt&&(we.lightProbeGrid=bt,li=!0)}if(Un||Q!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),_t.setValue(N,"projectionMatrix",S.projectionMatrix),_t.setValue(N,"viewMatrix",S.matrixWorldInverse);const hi=_t.map.cameraPosition;hi!==void 0&&hi.setValue(N,fe.setFromMatrixPosition(S.matrixWorld)),w.logarithmicDepthBuffer&&_t.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&_t.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),Q!==S&&(Q=S,li=!0,Zi=!0)}if(we.needsLights&&(jt.state.sunShadowMap.length>0&&_t.setValue(N,"sunShadowMap",jt.state.sunShadowMap,$),jt.state.directionalShadowMap.length>0&&_t.setValue(N,"directionalShadowMap",jt.state.directionalShadowMap,$),jt.state.spotShadowMap.length>0&&_t.setValue(N,"spotShadowMap",jt.state.spotShadowMap,$),jt.state.pointShadowMap.length>0&&_t.setValue(N,"pointShadowMap",jt.state.pointShadowMap,$)),q.isSkinnedMesh){_t.setOptional(N,q,"bindMatrix"),_t.setOptional(N,q,"bindMatrixInverse");const bt=q.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),_t.setValue(N,"boneTexture",bt.boneTexture,$))}q.isBatchedMesh&&(_t.setOptional(N,q,"batchingTexture"),_t.setValue(N,"batchingTexture",q._matricesTexture,$),_t.setOptional(N,q,"batchingIdTexture"),_t.setValue(N,"batchingIdTexture",q._indirectTexture,$),_t.setOptional(N,q,"batchingColorTexture"),q._colorsTexture!==null&&_t.setValue(N,"batchingColorTexture",q._colorsTexture,$));const ui=J.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&B.update(q,J,gn),(li||we.receiveShadow!==q.receiveShadow)&&(we.receiveShadow=q.receiveShadow,_t.setValue(N,"receiveShadow",q.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&O.environment!==null&&(Pt.envMapIntensity.value=O.environmentIntensity),Pt.dfgLUT!==void 0&&(Pt.dfgLUT.value=Cv()),li){if(_t.setValue(N,"toneMappingExposure",P.toneMappingExposure),we.needsLights&&Cd(Pt,Zi),Se&&X.fog===!0&&Fe.refreshFogUniforms(Pt,Se),Fe.refreshMaterialUniforms(Pt,X,ie,ee,b.state.transmissionRenderTarget[S.id]),we.needsLights&&we.lightProbeGrid){const bt=we.lightProbeGrid;Pt.probesSH.value=bt.texture,Pt.probesMin.value.copy(bt.boundingBox.min),Pt.probesMax.value.copy(bt.boundingBox.max),Pt.probesResolution.value.copy(bt.resolution)}Ma.upload(N,yl(we),Pt,$)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ma.upload(N,yl(we),Pt,$),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&_t.setValue(N,"center",q.center),_t.setValue(N,"modelViewMatrix",q.modelViewMatrix),_t.setValue(N,"normalMatrix",q.normalMatrix),_t.setValue(N,"modelMatrix",q.matrixWorld),X.uniformsGroups!==void 0){const bt=X.uniformsGroups;for(let hi=0,Qi=bt.length;hi<Qi;hi++){const bl=bt[hi];ae.update(bl,gn),ae.bind(bl,gn)}}return gn}function Cd(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.sunLights.needsUpdate=O,S.sunLightShadows.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Pd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(S,O,J){const X=z.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),z.get(S.texture).__webglTexture=O,z.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){const J=z.get(S);J.__webglFramebuffer=O,J.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,J=0){Y=S,K=O,L=J;let X=null,q=!1,Se=!1;if(S){const Me=z.get(S);if(Me.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,Me.__webglFramebuffer),te.copy(S.viewport),Ie.copy(S.scissor),Te=S.scissorTest,_.viewport(te),_.scissor(Ie),_.setScissorTest(Te),W=-1;return}else if(Me.__webglFramebuffer===void 0)$.setupRenderTarget(S);else if(Me.__hasExternalTextures)$.rebindTextures(S,z.get(S.texture).__webglTexture,z.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const je=S.depthTexture;if(Me.__boundDepthTexture!==je){if(je!==null&&z.has(je)&&(S.width!==je.image.width||S.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(S)}}const Ce=S.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(Se=!0);const Ne=z.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ne[O])?X=Ne[O][J]:X=Ne[O],q=!0):S.samples>0&&$.useMultisampledRTT(S)===!1?X=z.get(S).__webglMultisampledFramebuffer:Array.isArray(Ne)?X=Ne[J]:X=Ne,te.copy(S.viewport),Ie.copy(S.scissor),Te=S.scissorTest}else te.copy(be).multiplyScalar(ie).floor(),Ie.copy(He).multiplyScalar(ie).floor(),Te=ot;if(J!==0&&(X=G),_.bindFramebuffer(N.FRAMEBUFFER,X)&&_.drawBuffers(S,X),_.viewport(te),_.scissor(Ie),_.setScissorTest(Te),q){const Me=z.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+O,Me.__webglTexture,J)}else if(Se){const Me=O;for(let Ce=0;Ce<S.textures.length;Ce++){const Ne=z.get(S.textures[Ce]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ce,Ne.__webglTexture,J,Me)}}else if(S!==null&&J!==0){const Me=z.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Me.__webglTexture,J)}W=-1};function Sl(S){const O=z.get(S);return(O.__readFormat!==S.format||O.__readType!==S.type)&&(O.__readFormat=S.format,O.__readType=S.type,O.__formatReadable=w.textureFormatReadable(S.format),O.__typeReadable=w.textureTypeReadable(S.type)),O}this.readRenderTargetPixels=function(S,O,J,X,q,Se,Ae,Me=0){if(!(S&&S.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce){_.bindFramebuffer(N.FRAMEBUFFER,Ce);try{const Ne=S.textures[Me],je=Ne.format,rt=Ne.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Me);const Pe=Sl(Ne);if(Pe.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pe.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-X&&J>=0&&J<=S.height-q&&N.readPixels(O,J,X,q,xe.convert(je),xe.convert(rt),Se)}finally{const Ne=Y!==null?z.get(Y).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(S,O,J,X,q,Se,Ae,Me=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce)if(O>=0&&O<=S.width-X&&J>=0&&J<=S.height-q){_.bindFramebuffer(N.FRAMEBUFFER,Ce);const Ne=S.textures[Me],je=Ne.format,rt=Ne.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Me);const Pe=Sl(Ne);if(Pe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const dt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,dt),N.bufferData(N.PIXEL_PACK_BUFFER,Se.byteLength,N.STREAM_READ),N.readPixels(O,J,X,q,xe.convert(je),xe.convert(rt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);const Dt=Y!==null?z.get(Y).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Dt);const wt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await yf(N,wt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,dt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Se),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(dt),N.deleteSync(wt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,J=0){const X=Math.pow(2,-J),q=Math.floor(S.image.width*X),Se=Math.floor(S.image.height*X),Ae=O!==null?O.x:0,Me=O!==null?O.y:0;$.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,J,0,0,Ae,Me,q,Se),_.unbindTexture()},this.copyTextureToTexture=function(S,O,J=null,X=null,q=0,Se=0){let Ae,Me,Ce,Ne,je,rt,Pe,dt,Dt;const wt=S.isCompressedTexture?S.mipmaps[Se]:S.image;if(J!==null)Ae=J.max.x-J.min.x,Me=J.max.y-J.min.y,Ce=J.isBox3?J.max.z-J.min.z:1,Ne=J.min.x,je=J.min.y,rt=J.isBox3?J.min.z:0;else{const Pt=Math.pow(2,-q);Ae=Math.floor(wt.width*Pt),Me=Math.floor(wt.height*Pt),S.isDataArrayTexture?Ce=wt.depth:S.isData3DTexture?Ce=Math.floor(wt.depth*Pt):Ce=1,Ne=0,je=0,rt=0}X!==null?(Pe=X.x,dt=X.y,Dt=X.z):(Pe=0,dt=0,Dt=0);const yt=xe.convert(O.format),Kt=xe.convert(O.type);let we;O.isData3DTexture?($.setTexture3D(O,0),we=N.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?($.setTexture2DArray(O,0),we=N.TEXTURE_2D_ARRAY):($.setTexture2D(O,0),we=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,O.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,O.unpackAlignment);const jt=_.getParameter(N.UNPACK_ROW_LENGTH),lt=_.getParameter(N.UNPACK_IMAGE_HEIGHT),gn=_.getParameter(N.UNPACK_SKIP_PIXELS),Un=_.getParameter(N.UNPACK_SKIP_ROWS),li=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,wt.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,wt.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Ne),_.pixelStorei(N.UNPACK_SKIP_ROWS,je),_.pixelStorei(N.UNPACK_SKIP_IMAGES,rt);const Zi=S.isDataArrayTexture||S.isData3DTexture,_t=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){const Pt=z.get(S),ui=z.get(O),bt=z.get(Pt.__renderTarget),hi=z.get(ui.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,bt.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,hi.__webglFramebuffer);for(let Qi=0;Qi<Ce;Qi++)Zi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(S).__webglTexture,q,rt+Qi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(O).__webglTexture,Se,Dt+Qi)),N.blitFramebuffer(Ne,je,Ae,Me,Pe,dt,Ae,Me,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(q!==0||S.isRenderTargetTexture||z.has(S)){const Pt=z.get(S),ui=z.get(O);_.bindFramebuffer(N.READ_FRAMEBUFFER,F),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,V);for(let bt=0;bt<Ce;bt++)Zi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pt.__webglTexture,q,rt+bt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Pt.__webglTexture,q),_t?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ui.__webglTexture,Se,Dt+bt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ui.__webglTexture,Se),q!==0?N.blitFramebuffer(Ne,je,Ae,Me,Pe,dt,Ae,Me,N.COLOR_BUFFER_BIT,N.NEAREST):_t?N.copyTexSubImage3D(we,Se,Pe,dt,Dt+bt,Ne,je,Ae,Me):N.copyTexSubImage2D(we,Se,Pe,dt,Ne,je,Ae,Me);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _t?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(we,Se,Pe,dt,Dt,Ae,Me,Ce,yt,Kt,wt.data):O.isCompressedArrayTexture?N.compressedTexSubImage3D(we,Se,Pe,dt,Dt,Ae,Me,Ce,yt,wt.data):N.texSubImage3D(we,Se,Pe,dt,Dt,Ae,Me,Ce,yt,Kt,wt):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Se,Pe,dt,Ae,Me,yt,Kt,wt.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Se,Pe,dt,wt.width,wt.height,yt,wt.data):N.texSubImage2D(N.TEXTURE_2D,Se,Pe,dt,Ae,Me,yt,Kt,wt);_.pixelStorei(N.UNPACK_ROW_LENGTH,jt),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,lt),_.pixelStorei(N.UNPACK_SKIP_PIXELS,gn),_.pixelStorei(N.UNPACK_SKIP_ROWS,Un),_.pixelStorei(N.UNPACK_SKIP_IMAGES,li),Se===0&&O.generateMipmaps&&N.generateMipmap(we),_.unbindTexture()},this.initRenderTarget=function(S){z.get(S).__webglFramebuffer===void 0&&$.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?$.setTextureCube(S,0):S.isData3DTexture?$.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?$.setTexture2DArray(S,0):$.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){K=0,L=0,Y=null,_.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const Ui={minX:-44,maxX:44,minZ:-46,maxZ:38,speed:5.4,radius:.46},Wi={x:-4,z:14,name:"Capitã Elara",title:"Guarda dos caminhos"},It={x:-8,z:20},Qu=[0,100,240,440,700],Do=24,_i={name:"A trilha volta a respirar",brumino:3,cerne:2,xp:140,coins:35},Nc={attack:{name:"Golpe de aço",damage:15,cost:0,cooldown:750,range:2.9},cleave:{name:"Ruptura",damage:31,cost:25,cooldown:5e3,range:3.5},nova:{name:"Círculo de alvor",damage:23,cost:35,cooldown:9e3,range:4.1},guard:{name:"Barreira protetora",damage:0,cost:20,cooldown:13e3,range:0},focus:{name:"Pulso de cura",damage:0,cost:25,cooldown:16e3,range:0}},Qs={trainingStaff:{name:"Cajado de aprendiz",description:"Foco rúnico de madeira e cristal.",kind:"weapon",value:0,stack:1,icon:"nova"},trainingBow:{name:"Arco do caminho",description:"Arco de exploração. Uso do Errante.",kind:"weapon",value:0,stack:1,icon:"cleave"},trainingFocus:{name:"Foco de ressonância",description:"Canaliza ondas de cura e impacto.",kind:"weapon",value:0,stack:1,icon:"nova"},dawnStaff:{name:"Cajado da Aurora",description:"+7 de dano. Uso do Arcanista.",kind:"weapon",value:7,stack:1,icon:"nova"},dawnBow:{name:"Arco da Aurora",description:"+7 de dano. Uso do Errante.",kind:"weapon",value:7,stack:1,icon:"cleave"},dawnFocus:{name:"Foco da Aurora",description:"+7 de dano. Uso do Ressonante.",kind:"weapon",value:7,stack:1,icon:"nova"},plateArmor:{name:"Placas da guarda",description:"Placas do Sentinela. Reduz 2 de dano.",kind:"armor",value:2,stack:1,icon:"shield"},clothArmor:{name:"Vestes de ressonância",description:"Tecido. Reduz 1 de dano.",kind:"armor",value:1,stack:1,icon:"shield"},leatherArmor:{name:"Gibão do caminho",description:"Couro do Errante. Reduz 2 de dano.",kind:"armor",value:2,stack:1,icon:"shield"},trainingSword:{name:"Espada de aprendiz",description:"Aço simples. O começo da jornada.",kind:"weapon",value:0,stack:1,icon:"sword"},tunic:{name:"Túnica do vale",description:"Proteção inicial. Reduz 1 de dano.",kind:"armor",value:1,stack:1,icon:"shield"},potion:{name:"Tônico de alvor",description:"Recupera 65 de vida. Recarga de 8 s.",kind:"consumable",value:65,stack:5,icon:"potion"},dawnSword:{name:"Fio da Aurora",description:"+7 de dano em cada golpe.",kind:"weapon",value:7,stack:1,icon:"sword"},barkArmor:{name:"Couraça de cerne",description:"Reduz 4 de dano recebido.",kind:"armor",value:4,stack:1,icon:"shield"},forestBlade:{name:"Lâmina da trilha",description:"+3 de dano em cada golpe.",kind:"weapon",value:3,stack:1,icon:"sword"}},Iv={brumino:{name:"Brumino",hp:64,damage:9,xp:28,coins:6,speed:3,aggro:6.5,range:1.8,interval:1500},cerne:{name:"Cerne errante",hp:108,damage:14,xp:46,coins:10,speed:2.3,aggro:6,range:2.1,interval:2e3}},Lv=[{id:"brumino-1",kind:"brumino",x:-9,z:-6},{id:"brumino-2",kind:"brumino",x:9,z:-10},{id:"brumino-3",kind:"brumino",x:-20,z:-19},{id:"brumino-4",kind:"brumino",x:18,z:-24},{id:"cerne-1",kind:"cerne",x:-10,z:-27},{id:"cerne-2",kind:"cerne",x:8,z:-32},{id:"cerne-3",kind:"cerne",x:25,z:-12}],Ga=[{x:-13,z:23,w:7,d:6,color:14140836,roof:5471609},{x:12,z:23,w:7,d:6,color:15126444,roof:12084552},{x:13,z:11,w:7,d:6,color:14072212,roof:5207925},{x:-15,z:2,w:8,d:6,color:14862764,roof:12084552},{x:27,z:21,w:6,d:6,color:14205856,roof:5138032}];function Fa(s){return()=>{s|=0,s=s+1831565813|0;let e=Math.imul(s^s>>>15,1|s);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}const Uo=Fa(8347),hl=Array.from({length:112},(s,e)=>{let t=0,n=0;do t=-43+Uo()*86,n=-45+Uo()*81;while(Math.abs(t)<5.6||n>-1&&n<32&&Math.abs(t)<30||Lv.some(i=>Math.hypot(i.x-t,i.z-n)<4));return{x:t,z:n,scale:.8+Uo()*.65,type:e%3}}),Nv=[...Ga,...hl.map(s=>({x:s.x,z:s.z,r:.32*s.scale})),{x:-25,z:14,r:2},{x:It.x,z:It.z,r:1.4},{x:Wi.x,z:Wi.z,r:.45},{x:31,z:-31,r:2},{x:-31,z:-28,r:1.7}];function Dv(s,e,t,n,i=.32){const r=e.clone().sub(s),a=r.length();if(a<1e-5)return{position:s.clone(),distance:0,blocked:!1};const o=r.divideScalar(a),c=new Ps(s,o);let l=a;for(const h of t){const f=h.clone().expandByScalar(i);if(f.containsPoint(s)){l=Math.min(l,.45);continue}const g=c.intersectBox(f,new R);g&&(l=Math.min(l,Math.max(.35,g.distanceTo(s)-.04)))}const u=Math.max(1,Math.ceil(l/.3));for(let h=1;h<=u;h++){const f=l*h/u,g=s.clone().addScaledVector(o,f);if(g.y<n(g.x,g.z)+i){l=Math.max(.35,l*(h-1)/u);break}}const d=s.clone().addScaledVector(o,l);return d.y=Math.max(d.y,n(d.x,d.z)+i),{position:d,distance:l,blocked:l<a-.001}}function vd(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new At;let l=0;for(let u=0;u<s.length;++u){const d=s[u];let h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0;const d=[];for(let h=0;h<s.length;++h){const f=s[h].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+u);u+=s[h].attributes.position.count}c.setIndex(d)}for(const u in r){const d=ju(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<d;++h){const f=[];for(let y=0;y<a[u].length;++y)f.push(a[u][y][h]);const g=ju(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}}return c}function ju(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){const u=s[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const a=new e(r),o=new Qt(a,t,n);let c=0;for(let l=0;l<s.length;++l){const u=s[l];if(u.isInterleavedBufferAttribute){const d=c/t;for(let h=0,f=u.count;h<f;h++)for(let g=0;g<t;g++){const y=u.getComponent(h,g);o.setComponent(h+d,g,y)}}else a.set(u.array,c);c+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function eh(s,e){if(e===of)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ec||e===Nh){let t=s.getIndex();if(t===null){const r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Ec)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function ct(s,e=.82){return new Bt({color:s,roughness:e,metalness:e<.5?.3:0})}function de(s,e,t=0,n=0,i=0,r){const a=new Et(s,e);return a.position.set(t,n,i),a.castShadow=!0,a.receiveShadow=!0,r?.add(a),a}const xt=(s,e,t,n,i,r,a,o)=>de(new Is(s,e,t),n,i,r,a,o);function Mt(s,e,t,n,i,r,a){const o=de(new Ki(s,16,12),t,n,i,r,a);return o.scale.set(...e),o}function an(s,e,t,n,i,r){const a=e.clone().sub(s),o=de(new Rt(n,t,a.length(),10),i,0,0,0,r);return o.position.copy(s).add(e).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new R(0,1,0),a.normalize()),o}function Oa(s,e=[]){s.updateWorldMatrix(!0,!0);const t=s.matrixWorld.clone().invert(),n=new Map,i=[];function r(a){if(!e.includes(a))if(a instanceof Et&&a.material instanceof Bt){const o=a.material,c=[o.roughness,o.metalness,o.emissive.getHex(),o.emissiveIntensity,o.side].join("_");let l=n.get(c);l||(l={geos:[],mat:new Bt({vertexColors:!0,roughness:o.roughness,metalness:o.metalness,emissive:o.emissive,emissiveIntensity:o.emissiveIntensity,side:o.side})},n.set(c,l));let u=a.geometry.clone();u.index&&(u=u.toNonIndexed()),u.applyMatrix4(t.clone().multiply(a.matrixWorld)),u.deleteAttribute("uv");const d=[];for(let h=0;h<u.attributes.position.count;h++)d.push(o.color.r,o.color.g,o.color.b);u.setAttribute("color",new nt(d,3)),l.geos.push(u),i.push(a)}else for(const o of a.children.slice())r(o)}for(const a of s.children.slice())r(a);for(const a of i)a.removeFromParent();for(const{geos:a,mat:o}of n.values()){const c=vd(a,!1);c&&de(c,o,0,0,0,s),a.forEach(l=>l.dispose())}}function gr(s=3105661,e=!1,t="valdarios",n="sentinela",i=0){const r=new ut,a=new ut;r.add(a);const c=ct({valdarios:[13210997,9263944,15121304],kordranios:[8226185,6121838,10064254],eluvios:[10994094,8167318,12634289],naquiros:[7383476,6589854,10338491]}[t][i%3]),l=ct(s),u=ct(2701891),d=ct(5718836),h=ct(9545388,.35),f=ct(13346156,.38),g=ct(2503738),y=new Bt({color:9295827,emissive:4237227,emissiveIntensity:.7,roughness:.3}),p=new ut,m=new ut;p.position.set(-.18,.88,0),m.position.set(.18,.88,0),a.add(p,m);for(const L of[p,m])an(new R,new R(0,-.39,.025),.145,.12,u,L),an(new R(0,-.4,.025),new R(0,-.76,0),.115,.105,n==="sentinela"?h:d,L),Mt(.15,[1.05,.65,1.6],g,0,-.77,.08,L),n==="sentinela"&&Mt(.14,[1,.8,.28],f,0,-.38,.115,L);const M=new al([new oe(.255,-.33),new oe(.275,-.19),new oe(.35,.13),new oe(.385,.25),new oe(.31,.34)],18),T=de(M,n==="sentinela"?h:l,0,1.31,0,a);T.scale.z=.72;for(const L of[-1,1]){const Y=new ni;Y.moveTo(0,.23),Y.lineTo(L*.29,.31),Y.quadraticCurveTo(L*.33,.1,L*.12,-.08),Y.lineTo(0,-.16),Y.closePath(),de(new Gi(Y,{depth:.027,bevelEnabled:!0,bevelSize:.018,bevelThickness:.012,bevelSegments:2}),n==="sentinela"?f:d,0,1.36,.205,a);const W=xt(.022,.31,.024,f,L*.18,1.25,.252,a);W.rotation.z=L*-.25}const x=new ni;x.moveTo(-.18,0),x.lineTo(.18,0),x.lineTo(.22,-.54),x.lineTo(0,-.67),x.lineTo(-.22,-.54),x.closePath(),de(new Cr(x),l,0,.97,.275,a);for(const L of[-1,1]){const Y=xt(.018,.52,.018,f,L*.2,.72,.29,a);Y.rotation.z=L*.075}const E=de(new Rt(.29,.31,.17,10),d,0,.95,0,a);E.scale.z=.7,xt(.12,.13,.05,f,0,.95,.23,a);const b=de(new Rt(.37,.34,.12,10),f,0,1.62,0,a);if(b.scale.z=.68,n==="sentinela")Mt(.27,[1.03,1,.4],l,0,1.36,.18,a),de(new Lt(.105),y,0,1.38,.32,a);else{de(new Rt(.25,n==="errante"?.34:.45,n==="errante"?.35:.78,10,1,!0),new Bt({color:s,roughness:.9,side:$t}),0,n==="errante"?.79:.59,0,a);for(const L of[-.23,.23]){const Y=xt(.035,.65,.04,f,L,.65,.29,a);Y.rotation.z=L*.45}de(new Lt(.08),y,0,1.46,.25,a)}an(new R(0,1.65,0),new R(0,1.87,0),.12,.11,c,a);const C=a.children.length;Mt(.265,[.88,1.08,.86],c,0,2.06,0,a);for(const L of[-1,1])Mt(.075,[1.1,.58,.55],c,L*.134,2.005,.181,a);Mt(.19,[1,.72,.9],c,0,1.92,.035,a),Mt(.052,[.65,1.3,1.05],c,0,2.025,.224,a);const v=ct(t==="naquiros"?12363637:t==="eluvios"?4694686:3491404),A=ct(14999249);for(const L of[-.091,.091]){Mt(.035,[1.05,.48,.25],A,L,2.075,.225,a),Mt(.02,[.65,.75,.3],v,L,2.074,.233,a);const Y=Mt(.056,[1,.16,.24],u,L,2.119,.222,a);Y.rotation.z=L>0?.09:-.09,t!=="naquiros"&&Mt(.065,[.6,1,.65],c,L>0?.241:-.241,2.055,0,a)}if(xt(.1,.014,.012,ct(8478289),0,1.94,.238,a),t==="naquiros"){for(const L of[-1,1]){const Y=de(new on(.12,.3,3),ct(4816273),L*.27,2.08,-.02,a);Y.rotation.z=L*-1.1,Y.scale.z=.25;for(let W=0;W<3;W++){const Q=Mt(.024,[1.7,.55,.2],f,L*(.1+W*.035),1.985-W*.025,.2,a);Q.rotation.z=L*.3}}for(let L=0;L<4;L++){const Y=de(new on(.1,.26+L*.045,4),l,0,2.31,-.03-L*.055,a);Y.rotation.x=-.2-L*.18}}else{const L=t==="kordranios"?4410450:t==="eluvios"?[14079163,3361365,8415111][i%3]:[3944490,12028501,2305078][i%3],Y=ct(L),W=de(new Ki(.29,12,8,0,Math.PI*2,0,Math.PI*.52),Y,0,2.12,-.025,a);W.scale.set(.85,1.07,.92),W.rotation.x=-.13;for(let Q=0;Q<5;Q++){const te=Mt(.11,[.7,.86,.65],Y,(Q-2)*.09,2.26+Math.sin(Q*1.7)*.02,.13,a);te.rotation.z=-.45+(Q-2)*-.12}if(t==="kordranios"){Mt(.17,[1.1,1,.75],Y,0,1.88,.18,a);for(const Q of[-1,1])de(new Lt(.045),f,Q*.13,1.82,.27,a)}if(t==="eluvios")for(const Q of[-1,1]){const te=de(new on(.065,.27,4),f,Q*.21,2.24,.01,a);te.rotation.z=Q*-.5}}const P=new ut;P.position.y=2.06;for(const L of a.children.slice(C))L.removeFromParent(),L.position.y-=2.06,P.add(L);P.scale.setScalar(.9),a.add(P);for(const L of[-1,1])Mt(n==="sentinela"?.25:.18,[1.22,.57,1.08],n==="sentinela"?h:l,L*.42,1.6,0,a),n==="sentinela"&&(Mt(.2,[1.1,.31,1],f,L*.45,1.66,0,a),de(new Lt(.065),y,L*.48,1.66,.12,a));const I=new ut;I.position.set(-.45,1.53,0),a.add(I);const k=new ut;k.position.set(.45,1.53,0),a.add(k),r.userData.otherArm=k;for(const L of[I,k])an(new R,new R(0,-.31,.04),.115,.105,l,L),an(new R(0,-.32,.04),new R(0,-.57,.09),.1,.075,n==="sentinela"?h:d,L),Mt(.105,[.75,1,.7],c,0,-.6,.1,L);const G=new zn(.65,.95,6,6),F=G.attributes.position;for(let L=0;L<F.count;L++){const Y=F.getY(L);F.setX(L,F.getX(L)*(1.1-Y*.4)),F.setZ(L,.06*Math.cos(F.getX(L)*12)+Math.max(0,-Y)*.2)}G.computeVertexNormals();const V=de(G,new Bt({color:n==="errante"?3758919:s,roughness:.9,side:$t}),0,1.12,-.25,a);V.rotation.x=.12,r.userData.cape=V;let K;if(n==="sentinela"){const L=new ut;L.position.set(0,-.62,.16),L.rotation.x=Math.PI*.68,I.add(L);const Y=new ni;Y.moveTo(-.075,0),Y.lineTo(-.07,.83),Y.lineTo(0,1.08),Y.lineTo(.07,.83),Y.lineTo(.075,0),Y.closePath(),K=de(new Gi(Y,{depth:.035,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:1}),h,0,0,0,L),xt(.32,.06,.075,f,0,-.02,0,L),an(new R(0,-.24,.02),new R(0,0,.02),.045,.045,d,L),de(new Lt(.065),f,0,-.25,.02,L);const W=new ni;W.moveTo(-.28,.39),W.lineTo(.28,.39),W.lineTo(.33,-.08),W.quadraticCurveTo(.16,-.39,0,-.48),W.quadraticCurveTo(-.16,-.39,-.33,-.08),W.closePath(),de(new Gi(W,{depth:.09,bevelEnabled:!0,bevelSize:.025,bevelThickness:.015,bevelSegments:1}),f,.1,-.31,.3,k),de(new Cr(W),l,.1,-.31,.415,k).scale.setScalar(.83),de(new Lt(.11),y,.1,-.26,.46,k).scale.set(.65,1.4,.3)}else if(n==="errante"){const L=Array.from({length:19},(Y,W)=>{const Q=-Math.PI/2+W/18*Math.PI;return new R(Math.cos(Q)*.28,Math.sin(Q)*.73,0)});de(new ol(new $h(L),20,.035,6,!1),d,0,-.3,.18,I),an(new R(0,.43,.18),new R(0,-1.03,.18),.009,.009,f,I),an(new R(.23,1.1,-.4),new R(.14,1.72,-.3),.13,.14,d,a);for(let Y=0;Y<3;Y++)an(new R(.08+Y*.065,1.5,-.33),new R(.14+Y*.065,1.95,-.34),.012,.012,f,a),de(new on(.055,.16,3),l,.14+Y*.065,1.96,-.34,a)}else{an(new R(0,-1.2,.16),new R(0,.62,.16),.038,.032,d,I);const L=de(new Lt(.18),y,0,.75,.16,I);L.scale.y=1.45;const Y=de(new Pn(.24,.026,5,24),f,0,.75,.16,I);if(Y.rotation.y=.4,n==="ressonante"){const W=de(new Pn(.35,.022,5,28),f,0,.75,.16,I);W.rotation.y=1.1}}if(t==="kordranios"){r.scale.set(1.17,.82,1.1);for(const L of[-1,1]){const Y=de(new Lt(.035),f,L*.18,2.06,.2,a);Y.scale.y=2}}if(t==="eluvios"){r.scale.set(.91,1.1,.92);for(const L of[-1,1]){const Y=an(new R(L*.09,1.94,.197),new R(L*.15,2.035,.208),.009,.005,y,P);Y.position.y-=2.06}}t==="naquiros"&&r.scale.set(.96,1.03,.94),Oa(a,[p,m,I,k,V]);for(const L of[p,m,I,k])Oa(L,K?[K]:[]);return r.userData.artStatus="provisional-original-procedural",r.userData.classId=n,r.userData.race=t,{root:r,body:a,left:p,right:m,arm:I,sword:K}}function th(s){const e=new ut,t=new ut,n=new ut,i=new ut,r=new ut;e.add(t),t.add(n,i,r);const a=ct(3881287),o=ct(6708594),c=ct(6905422),l=ct(5075815),u=ct(12696227),d=new Bt({color:12885461,emissive:9392253,emissiveIntensity:1});if(s==="brumino"){Mt(.72,[.85,.82,1.35],o,0,.83,0,t),Mt(.45,[1,.85,1.08],a,0,.88,.73,t),Mt(.27,[1,.65,.65],o,0,.71,1.07,t);for(const h of[-1,1]){const f=de(new on(.14,.33,5),a,h*.3,1.2,.63,t);f.rotation.z=h*-.4;const g=de(new on(.067,.3,7),u,h*.22,.68,1.13,t);g.rotation.x=-.5,Mt(.058,[.75,.65,.5],d,h*.29,.98,.99,t)}for(let h=0;h<5;h++){const f=de(new on(.14,.3+h%2*.18,5),l,0,1.44,-.5+h*.23,t);f.rotation.x=-.3}n.position.y=i.position.y=.63;for(const[h,f]of[n,i].entries())for(const g of[-.43,.44])an(new R(h?.37:-.37,0,g),new R(h?.37:-.37,-.49,g+.03),.13,.09,a,f),Mt(.12,[1,.65,1.3],u,h?.37:-.37,-.5,g+.07,f)}else{Mt(.75,[.95,1.15,.65],c,0,1.32,0,t),Mt(.39,[1,.9,.85],o,0,2.2,0,t),de(new Lt(.19),d,0,1.42,.48,t);for(const h of[-1,1]){Mt(.075,[1,.5,.45],d,h*.15,2.24,.3,t);const f=de(new Rt(.04,.1,.72,5),c,h*.32,2.63,-.02,t);f.rotation.z=h*-.47,Mt(.24,[1.5,.6,1.2],l,h*.69,1.91,0,t),an(new R(h*.74,1.72,0),new R(h*.94,.83,.16),.18,.13,c,r)}n.position.set(-.32,.91,0),i.position.set(.32,.91,0);for(const h of[n,i])an(new R,new R(.02,-.69,.06),.18,.14,c,h),Mt(.23,[1,.6,1.3],o,0,-.74,.11,h);for(let h=0;h<5;h++)de(new Lt(.18),l,h%2?-.25:.25,1.12+h*.13,.38,t).scale.set(1.3,.7,.6)}Oa(t,[n,i,r]);for(const h of[n,i,r])Oa(h);return{root:e,body:t,left:n,right:i,arm:r}}function js(s,e,t,n=1){const i=e?Math.sin(t*9*n):0;s.left.rotation.x=i*.52,s.right.rotation.x=-i*.52,s.arm.rotation.x=-i*.25,s.body.position.y=e?Math.abs(i)*.052:Math.sin(t*1.8)*.016;const r=s.root.userData.otherArm;r&&(r.rotation.x=i*.25);const a=s.root.userData.cape;a&&(a.rotation.x=.12+Math.sin(t*2.4)*.035+(e?.14:0),a.rotation.z=Math.sin(t*2)*.025)}function Bi(s,e="#f2e7cf",t){const n=document.createElement("canvas");n.width=512,n.height=100;const i=n.getContext("2d");i.font="600 28px Segoe UI, sans-serif",i.textAlign="center",i.textBaseline="middle",i.shadowColor="#10222f",i.shadowBlur=7,i.fillStyle=e,i.fillText(s,256,34),t!==void 0&&(i.shadowBlur=0,i.fillStyle="#15232fe8",i.fillRect(95,70,322,10),i.fillStyle="#cf7a72",i.fillRect(98,73,316*Math.max(0,Math.min(1,t)),4));const r=new vs(new Zc({map:new il(n),depthTest:!1,transparent:!0}));return r.scale.set(4.1,.8,1),r}function er(s){s.material.map?.dispose(),s.material.dispose()}function Uv(s){const e=new Map,t=new Map,n=s.clone();return yd(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function yd(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)yd(s.children[n],e.children[n],t)}class Fv extends Us{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Vv(t)}),this.register(function(t){return new Hv(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new Wv(t)}),this.register(function(t){return new Xv(t)}),this.register(function(t){return new qv(t)}),this.register(function(t){return new $v(t)}),this.register(function(t){return new zv(t)}),this.register(function(t){return new Yv(t)}),this.register(function(t){return new Gv(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new Bv(t)}),this.register(function(t){return new nh(t,it.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new nh(t,it.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ey(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=mr.extractUrlBase(e);a=mr.resolveURL(l,this.path)}else a=mr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ad(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Md){try{a[it.KHR_BINARY_GLTF]=new ty(e)}catch(d){i&&i(d);return}r=JSON.parse(a[it.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new py(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case it.KHR_MATERIALS_UNLIT:a[d]=new kv;break;case it.KHR_DRACO_MESH_COMPRESSION:a[d]=new ny(r,this.dracoLoader);break;case it.KHR_TEXTURE_TRANSFORM:a[d]=new iy;break;case it.KHR_MESH_QUANTIZATION:a[d]=new sy;break;default:h.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Ov(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Nt(s,e,t){const n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const it={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Bv{constructor(e){this.parser=e,this.name=it.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new ze(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],mn);const d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ld(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new cd(u),l.distance=d;break;case"spot":l=new _m(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Bn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class kv{constructor(){this.name=it.KHR_MATERIALS_UNLIT}getMaterialType(){return nn}extendParams(e,t,n){const i=[];e.color=new ze(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],mn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,kt))}return Promise.all(i)}}class zv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Vv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(r,r)}return Promise.all(i)}}class Hv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Gv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class Wv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],mn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,kt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Xv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class qv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(r[0],r[1],r[2],mn),Promise.all(i)}}class $v{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class Yv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(r[0],r[1],r[2],mn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,kt)),Promise.all(i)}}class Kv{constructor(e){this.parser=e,this.name=it.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class Jv{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?Yn:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Zv{constructor(e){this.parser=e,this.name=it.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Qv{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class jv{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class nh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,d=i.byteStride,h=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,h,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(f),u,d,h,i.mode,i.filter),f})})}else return null}}class ey{constructor(e){this.name=it.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==xn.TRIANGLES&&l.mode!==xn.TRIANGLE_STRIP&&l.mode!==xn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),d=u.isGroup?u.children:[u],h=l[0].count,f=[];for(const g of d){const y=new Je,p=new R,m=new ci,M=new R(1,1,1),T=new wc(g.geometry,g.material,h);for(let E=0;E<h;E++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,E),c.SCALE&&M.fromBufferAttribute(c.SCALE,E),T.setMatrixAt(E,y.compose(p,m,M));let x=null;for(const E in c)if(E==="_COLOR_0"){const b=c[E];T.instanceColor=new Pa(b.array,b.itemSize,b.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(x===null){const C=T.geometry;x=new At,x.name=C.name;for(const v in C.attributes)x.setAttribute(v,C.attributes[v]);for(const v in C.morphAttributes)x.morphAttributes[v]=C.morphAttributes[v];C.index!==null&&x.setIndex(C.index),x.morphTargetsRelative=C.morphTargetsRelative;for(const v of C.groups)x.addGroup(v.start,v.count,v.materialIndex);C.boundingBox!==null&&(x.boundingBox=C.boundingBox.clone()),C.boundingSphere!==null&&(x.boundingSphere=C.boundingSphere.clone()),x.drawRange.start=C.drawRange.start,x.drawRange.count=C.drawRange.count,x.userData=Object.assign({},C.userData),T.geometry=x}const b=c[E];x.setAttribute(E,new Pa(b.array,b.itemSize,b.normalized))}Tt.prototype.copy.call(T,g),this.parser.assignFinalMaterial(T),f.push(T)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Md="glTF",tr=12,ih={JSON:1313821514,BIN:5130562};class ty{constructor(e){this.name=it.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,tr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Md)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-tr,r=new DataView(e,tr);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===ih.JSON){const l=new Uint8Array(e,tr+a,o);this.content=n.decode(l)}else if(c===ih.BIN){const l=tr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ny{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=it.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const d=Dc[u]||u.toLowerCase();o[d]=a[u]}for(const u in e.attributes){const d=Dc[u]||u.toLowerCase();if(a[u]!==void 0){const h=n.accessors[e.attributes[u]],f=Es[h.componentType];l[d]=f.name,c[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){i.decodeDracoFile(u,function(f){for(const g in f.attributes){const y=f.attributes[g],p=c[g];p!==void 0&&(y.normalized=p)}d(f)},o,l,mn,h)})})}}class iy{constructor(){this.name=it.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){const n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}}class sy{constructor(){this.name=it.KHR_MESH_QUANTIZATION}}class Sd extends Ls{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,d=(n-t)/u,h=d*d,f=h*d,g=e*l,y=g-l,p=-2*f+3*h,m=f-h,M=1-p,T=m-h+d;for(let x=0;x!==o;x++){const E=a[y+x+o],b=a[y+x+c]*u,C=a[g+x+o],v=a[g+x]*u;r[x]=M*E+T*b+p*C+m*v}return r}}const ry=new ci;class ay extends Sd{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return ry.fromArray(r).normalize().toArray(r),r}}const xn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Es={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sh={9728:Vt,9729:Ht,9984:wh,9985:ma,9986:sr,9987:ti},rh={33071:Vn,33648:Ta,10497:qi},Fo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Dc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},oy={CUBICSPLINE:void 0,LINEAR:Mr,STEP:yr},Oo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function cy(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Bt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ti})),s.DefaultMaterial}function Ni(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Bn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ly(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const d=e[l];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):s.attributes.position;a.push(h)}if(i){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):s.attributes.normal;o.push(h)}if(r){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):s.attributes.color;c.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],d=l[1],h=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=d),r&&(s.morphAttributes.color=h),s.morphTargetsRelative=!0,s})}function uy(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function hy(s){let e;const t=s.extensions&&s.extensions[it.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Bo(t.attributes):e=s.indices+":"+Bo(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Bo(s.targets[n]);return e}function Bo(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Uc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function dy(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const fy=new Je;class py{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ov,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new pm(this.options.manager):this.textureLoader=new ym(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ad(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ni(r,o,i),Bn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[it.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(mr.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Fo[i.type],o=Es[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Qt(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Fo[i.type],l=Es[i.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,h=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let y,p;if(f&&f!==d){const m=Math.floor(h/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let T=t.cache.get(M);T||(y=new l(o,m*f,i.count*f/u),T=new zh(y,f/u),t.cache.add(M,T)),p=new Er(T,c,h%f/u,g)}else o===null?y=new l(i.count*c):y=new l(o,h,i.count*c),p=new Qt(y,c,g);if(i.sparse!==void 0){const m=Fo.SCALAR,M=Es[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,E=new M(a[1],T,i.sparse.count*m),b=new l(a[2],x,i.sparse.count*c);o!==null&&(p=new Qt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let C=0,v=E.length;C<v;C++){const A=E[C];if(p.setX(A,b[C*c]),c>=2&&p.setY(A,b[C*c+1]),c>=3&&p.setZ(A,b[C*c+2]),c>=4&&p.setW(A,b[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const h=(r.samplers||{})[a.sampler]||{};return u.magFilter=sh[h.magFilter]||Ht,u.minFilter=sh[h.minFilter]||ti,u.wrapS=rh[h.wrapS]||qi,u.wrapT=rh[h.wrapT]||qi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Vt&&u.minFilter!==Ht,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;const h=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(h),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(d){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(y){const p=new Gt(y);p.needsUpdate=!0,h(p)}),t.load(mr.resolveURL(d,r.path),g,void 0,f)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),Bn(d,a),d.userData.mimeType=a.mimeType||dy(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[it.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[it.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[it.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new nl,En.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Gh,En.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Bt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[it.KHR_MATERIALS_UNLIT]){const d=i[it.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{const d=r.pbrMetallicRoughness||{};if(o.color=new ze(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],mn),o.opacity=h[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,kt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=$t);const u=r.alphaMode||Oo.OPAQUE;if(u===Oo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Oo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==nn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new oe(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==nn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==nn){const d=r.emissiveFactor;o.emissive=new ze().setRGB(d[0],d[1],d[2],mn)}return r.emissiveTexture!==void 0&&a!==nn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,kt)),Promise.all(l).then(function(){const d=new a(o);return r.name&&(d.name=r.name),Bn(d,r),t.associations.set(d,{materials:e}),r.extensions&&Ni(i,d,r),d})}createUniqueName(e){const t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[it.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return ah(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=hy(l),d=i[u];if(d)a.push(d.promise);else{let h;l.extensions&&l.extensions[it.KHR_DRACO_MESH_COMPRESSION]?h=r(l):h=ah(new At,l,t),l.mode===xn.TRIANGLE_STRIP?h=h.then(f=>eh(f,Nh)):l.mode===xn.TRIANGLE_FAN&&(h=h.then(f=>eh(f,Ec))),i[u]={primitive:l,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?cy(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let f=0,g=u.length;f<g;f++){const y=u[f],p=a[f];let m;const M=l[f];if(p.mode===xn.TRIANGLES||p.mode===xn.TRIANGLE_STRIP||p.mode===xn.TRIANGLE_FAN||p.mode===void 0){const T=r.isSkinnedMesh===!0,x=y.hasAttribute("skinIndex")&&y.hasAttribute("skinWeight");T&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=T&&x?new ap(y,M):new Et(y,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(p.mode===xn.LINES)m=new up(y,M);else if(p.mode===xn.LINE_STRIP)m=new tl(y,M);else if(p.mode===xn.LINE_LOOP)m=new hp(y,M);else if(p.mode===xn.POINTS)m=new Wh(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&uy(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Bn(m,r),p.extensions&&Ni(i,m,p),t.assignFinalMaterial(m),d.push(m)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Ni(i,d[0],r),d[0];const h=new ut;r.extensions&&Ni(i,h,r),t.associations.set(h,{meshes:e});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(Hi.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new za(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Bn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const d=a[l];if(d){o.push(d);const h=new Je;r!==null&&h.fromArray(r.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new jc(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let d=0,h=i.channels.length;d<h;d++){const f=i.channels[d],g=i.samplers[f.sampler],y=f.target,p=y.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",M)),l.push(g),u.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){const h=d[0],f=d[1],g=d[2],y=d[3],p=d[4],m=[];for(let T=0,x=h.length;T<x;T++){const E=h[T],b=f[T],C=g[T],v=y[T],A=p[T];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const P=n._createAnimationTracks(E,b,C,v,A);if(P)for(let I=0;I<P.length;I++)m.push(P[I])}const M=new om(r,void 0,m);return Bn(M,i),M})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],d=l[1],h=l[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,fy)});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);if(u.userData.pivot!==void 0&&d.length>0){const f=u.userData.pivot,g=d[0];u.pivot=new R().fromArray(f),u.position.x-=f[0],u.position.y-=f[1],u.position.z-=f[2],g.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Hh:l.length>1?u=new ut:l.length===1?u=l[0]:u=new Tt,u!==l[0])for(let d=0,h=l.length;d<h;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=a),Bn(u,r),r.extensions&&Ni(n,u,r),r.matrix!==void 0){const d=new Je;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new ut;n.name&&(r.name=i.createUniqueName(n.name)),Bn(r,n),n.extensions&&Ni(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,d=c.length;u<d;u++){const h=c[u];h.parent!==null?r.add(Uv(h)):r.add(h)}const l=u=>{const d=new Map;for(const[h,f]of i.associations)(h instanceof En||h instanceof Gt)&&d.set(h,f);return u.traverse(h=>{const f=i.associations.get(h);f!=null&&d.set(h,f)}),d};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}xi[r.path]===xi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(xi[r.path]){case xi.weights:u=Pr;break;case xi.rotation:u=Ir;break;case xi.translation:case xi.scale:u=Ua;break;default:n.itemSize===1?u=Pr:u=Ua;break}const d=i.interpolation!==void 0?oy[i.interpolation]:Mr,h=this._getArrayFromAccessor(n);for(let f=0,g=c.length;f<g;f++){const y=new u(c[f]+"."+xi[r.path],t.array,h,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),a.push(y)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Uc(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ir?ay:Sd;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function my(s,e,t){const n=e.attributes,i=new bn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),o.normalized){const u=Uc(Es[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new R,c=new R;for(let l=0,u=r.length;l<u;l++){const d=r[l];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){const y=Uc(Es[h.componentType]);c.multiplyScalar(y)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new qn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function ah(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=Dc[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return at.workingColorSpace!==mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),Bn(s,e),my(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?ly(s,e.targets,t):s})}const oh={resonator:{id:"EDF-RESONATOR-001",url:"/art/resonator.gltf"}};function gy(s,e=oh.resonator.url){const t=new ut;t.add(s),t.userData.assetState="loading",t.userData.assetId=oh.resonator.id;let n=!1;const r=new Fv().loadAsync(e).then(a=>{if(n){ko(a.scene);return}let o=0;if(a.scene.traverse(c=>{c instanceof Et&&(o++,c.castShadow=c.receiveShadow=!0)}),!o)throw new Error("Asset contains no renderable mesh");t.remove(s),ko(s),t.add(a.scene),t.userData.assetState="loaded"}).catch(()=>{n||(t.userData.assetState="fallback",console.warn("EDF art: local resonator unavailable; procedural fallback retained."))});return{root:t,ready:r,dispose(){n=!0,ko(t),t.clear()}}}function ko(s){s.traverse(e=>{if(e instanceof Et){e.geometry.dispose();for(const t of Array.isArray(e.material)?e.material:[e.material])t.dispose()}})}function Di(s,e,t,n,i){const r=e.clone().sub(s),a=de(new Rt(t*.7,t,r.length(),7),n,0,0,0,i);return a.position.copy(s).add(e).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new R(0,1,0),r.normalize()),a}function _y(s){s.updateMatrixWorld(!0);const e=new Map,t=[];s.traverse(n=>{if(!(n instanceof Et)||!(n.material instanceof Bt)||n.material.transparent)return;const i=n.material,r=[i.roughness,i.metalness,i.emissive.getHex(),i.emissiveIntensity,i.side,n.castShadow].join("_");let a=e.get(r);if(!a){const d=new Bt({vertexColors:!0,roughness:i.roughness,metalness:i.metalness,emissive:i.emissive,emissiveIntensity:i.emissiveIntensity,side:i.side});a={geos:[],mat:d,shadow:n.castShadow},e.set(r,a)}let o=n.geometry.clone();o.index&&(o=o.toNonIndexed()),o.applyMatrix4(n.matrixWorld),o.deleteAttribute("uv");const c=o.attributes.position,l=o.getAttribute("color"),u=[];for(let d=0;d<c.count;d++)u.push(i.color.r*(l?l.getX(d):1),i.color.g*(l?l.getY(d):1),i.color.b*(l?l.getZ(d):1));o.setAttribute("color",new nt(u,3)),a.geos.push(o),t.push(n)});for(const n of t)n.removeFromParent();for(const{geos:n,mat:i,shadow:r}of e.values()){const a=vd(n,!1);if(a){const o=de(a,i,0,0,0,s);o.castShadow=r}n.forEach(o=>o.dispose())}}function ch(){const s=document.createElement("canvas");s.width=s.height=128;const e=s.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,.8)"),t.addColorStop(.15,"rgba(255,255,255,.3)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new il(s)}function lh(s,e="vigilia"){const t=new ut,n=new ut,i=new ut;t.add(n,i),s.add(t);const r=e==="confluencia",a=Fa(479),o={grass:r?4287589:6652250,forest:r?3431781:4155224,stone:r?9609128:11578777,roof:r?5327984:2838369,leaves:r?[8881071,7311258,8091033]:[5077338,7443818,10136436],gold:r?12425852:12886885},c=ct(o.stone),l=ct(o.gold,.42),u=ct(5589824),d=ct(o.roof),h=ct(3490890),f=new zn(160,160,110,110);f.rotateX(-Math.PI/2);const g=[],y=f.attributes.position,p=new ze,m=new ze(o.grass),M=new ze(o.forest),T=new ze(r?10267555:11904908);for(let U=0;U<y.count;U++){const H=y.getX(U),w=y.getZ(U);y.setY(U,Ot(H,w)-.055),p.copy(m).lerp(M,Hi.clamp((-w+5)/60,0,1));const _=Math.max(1-Hi.smoothstep(Math.abs(H),1.5,3.8),w>4?1-Hi.smoothstep(Math.hypot(H*.9,(w-19)*.8),7,13):0,Math.abs(w-15)<1.7&&Math.abs(H)<28?1-Math.abs(w-15)/2:0);p.lerp(T,Math.max(0,Math.min(1,_))*.92).multiplyScalar(.93+a()*.13),g.push(p.r,p.g,p.b)}f.setAttribute("color",new nt(g,3)),f.computeVertexNormals();const x=document.createElement("canvas");x.width=x.height=256;const E=x.getContext("2d");E.fillStyle="#d1d1c4",E.fillRect(0,0,256,256);for(let U=0;U<8500;U++){const H=a()*256,w=a()*256,_=120+Math.floor(a()*90);E.strokeStyle="rgba("+_+","+_+","+(_-7)+",.18)",E.lineWidth=.5+a()*1.3,E.beginPath(),E.moveTo(H,w),E.lineTo(H+a()*4-2,w+a()*5-2),E.stroke()}const b=new il(x);b.wrapS=b.wrapT=qi,b.repeat.set(36,36),b.colorSpace=kt,b.anisotropy=4;const C=de(f,new Bt({vertexColors:!0,roughness:1,map:b,bumpMap:b,bumpScale:.08}),0,0,0,t);C.castShadow=!1;const v=ct(r?8360855:10525570);for(let U=0;U<44;U++){const H=U*Math.PI*2/44,w=xt(.78,.09,1.3,v,Math.sin(H)*6,.015,24+Math.cos(H)*6,n);w.rotation.y=H}for(const U of[4.8,6.8]){const H=de(new Pn(U,.032,4,96),l,0,.055,24,n);H.rotation.x=Math.PI/2,H.castShadow=!1}for(let U=0;U<700;U++){const H=(a()-.5)*80,w=a()*74-43;if(Math.abs(H)>2.25||w>5&&w<29)continue;const _=de(new Rt(.15+a()*.17,.22,.05,6),ct(10788488),H,Ot(H,w)+.01,w,n);_.scale.z=.65,_.rotation.y=a()*6}const A=new Bt({color:16767136,emissive:12946767,emissiveIntensity:.36,roughness:.5});for(const U of Ga){const H=new ut;H.position.set(U.x,0,U.z),n.add(H);const w=ct(r?10923953:12958627),_=new ni;_.moveTo(-.86,0),_.lineTo(-.86,1.63),_.quadraticCurveTo(-.86,2.6,0,2.74),_.quadraticCurveTo(.86,2.6,.86,1.63),_.lineTo(.86,0),_.lineTo(.62,0),_.lineTo(.62,1.63),_.quadraticCurveTo(.62,2.34,0,2.48),_.quadraticCurveTo(-.62,2.34,-.62,1.63),_.lineTo(-.62,0),_.closePath(),de(new Gi(_,{depth:.13,bevelEnabled:!0,bevelSize:.035,bevelThickness:.025,bevelSegments:1}),c,0,.27,U.d/2+.14,H);for(let Z=.6;Z<3.5;Z+=.56)xt(U.w+.04,.035,U.d+.04,ct(r?9543588:11445903),0,Z,0,H);xt(U.w+.35,.44,U.d+.35,c,0,.22,0,H),xt(U.w,3.35,U.d,w,0,1.9,0,H);for(const Z of[-U.w/2,U.w/2])for(const ce of[-U.d/2,U.d/2])xt(.25,3.5,.25,u,Z,1.95,ce,H);xt(U.w+.25,.16,U.d+.25,u,0,3.56,0,H);const D=new ni;D.moveTo(-U.w/2-.55,0),D.quadraticCurveTo(-U.w*.22,.9,0,2.35),D.quadraticCurveTo(U.w*.22,.9,U.w/2+.55,0),D.closePath(),de(new Gi(D,{depth:U.d+.9,bevelEnabled:!1}),d,0,3.64,-U.d/2-.45,H);for(const Z of[-1,1]){Di(new R(0,5.99,U.d/2+.5),new R(Z*(U.w/2+.6),3.65,U.d/2+.5),.07,l,H);for(let ce=0;ce<5;ce++)Di(new R(Z*.15,5.9,-U.d/2+ce*(U.d/4)),new R(Z*(U.w/2+.45),3.7,-U.d/2+ce*(U.d/4)),.022,ct(r?9142942:6717579),H)}const z=de(new Rt(.64,.64,2.1,12,1,!1,0,Math.PI),u,0,1.38,U.d/2+.02,H);z.rotation.z=Math.PI/2,z.rotation.x=Math.PI/2,xt(1.22,2.05,.1,u,0,1.28,U.d/2+.1,H);for(const Z of[-U.w*.3,U.w*.3]){xt(1.05,1.15,.13,u,Z,2.15,U.d/2+.08,H),xt(.77,.9,.15,A,Z,2.15,U.d/2+.13,H),xt(.065,.95,.18,u,Z,2.15,U.d/2+.16,H),xt(.82,.06,.18,u,Z,2.15,U.d/2+.17,H),xt(1.25,.2,.4,u,Z,1.5,U.d/2+.25,H);for(let ce=0;ce<4;ce++)de(new fr(.13),ct(o.leaves[(ce+1)%3]),Z-.4+ce*.25,1.65,U.d/2+.3,H)}for(let Z=0;Z<3;Z++)xt(1.65,.15,.6,c,0,.08+Z*.1,U.d/2+.4+(2-Z)*.35,H);xt(.7,2.3,.7,c,U.w*.26,4.8,-U.d*.2,H),xt(.95,.18,.95,u,U.w*.26,5.9,-U.d*.2,H);const $=de(new zn(2.1,1.35),new Bt({color:r?7830425:12164203,side:$t}),0,2.7,U.d/2+.7,H);$.rotation.x=-.9;for(const Z of[-1,1]){xt(.18,3.1,.18,u,Z*1.05,1.55,U.d/2+1.22,H);const ce=de(new Rt(.15,.2,.34,6),A,Z*(U.w/2-.25),2.9,U.d/2+.28,H);de(new on(.25,.18,6),l,ce.position.x,3.13,ce.position.z,H)}}const P=new Ki(1,8,6),I=P.attributes.position;for(let U=0;U<I.count;U++){const H=1+.13*Math.sin(I.getX(U)*14+I.getY(U)*9)*Math.cos(I.getZ(U)*11);I.setXYZ(U,I.getX(U)*H,I.getY(U)*H,I.getZ(U)*H)}P.computeVertexNormals();const k=Array.from({length:45},()=>({x:(a()-.5)*132,z:-52-a()*26,scale:1.1+a(),type:0}));for(const[U,H]of[...hl,...k].entries()){const w=Ot(H.x,H.z),_=H.scale*(H.z<0?1.35:1.1),D=new ut;D.position.set(H.x,w,H.z),n.add(D);const z=de(new Rt(.18*_,.39*_,4.3*_,7),u,0,2.1*_,0,D);z.rotation.z=Math.sin(U)*.055;for(let $=0;$<3;$++){const Z=$/3*Math.PI*2+U;Di(new R(0,2.4*_,0),new R(Math.cos(Z)*1.5*_,4.2*_,Math.sin(Z)*1.4*_),.13*_,u,D);const ce=de(P,ct(o.leaves[(U+$)%3]),Math.cos(Z)*1.2*_,(4.8+$%2*.5)*_,Math.sin(Z)*1.15*_,D);ce.scale.set(2.15*_,1.35*_,1.9*_),ce.castShadow=!1;const j=de(new fr(1,0),ct(o.leaves[(U+$+1)%3]),Math.cos(Z+.7)*2.3*_,4.2*_,Math.sin(Z+.7)*2.1*_,D);j.scale.set(.98*_,.76*_,.92*_),j.castShadow=!1}U%2===0&&Di(new R(0,.4,0),new R(.8*_,.02,.4*_),.16*_,u,D)}const G=new ni;G.moveTo(-.045,0),G.quadraticCurveTo(-.075,.24,.035,.45),G.quadraticCurveTo(.015,.16,.045,0),G.closePath();const F=new Cr(G),V=new Bt({color:r?8495514:8885341,roughness:.98,side:$t}),K=new Tt,L=new wc(F,V,2200);let Y=0;for(;Y<2200;){const U=a()*88-44,H=a()*81-44;Math.abs(U)<3.5||H>0&&Math.abs(U)<30||(K.position.set(U,Ot(U,H)+.12,H),K.rotation.set(0,a()*6,Math.sin(Y)*.2),K.scale.set(.9,.6+a()*.8,.9),K.updateMatrix(),L.setMatrixAt(Y++,K.matrix))}L.castShadow=!1,L.receiveShadow=!0,t.add(L);const W=new wc(new fr(.09),ct(14864299),380);for(let U=0;U<380;U++){const H=(a()-.5)*75,w=-a()*41;K.position.set(H,Ot(H,w)+.26,w),K.scale.setScalar(.7+a()),K.updateMatrix(),W.setMatrixAt(U,K.matrix),W.setColorAt(U,new ze([11904460,15060643,10473157][U%3]))}t.add(W);for(let U=0;U<28;U++){const H=U/28*Math.PI*2,w=Math.cos(H)*(100+a()*30),_=Math.sin(H)*105-15,D=15+a()*29,z=new on(15+a()*12,D,7,4),$=z.attributes.position;for(let Z=0;Z<$.count;Z++){const ce=$.getY(Z);$.setX(Z,$.getX(Z)*(1+.12*Math.sin(Z*1.31))),$.setZ(Z,$.getZ(Z)*(1+.1*Math.cos(Z*.71))),ce>0&&$.setY(Z,ce+Math.sin(Z*2.4)*2)}z.computeVertexNormals(),de(z,ct(r?6649484:6717319),w,D/2-2,_,n),U%3===0&&de(new on(4,D*.22,7),ct(13226959),w,D*.88-2,_,n)}for(let U=0;U<32;U++){const H=(U%2?1:-1)*(35+a()*15),w=-47+a()*78,_=.6+a()*2,D=de(new Na(_,0),ct(U%2?8227462:6912126),H,Ot(H,w)+_*.4,w,n);D.scale.set(1,.7,1.3),D.rotation.y=a()*5}const Q=new Bt({color:r?5151906:5282479,transparent:!0,opacity:.78,roughness:.25,metalness:.25}),te=de(new zn(8,114,10,30),Q,48,.05,-15,i);te.rotation.x=-Math.PI/2,te.castShadow=!1;const Ie=de(new zn(5,12,8,20),new nn({color:11132899,transparent:!0,opacity:.65,side:$t}),48,6,-46,i),Te=Ie.geometry.attributes.position;for(let U=0;U<Te.count;U++)Te.setZ(U,Math.sin(Te.getX(U)*2)*.15);de(new Na(6),c,48,10,-49,n).scale.set(1.4,.8,1);for(let U=0;U<8;U++){const H=de(new Pn(.8+U*.25,.018,4,32),new nn({color:12509151,transparent:!0,opacity:.2}),48,.09+U*.001,-42,i);H.rotation.x=Math.PI/2,H.scale.y=.65}for(const U of[-1,1]){const H=new ut;H.position.set(U*51,0,30),n.add(H),de(new Rt(2.7,3.4,12,8),c,0,6,0,H),de(new Rt(3.1,2.8,.8,8),l,0,11.9,0,H),de(new on(3.6,7,8),d,0,15.7,0,H),de(new Lt(.45),l,0,19.5,0,H);for(let w=0;w<5;w++){const _=w/5*Math.PI*2;xt(.38,1.6,.25,h,Math.sin(_)*2.75,9,Math.cos(_)*2.75,H)}}const Ze=new ut;Ze.position.set(It.x,0,It.z),n.add(Ze),de(new Rt(2.2,2.45,.3,12),c,0,.15,0,Ze),de(new Rt(1.9,2.1,.35,12),l,0,.46,0,Ze),de(new Rt(1.15,1.5,3.5,8),c,0,2.35,0,Ze),de(new Rt(1.5,1.16,.4,8),l,0,4.25,0,Ze);for(let U=0;U<4;U++){const H=U/4*Math.PI*2,w=de(new Rt(.2,.32,4.5,5),c,Math.sin(H)*1.3,5.8,Math.cos(H)*1.3,Ze);w.rotation.z=Math.cos(H)*.13,w.rotation.x=-Math.sin(H)*.13,de(new Lt(.22),l,Math.sin(H)*1.13,8,Math.cos(H)*1.13,Ze)}for(let U=0;U<8;U++){const H=U*Math.PI/4;for(let _=0;_<5;_++){const D=xt(.23,.55,.13,ct(_%2?9280928:o.stone),Math.sin(H)*1.39,.85+_*.68,Math.cos(H)*1.39,Ze);D.rotation.y=H}Di(new R(Math.sin(H)*2.1,.48,Math.cos(H)*2.1),new R(Math.sin(H)*1.25,2.2,Math.cos(H)*1.25),.085,l,Ze);const w=xt(.048,2.75,.06,l,Math.sin(H)*1.43,2.1,Math.cos(H)*1.43,Ze);w.rotation.y=H}const Ye=new Bt({color:8771295,emissive:5021115,emissiveIntensity:1.6,roughness:.24,metalness:.25}),st=de(new Lt(.96,0),Ye,It.x,6.1,It.z,i);st.scale.set(.85,1.75,.85);const ee=[];for(let U=0;U<3;U++){const H=de(new Pn(1.5+U*.17,.045,6,56),l,It.x,6.1,It.z,i);H.rotation.x=.5+U*.65,H.rotation.y=U*.7,ee.push(H)}const ie=new vs(new Zc({map:ch(),color:7784148,transparent:!0,opacity:.55,depthWrite:!1,blending:Ea}));ie.position.set(It.x,6.1,It.z),ie.scale.setScalar(8),i.add(ie);const pe=new cd(7784673,12,18,2);pe.position.set(It.x,6,It.z),i.add(pe);const Ve=new Map;for(const U of Lr){const H=new ut;H.position.set(U.x,Ot(U.x,U.z),U.z),H.userData={kind:"fragment",id:U.id},i.add(H),de(new Rt(.55,.75,.3,7),c,0,.15,0,H);const w=de(new Lt(.32),Ye,0,1,0,H);w.scale.y=1.6;const _=de(new Pn(.65,.02,4,32),l,0,.2,0,H);_.rotation.x=Math.PI/2,Ve.set(U.id,H)}const be=new ut;de(new Lt(.65),Ye.clone(),0,0,0,be).scale.y=1.55;const He=gy(be);He.root.position.set(0,5.6,36),i.add(He.root);const ot=new ut;ot.position.set(0,0,36),n.add(ot);for(const U of[-1,1])de(new Rt(.3,.55,4.8,8),c,U*3.1,2.4,0,ot),de(new on(.62,1.3,8),d,U*3.1,5.4,0,ot),de(new Lt(.23),l,U*3.1,6.2,0,ot),Di(new R(U*3.1,4.7,0),new R(0,6.2,0),.11,l,ot);const ne=new ut;ne.position.set(dn.x,Ot(dn.x,dn.z),dn.z),n.add(ne),xt(1.8,.18,.88,u,0,.95,0,ne);for(const U of[-.7,.7])for(const H of[-.3,.3])xt(.14,.9,.14,u,U,.46,H,ne);xt(.72,.22,.48,h,-.35,1.12,0,ne),de(new Rt(.24,.31,.25,8),l,.45,1.16,0,ne);const le=Bi("Bancada · F","#dfc58e");le.position.set(dn.x,2.05,dn.z),i.add(le);const ue=[gr(r?5794177:3234928,!0,r?"eluvios":"valdarios",r?"ressonante":"sentinela"),gr(r?4879232:7758414,!0,r?"naquiros":"kordranios","errante"),gr(r?7498632:6780037,!0,r?"eluvios":"valdarios","arcanista")],he=[Wi,{x:-10,z:18},{x:6,z:10}];ue.forEach((U,H)=>{U.root.position.set(he[H].x,0,he[H].z),U.root.rotation.y=H?-.5:.4,U.root.userData.kind="npc",U.root.userData.id=H?"companion-"+H:"guide",i.add(U.root);const w=Bi(H?Fi[e].companions[H-1]:Fi[e].name,"#dfc58e");w.position.y=2.95,U.root.add(w)});const fe=[];for(const U of[-4.3,4.3]){Di(new R(U,0,0),new R(U,4.8,0),.075,u,n);const H=de(new zn(1,1.7,6,8),new Bt({color:r?7168654:3234680,roughness:.8,side:$t}),U+.5,3.6,0,i);fe.push(H),de(new Lt(.13),l,U+.5,3.6,.035,n).scale.set(.7,1.5,.2)}const Be=new Float32Array(390);for(let U=0;U<130;U++)Be[U*3]=(a()-.5)*68,Be[U*3+1]=.7+a()*4,Be[U*3+2]=-a()*45;const Ue=new At;Ue.setAttribute("position",new Qt(Be,3));const Ge=new Wh(Ue,new nl({map:ch(),color:r?10797549:14864282,size:.19,transparent:!0,opacity:.55,depthWrite:!1,blending:Ea}));i.add(Ge),_y(n);let qe=2,N=!1;return{root:t,npc:ue[0],assetState:()=>He.root.userData.assetState,disposeAssets:()=>He.dispose(),setReducedEffects(U){N=U,Ge.visible=!U,ie.visible=!U,pe.intensity=U?3:12},interactive:[...ue.map(U=>U.root),...Ve.values()],setState(U,H=[]){qe=U;for(const[w,_]of Ve)_.visible=!H.includes(w)},animate(U){const H=N?0:U;He.root.rotation.y=H*.1,st.rotation.y=H*.28,st.position.y=6.1+Math.sin(H*1.2)*.12;const w=qe===0?6802909:qe===1?10724320:11632563;Ye.color.setHex(w),Ye.emissive.setHex(w),Ye.emissiveIntensity=qe===2?.7+Math.sin(H*1.9)*(N?0:.14):1.2,ie.material.color.setHex(w),pe.color.setHex(w),ee.forEach((D,z)=>{D.rotation.z=H*(z%2?.14:-.1),D.rotation.y=z*.7+Math.sin(H*(qe===2?1.1:.2)+z)*.16});for(const[D,z]of[...Ve.values()].entries()){const $=z.children[1];$.position.y=1+Math.sin(U*1.4+D)*.15,$.rotation.y=U*.45}N||fe.forEach((D,z)=>{const $=D.geometry.attributes.position;for(let Z=0;Z<$.count;Z++)$.setZ(Z,Math.sin($.getX(Z)*4-U*2+z)*.08);$.needsUpdate=!0});const _=te.geometry.attributes.position;for(let D=0;D<_.count;D++)_.setZ(D,Math.sin(U*1.5+_.getX(D)*.8+_.getY(D)*.5)*.055);_.needsUpdate=!0,Ie.material.opacity=.5+Math.sin(U*2)*.07,Ge.position.y=Math.sin(U*.35)*.22}}}class xy{constructor(e){this.canvas=e,this.renderer=new Pv({canvas:e,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.35)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=or,this.renderer.outputColorSpace=kt,this.renderer.toneMapping=Oc,this.renderer.toneMappingExposure=1.02,this.scene.background=new ze(10862538),this.scene.fog=new Jc(10862538,65,185),this.scene.add(new mm(13361129,4147516,1.05)),this.sun=new ld(16770237,2.9),this.sun.position.set(-30,50,15),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024);const t=this.sun.shadow.camera;t.left=-43,t.right=43,t.top=43,t.bottom=-43,t.far=150,t.updateProjectionMatrix(),this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.03,this.scene.add(this.sun,this.sun.target);const n=new Et(new Ki(280,32,18),new Ln({side:rn,depthWrite:!1,uniforms:{top:{value:new ze(5405860)},bottom:{value:new ze(13950417)}},vertexShader:"varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 v;uniform vec3 top;uniform vec3 bottom;void main(){float h=normalize(v).y;vec3 c=mix(bottom,top,smoothstep(-.05,.8,h));float cloud=sin(v.x*.043+sin(v.z*.026)*1.6)*sin(v.z*.031+v.y*.031);float veil=smoothstep(.49,.91,cloud)*smoothstep(.04,.22,h)*(1.-smoothstep(.35,.7,h));c=mix(c,vec3(.90,.91,.85),veil*.58);gl_FragColor=vec4(c,1.);}"}));n.frustumCulled=!1,this.scene.add(n),this.scenery=lh(this.scene),this.ring=new Et(new pr(.95,1.05,48),new nn({color:15911294,transparent:!0,opacity:.9,depthWrite:!1,side:$t})),this.ring.rotation.x=-Math.PI/2,this.ring.visible=!1,this.scene.add(this.ring),this.abilityPreview=new Et(new pr(.96,1,64),new nn({color:9296332,transparent:!0,opacity:.34,side:$t,depthWrite:!1})),this.abilityPreview.rotation.x=-Math.PI/2,this.abilityPreview.visible=!1,this.scene.add(this.abilityPreview),this.resize(),window.addEventListener("resize",()=>this.resize())}canvas;scene=new Zf;camera=new sn(60,1,.1,240);renderer;yaw=0;pitch=.3;zoom=10.5;target=new R(0,1.3,19);players=new Map;enemies=new Map;companions=new Map;loot=new Map;ray=new Lm;scenery;ring;abilityPreview;previewRange=0;reducedEffects=!1;cameraDistance=0;cameraObstructed=!1;effects=[];lastEvents=-1;faction="vigilia";previewActor=null;previewKey="";sun;economical=!1;cameraBoxes=[...Ga.map(e=>new bn(new R(e.x-e.w/2-.35,0,e.z-e.d/2-.35),new R(e.x+e.w/2+.35,6.5,e.z+e.d/2+.35))),new bn(new R(It.x-1.5,0,It.z-1.5),new R(It.x+1.5,8,It.z+1.5)),...hl.map(e=>new bn(new R(e.x-.42,0,e.z-.42),new R(e.x+.42,4*e.scale,e.z+.42)))];setCreation(e){this.setFaction(e.factionId);const t=JSON.stringify(e);this.previewKey!==t&&(this.previewKey=t,this.previewActor&&(this.scene.remove(this.previewActor.root),this.disposeActor(this.previewActor)),this.previewActor=gr(e.factionId==="vigilia"?3235452:7037061,!1,e.raceId,e.classId,e.appearance),this.previewActor.root.position.set(0,0,24),this.previewActor.root.rotation.y=-.2,this.scene.add(this.previewActor.root),this.scenery.setState(0))}setFaction(e){if(e===this.faction)return;this.scenery.disposeAssets(),this.scene.remove(this.scenery.root),this.disposeObject(this.scenery.root),this.faction=e,this.scenery=lh(this.scene,e),this.scenery.setReducedEffects(this.reducedEffects);const t=e==="confluencia"?10794185:10862538;this.scene.fog.color.setHex(t)}disposeObject(e){const t=new Set,n=new Set;e.traverse(i=>{if(i instanceof Et){t.add(i.geometry);for(const r of Array.isArray(i.material)?i.material:[i.material])n.add(r)}i instanceof vs&&er(i)});for(const i of n)i.map?.dispose();t.forEach(i=>i.dispose()),n.forEach(i=>i.dispose())}resize(){this.renderer.setSize(innerWidth,innerHeight),this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix()}quality(){return this.economical=!this.economical,this.renderer.setPixelRatio(this.economical?1:Math.min(devicePixelRatio,1.35)),this.renderer.shadowMap.enabled=!this.economical,this.resize(),this.economical}setReducedEffects(e){this.reducedEffects=e,this.scenery.setReducedEffects(e),this.abilityPreview.material.opacity=e?.22:.34}setAbilityPreview(e,t){const n=Number.isFinite(e)?Hi.clamp(e,0,35):0;n!==this.previewRange&&(this.abilityPreview.geometry.dispose(),this.abilityPreview.geometry=new pr(Math.max(0,n-.07),Math.max(.001,n),64)),this.previewRange=n,this.abilityPreview.material.color.setHex(t?9296332:14793851),this.abilityPreview.visible=n>0}orbit(e,t){this.yaw-=e*.005,this.pitch=Hi.clamp(this.pitch+t*.004,.18,1.18)}zoomBy(e){this.zoom=Hi.clamp(this.zoom+e*.014,6.3,26)}pick(e,t){const n=this.canvas.getBoundingClientRect();this.ray.setFromCamera(new oe((e-n.left)/n.width*2-1,-(t-n.top)/n.height*2+1),this.camera);const i=[...this.scenery.interactive,...[...this.enemies.values()].filter(r=>r.root.visible).map(r=>r.root),...this.loot.values(),...[...this.players.values()].map(r=>r.root)];for(const r of this.ray.intersectObjects(i,!0)){let a=r.object;for(;a;){if(a.userData.kind)return a.userData;a=a.parent}}return null}update(e,t,n,i,r,a){if(this.scenery.animate(r),js(this.scenery.npc,!1,r),e&&t){this.setFaction(Oi(e.you)),this.scenery.setState(e.you.story?.restored?0:e.you.quest.state==="completed"?1:2,e.you.story?.fragments??[]),this.previewActor&&(this.scene.remove(this.previewActor.root),this.disposeActor(this.previewActor),this.previewActor=null);const d=new Set;for(const p of t.players){d.add(p.id);let m=this.players.get(p.id);if(!m){m=gr(p.id===e.you.id?this.faction==="vigilia"?3235452:7037061:5404033,!1,p.raceId??"valdarios",p.classId??"sentinela",p.appearance??0),m.root.userData.kind="player",m.root.userData.id=p.id;const x=new Et(new Ki(.95,20,14),new nn({color:9164511,transparent:!0,opacity:.15,wireframe:!0,depthWrite:!1}));x.position.y=1.2,x.scale.y=1.4,x.name="barrier",m.root.add(x),this.players.set(p.id,m),this.scene.add(m.root),m.label=Bi(p.nickname,p.id===e.you.id?"#e8ddbc":"#a5e0d3"),m.label.position.y=2.8,m.root.add(m.label)}const M=p.id===e.you.id&&n?n:p;m.root.position.set(M.x,Ot(M.x,M.z)+(p.dead?.55:0),M.z),m.root.rotation.y=M.angle,m.body.rotation.z=p.dead?-Math.PI/2:0,js(m,p.moving&&!p.dead,r);const T=m.root.getObjectByName("barrier");if(T&&(T.visible=!!p.barrier),p.casting){m.arm.rotation.x=-1.45+Math.sin(r*5)*.05;const x=m.root.userData.otherArm;x&&(x.rotation.x=-.95)}m.sword&&m.sword.material.color.setHex(p.weapon==="dawnSword"?15847821:p.weapon==="forestBlade"?8766382:11386048),!p.dead&&m.root.userData.swingUntil>r&&(m.arm.rotation.x-=Math.sin((m.root.userData.swingUntil-r)/.28*Math.PI)*1.7)}for(const[p,m]of this.players)d.has(p)||(this.scene.remove(m.root),this.players.delete(p),this.disposeActor(m));const h=new Set;for(const p of t.enemies){h.add(p.id);let m=this.enemies.get(p.id);m||(m=th(p.kind),m.root.userData={kind:"enemy",id:p.id},this.enemies.set(p.id,m),this.scene.add(m.root),p.elite&&m.root.scale.setScalar(1.65)),m.root.visible=p.state!=="dead",m.root.position.set(p.x,Ot(p.x,p.z),p.z),m.root.rotation.y=p.angle,js(m,p.state==="patrol"||p.state==="chase"||p.state==="return",r,p.kind==="cerne"?.65:1),m.root.userData.swingUntil>r&&(m.arm.rotation.x-=Math.sin((m.root.userData.swingUntil-r)/.28*Math.PI)*1.2);const M=`${p.hp}/${p.maxHp}`;m.labelKey!==M&&(m.label&&(m.root.remove(m.label),er(m.label)),m.label=Bi(p.elite?"Núcleo Fraturado":p.kind==="brumino"?"Brumino":"Cerne errante","#edc2b4",p.hp/p.maxHp),m.label.position.y=p.kind==="brumino"?1.9:3.2,m.root.add(m.label),m.labelKey=M)}for(const[p,m]of this.enemies)h.has(p)||(this.scene.remove(m.root),this.enemies.delete(p),this.disposeActor(m));const f=new Set;for(const p of e.companions??[]){f.add(p.id);let m=this.companions.get(p.id);if(!m){m=th("brumino"),m.root.scale.setScalar(.57);const T=de(new Pn(.42,.055,5,20),ct(6670778,.35),0,.85,.58,m.body);T.rotation.x=Math.PI/2,m.label=Bi(p.name,"#a4ddd2"),m.label.position.y=2.05,m.label.scale.multiplyScalar(1.35),m.root.add(m.label),this.companions.set(p.id,m),this.scene.add(m.root)}const M=m.root.position.distanceToSquared(new R(p.x,Ot(p.x,p.z),p.z))>.002;m.root.position.set(p.x,Ot(p.x,p.z),p.z),m.root.rotation.y=p.angle,js(m,M,r,1.25)}for(const[p,m]of this.companions)f.has(p)||(this.scene.remove(m.root),this.disposeActor(m),this.companions.delete(p));const g=new Set(e.loot.map(p=>p.id));for(const p of e.loot){let m=this.loot.get(p.id);if(!m){m=new ut,m.userData={kind:"loot",id:p.id},de(new Lt(.27),new Bt({color:p.ownerId===e.you.id?16373136:9874084,emissive:11963450,emissiveIntensity:p.ownerId===e.you.id?.5:.05}),0,0,0,m);const M=Bi(p.ownerId===e.you.id?"◆ Recompensa · F":"Outro viajante",p.ownerId===e.you.id?"#f7d791":"#b4c7c0");M.position.y=.8,M.scale.multiplyScalar(.7),m.add(M),this.loot.set(p.id,m),this.scene.add(m)}m.position.set(p.x,.55+Math.sin(r*2.5)*.13,p.z),m.rotation.y=r*.65}for(const[p,m]of this.loot)g.has(p)||(this.scene.remove(m),m.traverse(M=>{M instanceof Et&&(M.geometry.dispose(),M.material instanceof En&&M.material.dispose()),M instanceof vs&&er(M)}),this.loot.delete(p));const y=e.enemies.find(p=>p.id===i&&p.state!=="dead");if(this.ring.visible=!!y,y){const p=t.enemies.find(m=>m.id===y.id)??y;this.ring.position.set(p.x,Ot(p.x,p.z)+.05,p.z)}if(e.tick!==this.lastEvents){this.lastEvents=e.tick;for(const p of e.events)if(!(this.reducedEffects&&!["hit","heal"].includes(p.kind))&&!(this.effects.length>=(this.reducedEffects?16:48))){if(p.sourceId&&(p.kind==="hit"||p.kind==="slash")){const m=this.players.get(p.sourceId)??this.enemies.get(p.sourceId);m&&(m.root.userData.swingUntil=r+.28)}if(p.kind==="projectile"){const m=de(new Lt(.17),new nn({color:p.classId==="errante"?14205837:p.classId==="ressonante"?10084050:10795007,transparent:!0}),p.x,1.4+Ot(p.x,p.z),p.z);m.userData.from=new R(p.x,m.position.y,p.z),m.userData.to=new R(p.targetX??p.x,1.1+Ot(p.targetX??p.x,p.targetZ??p.z),p.targetZ??p.z),this.scene.add(m),this.effects.push({root:m,at:r,type:"projectile"})}else if(p.kind==="restore"||p.kind==="attune"||p.kind==="barrier"){const m=de(new Pn(p.kind==="restore"?2.4:1,.045,6,60),new nn({color:10214611,transparent:!0}),p.x,Ot(p.x,p.z)+.3,p.z);m.rotation.x=Math.PI/2,this.scene.add(m),this.effects.push({root:m,at:r,type:"ring"})}else if(p.kind==="hit"||p.kind==="heal"){const m=Bi(`${p.kind==="heal"?"+":"−"}${p.amount}`,p.kind==="heal"?"#9af0be":"#ffe1af");m.scale.multiplyScalar(.7),m.position.set(p.x,Ot(p.x,p.z)+2.4,p.z),this.scene.add(m),this.effects.push({root:m,at:r,type:"text"})}else if(p.kind==="nova"||p.kind==="slash"||p.kind==="level"){const m=new Et(new Pn(p.kind==="nova"?1.7:.8,.065,5,32,p.kind==="slash"?Math.PI*1.4:Math.PI*2),new nn({color:p.kind==="level"?16768141:10413011,transparent:!0}));m.rotation.x=Math.PI/2,m.position.set(p.x,.8,p.z),this.scene.add(m),this.effects.push({root:m,at:r,type:"ring"})}}}n&&(this.abilityPreview.position.set(n.x,Ot(n.x,n.z)+.08,n.z),this.abilityPreview.visible=this.previewRange>0,this.target.lerp(new R(n.x,Ot(n.x,n.z)+1.4,n.z),1-Math.exp(-a*10)))}else this.abilityPreview.visible=!1,this.target.set(0,1.6,24),this.yaw=-.25+Math.sin(r*.04)*.07,this.previewActor&&js(this.previewActor,!1,r);for(let d=this.effects.length-1;d>=0;d--){const h=this.effects[d],f=r-h.at;h.type==="projectile"?h.root.position.lerpVectors(h.root.userData.from,h.root.userData.to,Math.min(1,f/.28)):h.type==="text"?h.root.position.y+=a*1.2:h.root.scale.setScalar(1+f*1.8);const g=h.root.material;g.opacity=Math.max(0,1-f/.85),f>.85&&(this.scene.remove(h.root),h.root instanceof vs?er(h.root):(h.root.geometry.dispose(),g.dispose()),this.effects.splice(d,1))}const o=e?this.zoom:6.8,c=Math.cos(this.pitch)*o,l=new R(this.target.x+Math.sin(this.yaw)*c,this.target.y+Math.sin(this.pitch)*o,this.target.z+Math.cos(this.yaw)*c),u=Dv(this.target,l,this.cameraBoxes,Ot);this.camera.position.copy(u.position),this.cameraDistance=u.distance,this.cameraObstructed=u.blocked,this.camera.lookAt(this.target),this.sun.position.set(this.target.x-30,50,this.target.z+15),this.sun.target.position.copy(this.target),this.sun.target.updateMatrixWorld(),this.renderer.render(this.scene,this.camera),window.edfMetrics={drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometry:this.renderer.info.memory.geometries,simulationDtMs:Math.round(a*1e4)/10,faction:this.faction,quality:this.economical?"economy":"standard",economical:this.economical,localPlayerX:n?.x??null,localPlayerZ:n?.z??null,pixelRatio:this.renderer.getPixelRatio(),reducedEffects:this.reducedEffects,activeEffects:this.effects.length,cameraDistance:Math.round(this.cameraDistance*100)/100,cameraObstructed:this.cameraObstructed,asset:this.scenery.assetState()}}disposeActor(e){e.root.traverse(t=>{t instanceof Et&&(t.geometry.dispose(),(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>i.dispose())),t instanceof vs&&er(t)})}}class vy{keys=new Set;joystick={x:0,z:0};enabled=!1;onkey=e=>{};onclick=(e,t)=>{};constructor(e,t){window.addEventListener("keydown",i=>{if(!this.enabled||i.target instanceof HTMLInputElement||i.target instanceof HTMLTextAreaElement)return;const r=i.key.toLowerCase();[" ","tab","arrowup","arrowdown","arrowleft","arrowright"].includes(r)&&i.preventDefault(),this.keys.add(r),i.repeat||this.onkey(r)}),window.addEventListener("keyup",i=>this.keys.delete(i.key.toLowerCase())),window.addEventListener("blur",()=>this.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.clear()}),e.addEventListener("contextmenu",i=>i.preventDefault()),e.addEventListener("wheel",i=>{i.preventDefault(),t.zoomBy(i.deltaY)},{passive:!1});let n=null;e.addEventListener("pointerdown",i=>{!this.enabled||n||(e.focus({preventScroll:!0}),n={id:i.pointerId,x:i.clientX,y:i.clientY,startX:i.clientX,startY:i.clientY,orbit:i.button===2||i.pointerType==="touch",dragged:!1},e.setPointerCapture(i.pointerId))}),e.addEventListener("pointermove",i=>{if(!n||n.id!==i.pointerId)return;const r=i.clientX-n.x,a=i.clientY-n.y;Math.hypot(i.clientX-n.startX,i.clientY-n.startY)>5&&(n.dragged=!0),n.orbit&&n.dragged&&t.orbit(r,a),n.x=i.clientX,n.y=i.clientY}),e.addEventListener("pointerup",i=>{!n||n.id!==i.pointerId||(!n.dragged&&i.button!==2&&this.onclick(i.clientX,i.clientY),n=null)}),e.addEventListener("pointercancel",()=>{n=null})}clear(){this.keys.clear(),this.joystick={x:0,z:0}}direction(e){if(!this.enabled)return{x:0,z:0};const t=(this.keys.has("d")||this.keys.has("arrowright")?1:0)-(this.keys.has("a")||this.keys.has("arrowleft")?1:0)+this.joystick.x,n=(this.keys.has("w")||this.keys.has("arrowup")?1:0)-(this.keys.has("s")||this.keys.has("arrowdown")?1:0)-this.joystick.z,i=Math.max(1,Math.hypot(t,n));return{x:(Math.cos(e)*t-Math.sin(e)*n)/i,z:(-Math.sin(e)*t-Math.cos(e)*n)/i}}}function yy(s,e,t,n){return!n&&s-e>15e3&&s-t<6e3}class My{ws=null;state=null;history=[];id="";token="";rtt=0;offset=0;onstate=e=>{};onnotice=(e,t="info")=>{};onstatus=(e,t="")=>{};timer=null;stopped=!1;attempt=0;ping=null;lastFrame=0;lastWatchdog=0;connect(e,t){this.timer&&(clearTimeout(this.timer),this.timer=null);const n=this.ws;this.ws=null,n?.close(),this.stopped=!1,this.onstatus("connecting");const i=location.protocol==="https:"?"wss":"ws",r=new WebSocket(`${i}://${location.host}/ws`);this.ws=r;const a=()=>this.connect(e.type==="account_login"?e:{type:"resume",token:this.token},t);r.onopen=()=>r.send(JSON.stringify(e)),r.onmessage=o=>{if(this.ws!==r)return;let c;try{c=JSON.parse(o.data)}catch{return}if(c.type==="account_ready")t&&this.send({type:"character_enter",characterId:t});else if(c.type==="account_error"){const l=c.code==="ACCOUNT_IN_USE"?"Esta conta já está jogando. Saia da primeira sessão antes de entrar aqui.":"Não foi possível autorizar a conta ou o personagem.";this.onnotice(l,"error"),this.onstatus("blocked",l),this.ping&&clearInterval(this.ping),this.stopped=!0,r.close()}else c.type==="welcome"||c.type==="character_entered"?(this.id=c.type==="welcome"?c.id:c.character.id,this.token=c.type==="welcome"?c.token:"",this.attempt=0,this.history=[],this.state=null,c.type==="welcome"&&(sessionStorage.setItem("nexo.session",c.token),localStorage.setItem("nexo.last",JSON.stringify({token:c.token,nickname:c.nickname}))),this.lastFrame=Date.now(),this.lastWatchdog=this.lastFrame,this.onstatus("online"),this.ping&&clearInterval(this.ping),this.ping=setInterval(()=>{const l=Date.now(),u=yy(l,this.lastFrame,this.lastWatchdog,document.hidden);this.lastWatchdog=l,u&&!this.stopped?(this.ws=null,r.close(),this.ping&&clearInterval(this.ping),this.onstatus("offline","O vale não responde. Reconectando…"),this.timer=setTimeout(a,1e3)):this.send({type:"ping",at:Date.now()})},3e3)):c.type==="state"?(this.lastFrame=Date.now(),this.history.length?this.offset+=(c.time-Date.now()-this.offset)*.06:this.offset=c.time-Date.now(),this.state=c,this.history.push(c),this.history.length>24&&this.history.shift(),this.onstate(c)):c.type==="notice"?this.onnotice(c.text,c.kind):c.type==="pong"&&(this.rtt=Math.max(0,Date.now()-c.at))},r.onerror=()=>{},r.onclose=o=>{if(!(this.ws!==r||this.stopped)){if(this.ping&&clearInterval(this.ping),o.code===4001||o.code===4003||o.code===1008||o.code===1009){this.onstatus("blocked",o.code===4001?"Este viajante foi aberto em outra aba.":o.code===4003?"Chave de retorno inválida ou expirada.":"A conexão foi encerrada pelo servidor.");return}this.onstatus("offline","Conexão interrompida. Tentando retornar ao vale…"),this.token||e.type==="account_login"?this.timer=setTimeout(a,Math.min(1e4,1e3*2**this.attempt++)):this.onstatus("blocked","Servidor indisponível. Confira os dois terminais e tente entrar novamente.")}}}send(e){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}disconnect(){this.stopped=!0,this.timer&&clearTimeout(this.timer),this.ping&&clearInterval(this.ping),this.ws?.close(),this.ws=null,this.state=null,this.history=[],this.id="",this.token=""}interpolated(){if(!this.state)return null;const e=Date.now()+this.offset-120;let t=this.history[0],n=this.history[this.history.length-1];for(let a=1;a<this.history.length;a++)if(this.history[a].time>=e){t=this.history[a-1],n=this.history[a];break}const i=Math.max(0,Math.min(1,(e-t.time)/Math.max(1,n.time-t.time))),r=(a,o)=>o.map(c=>{const l=a.find(d=>d.id===c.id);if(!l||Math.hypot(c.x-l.x,c.z-l.z)>5)return c;const u=Math.atan2(Math.sin(c.angle-l.angle),Math.cos(c.angle-l.angle));return{...c,x:l.x+(c.x-l.x)*i,z:l.z+(c.z-l.z)*i,angle:l.angle+u*i}});return{players:r(t.players,n.players),enemies:r(t.enemies,n.enemies)}}}const gt=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z);function uh(s,e,t=Ui.radius){return Nv.some(n=>{if(n.r!==void 0)return Math.hypot(s-n.x,e-n.z)<t+n.r;const i=Math.max(Math.abs(s-n.x)-n.w/2,0),r=Math.max(Math.abs(e-n.z)-n.d/2,0);return i*i+r*r<t*t})}function Sy(s,e,t,n,i=Ui.speed,r=Ui.radius){const a=Math.hypot(e,t);if(!a||!Number.isFinite(a)||!Number.isFinite(n))return;const o=i*Math.min(Math.max(n,0),.05)/Math.max(1,a),c=Math.max(Ui.minX+r,Math.min(Ui.maxX-r,s.x+e*o)),l=Math.max(Ui.minZ+r,Math.min(Ui.maxZ-r,s.z+t*o));uh(c,s.z,r)||(s.x=c),uh(s.x,l,r)||(s.z=l)}const by=82,Sa=60/by,Ey=64,Ty=[[50,57,62,65],[46,53,58,62],[53,60,65,69],[48,55,60,64]],wy=[[74,-1,77,76,74,-1,72,69],[70,-1,74,77,74,72,-1,70],[69,72,-1,77,76,-1,72,69],[67,-1,72,74,76,74,-1,72],[74,-1,81,77,-1,76,74,72],[70,74,-1,77,79,77,-1,74],[77,-1,76,72,69,-1,72,76],[74,72,-1,67,69,-1,72,-1]],zi=[];for(let s=0;s<16;s++){const e=Ty[s%4],t=wy[s%8],n=s*4;zi.push({beat:n,midi:e[0]-12,duration:3.9,velocity:.16,pan:0,voice:"pad"});for(const[i,r]of e.slice(1).entries())zi.push({beat:n+i*.06,midi:r,duration:2.8,velocity:.22,pan:-.3+i*.27,voice:"pluck"});for(const[i,r]of e.slice(1).entries())zi.push({beat:n+2+i*.08,midi:r+(s>=8?12:0),duration:1.7,velocity:.14,pan:.28-i*.23,voice:"pluck"});for(let i=0;i<8;i++)t[i]!==-1&&zi.push({beat:n+i*.5,midi:t[i],duration:i===7?1.3:.9,velocity:s>=8?.17:.14,pan:Math.sin(s)*.17,voice:"bell"})}zi.sort((s,e)=>s.beat-e.beat);const vi=s=>440*2**((s-69)/12),Cs={enabled:!0,master:.55,music:.34,ambience:.5,effects:.7,voice:.8};class Ay{constructor(e){this.ctx=e,this.master=e.createGain(),this.music=e.createGain(),this.ambience=e.createGain(),this.effects=e.createGain(),this.voice=e.createGain();const t=e.createDynamicsCompressor();t.threshold.value=-15,t.knee.value=18,t.ratio.value=5,t.attack.value=.006,t.release.value=.18,this.master.connect(t),t.connect(e.destination),this.ambience.connect(this.master),this.effects.connect(this.master),this.voice.connect(this.master),this.musicFilter=e.createBiquadFilter(),this.musicFilter.type="lowpass",this.musicFilter.frequency.value=3600,this.music.connect(this.musicFilter),this.musicFilter.connect(this.master);const n=Fa(61245);this.noise=e.createBuffer(1,e.sampleRate*3,e.sampleRate);const i=this.noise.getChannelData(0);let r=0;for(let c=0;c<i.length;c++)r=(r+(n()*2-1)*.065)/1.065,i[c]=r*3.5;const a=e.createBufferSource();a.buffer=this.noise,a.loop=!0;const o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=1100,this.wind=e.createGain(),this.wind.gain.value=.06,a.connect(o),o.connect(this.wind),this.wind.connect(this.ambience),a.start(0),this.levels(Cs)}ctx;master;music;ambience;effects;voice;musicLevel=Cs.music;dialogueActive=!1;activeTransients=0;musicFilter;wind;noise;strings=new Map;levels(e,t=!1){const n=this.ctx.currentTime;this.master.gain.setTargetAtTime(e.enabled&&!t?e.master:0,n,.06),this.musicLevel=e.music,this.music.gain.setTargetAtTime(e.music*(this.dialogueActive?.4:1),n,.12),this.ambience.gain.setTargetAtTime(e.ambience,n,.12),this.effects.gain.setTargetAtTime(e.effects,n,.04),this.voice.gain.setTargetAtTime(e.voice,n,.06)}dialogue(e){this.dialogueActive=e,this.music.gain.setTargetAtTime(this.musicLevel*(e?.4:1),this.ctx.currentTime,e?.08:.3)}zone(e,t){const n=this.ctx.currentTime;this.wind.gain.setTargetAtTime(e?.13:.065,n,1.5),this.musicFilter.frequency.setTargetAtTime(t?2e3:e?2900:3600,n,.9)}route(e,t,n){const i=this.ctx.createGain(),r=this.ctx.createStereoPanner();return i.gain.value=t,r.pan.value=Math.max(-1,Math.min(1,n)),i.connect(r),r.connect(e),{gain:i,dispose:()=>{i.disconnect(),r.disconnect()}}}tone(e,t,n,i,r,a="sine",o=0,c=e){if(this.activeTransients>=64)return;this.activeTransients++;const{gain:l,dispose:u}=this.route(r,0,o),d=this.ctx.createOscillator();d.type=a,d.frequency.setValueAtTime(e,t),d.frequency.exponentialRampToValueAtTime(Math.max(20,c),t+n),l.gain.setValueAtTime(0,t),l.gain.linearRampToValueAtTime(i,t+Math.min(.02,n*.12)),l.gain.exponentialRampToValueAtTime(1e-4,t+n),d.connect(l),d.start(t),d.stop(t+n+.01),d.onended=()=>{d.disconnect(),u(),this.activeTransients--}}burst(e,t,n,i,r,a=this.effects){if(this.activeTransients>=64)return;this.activeTransients++;const o=this.ctx.createBufferSource();o.buffer=this.noise;const c=this.ctx.createBiquadFilter();c.type="bandpass",c.frequency.value=i,c.Q.value=.6;const{gain:l,dispose:u}=this.route(a,0,r);l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(n,e+.006),l.gain.exponentialRampToValueAtTime(1e-4,e+t),o.connect(c),c.connect(l),o.start(e,0,t),o.onended=()=>{o.disconnect(),c.disconnect(),u(),this.activeTransients--}}string(e){let t=this.strings.get(e);if(t)return t;const n=this.ctx.sampleRate,i=Math.round(n/vi(e)),r=new Float32Array(i),a=Fa(e*1781);for(let l=0;l<i;l++)r[l]=a()*2-1;const o=r.reduce((l,u)=>l+u,0)/i;for(let l=0;l<i;l++)r[l]-=o;t=this.ctx.createBuffer(1,n*2.7,n);const c=t.getChannelData(0);for(let l=0;l<c.length;l++){const u=l%i,d=(u+1)%i;c[l]=r[u]*Math.min(1,l/(n*.004))*Math.min(1,(c.length-l)/(n*.1)),r[u]=(r[u]+r[d])*.496}return this.strings.set(e,t),t}note(e,t){if(e.voice==="pluck"){const n=this.ctx.createBufferSource();n.buffer=this.string(e.midi);const i=this.route(this.music,e.velocity,e.pan);n.connect(i.gain),n.start(t),n.stop(t+Math.min(2.7,e.duration*Sa)),n.onended=()=>{n.disconnect(),i.dispose()}}else if(e.voice==="pad"){const n=vi(e.midi),i=e.duration*Sa,r=this.route(this.music,0,e.pan);r.gain.gain.setValueAtTime(0,t),r.gain.gain.linearRampToValueAtTime(e.velocity*.45,t+.6),r.gain.gain.linearRampToValueAtTime(1e-4,t+i);const a=this.ctx.createOscillator();a.type="sine",a.frequency.value=n,a.connect(r.gain),a.start(t),a.stop(t+i),a.onended=()=>{a.disconnect(),r.dispose()}}else this.tone(vi(e.midi),t,e.duration*Sa+.15,e.velocity*.52,this.music,"sine",e.pan),this.tone(vi(e.midi)*2.003,t,.37,e.velocity*.06,this.music,"sine",e.pan)}effect(e,t=this.ctx.currentTime,n=1,i=0){const r=Math.max(0,Math.min(1,n)),a=(o,c,l=.1)=>o.forEach((u,d)=>{this.tone(vi(u-12),t+d*c,.3,l*r,this.effects,"sine",i),this.tone(vi(u-12)*2.01,t+d*c,.13,l*r*.16,this.effects,"sine",i)});switch(e){case"stepStone":this.burst(t,.085,.22*r,600,i),this.tone(150,t,.075,.07*r,this.effects,"sine",i,75);break;case"stepGrass":this.burst(t,.13,.13*r,1700,i),this.tone(105,t,.08,.035*r,this.effects,"sine",i,65);break;case"swing":this.burst(t,.19,.19*r,2200,i);break;case"impact":this.burst(t,.13,.34*r,950,i),this.tone(680,t,.2,.09*r,this.effects,"triangle",i,180);break;case"hurt":this.burst(t,.17,.26*r,280,i),this.tone(115,t,.2,.17*r,this.effects,"sine",i,48);break;case"nova":this.burst(t,.6,.19*r,2100,i),[62,69,74].forEach((o,c)=>this.tone(vi(o),t+c*.04,.8,.09*r,this.effects,"sine",i,vi(o+12)));break;case"heal":a([74,77,81],.11,.1);break;case"level":a([62,69,74,77,81,86],.12,.15);break;case"loot":a([86,81,88],.065,.08);break;case"questAccept":a([62,69,74],.14,.09);break;case"questComplete":a([65,69,74,77,81],.13,.13);break;case"respawn":a([50,62,69,74],.18,.12);break;case"defeat":a([62,60,57,50],.2,.11);break;case"enemyDeath":this.burst(t,.35,.24*r,300,i),this.tone(145,t,.3,.08*r,this.effects,"triangle",i,45);break;case"ui":this.tone(650,t,.05,.04*r,this.effects,"sine",0,850);break;case"deny":this.tone(210,t,.11,.055*r,this.effects,"sine",0,160);break;case"bird":this.tone(1800,t,.11,.045*r,this.ambience,"sine",i,2700),this.tone(2300,t+.18,.11,.037*r,this.ambience,"sine",i,1700);break}}}function zo(s,e,t,n){const i=s.you,r=i.classId?Ms[i.classId][e]:Nc[e],a=Math.max(0,(i.cooldowns[e]??0)-t),o=s.enemies.find(y=>y.id===n&&y.state!=="dead")??s.players.find(y=>y.id===n&&!y.dead),c=e==="focus"&&i.classId==="ressonante"&&!!o&&"nickname"in o,l=r.area||e==="nova",u=r.damage>0&&!l,d=o?gt(i,o):null;let h="";i.dead?h="Personagem caído":a>0?h=`Recarga · ${(a/1e3).toFixed(1)} s`:i.energy<r.cost?h=`Energia insuficiente · ${r.cost} necessária`:i.casting?h="Conjuração em andamento":u&&o&&"state"in o&&o.state==="return"?h="Alvo retornando · invulnerável":u&&!o?h="Selecione um alvo":(u||c)&&d!==null&&d>r.range?h=`Fora de alcance · ${d.toFixed(1)} / ${r.range} m`:u&&o&&"nickname"in o&&(h="Selecione uma criatura hostil"),!h&&l&&!s.enemies.some(y=>y.state!=="dead"&&y.state!=="return"&&gt(i,y)<=r.range)&&(h="Nenhuma criatura na área");const f=c?o:i;!h&&r.heal&&f.hp>=f.maxHp&&(h="Vida completa");const g=l?`Área ao seu redor · raio ${r.range} m`:r.range===0||r.heal&&!c?"Em você":`Alcance ${r.range} m`;return{skill:r,remaining:a,targetDistance:d,reason:h,reach:g,description:`${r.name}. ${g}. ${r.cost?`${r.cost} de energia`:"Sem custo"}. Recarga ${r.cooldown/1e3} s.${r.cast?` Conjuração ${r.cast/1e3} s.`:""}`}}function yi(s){const e={bow:'<path d="M5 3c15 0 15 18 0 18L9 12ZM3 12h18m-4-4 4 4-4 4"/>',bolt:'<path d="m14 2-9 12h6l-1 8L20 9h-7Z"/>',note:'<path d="M8 18V6l10-3v12 M8 10l10-3"/><ellipse cx="5" cy="19" rx="3" ry="2"/><ellipse cx="15" cy="16" rx="3" ry="2"/>',heart:'<path d="M12 21 3.5 12A5 5 0 0 1 12 5a5 5 0 0 1 8.5 7Z M12 8v8m-4-4h8"/>',ring:'<ellipse cx="12" cy="13" rx="10" ry="5"/><ellipse cx="12" cy="13" rx="5" ry="2.5"/><path d="M12 2v6m-3-3 3 3 3-3"/>',sword:'<path d="m14 4 6-1-1 6-8 8-4-4Z M4 20l4-4 M4 12l8 8"/>',cleave:'<path d="m5 20 13-13 M13 4l7-1-1 7 M3 8c2-4 8-6 12-3 M4 4v5h5"/>',nova:'<path d="m12 2 2.8 6.2L22 11l-7.2 2.7L12 21l-2.7-7.3L2 11l7.3-2.8Z"/><path d="M4 20h3 M19 3v3"/>',shield:'<path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Z M12 6v11 M8 10h8"/>',potion:'<path d="M9 2h6 M10 2v6l-5 8c-2 4 2 6 7 6s9-2 7-6l-5-8V2 M8 14h8"/>',bag:'<path d="M5 8h14l2 13H3Z M8 8V5a4 4 0 0 1 8 0v3 M8 13h8 M9 17h6"/>',scroll:'<path d="M6 3h13v16H7c-4 0-4-5 0-5V3H4v4 M10 7h6 M10 11h6 M9 19v3h13v-5"/>',coin:'<circle cx="12" cy="12" r="9"/><path d="M12 6v12 M15 8h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9"/>'};return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e[s]??e.sword}</svg>`}const nr=s=>s.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);class Ry{onjoin=e=>{};onresume=e=>{};onexit=()=>{};onquality=()=>!1;onskill=e=>{};onrespawn=()=>{};onzoom=e=>{};onjoystick=(e,t)=>{};onquest=e=>{};onitem=(e,t)=>{};oninteract=()=>{};onworld=e=>{};oncreation=e=>{};oncopy=()=>{};onaudio=(e,t)=>{};onunlockaudio=()=>{};onuitone=()=>{};onDialogue=(e,t)=>{};onDialogueClose=()=>{};onreducedEffects=e=>{};onSkillPreview=e=>{};oncraft=()=>{};oncompanion=(e,t)=>{};reducedEffects=!1;creation={...Nd};current=null;online=!1;audioSettings={...Cs};bagKey="";questKey="";kitKey="";npcDialog=!1;panelFocus=null;selected=null;tooltipSkill=null;extendedDialog=null;extendedKey="";panelRoot;notices=new Map;constructor(e){this.panelRoot=e,e.innerHTML=`
 <header class="topbar"><div class="wordmark"><span class="brand-glyph">◇</span><span>ECOS DOS FARÓIS<small>FANTASIA HEROICA ARCANA</small></span><b class="build">ALPHA 0.3 · CANDIDATA</b></div><div class="top-actions"><button id="sound-button" aria-label="Configurar áudio">♫</button><button id="quality">Qualidade: alta</button><button id="help-button">Controles <kbd>H</kbd></button><button id="exit" hidden>Sair</button></div></header>
 <section id="entry" class="entry"><div class="eyebrow">QUANDO A LUZ SE APAGA, O MUNDO MUDA.</div><h1>Escolha<br>seu caminho.</h1><p class="intro">Dois povos unidos pela vigília.<br>Dois povos guiados pelas correntes.<br>Uma mesma luz começa a falhar.</p>
 <form id="entry-form" class="entry-card"><div class="creation-step"><span>01</span> SUA FACÇÃO</div><div class="faction-options"><button type="button" data-faction="vigilia" class="selected"><i>◇</i>A Vigília</button><button type="button" data-faction="confluencia"><i>◈</i>A Confluência</button></div>
 <label class="race-row" for="race"><span class="creation-step"><span>02</span> SEU POVO</span><select id="race"></select></label>
 <div class="creation-step"><span>03</span> SUA CLASSE</div><div class="class-options">${["sentinela","arcanista","errante","ressonante"].map((l,u)=>`<button type="button" data-class="${l}" class="${u===0?"selected":""}">${yi(["shield","nova","cleave","nova"][u])}<span>${$a[l]}</span></button>`).join("")}</div><p id="class-description" class="class-description"></p>
 <div class="appearance-inline"><span class="creation-step"><span>04</span> APARÊNCIA</span><div class="appearance-options">${[0,1,2].map(l=>`<button type="button" data-appearance="${l}" class="swatch swatch-${l} ${l===0?"selected":""}" aria-label="Aparência ${l+1}"></button>`).join("")}</div></div>
 <label class="name-label" for="nickname">Como devemos chamar você?</label><input id="nickname" maxlength="18" minlength="3" placeholder="Nome do personagem" autocomplete="nickname" required>
 <button class="primary" id="enter" type="submit">Entrar no mundo <span>→</span></button><button type="button" id="continue" class="secondary" hidden>Continuar jornada</button>
 <details class="recovery"><summary>Tenho uma chave de retorno</summary><input id="recovery-token" aria-label="Chave privada de retorno" maxlength="43" autocomplete="off" placeholder="Cole sua chave privada"><button type="button" id="recover" class="secondary">Recuperar personagem</button></details><p id="entry-error" role="status"></p><small class="entry-note">Progresso salvo neste servidor · mundo compartilhado</small></form></section>
 <div id="preview-caption"><span id="preview-race">VALDÁRIOS</span><strong id="preview-class">Sentinela</strong><small id="preview-faction">A Vigília</small><span class="preview-detail">A aparência não altera seus atributos.</span></div>
 <div id="hud" hidden>
 <section class="vitals panel"><div class="avatar"><span id="class-avatar">◇</span><b id="level">1</b></div><div class="vitals-body"><div class="name-row"><strong id="name"></strong><small id="class-label"></small></div><div class="bar health"><i id="health-fill"></i><span id="health-text"></span></div><div class="bar energy"><i id="energy-fill"></i><span id="energy-text"></span></div></div></section>
 <aside class="world-info"><div class="zone-label"><span class="eyebrow" id="faction-label"></span><h2 id="zone"></h2><small id="connection"></small></div><button id="map-toggle" class="map-toggle" aria-expanded="true" aria-controls="map-wrap" title="Mostrar ou recolher mapa">Mapa da região <span>⌃</span></button><div class="panel map-wrap" id="map-wrap"><canvas id="minimap" width="220" height="200" aria-label="Mapa da região"></canvas><span class="map-north">N</span></div><section class="quest-tracker panel" id="quest-tracker"></section></aside>
 <section id="target" class="target panel" hidden><span class="eyebrow" id="target-kind">ALVO SELECIONADO</span><strong id="target-name"></strong><div class="bar health"><i id="target-fill"></i><span id="target-text"></span></div><small id="target-state"></small><small id="target-distance"></small></section>
 <section id="cast" class="cast panel" hidden><span id="cast-label"></span><div class="bar"><i id="cast-fill"></i></div></section>
 <div class="combat-hint"><kbd>Tab</kbd> selecionar alvo · <kbd>1</kbd> autoataque · <kbd>E</kbd> interagir</div>
 <div id="action-feedback" class="action-feedback" role="status" hidden></div><div id="skill-tooltip" class="skill-tooltip panel" role="tooltip" hidden></div>
 <nav class="hotbar panel" aria-label="Habilidades e atalhos">${Bs.map((l,u)=>`<button class="skill" id="skill-${l}"><kbd>${u+1}</kbd>${yi(["sword","cleave","nova","shield","nova"][u])}<i class="cooldown-cover"></i><b class="cooldown-number"></b><span></span><small></small><em class="skill-state"></em></button>`).join("")}<button id="quick-potion" class="skill potion-skill"><kbd>6</kbd>${yi("potion")}<i class="cooldown-cover"></i><b class="cooldown-number"></b><span>Tônico</span><small id="potion-count"></small></button><div class="utility-buttons"><button id="bag-button" title="Mochila · I">${yi("bag")}<span>Mochila <kbd>I</kbd></span></button><button id="journal-button" title="Diário · J">${yi("scroll")}<span>Diário <kbd>J</kbd></span></button></div></nav>
 <button id="context" class="context panel" hidden></button>
 <div class="xp-wrap"><div class="xp-caption" id="xp-caption"></div><div class="xp-bar"><i id="xp-fill"></i></div></div><div class="bottom-brand">ECOS DOS FARÓIS <span>·</span> NEXO FORTE TECNOLOGIA</div>
 <div id="joystick" class="joystick"><span></span></div><div class="touch-zoom"><button id="zoom-in" aria-label="Aproximar">+</button><button id="zoom-out" aria-label="Afastar">−</button></div>
 <section id="bag" class="inventory panel" hidden><header><div><span class="eyebrow">MOCHILA DO VIAJANTE</span><h2>O que você carrega</h2></div><button id="bag-close" aria-label="Fechar mochila">×</button></header><div id="equipment"></div><div class="inventory-heading"><span id="bag-capacity"></span><strong id="coins"></strong></div><div id="inventory-slots"></div><div class="bag-services"><button id="craft-button" class="secondary">Ofício · alquimia</button><button id="companion-button" class="secondary">Companheiro do Errante</button></div></section></div>
 <div id="toasts" aria-live="polite" aria-relevant="additions text"></div>
 <div id="network-overlay" class="overlay" hidden><div class="modal"><span class="eyebrow">ENTRE DOIS CAMINHOS</span><h2>Retornando ao mundo</h2><p id="network-text"></p><button id="network-exit" class="secondary">Voltar à entrada</button></div></div>
 <div id="help" class="overlay" hidden><div class="modal"><span class="eyebrow">GUIA DO VIAJANTE</span><h2>Encontre seu caminho</h2><div class="help-grid"><kbd>W A S D</kbd><span>Mover o personagem</span><kbd>Mouse direito</kbd><span>Segurar e arrastar para girar a câmera</span><kbd>Roda</kbd><span>Aproximar ou afastar</span><kbd>Tab / clique</kbd><span>Selecionar uma criatura</span><kbd>1 / espaço</kbd><span>Ativar ou interromper autoataques</span><kbd>2–5</kbd><span>Habilidades · Q e R também usam 2 e 3</span><kbd>6</kbd><span>Usar tônico</span><kbd>E / F</kbd><span>Interagir / coletar saque</span><kbd>I / J</kbd><span>Mochila / diário</span><kbd>M / H / Esc</kbd><span>Silêncio / ajuda / fechar painéis</span></div><p>Converse com a guia junto à estrada. Fora de combate, o Farol recupera sua vida. Uma queda não apaga seu progresso.</p><button id="help-close" class="primary">Voltar à aventura</button><button id="copy-key" class="secondary">Copiar minha chave de retorno</button><small class="key-note">Sua chave dá acesso ao personagem. Guarde em local privado.</small><a class="account-link" href="/accounts.html">Gerenciar personagens de uma conta de teste</a></div></div>
 <div id="dialog" class="overlay" hidden><div class="modal quest-modal" id="dialog-content"></div></div>
 <div id="death" class="overlay death-overlay" hidden><div class="modal"><span class="eyebrow">A LUZ AINDA ALCANÇA VOCÊ</span><h2>Uma pausa na jornada.</h2><p>Seu equipamento e progresso continuam com você.</p><button id="respawn" class="primary">Retornar ao Farol</button></div></div>
 <section id="audio-panel" class="audio-panel panel" hidden><header><span class="eyebrow">SONS DO MUNDO</span><button id="audio-close" aria-label="Fechar áudio">×</button></header><h2>A voz do Nexo.</h2>${["master","music","ambience","effects","voice"].map(l=>`<label for="audio-${l}"><span>${{master:"Volume geral",music:"Música",ambience:"Ambiente",effects:"Efeitos",voice:"Voz"}[l]}</span><output id="audio-${l}-value"></output></label><input id="audio-${l}" data-audio="${l}" type="range" min="0" max="100" value="${Cs[l]*100}">`).join("")}<label class="effects-setting" for="reduced-effects"><input id="reduced-effects" type="checkbox"><span>Reduzir efeitos e movimento</span></label><button id="audio-mute" class="secondary">Silenciar tudo</button><small id="audio-state"></small><small class="voice-note">Diálogos com legendas; gravações de voz pendentes.</small></section>`,this.races(),this.creationUI(),this.el("entry-form").addEventListener("submit",l=>{l.preventDefault();const u=this.el("nickname").value.trim();if(!/^[\p{L}\p{N} _-]{3,18}$/u.test(u)){this.el("entry-error").textContent="Use de 3 a 18 letras, números, espaços, _ ou -.";return}this.onjoin(u)}),e.querySelectorAll("[data-faction]").forEach(l=>l.onclick=()=>{this.creation.factionId=l.dataset.faction,this.creation.raceId=El[this.creation.factionId][0],this.races(),this.creationUI()}),this.el("race").onchange=()=>{this.creation.raceId=this.el("race").value,this.creationUI()},e.querySelectorAll("[data-class]").forEach(l=>l.onclick=()=>{this.creation.classId=l.dataset.class,this.creationUI()}),e.querySelectorAll("[data-appearance]").forEach(l=>l.onclick=()=>{this.creation.appearance=Number(l.dataset.appearance),this.creationUI()});let t=null;try{t=JSON.parse(localStorage.getItem("nexo.last")??"null")}catch{}t?.token&&(this.el("continue").hidden=!1,this.el("continue").textContent=`Continuar como ${t.nickname}`,this.el("continue").onclick=()=>this.onresume(t.token)),this.el("recover").onclick=()=>{const l=this.el("recovery-token").value.trim();/^[A-Za-z0-9_-]{43}$/.test(l)?this.onresume(l):this.el("entry-error").textContent="A chave precisa ter 43 caracteres."};for(const l of Bs){const u=this.el("skill-"+l);u.setAttribute("aria-describedby","skill-tooltip"),u.onclick=()=>this.onskill(l),u.addEventListener("pointerenter",()=>this.showSkill(l)),u.addEventListener("focus",()=>this.showSkill(l)),u.addEventListener("pointerleave",()=>this.hideSkill()),u.addEventListener("blur",()=>this.hideSkill())}this.el("map-toggle").onclick=()=>{const l=!this.el("map-wrap").hidden;this.el("map-wrap").hidden=l,this.el("map-toggle").setAttribute("aria-expanded",String(!l))};try{this.reducedEffects=localStorage.getItem("edf.reducedEffects")==="true"||!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}catch{}this.el("reduced-effects").checked=this.reducedEffects,this.el("reduced-effects").onchange=l=>{this.reducedEffects=l.target.checked,e.classList.toggle("reduced-effects",this.reducedEffects);try{localStorage.setItem("edf.reducedEffects",String(this.reducedEffects))}catch{}this.onreducedEffects(this.reducedEffects)},e.classList.toggle("reduced-effects",this.reducedEffects),e.addEventListener("keydown",l=>{!this.modalOpen||!l.target.closest(".overlay,.inventory,.audio-panel")||(l.key==="Escape"&&(l.preventDefault(),this.closePanels()),l.stopPropagation())}),this.el("quality").onclick=()=>{this.el("quality").textContent=this.onquality()?"Qualidade: econômica":"Qualidade: alta"},this.el("exit").onclick=this.el("network-exit").onclick=()=>this.onexit(),this.el("help-button").onclick=()=>this.help(),this.el("help-close").onclick=()=>this.help(!1),this.el("copy-key").onclick=()=>this.oncopy(),this.el("bag-button").onclick=()=>this.toggleBag(),this.el("bag-close").onclick=()=>this.toggleBag(!1),this.el("craft-button").onclick=()=>this.crafting(),this.el("companion-button").onclick=()=>this.companion(),this.el("journal-button").onclick=()=>this.journal(),this.el("quick-potion").onclick=()=>this.quickPotion(),this.el("respawn").onclick=()=>this.onrespawn(),this.el("context").onclick=()=>this.oninteract(),this.el("zoom-in").onclick=()=>this.onzoom(-180),this.el("zoom-out").onclick=()=>this.onzoom(180),this.el("inventory-slots").onclick=l=>{const u=l.target.closest("[data-item-action]");u&&this.onitem(u.dataset.itemAction,Number(u.dataset.slot))},this.el("dialog-content").onclick=l=>{const u=l.target.closest("[data-dialog-action]");if(!u)return;const d=u.dataset.dialogAction;if(d==="craft"){this.oncraft();return}if(d?.startsWith("companion-")){const h=d.slice(10);this.oncompanion(h,h==="capture"||h==="attack"?this.selected??void 0:void 0),this.closeDialog();return}(d==="accept"||d==="complete")&&this.onquest(d),(d==="repair"||d==="flow")&&this.onworld(d),this.closeDialog()},this.el("sound-button").onclick=()=>{this.panel("audio-panel",this.el("audio-panel").hidden),this.onunlockaudio()},this.el("audio-close").onclick=()=>this.panel("audio-panel",!1),this.el("audio-mute").onclick=()=>this.toggleSound(),this.el("audio-panel").addEventListener("input",l=>{const u=l.target;u.dataset.audio&&this.onaudio(u.dataset.audio,Number(u.value)/100)}),e.addEventListener("click",l=>{l.target.closest("button")&&this.onuitone()});const n=this.el("joystick"),i=n.firstElementChild;let r=null;const a=l=>{const u=n.getBoundingClientRect(),d=(l.clientX-u.left-u.width/2)/34,h=(l.clientY-u.top-u.height/2)/34,f=Math.max(1,Math.hypot(d,h));i.style.transform=`translate(${d/f*24}px,${h/f*24}px)`,this.onjoystick(d/f,h/f)};n.onpointerdown=l=>{r=l.pointerId,n.setPointerCapture(r),a(l)},n.onpointermove=l=>{l.pointerId===r&&a(l)},n.onpointerup=n.onpointercancel=()=>{r=null,i.style.transform="",this.onjoystick(0,0)};const o=this.el("dialog"),c=this.el("dialog-content");new window.MutationObserver(()=>{o.isConnected&&!o.hidden&&c.querySelector("button,input")?.focus({preventScroll:!0})}).observe(c,{childList:!0}),this.audioLevels(this.audioSettings,!1)}el(e){return document.getElementById(e)}races(){const e=this.el("race");e.replaceChildren();for(const t of El[this.creation.factionId]){const n=document.createElement("option");n.textContent=Tl[t],n.value=t,e.add(n)}e.value=this.creation.raceId}creationUI(){for(const[e,t]of[["[data-faction]","faction"],["[data-class]","class"],["[data-appearance]","appearance"]])this.el("entry").querySelectorAll(e).forEach(n=>n.classList.toggle("selected",n.dataset[t]===String(t==="faction"?this.creation.factionId:t==="class"?this.creation.classId:this.creation.appearance)));this.el("class-description").textContent=Ld[this.creation.classId],this.el("preview-race").textContent=Tl[this.creation.raceId],this.el("preview-class").textContent=$a[this.creation.classId],this.el("preview-faction").textContent=Os[this.creation.factionId],this.oncreation({...this.creation})}get modalOpen(){return["help","dialog","bag","audio-panel","death","network-overlay"].some(e=>!this.el(e).hidden)}panel(e,t){const n=this.el(e),i=!n.hidden;if(t&&!i){this.modalOpen||(this.panelFocus=document.activeElement);for(const a of["help","dialog","bag","audio-panel"])a===e||this.el(a).hidden||(this.el(a).hidden=!0,a==="dialog"&&this.onDialogueClose())}n.hidden=!t,this.panelRoot.querySelectorAll("[data-panel-inert]").forEach(a=>{a.removeAttribute("inert"),a.removeAttribute("data-panel-inert")});const r=t?n:["help","dialog","bag","audio-panel","death","network-overlay"].map(a=>this.el(a)).find(a=>!a.hidden);if(r){const a=o=>{for(const c of o.children)c===r||c.id==="toasts"||(c.contains(r)?a(c):(c.setAttribute("inert",""),c.setAttribute("data-panel-inert","")))};a(this.panelRoot)}t?(this.hideSkill(),n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label",{help:"Controles",dialog:"Conversa e diário",bag:"Mochila","audio-panel":"Áudio e acessibilidade"}[e]??e),n.querySelector("button,input,select")?.focus({preventScroll:!0})):i&&this.panelFocus?.isConnected&&(this.panelFocus.focus({preventScroll:!0}),this.panelFocus=null)}showSkill(e){if(this.tooltipSkill!==e&&this.onSkillPreview(e),this.tooltipSkill=e,!this.current||this.modalOpen)return;const t=zo(this.current,e,Date.now(),this.selected);this.el("skill-tooltip").innerHTML=`<strong>${nr(t.skill.name)}</strong><span>${nr(t.reach)}</span><span>${t.skill.cost} energia · ${t.skill.cooldown/1e3} s de recarga${t.skill.cast?` · ${t.skill.cast/1e3} s de conjuração`:""}</span><small>${nr(t.reason||"Pronto · confirmação e efeitos pelo servidor")}</small>`,this.el("skill-tooltip").hidden=!1}hideSkill(){this.tooltipSkill!==null&&this.onSkillPreview(null),this.tooltipSkill=null,this.el("skill-tooltip").hidden=!0}help(e=this.el("help").hidden){this.panel("help",e)}toggleBag(e=this.el("bag").hidden){this.panel("bag",e)}closeDialog(){this.extendedDialog=null,this.panel("dialog",!1),this.npcDialog=!1,this.onDialogueClose()}closePanels(){this.help(!1),this.closeDialog(),this.toggleBag(!1),this.panel("audio-panel",!1)}toggleSound(){this.onaudio("enabled",!this.audioSettings.enabled)}audioLevels(e,t){this.audioSettings={...e};for(const n of["master","music","ambience","effects","voice"])this.el("audio-"+n).value=String(Math.round(e[n]*100)),this.el("audio-"+n+"-value").textContent=`${Math.round(e[n]*100)}%`;this.el("audio-mute").textContent=e.enabled?"Silenciar tudo · M":"Ativar som · M",this.el("sound-button").classList.toggle("muted",!e.enabled),this.el("audio-state").textContent=e.enabled?t?"Preferências salvas neste navegador.":"Toque para ativar o áudio.":"Som silenciado."}toast(e,t="info"){const n=`${t}:${e}`,i=this.notices.get(n);if(i){i.count++,i.element.textContent=`${e} ×${i.count}`,clearTimeout(i.timer),i.timer=setTimeout(()=>{i.element.remove(),this.notices.delete(n)},4200);return}const r=document.createElement("div");r.className="toast "+t,r.textContent=e,this.el("toasts").append(r);const a=setTimeout(()=>{r.remove(),this.notices.delete(n)},4200);for(this.notices.set(n,{element:r,count:1,timer:a});this.notices.size>3;){const o=this.notices.keys().next().value,c=this.notices.get(o);clearTimeout(c.timer),c.element.remove(),this.notices.delete(o)}}showKey(e){this.extendedDialog=null,this.panel("dialog",!0),this.el("dialog-content").innerHTML=`<span class="eyebrow">RETORNO AO MUNDO</span><h2>Guarde sua chave.</h2><p>Quem possui esta chave consegue abrir seu personagem neste servidor.</p><input id="private-key" readonly value="${nr(e)}"><button class="primary" data-dialog-action="close">Já guardei</button>`,this.el("private-key").select()}status(e,t=""){e==="online"?(this.online=!0,this.el("entry").parentElement?.classList.add("in-world"),this.el("entry").hidden=!0,this.el("preview-caption").hidden=!0,this.el("hud").hidden=!1,this.el("exit").hidden=!1,this.panel("network-overlay",!1),this.el("enter").disabled=!1):e==="connecting"?(this.el("entry-error").textContent="Abrindo os caminhos…",this.el("enter").disabled=!0):(this.online=!1,this.closePanels(),this.panel("death",!1),this.panel("network-overlay",!0),this.el("network-text").textContent=t,this.el("enter").disabled=!1)}quickPotion(){const e=this.current?.you.inventory.findIndex(t=>t.item==="potion")??-1;e<0?this.toast("Você não tem tônicos. Colete as recompensas das criaturas."):this.onitem("use",e)}context(e){this.el("context").hidden=!e,e&&(this.el("context").innerHTML=`<kbd>${e==="loot"?"F":"E"}</kbd> ${e==="loot"?"Coletar recompensa":e==="fragment"?"Sintonizar ressonância":e==="farol"?"Restaurar o Farol":e==="craft"?"Bancada de Alquimia":"Conversar"} <span>→</span>`)}crafting(){if(!this.current)return;this.extendedDialog="craft",this.npcDialog=!1,this.onDialogueClose(),this.panel("dialog",!0);const e=this.current.you,t=e.materials?.seivaClara??0,n=gt(e,dn)<=dn.range,i=e.quest.state==="completed",r=i?n?t<Mi.materialCost||e.coins<Mi.coinCost?"Você ainda precisa reunir os insumos.":e.inventory.length>=Do&&!e.inventory.some(a=>a.item==="potion"&&a.quantity<20)?"Reserve espaço na mochila antes de fabricar.":"Receita pronta para solicitar ao servidor.":"Aproxime-se da bancada junto ao refúgio.":"Conclua a missão da estrada para aprender esta receita.";this.el("dialog-content").innerHTML=`<span class="eyebrow">OFÍCIO EXPERIMENTAL · ALQUIMIA</span><h2>${Mi.name}</h2><p>Na ${dn.name}, prepare um tônico com a seiva recolhida de criaturas. A receita e os valores desta Alpha são experimentais.</p><div class="objectives"><div>${Id.name}<strong>${t} / ${Mi.materialCost}</strong></div><div>Moedas<strong>${e.coins} / ${Mi.coinCost}</strong></div><div>Produto<strong>1 tônico</strong></div></div><p id="craft-reason">${r}</p><button class="primary" data-dialog-action="craft" ${!n||!i||t<Mi.materialCost||e.coins<Mi.coinCost?"disabled":""}>Preparar tônico</button><button class="secondary" data-dialog-action="close">Voltar à aventura</button>`}companion(){if(!this.current)return;this.extendedDialog="companion",this.npcDialog=!1,this.onDialogueClose(),this.panel("dialog",!0);const e=this.current.you,t=e.companion,n=e.classId==="errante";this.el("dialog-content").innerHTML=`<span class="eyebrow">LAÇO DO ERRANTE · EXPERIMENTAL</span><h2>${t?nr(t.name):"Um aliado no caminho"}</h2>${n?t?`<p>${t.active?"Companheiro ativo":"Companheiro recolhido"} · ${t.mode==="follow"?"Seguindo":t.mode==="stay"?"Aguardando":"Passivo"}. Ativar ou recolher exige 4 s fora de combate.</p><div class="companion-actions">${(t.active?[["follow","Seguir"],["stay","Aguardar aqui"],["passive","Não atacar"],["attack","Atacar meu alvo"],["recall","Recolher"]]:[["activate","Chamar companheiro"]]).map(([i,r])=>`<button class="secondary" data-dialog-action="companion-${i}" ${i==="attack"&&!this.selected?"disabled":""}>${r}</button>`).join("")}</div>`:`<p>Conclua a missão da estrada. Selecione um Brumino comum com ${Fr.minHp*100}–${Fr.maxHp*100}% de vida e fique a até ${Fr.range} m. O vínculo exige ${Fr.duration/1e3} s sem interrupção.</p><p>Um único companheiro pode ser vinculado nesta Alpha. A criatura precisa estar selecionada no mundo.</p><button class="primary" data-dialog-action="companion-capture" ${!this.selected||e.quest.state!=="completed"?"disabled":""}>Iniciar vínculo com o alvo</button>`:"<p>A captura está disponível ao Errante. Outros personagens mantêm suas habilidades e equipamento.</p>"}<button class="secondary" data-dialog-action="close">Voltar à aventura</button>`}objectives(){const e=this.current.you.quest;return`<div class="objectives"><div class="${e.brumino>=_i.brumino?"done":""}">Bruminos afastados <strong>${e.brumino} / ${_i.brumino}</strong></div><div class="${e.cerne>=_i.cerne?"done":""}">Cernes estabilizados <strong>${e.cerne} / ${_i.cerne}</strong></div></div>`}rewards(){const e=this.current?.you.classId;return`<div class="quest-rewards"><small>RECOMPENSAS</small><strong>${_i.xp} XP · ${_i.coins} moedas</strong><span>${Qs[e?Dd[e]:"dawnSword"].name}</span></div>`}journal(){if(!this.current)return;this.extendedDialog=null,this.npcDialog=!1,this.onDialogueClose(),this.panel("dialog",!0);const e=this.current.you,t=Oi(e),n=e.story;this.el("dialog-content").innerHTML=`<span class="eyebrow">DIÁRIO · ${Os[t]}</span><h2>Os caminhos e a luz</h2><p>A instabilidade do Nexo atinge as criaturas e os condutores da região.</p><h3>1. A trilha volta a respirar</h3>${this.objectives()}<p>${e.quest.state==="available"?"Converse com "+Fi[t].name+" junto à estrada.":e.quest.state==="ready"?"Retorne à guia para receber sua recompensa.":e.quest.state==="completed"?"Concluída.":"Proteja os caminhos ao norte do refúgio."}</p><h3>2. O condutor partido</h3><p>${e.quest.state!=="completed"?"Disponível após proteger os caminhos.":n?.restored?"O Farol foi restaurado. Sua escolha: "+(n.choice==="repair"?"reparar os condutores.":"restabelecer a circulação do fluxo."):"Sintonize três ressonâncias, desfaça o Núcleo Fraturado ao norte e retorne ao Farol."}</p><div class="objectives"><div>Ecos sintonizados <strong>${n?.fragments.length??0} / 3</strong></div><div>Núcleo Fraturado <strong>${n?.boss?"Desfeito":"Ativo"}</strong></div></div><button class="primary" data-dialog-action="close">Voltar à aventura</button>`}talk(e="guide"){if(!this.current||this.current.you.dead)return;this.extendedDialog=null;const t=this.current.you,n=Oi(t),i=Fi[n];if(gt(t,e==="companion-1"?{x:-10,z:18}:e==="companion-2"?{x:6,z:10}:Wi)>3.2){this.toast("Aproxime-se de "+i.name+" ou de outro habitante.");return}if(this.npcDialog=!0,this.panel("dialog",!0),e!=="guide"){const c=e==="companion-1"?0:1,l=c===0?"Os condutores não estão quebrando por desgaste. Algo mudou no ritmo da ressonância. Observe os ecos entre as árvores.":"As medidas não apontam uma vontade por trás da instabilidade. Precisamos compreender o fenômeno antes de dar um nome ao inimigo.";this.onDialogue(`${n}.companion.${c+1}`,l),this.el("dialog-content").innerHTML=`<span class="eyebrow">${Os[n]}</span><h2>${i.companions[c]}</h2><p class="speech">${l}</p><p>Fale com ${i.name} para organizar a investigação.</p><button class="primary" data-dialog-action="close">Até breve</button>`;return}const a=t.quest,o=a.state==="available"?n==="vigilia"?"As luzes do caminho falharam outra vez. As criaturas chegaram perto das casas. Precisamos abrir a estrada antes de investigar o Farol.":"O fluxo que alimenta as raízes mudou. As criaturas já não reconhecem seus territórios. Primeiro, precisamos proteger quem vive aqui.":a.state==="active"?"Ainda há criaturas instáveis na estrada. Você não precisa enfrentá-las todas de uma vez. Volte ao Farol se precisar recuperar as forças.":a.state==="ready"?"A estrada voltou a respirar. Você nos deu tempo para investigar os condutores. Aceite este equipamento e procure as três ressonâncias no bosque.":t.story?.restored?t.story.choice==="flow"?"O fluxo voltou a circular. Ainda precisamos estudar as consequências, mas hoje a luz encontrou seu ritmo.":"Os condutores estão firmes outra vez. Registraremos o procedimento para que ninguém precise improvisar na próxima crise.":"Agora procure as três ressonâncias no bosque e desfaça o Núcleo Fraturado no extremo norte. Depois, leve sua descoberta ao Farol.";this.onDialogue(`${n}.guide.${a.state}${t.story?.restored?"."+t.story.choice:""}`,o),this.el("dialog-content").innerHTML=`<span class="eyebrow">${i.title} · ${Os[n]}</span><h2>${i.name}</h2><p class="speech">${o}</p><h3>${_i.name}</h3>${this.objectives()}${this.rewards()}${a.state==="available"?'<button class="primary" data-dialog-action="accept">Vou proteger os caminhos</button>':a.state==="ready"?'<button class="primary" data-dialog-action="complete">Receber recompensa</button>':'<button class="primary" data-dialog-action="close">Continuar a jornada</button>'}<button class="secondary" data-dialog-action="close">Até breve</button>`}restoreDialog(){if(!this.current)return;this.extendedDialog=null,this.npcDialog=!1,this.onDialogueClose(),this.panel("dialog",!0);const e=this.current.you.story,t=!!e&&e.fragments.length===3&&e.boss&&!e.restored;this.el("dialog-content").innerHTML=`<span class="eyebrow">O CONDUTOR PARTIDO</span><h2>A luz procura um ritmo.</h2><p>${e?.restored?"A ressonância está equilibrada. O registro da sua escolha permanece com este personagem.":t?"Os ecos se encaixam, mas há dois caminhos para estabilizar o Farol. Ambos preservam a comunidade.":"Sintonize os três ecos e desfaça o Núcleo Fraturado antes de restaurar o Farol."}</p>${t?'<button class="primary" data-dialog-action="repair">Reparar e alinhar os condutores</button><button class="secondary" data-dialog-action="flow">Restabelecer a circulação do fluxo</button><small class="key-note">A escolha altera o diálogo de desfecho. As recompensas são equivalentes.</small>':""}<button class="secondary" data-dialog-action="close">Voltar à aventura</button>`}progressUI(){const e=this.current.you,t=Oi(e),n=e.story,i=JSON.stringify([e.quest,n]);i!==this.questKey&&(this.questKey=i,this.el("quest-tracker").innerHTML=`<span class="eyebrow">${n?.restored?"JORNADA CONCLUÍDA":e.quest.state==="completed"?"O CONDUTOR PARTIDO":"MISSÃO DA REGIÃO"}</span><h3>${n?.restored?"O Farol voltou a ressoar":e.quest.state==="completed"?"Reúna os ecos do Nexo":_i.name}</h3>${e.quest.state==="available"?"<p>Converse com "+Fi[t].name+" junto à estrada.</p>":e.quest.state==="completed"?`<p>Ecos sintonizados <b>${n?.fragments.length??0}/3</b><br>Núcleo Fraturado <b>${n?.boss?"Desfeito":"Ativo"}</b></p><p>${n?.restored?"Continue explorando ou experimente outra classe.":"Retorne ao Farol após reunir os ecos."}</p>`:this.objectives()}<button id="tracker-journal">Abrir diário <kbd>J</kbd></button>`,this.el("tracker-journal").onclick=()=>this.journal());const r=Qu[e.level-1],a=Qu[Math.min(4,e.level)],o=e.level===5?1:(e.xp-r)/(a-r);this.el("xp-fill").style.width=`${o*100}%`,this.el("xp-caption").textContent=e.level===5?"NÍVEL 5 · LIMITE DESTA ALPHA":`NÍVEL ${e.level} · ${e.xp-r} / ${a-r} XP`,this.el("potion-count").textContent=String(e.inventory.filter(l=>l.item==="potion").reduce((l,u)=>l+u.quantity,0))+" na mochila";const c=JSON.stringify([e.inventory,e.weapon,e.armor,e.coins]);c!==this.bagKey&&(this.bagKey=c,this.el("equipment").innerHTML=[["Arma",e.weapon],["Proteção",e.armor]].map(([l,u])=>`<div class="equipped">${yi(Qs[u].icon)}<div><small>${l}</small><strong>${Qs[u].name}</strong><span>${Qs[u].description}</span></div></div>`).join(""),this.el("bag-capacity").textContent=`${e.inventory.length} / ${Do} espaços`,this.el("coins").textContent=`${e.coins} moedas`,this.el("inventory-slots").innerHTML=Array.from({length:Do},(l,u)=>{const d=e.inventory[u];if(!d)return'<div class="inventory-empty">◇</div>';const h=Qs[d.item];return`<div class="inventory-slot">${yi(h.icon)}<div><strong>${h.name}</strong><small>${h.description}</small></div><b>${d.quantity>1?d.quantity:""}</b><button data-item-action="${h.kind==="consumable"?"use":"equip"}" data-slot="${u}">${h.kind==="consumable"?"Usar":"Equipar"}</button><button data-item-action="discard" data-slot="${u}" aria-label="Descartar uma unidade">×</button></div>`}).join(""))}update(e,t){this.current=e;const n=e.you,i=Oi(n);this.el("name").textContent=n.nickname,this.el("level").textContent=String(n.level),this.el("class-label").textContent=$a[n.classId??"sentinela"],this.el("faction-label").textContent=Os[i],this.el("health-fill").style.width=`${n.hp/n.maxHp*100}%`,this.el("health-text").textContent=`Vida ${Math.ceil(n.hp)} / ${n.maxHp}`,this.el("energy-fill").style.width=`${n.energy}%`,this.el("energy-text").textContent=`Energia ${Math.floor(n.energy)} / 100`,this.el("zone").textContent=n.z<0?Fi[i].wild:Fi[i].zone,this.el("connection").textContent=`${e.players.length} viajante${e.players.length>1?"s":""} · ${t||"…"} ms`;const r=n.classId??"legacy";if(r!==this.kitKey){this.kitKey=r;for(const o of Bs){const c=n.classId?Ms[n.classId][o]:Nc[o],l=this.el("skill-"+o),u=n.classId==="errante"?["bow","bow","ring","shield","heart"]:n.classId==="ressonante"?["note","bolt","ring","shield","heart"]:n.classId==="arcanista"?["nova","bolt","ring","shield","heart"]:["sword","shield","ring","shield","heart"];l.querySelector("svg").outerHTML=yi(u[Bs.indexOf(o)]),l.querySelector("span").textContent=c.name,l.querySelector("small").textContent=c.cost?`${c.cost} energia`:"Autoataque";const d=zo(e,o,Date.now(),this.selected);l.title=d.description,l.setAttribute("aria-label",d.description)}}this.map(e),this.progressUI();const a=JSON.stringify([n.materials,n.crafting,n.companion,n.coins,n.inventory]);a!==this.extendedKey&&(this.extendedKey=a,!this.el("dialog").hidden&&this.extendedDialog==="craft"&&this.crafting(),!this.el("dialog").hidden&&this.extendedDialog==="companion"&&this.companion())}animate(e,t){if(!this.current)return;const n=this.current.you;this.selected=t;for(const c of Bs){const l=n.classId?Ms[n.classId][c]:Nc[c],u=this.el("skill-"+c),d=Math.max(0,(n.cooldowns[c]??0)-e),h=zo(this.current,c,e,t);u.disabled=d>0||n.dead||n.energy<l.cost,u.classList.toggle("out-of-range",h.reason.startsWith("Fora de alcance")),u.classList.toggle("needs-target",h.reason.startsWith("Selecione")),u.querySelector(".skill-state").textContent=d>0?"Recarga":n.energy<l.cost?"Sem energia":h.reason.startsWith("Fora de alcance")?"Fora de alcance":h.reason.startsWith("Selecione")?"Escolha alvo":h.reason.startsWith("Nenhuma criatura")?"Área vazia":h.reason==="Vida completa"?"Vida completa":h.reason.startsWith("Conjuração")?"Conjurando":h.reason.startsWith("Alvo retornando")?"Invulnerável":"Pronto",u.setAttribute("aria-label",`${h.description} ${h.reason||"Pronto"}`),u.querySelector(".cooldown-cover").style.height=`${Math.min(100,d/l.cooldown*100)}%`,u.querySelector(".cooldown-number").textContent=d>0?(d/1e3).toFixed(1):""}const i=this.current.enemies.find(c=>c.id===t&&c.state!=="dead"),r=this.current.players.find(c=>c.id===t&&!c.dead);if(this.el("target").hidden=!i&&!r,i||r){const c=i??r;this.el("target-kind").textContent=i?"◆ CRIATURA HOSTIL":"◇ VIAJANTE ALIADO",this.el("target").classList.toggle("allied",!!r),this.el("target-distance").textContent=`${gt(n,c).toFixed(1)} m de você`,this.el("target-name").textContent=i?i.elite?"Núcleo Fraturado":Iv[i.kind].name:r.nickname,this.el("target-fill").style.width=`${c.hp/c.maxHp*100}%`,this.el("target-text").textContent=`${Math.ceil(c.hp)} / ${c.maxHp}`,this.el("target-state").textContent=i?{patrol:"Patrulhando",chase:"Em perseguição",attack:"Em combate",return:"Retornando · invulnerável",dead:""}[i.state]:"Aliado · selecione para receber cura"}if(this.tooltipSkill&&!n.casting?this.showSkill(this.tooltipSkill):n.casting&&this.hideSkill(),this.el("cast").hidden=!n.casting,n.casting){const c=Ms[n.classId??"arcanista"][n.casting.skill];this.el("cast-label").textContent=`${c.name} · ${Math.max(0,(n.casting.endsAt-e)/1e3).toFixed(1)} s`,this.el("cast-fill").style.width=`${Math.max(0,Math.min(100,(1-(n.casting.endsAt-e)/(c.cast??1e3))*100))}%`}if(n.taming&&(this.el("cast").hidden=!1,this.el("cast-label").textContent=`Criando vínculo · ${Math.max(0,(n.taming.endsAt-e)/1e3).toFixed(1)} s`,this.el("cast-fill").style.width=`${Math.max(0,Math.min(100,(e-n.taming.startedAt)/(n.taming.endsAt-n.taming.startedAt)*100))}%`),this.el("death").hidden===n.dead&&(n.dead&&this.closePanels(),this.panel("death",n.dead)),n.dead){const c=Math.max(0,Math.ceil((n.respawnAt-e)/1e3));this.el("respawn").disabled=c>0,this.el("respawn").textContent=c?`A luz se recompõe… ${c}s`:"Retornar ao Farol"}const a=Math.max(0,n.potionAt-e),o=this.el("quick-potion");o.disabled=n.dead||a>0||!n.inventory.some(c=>c.item==="potion"),o.querySelector(".cooldown-cover").style.height=`${a/8e3*100}%`,o.querySelector(".cooldown-number").textContent=a?(a/1e3).toFixed(1):""}map(e){const t=this.el("minimap").getContext("2d");t.clearRect(0,0,220,200),t.fillStyle=Oi(e.you)==="vigilia"?"#334e41":"#394d5b",t.fillRect(0,0,220,200);const n=r=>(r+44)/88*220,i=r=>(r+46)/84*200;t.fillStyle="#66735b",t.fillRect(0,i(0),220,200-i(0)),t.strokeStyle="#b3a17c",t.lineWidth=6,t.beginPath(),t.moveTo(110,0),t.lineTo(110,200),t.stroke(),t.lineWidth=3,t.beginPath(),t.moveTo(35,i(15)),t.lineTo(185,i(15)),t.stroke(),t.fillStyle="#9d9a83";for(const r of Ga)t.fillRect(n(r.x)-6,i(r.z)-5,12,10);for(const r of e.enemies)if(r.state!=="dead"){t.fillStyle=r.elite?"#c18bc5":"#ce8676";const a=r.elite?4:2.5;t.fillRect(n(r.x)-a,i(r.z)-a,a*2,a*2)}for(const r of Lr)e.you.story?.fragments.includes(r.id)||(t.fillStyle="#7bc9cf",t.fillRect(n(r.x)-2,i(r.z)-2,4,4));t.fillStyle="#efce8a",t.beginPath(),t.arc(n(Wi.x),i(Wi.z),3,0,7),t.fill(),t.fillStyle="#a9dbce",t.fillRect(n(It.x)-3,i(It.z)-3,6,6);for(const r of e.players)t.fillStyle=r.id===e.you.id?"#fff2c9":"#92c5dc",t.beginPath(),t.arc(n(r.x),i(r.z),r.id===e.you.id?4:3,0,7),t.fill()}}const Cy=["guide.available","guide.active","guide.ready","guide.completed","guide.completed.repair","guide.completed.flow","companion.1","companion.2"],Py=Object.freeze(Object.fromEntries(["vigilia","confluencia"].flatMap(s=>Cy.map(e=>{const t=`${s}.${e}`;return[t,Object.freeze({id:t,locale:"pt-BR",status:"recording-pending",asset:null,provenance:null})]})))),hh=(s,e)=>typeof s=="number"&&Number.isFinite(s)?Math.max(0,Math.min(1,s)):e;class Iy{settings={...Cs};ctx=null;bank=null;timer=null;start=0;note=0;loop=0;sampleBuffers=new Map;beaconState=-1;beaconSource=null;beaconGain=null;beaconFilter=null;beaconVolume=0;beaconGeneration=0;lastState=null;sampleCount=0;sampleGeneration=0;seenSnapshots=new Set;liveSamples=new Map;dialogueId=null;dialogueText="";dialogueGeneration=0;dialogueSource=null;nextBird=0;combatUntil=0;lastPosition=null;stepDistance=0;stepSide=1;yaw=0;onchange=(e,t)=>{};constructor(){try{const e=JSON.parse(localStorage.getItem("nexo.audio")??"null");if(e){for(const t of["master","music","ambience","effects","voice"])this.settings[t]=hh(e[t],Cs[t]);this.settings.enabled=typeof e.enabled=="boolean"?e.enabled:!0}}catch{}document.addEventListener("visibilitychange",()=>{this.ctx&&(document.hidden?(this.stopSamples(),this.closeDialogue(),this.ctx.suspend().catch(()=>{})):this.settings.enabled&&this.ctx.resume().then(()=>{this.schedule(),this.onchange(this.settings,this.ctx?.state==="running")}).catch(()=>this.onchange(this.settings,!1)))}),window.addEventListener("pagehide",()=>{this.timer&&clearInterval(this.timer),this.stopSamples(),this.closeDialogue(),this.ctx?.close()})}async unlock(){try{return(!this.ctx||this.ctx.state==="closed")&&(this.timer&&clearInterval(this.timer),this.sampleBuffers.clear(),this.beaconState=-1,this.beaconGeneration++,this.beaconSource=null,this.beaconGain=null,this.beaconFilter=null,this.note=0,this.loop=0,this.ctx=new AudioContext,this.bank=new Ay(this.ctx),this.start=this.ctx.currentTime+.12,this.bank.levels(this.settings),this.timer=setInterval(()=>this.schedule(),120)),document.hidden||!this.settings.enabled?!1:(this.ctx.state==="suspended"&&await this.ctx.resume(),this.lastState&&this.state(this.lastState),this.schedule(),this.onchange(this.settings,!0),!0)}catch{return this.onchange(this.settings,!1),!1}}set(e,t){e==="enabled"?this.settings.enabled=!!t:this.settings[e]=hh(t,this.settings[e]),this.bank?.levels(this.settings),this.settings.enabled||(this.stopSamples(),this.closeDialogue());try{localStorage.setItem("nexo.audio",JSON.stringify(this.settings))}catch{}this.onchange(this.settings,!!this.ctx&&this.ctx.state==="running"),this.settings.enabled&&this.unlock()}schedule(){if(!this.ctx||!this.bank||this.ctx.state!=="running"||!this.settings.enabled||document.hidden)return;const e=this.ctx.currentTime+.65;let t=32;for(;t-- >0;){const n=zi[this.note],i=this.start+(this.loop*Ey+n.beat)*Sa;if(i>e)break;if(i>=this.ctx.currentTime-.03&&this.lastState&&(this.ctx.currentTime%65<25||this.ctx.currentTime<this.combatUntil)){const r=Oi(this.lastState.you)==="confluencia";this.bank.note({...n,midi:n.midi+(r?5:0),velocity:n.velocity*(r?.7:.85)},Math.max(i,this.ctx.currentTime))}++this.note===zi.length&&(this.note=0,this.loop++)}this.ctx.currentTime>this.nextBird&&(this.nextBird=this.ctx.currentTime+7+Math.random()*9,this.bank.effect("bird",this.ctx.currentTime,.7,Math.random()*1.6-.8))}asset(e){let t=this.sampleBuffers.get(e);if(!t){const n=this.ctx;t=fetch("/audio/"+e,{signal:AbortSignal.timeout(5e3)}).then(i=>{if(!i.ok)throw new Error("audio");return i.arrayBuffer()}).then(i=>n.decodeAudioData(i)).catch(()=>null),this.sampleBuffers.set(e,t)}return t}stopSamples(){this.sampleGeneration++;for(const[e,t]of this.liveSamples){try{e.stop()}catch{}t()}}async sample(e,t,n,i="effects",r=()=>!0){if(!this.ctx||!this.bank||this.ctx.state!=="running"||!this.settings.enabled||document.hidden||this.sampleCount>=8)return null;const a=this.ctx,o=this.bank,c=a.currentTime,l=this.sampleGeneration;this.sampleCount++;let u=!1;const d=()=>{u||(u=!0,this.sampleCount--)},h=await this.asset(e);if(!h||this.ctx!==a||l!==this.sampleGeneration||a.state!=="running"||!this.settings.enabled||document.hidden||a.currentTime-c>1.5||!r())return d(),null;const f=a.createBufferSource(),g=a.createGain(),y=a.createStereoPanner();f.buffer=h,g.gain.setValueAtTime(0,a.currentTime),g.gain.linearRampToValueAtTime(Math.max(0,Math.min(1,t)),a.currentTime+.012),g.gain.setTargetAtTime(0,a.currentTime+Math.max(.02,h.duration-.08),.02),y.pan.value=Math.max(-1,Math.min(1,n)),f.connect(g),g.connect(y),y.connect(o[i]);const p=()=>{u||(f.disconnect(),g.disconnect(),y.disconnect(),this.liveSamples.delete(f),this.dialogueSource===f&&(this.dialogueSource=null,o.dialogue(!1)),d())};this.liveSamples.set(f,p),f.onended=p;try{f.start()}catch{return p(),null}return f}async beacon(e){if(!this.ctx||!this.bank||e===this.beaconState)return;this.beaconState=e;const t=++this.beaconGeneration,n=this.ctx,i=this.bank,r=["01_farol_estavel.wav","02_farol_enfraquecido.wav","03_farol_critico.wav"][e],a=await this.asset(r);if(!a||t!==this.beaconGeneration||this.ctx!==n||n.state==="closed")return;const o=this.beaconSource,c=this.beaconGain,l=this.beaconFilter,u=n.currentTime,d=n.createBufferSource(),h=n.createGain(),f=n.createBiquadFilter();d.buffer=a,d.loop=!0,h.gain.setValueAtTime(0,u),h.gain.linearRampToValueAtTime(this.beaconVolume,u+.85),f.type="lowpass",f.frequency.value=1900,f.Q.value=.5,d.connect(f),f.connect(h),h.connect(i.ambience),d.start(u),this.beaconSource=d,this.beaconGain=h,this.beaconFilter=f,o&&c&&(c.gain.setTargetAtTime(0,u,.5),o.stop(u+2.5),o.onended=()=>{o.disconnect(),c.disconnect(),l?.disconnect()})}ui(e=!1){this.ctx?.state==="running"&&this.settings.enabled&&!document.hidden&&this.bank?.effect(e?"deny":"ui")}async dialogue(e,t){if(e===this.dialogueId&&t===this.dialogueText)return"duplicate";this.closeDialogue(),this.dialogueId=e,this.dialogueText=t;const n=this.dialogueGeneration,i=Py[e];if(!i?.asset||i.status!=="recorded"||!i.provenance)return"subtitle-only";const r=await this.sample(i.asset,.9,0,"voice",()=>n===this.dialogueGeneration);return r?(this.dialogueSource=r,this.bank?.dialogue(!0),"played"):"unavailable"}closeDialogue(){if(this.dialogueGeneration++,this.dialogueSource){try{this.dialogueSource.stop()}catch{}this.liveSamples.get(this.dialogueSource)?.(),this.dialogueSource=null}this.dialogueId=null,this.dialogueText="",this.bank?.dialogue(!1)}position(e,t,n,i){this.yaw=i;const r=gt(e,It);if(this.beaconVolume=n||r>=28?0:.44/(1+r*r/38)*Math.min(1,(28-r)/5),this.ctx&&this.beaconGain&&this.beaconGain.gain.setTargetAtTime(this.beaconVolume,this.ctx.currentTime,.35),this.lastPosition&&t&&!n){const a=gt(e,this.lastPosition);a<1&&(this.stepDistance+=a),this.stepDistance>.91&&(this.stepDistance=0,this.stepSide*=-1,this.ctx?.state==="running"&&this.settings.enabled&&!document.hidden&&this.bank?.effect(e.z>0||Math.abs(e.x)<2.5?"stepStone":"stepGrass",this.ctx?.currentTime,.7,this.stepSide*.08))}else this.stepDistance=0;this.lastPosition={...e}}state(e){this.lastState=e;const t=`${e.you.id}:${e.tick}:${e.time}`,n=this.seenSnapshots.has(t);if(this.seenSnapshots.add(t),this.seenSnapshots.size>256&&this.seenSnapshots.delete(this.seenSnapshots.values().next().value),!this.bank||!this.ctx||(this.beacon(e.you.story?.restored?0:e.you.quest.state==="completed"?1:2),this.bank.zone(e.you.z<0,this.ctx.currentTime<this.combatUntil),n)||this.ctx.state!=="running"||!this.settings.enabled||document.hidden)return;let i=24;for(const r of e.events){const a=gt(r,e.you);if(a>24)continue;if(--i<0)break;const o=1/(1+a*a/42),c=r.x-e.you.x,l=r.z-e.you.z,u=Math.max(-.85,Math.min(.85,(c*Math.cos(this.yaw)-l*Math.sin(this.yaw))/10));let d=null;if(r.kind==="projectile"||r.kind==="nova"||r.kind==="barrier"||r.kind==="heal"&&r.skill){const h=r.kind==="heal"?"07_pulso_de_cura.mp3":r.kind==="barrier"?"05_barreira_protetora.mp3":r.classId==="errante"?"06_flecha_especial.mp3":r.classId==="sentinela"?"05_barreira_protetora.mp3":"04_descarga_arcana.mp3";r.skill!=="attack"?this.sample(h,o*.9,u):this.bank.effect("swing",this.ctx.currentTime,o*.35,u)}(r.kind==="restore"||r.kind==="attune")&&this.sample("07_pulso_de_cura.mp3",o*.6,u),r.kind==="slash"&&(d="swing"),r.kind==="nova"&&(d=null),r.kind==="hit"&&(d=r.targetId===e.you.id?"hurt":"impact",(r.targetId===e.you.id||r.sourceId===e.you.id)&&(this.combatUntil=this.ctx.currentTime+5)),r.kind==="death"&&(d=r.targetId===e.you.id?"defeat":"enemyDeath"),["heal","level","loot","questAccept","questComplete","respawn"].includes(r.kind)&&r.targetId===e.you.id&&(d=r.kind),d==="heal"&&r.skill&&(d=null),d&&this.bank.effect(d,this.ctx.currentTime,o,u)}}}const Re=new Ry(document.getElementById("app")),ln=new Iy;ln.onchange=(s,e)=>Re.audioLevels(s,e);Re.onaudio=(s,e)=>ln.set(s,e);Re.onunlockaudio=()=>{ln.unlock()};Re.onuitone=()=>ln.ui();Re.audioLevels(ln.settings,!1);window.addEventListener("pointerdown",()=>{ln.unlock()},{once:!0});window.addEventListener("keydown",()=>{ln.unlock()},{once:!0});let Yt;try{Yt=new xy(document.getElementById("world"))}catch{throw document.getElementById("entry-error").textContent="Seu navegador não iniciou o WebGL. Ative a aceleração de hardware e use Chrome, Edge ou Firefox atual.",new Error("WebGL indisponível")}Re.oncreation=s=>Yt.setCreation(s);Yt.setCreation(Re.creation);Re.onreducedEffects=s=>Yt.setReducedEffects(s);Yt.setReducedEffects(Re.reducedEffects);Re.onDialogue=(s,e)=>{ln.dialogue(s,e)};Re.onDialogueClose=()=>ln.closeDialogue();Re.onSkillPreview=s=>{const e=s?Ms[Xe.state?.you.classId??Re.creation.classId][s]:void 0;Yt.setAbilityPreview(e?.range??0,!!e?.area)};const pn=new vy(Yt.canvas,Yt),Xe=new My;let Vi=!1,dh=0,zt=null,cn=null,Wa=0;Re.onquality=()=>Yt.quality();Re.oncopy=async()=>{if(!Xe.token){Re.toast("Entre no vale para salvar sua chave.");return}try{await navigator.clipboard.writeText(Xe.token),Re.toast("Chave copiada. Guarde em local privado.","success")}catch{Re.showKey(Xe.token)}};Re.onskill=s=>{s==="attack"&&(Vi=!Vi,Re.el("skill-attack").classList.toggle("auto-active",Vi)),!(!Vi&&s==="attack")&&Xe.send({type:"skill",skill:s,...cn&&s!=="nova"&&s!=="guard"?{target:cn}:{}})};Re.oncraft=()=>{Xe.state&&Xe.send({type:"craft",recipeId:Mi.id,operation:(Xe.state.you.crafting?.serial??0)+1})};Re.oncompanion=(s,e)=>{if(s==="capture"||s==="attack"){const t=e??cn;if(!t){Re.toast("Selecione uma criatura com Tab ou clique antes de dar este comando.","error");return}Xe.send({type:"companion",action:s,target:t})}else Xe.send({type:"companion",action:s})};Re.onworld=s=>Xe.send({type:"world",action:"restore",choice:s});Re.onrespawn=()=>Xe.send({type:"respawn"});Re.onquest=s=>Xe.send({type:"quest",action:s});Re.onitem=(s,e)=>Xe.send({type:"item",action:s,slot:e});function dl(){return Xe.state?.loot.filter(s=>s.ownerId===Xe.id).sort((s,e)=>gt(s,Xe.state.you)-gt(e,Xe.state.you))[0]}function fl(s){const e=s?Xe.state?.loot.find(t=>t.id===s):dl();e?Xe.send({type:"loot",id:e.id}):Re.toast("Nenhuma recompensa disponível.")}Re.oninteract=()=>{const s=dl();if(s&&Xe.state&&gt(s,Xe.state.you)<=3.2)fl(s.id);else if(Xe.state){const e=Xe.state.you;if(gt(e,dn)<=dn.range){Re.crafting();return}const t=Lr.find(n=>gt(n,e)<3.2&&!e.story?.fragments.includes(n.id));if(t&&e.quest.state==="completed")Xe.send({type:"world",action:"attune",id:t.id});else if(gt(e,It)<4.5&&e.quest.state==="completed")Re.restoreDialog();else{const n=gt(e,{x:-10,z:18})<3.2?"companion-1":gt(e,{x:6,z:10})<3.2?"companion-2":"guide";Re.talk(n)}}};Re.onzoom=s=>Yt.zoomBy(s);Re.onjoystick=(s,e)=>{pn.joystick={x:s,z:e}};Re.onjoin=s=>{ln.unlock(),zt=null,Wa=0,Xe.connect({type:"join",nickname:s,...Re.creation})};Re.onresume=s=>{ln.unlock(),zt=null,Wa=0,Xe.connect({type:"resume",token:s})};Re.onexit=()=>{Xe.disconnect(),pn.clear(),sessionStorage.removeItem("nexo.session"),sessionStorage.removeItem("edf.account-session"),location.reload()};Xe.onnotice=(s,e)=>{Re.toast(s,e),e==="error"&&ln.ui(!0)};Xe.onstatus=(s,e)=>{Re.status(s,e),pn.enabled=s==="online",s!=="online"&&pn.clear(),s==="online"&&(Wa=0,zt=null,Yt.yaw=0,Yt.canvas.tabIndex=0,Yt.canvas.focus({preventScroll:!0}))};Xe.onstate=s=>{!zt||gt(zt,s.you)>2||s.you.dead?zt={x:s.you.x,z:s.you.z,angle:s.you.angle}:(zt.x+=(s.you.x-zt.x)*.25,zt.z+=(s.you.z-zt.z)*.25),Re.update(s,Xe.rtt),ln.state(s);const e=s.you,t=Lr.find(i=>gt(i,e)<3.2&&!e.story?.fragments.includes(i.id)),n=dl();Re.context(!s.you.dead&&n&&gt(n,s.you)<=3.2?"loot":!s.you.dead&&gt(s.you,dn)<=dn.range?"craft":!s.you.dead&&gt(s.you,Wi)<=3.2?"npc":!e.dead&&e.quest.state==="completed"&&t?"fragment":!e.dead&&e.quest.state==="completed"&&gt(e,It)<4.5?"farol":!e.dead&&(gt(e,{x:-10,z:18})<3.2||gt(e,{x:6,z:10})<3.2)?"npc":null)};pn.onkey=s=>{if(s==="m"){Re.toggleSound();return}if(s==="h"&&(Re.help(),pn.clear()),s==="escape"){Vi=!1,Re.el("skill-attack").classList.remove("auto-active"),Re.closePanels(),pn.clear(),cn=null;return}if(s==="j"){Re.journal(),pn.clear();return}if(!Re.modalOpen&&(s==="i"&&Re.toggleBag(),s==="e"&&(Re.oninteract(),pn.clear()),s==="f"&&fl(),s==="4"&&Re.onskill("guard"),s==="5"&&Re.onskill("focus"),s==="6"&&Re.quickPotion(),(s==="1"||s===" ")&&Re.onskill("attack"),(s==="2"||s==="q")&&Re.onskill("cleave"),(s==="3"||s==="r")&&Re.onskill("nova"),s==="tab"&&Xe.state&&zt)){const e=Xe.state.enemies.filter(n=>n.state!=="dead"&&gt(n,zt)<18).sort((n,i)=>gt(n,zt)-gt(i,zt)),t=e.findIndex(n=>n.id===cn);cn=e[(t+1)%e.length]?.id??null}};pn.onclick=(s,e)=>{const t=Yt.pick(s,e);if(t?.kind==="enemy")cn=t.id;else if(t?.kind==="player")cn=t.id;else if(t?.kind==="fragment"){const n=Lr.find(i=>i.id===t.id);n&&Xe.state&&gt(Xe.state.you,n)<=3.2?Re.oninteract():Re.toast("Aproxime-se da ressonância para sintonizar.")}else t?.kind==="npc"?(Re.talk(t.id),pn.clear()):t?.kind==="loot"?fl(t.id):cn=null};let ba;try{const s=JSON.parse(sessionStorage.getItem("edf.account-session")??"null");s&&/^[A-Za-z0-9_-]{43}$/.test(s.token)&&/^[A-Za-z0-9_-]{1,80}$/.test(s.characterId)&&(ba=s)}catch{sessionStorage.removeItem("edf.account-session")}const fh=sessionStorage.getItem("nexo.session");if(ba){const s=document.querySelector("#hud .name-row small");s&&(s.textContent="PERSONAGEM"),document.getElementById("copy-key").hidden=!0,Xe.connect({type:"account_login",token:ba.token},ba.characterId)}else fh&&Re.onresume(fh);let ph=performance.now(),mh=0;function bd(s){const e=s-ph,t=Math.min(.05,e/1e3);if(ph=s,Xe.state&&zt&&pn.enabled){const i=Re.modalOpen?{x:0,z:0}:pn.direction(Yt.yaw);Xe.state.you.dead||(Sy(zt,i.x,i.z,t),Math.hypot(i.x,i.z)>0&&(zt.angle=Math.atan2(i.x,i.z))),ln.position(zt,Math.hypot(i.x,i.z)>0,Xe.state.you.dead,Yt.yaw),s-mh>=50&&(Xe.send({type:"move",seq:Wa++,...i}),mh=s)}if(Vi&&Xe.state&&cn&&!Re.modalOpen&&!Xe.state.you.dead&&!Xe.state.you.casting&&s>dh){const i=Xe.state.you,r=Xe.state.enemies.find(o=>o.id===cn&&o.state!=="dead"&&o.state!=="return"),a=Ms[i.classId??"sentinela"].attack;r&&gt(i,r)<=a.range&&Date.now()+Xe.offset>=(i.cooldowns.attack??0)?(Xe.send({type:"skill",skill:"attack",target:cn}),dh=s+Math.max(750,a.cooldown)):r||(Vi=!1,Re.el("skill-attack").classList.remove("auto-active"))}Re.animate(Date.now()+Xe.offset,cn),Yt.update(Xe.state,Xe.interpolated(),zt,cn,s/1e3,t);const n=window.edfMetrics;n&&(n.frameIntervalMs=Math.round(e*10)/10),requestAnimationFrame(bd)}requestAnimationFrame(bd);
