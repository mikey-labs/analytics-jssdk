export declare abstract class IFootprint {
    abstract SPLIT_CODE: string;
    abstract hasLocalStorage(): boolean;
    abstract hasSessionStorage(): boolean;
    abstract isCanvasSupported(): boolean;
    abstract getPluginsString(): string;
    abstract getDeviceMemory(): number | undefined;
    abstract getConcurrency(): number | undefined;
    abstract getCanvasFingerprint(): string;
    abstract getGPUInfo(): {
        vendor: string;
        render: string;
    };
    abstract getColorGamut(): string | undefined;
    abstract areColorsForced(): boolean | undefined;
    abstract isHDR(): boolean | undefined;
    abstract getLanguages(): string;
    abstract isChromium(): boolean;
    abstract countTruthy(values: (string | boolean)[]): number;
    abstract isChromium86OrNewer(): boolean;
    abstract getIndexedDB(): boolean;
    abstract isMotionReduced(): boolean | undefined;
    abstract isIE(): boolean;
    abstract run(): Promise<string>;
    abstract getRegularPluginsString(): string;
    abstract getIEPluginsString(): string;
}
export interface FootprintInitOptions {
    canvas: boolean;
    screenResolution: boolean;
}
export default class Footprint implements IFootprint {
    SPLIT_CODE: string;
    options: FootprintInitOptions;
    constructor(options: FootprintInitOptions);
    run(): Promise<string>;
    hasLocalStorage(): boolean;
    hasSessionStorage(): boolean;
    isCanvasSupported(): boolean;
    getRegularPluginsString(): string;
    static getScreenResolution(): number[] | null;
    getDeviceMemory(): number | undefined;
    isIE(): boolean;
    getIEPluginsString(): string;
    getPluginsString(): string;
    getConcurrency(): number | undefined;
    getCanvasFingerprint(): string;
    getGPUInfo(): {
        vendor: any;
        render: any;
    };
    getColorGamut(): string | undefined;
    areColorsForced(): boolean | undefined;
    isHDR(): boolean | undefined;
    getLanguages(): string;
    isChromium(): boolean;
    countTruthy(values: (string | boolean)[]): number;
    isChromium86OrNewer(): boolean;
    getIndexedDB(): boolean;
    isMotionReduced(): boolean | undefined;
}
