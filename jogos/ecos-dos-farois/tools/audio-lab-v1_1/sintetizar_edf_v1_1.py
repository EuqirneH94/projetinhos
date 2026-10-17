#!/usr/bin/env python3
"""Ecos dos Faróis — Laboratório V1.1: ressonâncias curtas e corpo orgânico.

Síntese procedural original; Python 3.10+, NumPy, SciPy e FFmpeg.
Os arquivos são estudos para avaliação, sem integração ao jogo.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
from scipy import signal

from audio_core import (SR, TAU, D2, D4, envelope, colored_noise, pan, place,
                        body, swoosh, master, measure, write_audio)

SEED = 17102026


def short_resonance(freq, seconds=.85):
    """Notas pontuais: sem cama senoidal contínua ou cauda longa de sinos."""
    t = np.arange(round(seconds*SR))/SR
    y = np.zeros(len(t))
    for ratio, amp, decay in [(1., 1., .18), (1.496, .13, .10), (2.01, .045, .065)]:
        y += amp*np.sin(TAU*freq*ratio*t)*np.exp(-t/decay)
    return y*(1-np.exp(-t/.023))*envelope(len(t), 0, .12)


def soft_room(x, rng, wet=.16, loop=False):
    """Cauda difusa breve e escura; sem reflexões agudas isoladas."""
    seconds = 1.2
    n = round(seconds*SR)
    t = np.arange(n)/SR
    result = x.copy()
    mid = (x[:, 0]+x[:, 1])/np.sqrt(2)
    sos = signal.butter(2, [140, 1250], fs=SR, btype='bandpass', output='sos')
    for c in range(2):
        ir = rng.normal(size=n)*np.exp(-t/.21)
        ir[:round((.032+.006*c)*SR)] = 0
        ir = signal.sosfilt(sos, ir)
        ir /= max(np.sqrt(np.sum(ir*ir)), 1e-9)
        tail = signal.fftconvolve(mid, ir)
        if loop:
            for start in range(0, len(tail), len(x)):
                part = tail[start:start+len(x)]
                result[:len(part), c] += wet*part
        else:
            result[:, c] += wet*tail[:len(x)]
    return result


def tone_burst(freq, seconds, decay, attack=.05):
    t = np.arange(round(seconds*SR))/SR
    # A segunda parcial curta dá presença em caixas pequenas.
    y = np.sin(TAU*freq*t)*np.exp(-t/decay)
    y += .09*np.sin(TAU*freq*2*t)*np.exp(-t/(decay*.46))
    return y*(1-np.exp(-t/attack))*envelope(len(t), 0, .12)


def finish(x, rng, loop=False, wet=.16):
    x = soft_room(x, rng, wet, loop)
    if loop:
        f = np.fft.rfftfreq(len(x), 1/SR)
        curve = (1-np.exp(-(f/45)**6))*np.exp(-(f/2200)**6)
        x = np.fft.irfft(np.fft.rfft(x, axis=0)*curve[:, None], n=len(x), axis=0)
    else:
        sos = signal.butter(3, [45, 3000], fs=SR, btype='bandpass', output='sos')
        x = signal.sosfilt(sos, x, axis=0)
        x *= envelope(len(x), .012, .45)[:, None]
    return x


def beacon(state):
    rng = np.random.default_rng(SEED+state*100)
    n = 24*SR
    t = np.arange(n)/SR
    x = np.zeros((n, 2))
    # Substitui o acorde estático por textura sem altura musical fixa.
    for c in range(2):
        breathe = (.5+.5*np.sin(TAU*5*t/24+c*.35))**2
        texture = colored_noise(n, 95, 720, rng)
        x[:, c] = .027*texture*(.22+.78*breathe)
        x[:, c] += .003*colored_noise(n, 300, 950, rng)
    times = {
        0: [0., 4., 8., 12., 16., 20.],
        1: [.1, 4.2, 7.6, 12.8, 16.0, 20.8, 22.5],
        2: [.1, 2.2, 3.6, 6.7, 8.1, 9.5, 12.2, 13.3, 16.0, 18.2, 19.5, 22.1],
    }[state]
    for i, when in enumerate(times):
        f = D2*(1+state*.018*np.sin(i*2.7))
        pulse = body(f, 2., .13, .39)
        place(x, pulse, when, gain=.22, loop=True)
        place(x, tone_burst(f*2, 1.25, .20, .06), when+.07,
              position=.12*np.sin(i), gain=.042, loop=True)
        if state==2 and i%3==1:
            place(x, swoosh(.75, rng, 110, 1150, .45), when+.16,
                  position=(-1)**i*.25, gain=.024, loop=True)
    # Três ressonâncias breves no ciclo; o brilho não sustenta o ambiente.
    for i, (when, freq) in enumerate(zip([2.15, 10.65, 18.8], [D4, 329.6276, 261.6256])):
        actual = freq*(1+state*.009*np.sin(i*1.9))
        place(x, short_resonance(actual), when, [-.3, .25, -.1][i],
              gain=.045, loop=True)
    if state:
        for i, when in enumerate([5.7, 17.0] if state==1 else [1.8, 5.4, 10.5, 14.7, 21.]):
            place(x, swoosh(1.45, rng, 150, 1400, .52), when,
                  (-1)**i*.28, gain=.009 if state==1 else .023, loop=True)
    return finish(x, rng, loop=True, wet=.12)


def arcana():
    rng = np.random.default_rng(SEED+400)
    x = np.zeros((round(3.4*SR), 2))
    place(x, swoosh(.55, rng, 230, 1650, .85), 0, -.1, .12)
    for i, f in enumerate([220., D4]):
        place(x, short_resonance(f, .65), .10+i*.17, (-1)**i*.22, .045)
    place(x, body(127, 1.7, .007, .21), .53, 0, .55)
    place(x, swoosh(.24, rng, 260, 2600, .07), .52, .0, .21)
    t = np.arange(round(.27*SR))/SR
    phase = TAU*(320*t-300*t*t)
    burst = np.sin(phase)*np.exp(-t/.055)*envelope(len(t), .008, .05)
    place(x, burst, .55, .08, .12)
    place(x, swoosh(.85, rng, 180, 1250, .08), .60, .22, .055)
    place(x, short_resonance(D4, .8), .61, -.22, .07)
    return finish(x, rng, wet=.18)


def barrier():
    rng = np.random.default_rng(SEED+500)
    x = np.zeros((round(4.0*SR), 2))
    place(x, swoosh(.85, rng, 145, 1000, .69), 0, 0, .10)
    place(x, body(98, 2.2, .09, .39), .48, 0, .35)
    place(x, tone_burst(196, 1.35, .24, .08), .53, -.17, .065)
    place(x, swoosh(1.4, rng, 180, 1000, .40), .46, .18, .055)
    for i, when in enumerate([.65, 1.25]):
        place(x, short_resonance([261.6256, 196.][i], .8), when,
              [-.3, .3][i], .045)
    return finish(x, rng, wet=.17)


def arrow():
    rng = np.random.default_rng(SEED+600)
    x = np.zeros((round(2.7*SR), 2))
    place(x, swoosh(.35, rng, 200, 900, .84), 0, -.12, .05)
    t = np.arange(round(.25*SR))/SR
    string = sum(np.sin(TAU*178*i*t)*np.exp(-t*(15+i*6))/i**1.7 for i in range(1, 5))
    place(x, string*envelope(len(t), .003, .035), .31, -.18, .13)
    place(x, swoosh(.40, rng, 430, 2300, .16), .32, .28, .16)
    place(x, body(215, .75, .004, .075), .69, 0, .29)
    place(x, swoosh(.12, rng, 240, 1900, .08), .69, 0, .17)
    place(x, short_resonance(349.2282, .70), .73, -.15, .06)
    return finish(x, rng, wet=.12)


def heal():
    rng = np.random.default_rng(SEED+700)
    x = np.zeros((round(4.2*SR), 2))
    place(x, swoosh(1.8, rng, 160, 950, .40), 0, 0, .08)
    place(x, body(146.8324, 2.8, .20, .58), .21, 0, .20)
    for i, f in enumerate([220., 261.6256, D4]):
        place(x, tone_burst(f, 1.10, .20, .055), .32+i*.21,
              [-.23, .23, 0][i], .075/(1+i*.3))
    place(x, short_resonance(349.2282, .85), .99, .2, .04)
    place(x, swoosh(1.25, rng, 180, 850, .32), .60, -.15, .05)
    return finish(x, rng, wet=.19)


def make_package(output):
    for sub in ['WAV_48k_24bit', 'MP3_escuta', 'fontes', 'documentacao']:
        (output/sub).mkdir(parents=True, exist_ok=True)
    specs = [
        ('01_farol_estavel', 'Farol estável', 'Textura de ar e pulsos regulares, com três ressonâncias breves.', True, lambda: beacon(0)),
        ('02_farol_enfraquecido', 'Farol enfraquecido', 'Respiração irregular e pequenas fricções, sem acorde contínuo.', True, lambda: beacon(1)),
        ('03_farol_critico', 'Farol criticamente instável', 'Pulsos desencontrados e turbulência, com brilho pontual.', True, lambda: beacon(2)),
        ('04_descarga_arcana', 'Descarga Arcana · Arcanista', 'Carga breve, impacto encorpado e dissipação curta.', False, arcana),
        ('05_barreira_protetora', 'Barreira protetora · Sentinela', 'Expansão grave e ondulação breve da proteção.', False, barrier),
        ('06_flecha_especial', 'Flecha especial · Errante', 'Corda curta, passagem de ar e impacto seco com uma ressonância.', False, arrow),
        ('07_pulso_de_cura', 'Pulso de cura · Ressonante', 'Expansão macia, três notas baixas breves e dissipação orgânica.', False, heal),
    ]
    assets = []
    parts = []
    for stem, title, description, loop, factory in specs:
        x = master(factory(), -6.0 if loop else -4., -26. if loop else -25.)
        # Ganhos finais usam loudness integrado medido; ver ajustar_volume.py.
        if loop:
            rotation = int(np.argmin(np.max(np.abs(np.diff(x[:SR], axis=0)), axis=1)))+1
            x = np.roll(x, -rotation, axis=0)
        wav = output/'WAV_48k_24bit'/f'{stem}.wav'
        mp3 = output/'MP3_escuta'/f'{stem}.mp3'
        meta = dict(title=title, artist='Ecos dos Faróis — Estudos originais',
                    album='Laboratório de Áudio V1.1', track=stem[:2],
                    comment='Revisão do timbre: ressonâncias curtas; sem integração ao jogo.')
        write_audio(wav, x, 'wav', **meta)
        listening = x*envelope(len(x), .18, .40)[:, None] if loop else x
        write_audio(mp3, listening, 'mp3', **meta)
        stats = measure(x, loop)
        assert stats['clipped_samples']==0 and stats['nonfinite_samples']==0
        assert stats['true_peak_4x_dbtp'] < -2.5
        if loop:
            assert stats['seam_relative_to_p99_step'] < .2
            stats['seam_rotation_samples'] = rotation
        waveform = [round(float(np.max(b)), 5) for b in np.array_split(np.max(np.abs(x), axis=1), 104)]
        assets.append(dict(id=stem, title=title, description=description, loop=loop,
                           wav=str(wav.relative_to(output)), mp3=str(mp3.relative_to(output)),
                           waveform=waveform, metrics=stats))
        demo = x[:8*SR].copy() if loop else x.copy()
        demo *= envelope(len(demo), .24 if loop else .003, .55 if loop else .003)[:, None]
        parts += [demo, np.zeros((round(.85*SR), 2))]
        print(f'{stem}: {len(x)/SR:.1f}s | RMS {stats["rms_dbfs"]} dBFS', flush=True)
    preview = np.concatenate(parts[:-1])
    write_audio(output/'EDF_Audio_V1_1_Previa.mp3', preview, 'mp3',
                title='V1.1 — ressonâncias curtas e corpo orgânico', artist='Ecos dos Faróis',
                comment='Estável, enfraquecido, crítico, Arcanista, Sentinela, Errante, Ressonante.')
    manifest = dict(project='Ecos dos Faróis', version='Audio Lab V1.1',
                    status='Revisão após feedback sobre agudos contínuos; aguardando escuta do usuário.',
                    method='Síntese procedural original, sem áudio externo ou IA paga.', seed=SEED,
                    preview_duration_seconds=len(preview)/SR, assets=assets)
    (output/'documentacao/manifesto_audio.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Prévia: {len(preview)/SR:.1f}s', flush=True)


if __name__=='__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--saida', type=Path, required=True)
    args = parser.parse_args()
    make_package(args.saida.resolve())
