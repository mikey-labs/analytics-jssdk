interface IAudioPrint {
    context: OfflineAudioContext;
    currentTime: number;
    oscillator: OscillatorNode;
    compressor: DynamicsCompressorNode;
    fingerprint: string;
    run(debug: boolean): Promise<string>;
}
export default class AudioPrint implements IAudioPrint {
    compressor: DynamicsCompressorNode;
    context: OfflineAudioContext;
    currentTime: number;
    fingerprint: string;
    oscillator: OscillatorNode;
    constructor();
    setOscillator(): void;
    setCompressor(): void;
    setCompressorValueIfDefined(item: keyof DynamicsCompressorNode, value: number): void;
    generateFingerprints(event: OfflineAudioCompletionEvent): string;
    run(): Promise<string>;
}
export {};
