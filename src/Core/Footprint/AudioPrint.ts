interface IAudioPrint {
    context:OfflineAudioContext;
    currentTime:number;
    oscillator:OscillatorNode;
    compressor:DynamicsCompressorNode;
    fingerprint:string;
    run(debug:boolean):Promise<string>;
}
export default class AudioPrint implements IAudioPrint{
    compressor: DynamicsCompressorNode;
    context: OfflineAudioContext;
    currentTime: number;
    fingerprint: string = '';
    oscillator: OscillatorNode;
    constructor() {
        const audioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        this.context = new audioContext(1, 44100, 44100);
        this.currentTime = this.context.currentTime;
        this.oscillator = this.context.createOscillator();
        this.compressor = this.context.createDynamicsCompressor();
        this.setOscillator();
        this.setCompressor();
    }
    setOscillator(){
        this.oscillator.type = "triangle";
        this.oscillator.frequency.setValueAtTime(10000, this.currentTime);
    }
    setCompressor(){
        this.setCompressorValueIfDefined('threshold', -50);
        this.setCompressorValueIfDefined('knee', 40);
        this.setCompressorValueIfDefined('ratio', 12);
        this.setCompressorValueIfDefined('reduction', -20);
        this.setCompressorValueIfDefined('attack', 0);
        this.setCompressorValueIfDefined('release', .25);
    }
    setCompressorValueIfDefined(item:keyof DynamicsCompressorNode, value:number){
        const audioParam: any = this.compressor[item];
        if (
            audioParam && typeof audioParam.setValueAtTime === 'function'
        ) {
            audioParam.setValueAtTime(value, this.context.currentTime);
        }
    }
    generateFingerprints(event:OfflineAudioCompletionEvent){
        let output = '';
        for (let i = 4500; 5e3 > i; i++) {
            const channelData = event.renderedBuffer.getChannelData(0)[i];
            output += Math.abs(channelData);
        }
        return output.toString();
    }
    run(): Promise<string> {
        return new Promise(async (resolve, reject)=>{
            this.oscillator.connect(this.compressor);
            this.compressor.connect(this.context.destination);
            this.oscillator.start(0);
            this.context.oncomplete = (event)=>{
                const print = this.generateFingerprints(event);
                this.compressor.disconnect();
                resolve(print);
            };
            await this.context.startRendering();
        })
    }
}