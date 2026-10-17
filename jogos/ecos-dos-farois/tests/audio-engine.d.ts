declare module 'web-audio-engine' {
  const engine: { OfflineAudioContext: new (channels: number, length: number, sampleRate: number) => OfflineAudioContext };
  export default engine;
}
