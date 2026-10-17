#!/usr/bin/env python3
"""Funções comuns de síntese, exportação e medição do laboratório EDF."""
from __future__ import annotations
import subprocess
import tempfile
from pathlib import Path
import numpy as np
from scipy import signal
SR=48000
TAU=2*np.pi
D2=73.41619198
D4=D2*4


def db(x):
    return float(20 * np.log10(max(float(x), 1e-12)))

def envelope(n, attack=.01, release=.08):
    e = np.ones(n)
    a = min(int(SR * attack), n)
    r = min(int(SR * release), n - a)
    if a:
        e[:a] = np.sin(np.linspace(0, np.pi/2, a)) ** 2
    if r:
        e[-r:] = np.cos(np.linspace(0, np.pi/2, r)) ** 2
    return e

def colored_noise(n, lo, hi, rng):
    """Ruído periódico: filtragem no domínio de Fourier, sem borda transitória."""
    freqs = np.fft.rfftfreq(n, 1/SR)
    z = rng.normal(size=len(freqs)) + 1j * rng.normal(size=len(freqs))
    highpass = 1 - np.exp(-(freqs/max(lo, 1)) ** 4)
    lowpass = np.exp(-(freqs/hi) ** 6)
    y = np.fft.irfft(z * highpass * lowpass, n=n)
    y -= y.mean()
    return y / max(np.sqrt(np.mean(y*y)), 1e-9)

def pan(x, position):
    theta = (np.clip(position, -1, 1) + 1) * np.pi/4
    return np.stack([x * np.cos(theta), x * np.sin(theta)], axis=-1)

def place(out, event, when, position=0, gain=1., loop=False):
    x = pan(event, position) if event.ndim == 1 else event
    x = x * gain
    start = int(round(when * SR))
    if loop:
        idx = (np.arange(len(x)) + start) % len(out)
        np.add.at(out, idx, x)
    else:
        count = min(len(x), len(out) - start)
        if count > 0:
            out[start:start+count] += x[:count]

def body(freq, seconds, attack=.012, decay=.3):
    t = np.arange(round(seconds*SR))/SR
    phase = TAU*freq*t + 1.3*(1-np.exp(-t/.04))
    y = (np.sin(phase) + .22*np.sin(2*phase) + .065*np.sin(3*phase))
    return y*(1-np.exp(-t/attack))*np.exp(-t/decay)*envelope(len(t),0,.1)

def swoosh(seconds, rng, lo=220, hi=4200, peak=.35):
    n = round(seconds*SR)
    t = np.linspace(0, 1, n)
    env = np.where(t < peak, (t/max(peak,.01)) ** 1.8,
                   np.maximum(0,(1-t)/(1-peak)) ** 2.1)
    return colored_noise(n, lo, hi, rng) * env * envelope(n,.015,.04)

def master(x, peak=-4.0, max_rms=-20.0):
    x = x - np.mean(x,axis=0,keepdims=True)
    raw_peak = np.max(np.abs(x))
    raw_rms = np.sqrt(np.mean(x*x))
    gain = min(10**(peak/20)/max(raw_peak,1e-9),10**(max_rms/20)/max(raw_rms,1e-9))
    return x*gain

def write_audio(path, x, codec, **meta):
    # A saída só substitui o destino depois de completa e não vazia.
    with tempfile.NamedTemporaryFile(dir=path.parent,suffix=path.suffix,delete=False) as temp:
        temporary_path = Path(temp.name)
    cmd = ['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2',
           '-i','pipe:0','-map_metadata','-1']
    if codec=='wav':
        cmd += ['-c:a','pcm_s24le']
    else:
        cmd += ['-c:a','libmp3lame','-b:a','192k','-id3v2_version','3']
    for k,v in meta.items():
        cmd += ['-metadata',f'{k}={v}']
    cmd += [str(temporary_path)]
    try:
        subprocess.run(cmd,input=np.asarray(x,dtype='<f4').tobytes(),check=True)
        if temporary_path.stat().st_size < 1024:
            raise RuntimeError(f'Exportação incompleta: {path.name}')
        temporary_path.replace(path)
    finally:
        if temporary_path.exists():
            temporary_path.unlink()

def measure(x, loop):
    peak = np.max(np.abs(x))
    rms = np.sqrt(np.mean(x*x))
    oversampled = signal.resample_poly(x,4,1,axis=0)
    peak4 = np.max(np.abs(oversampled))
    correlation = np.corrcoef(x.T)[0,1]
    hop = round(.1*SR)
    active = np.array([np.sqrt(np.mean(x[i:i+hop]**2)) for i in range(0,len(x),hop)])
    out = dict(duration_seconds=len(x)/SR,sample_rate=SR,channels=2,bit_depth=24,
               sample_peak_dbfs=round(db(peak),3),true_peak_4x_dbtp=round(db(peak4),3),
               rms_dbfs=round(db(rms),3),dc_abs_max=float(np.max(np.abs(x.mean(axis=0)))),
               stereo_correlation=round(float(correlation),4),
               clipped_samples=int(np.count_nonzero(np.abs(x)>=1)),
               nonfinite_samples=int(np.count_nonzero(~np.isfinite(x))),
               first_sample_max_abs=float(np.max(np.abs(x[0]))),
               last_sample_max_abs=float(np.max(np.abs(x[-1]))))
    if loop:
        edge = np.max(np.abs(x[-1]-x[0]))
        derivatives = np.abs(np.diff(x,axis=0))
        out['seam_delta_dbfs']=round(db(edge),3)
        out['seam_relative_to_p99_step']=round(float(edge/max(np.quantile(derivatives,.99),1e-12)),4)
        out['loop_start_sample']=0
        out['loop_end_sample_exclusive']=len(x)
    return out
