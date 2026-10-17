#!/usr/bin/env python3
"""Ajusta ganho linear por LUFS medido, preservando transientes e timbre."""
import argparse
import json
import subprocess
from pathlib import Path

import numpy as np

from audio_core import SR, envelope, measure, write_audio


def decode(path):
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(path),
                                   '-f', 'f32le', '-acodec', 'pcm_f32le', 'pipe:1'])
    return np.frombuffer(raw, dtype='<f4').reshape(-1, 2).copy()


def loudness(path):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(path),
                        '-af', 'loudnorm=I=-23:TP=-3.2:LRA=7:print_format=json',
                        '-f', 'null', '-'], capture_output=True, text=True, check=True)
    return float(json.loads(r.stderr[r.stderr.rfind('{'):])['input_i'])


def adjust(output):
    manifest_path = output/'documentacao/manifesto_audio.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    parts = []
    for asset in manifest['assets']:
        wav, mp3 = output/asset['wav'], output/asset['mp3']
        x = decode(wav)
        measured = loudness(wav)
        gain_db = min(-23.-measured, -3.2-asset['metrics']['true_peak_4x_dbtp'])
        x *= 10**(gain_db/20)
        meta = dict(title=asset['title'], artist='Ecos dos Faróis — Estudos originais',
                    album='Laboratório de Áudio V1.1', track=asset['id'][:2],
                    comment='Revisão após feedback sobre agudos contínuos; ganho linear por LUFS.')
        write_audio(wav, x, 'wav', **meta)
        listening = x*envelope(len(x), .18, .4)[:, None] if asset['loop'] else x
        write_audio(mp3, listening, 'mp3', **meta)
        stats = measure(x, asset['loop'])
        # Esta é uma previsão linear; verificar_audio.py mede o arquivo final.
        stats['integrated_lufs_expected'] = round(measured+gain_db, 2)
        stats['linear_gain_adjustment_db'] = round(gain_db, 2)
        if asset['loop']:
            stats['seam_rotation_samples'] = asset['metrics']['seam_rotation_samples']
        asset['metrics'] = stats
        asset['waveform'] = [round(float(np.max(b)), 5) for b in np.array_split(np.max(np.abs(x), axis=1), 104)]
        demo = x[:8*SR].copy() if asset['loop'] else x.copy()
        demo *= envelope(len(demo), .24 if asset['loop'] else .003, .55 if asset['loop'] else .003)[:, None]
        parts += [demo, np.zeros((round(.85*SR), 2))]
        print(f'{asset["id"]}: ganho {gain_db:+.2f} dB; LUFS previsto {measured+gain_db:.2f}', flush=True)
    preview = np.concatenate(parts[:-1])
    write_audio(output/'EDF_Audio_V1_1_Previa.mp3', preview, 'mp3',
                title='V1.1 — ressonâncias curtas e corpo orgânico', artist='Ecos dos Faróis',
                comment='Estável, enfraquecido, crítico, Arcanista, Sentinela, Errante, Ressonante.')
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')


if __name__=='__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--saida', type=Path, required=True)
    adjust(p.parse_args().saida)
