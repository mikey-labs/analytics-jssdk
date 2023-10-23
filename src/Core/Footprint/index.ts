import {MurmurHash3} from "./MurmurHash3";
import AudioPrint from "./AudioPrint";
export abstract class IFootprint {
    abstract SPLIT_CODE:string;
    abstract hasLocalStorage():boolean;
    abstract hasSessionStorage():boolean;
    abstract isCanvasSupported():boolean;
    abstract getPluginsString():string;
    abstract getDeviceMemory():number | undefined;
    abstract getConcurrency():number | undefined;
    abstract getCanvasFingerprint():string;
    abstract getGPUInfo():{
        vendor:string,
        render:string
    };
    abstract getColorGamut():string | undefined;
    abstract areColorsForced():boolean | undefined;
    abstract isHDR():boolean | undefined;
    abstract getLanguages():string;
    abstract isChromium():boolean;
    abstract countTruthy(values:(string | boolean)[]):number;
    abstract isChromium86OrNewer():boolean;
    abstract getIndexedDB():boolean;
    abstract isMotionReduced():boolean | undefined;
    abstract isIE():boolean;
    abstract run():Promise<string>;
    abstract getRegularPluginsString():string;
    abstract getIEPluginsString():string;
}
export interface FootprintInitOptions {
    canvas: boolean;
    screenResolution: boolean;
}

export default class Footprint implements IFootprint{
    SPLIT_CODE = "www.zaobao.com";
    options:FootprintInitOptions = {
        canvas:true,
        screenResolution:true
    }
    constructor(options:FootprintInitOptions){
        this.options = options;
    }
    run():Promise<string>{
        return new Promise(async (resolve,reject) => {
            const GUPInfo = this.getGPUInfo();
            let headlessStr = '';
            if (/HeadlessChrome/.test(window.navigator.userAgent) ) {
                headlessStr = 'headless_chrome_';
            }
            if (navigator.languages.toString() === "") {
                headlessStr = 'headless_no_lang_';
            }
            if (GUPInfo.vendor == "Brian Paul" && GUPInfo.render == "Mesa OffScreen") {
                headlessStr = 'headless_no_gpu_'
            }
            const keys = [];
            keys.push(navigator.userAgent);
            keys.push(this.getColorGamut());
            keys.push(this.getDeviceMemory());//内存
            keys.push(this.getConcurrency());//cpu核数
            keys.push(this.areColorsForced());
            keys.push(this.isHDR());//支持高亮
            keys.push(this.getLanguages());//支持语言
            keys.push(this.getIndexedDB());//支持indexDB
            keys.push(this.isMotionReduced());//检测用户的系统是否被开启了动画减弱功能。
            keys.push(GUPInfo.vendor + this.SPLIT_CODE + GUPInfo.render);//GPU

            keys.push(screen.colorDepth);
            if (this.options.screenResolution) {
                const resolution = Footprint.getScreenResolution();
                if (resolution){ // headless browsers, such as phantomjs
                    keys.push(resolution.join('x'));
                }else{
                    headlessStr = 'headless_no_screen_resolution_'
                }
            }
            const audioPrintRes = await new AudioPrint().run();
            keys.push(audioPrintRes);
            keys.push(new Date().getTimezoneOffset());
            keys.push(this.hasSessionStorage());
            keys.push(this.hasLocalStorage());
            //body might not be defined at this point or removed programmatically
            if(document.body){
                keys.push(typeof(document.body.addBehavior));
            } else {
                keys.push(typeof undefined);
            }
            keys.push(typeof(window.openDatabase));
            keys.push(navigator.cpuClass);
            keys.push(navigator.platform);
            keys.push(navigator.doNotTrack);
            keys.push(this.getPluginsString());
            if(this.options.canvas && this.isCanvasSupported()){
                keys.push(this.getCanvasFingerprint());
            }
            resolve(headlessStr + MurmurHash3.x86.hash128(keys.join(this.SPLIT_CODE), 2**5-1));
        })
    }

    hasLocalStorage():boolean {
        try{
            return !!window.localStorage;
        } catch(e) {
            return true; // SecurityError when referencing it means it exists
        }
    }

    hasSessionStorage():boolean {
        try{
            return !!window.sessionStorage;
        } catch(e) {
            return true; // SecurityError when referencing it means it exists
        }
    }

    isCanvasSupported():boolean {
        const elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    getRegularPluginsString() {
        return Array.from(navigator.plugins).map(function (p) {
            const mimeTypes = Array.from(p).map((mt)=>{
                return [mt.type, mt.suffixes].join('~');
            }).join(',')
            return [p.name, p.description, mimeTypes].join('::');
        }).join(';');
    }

    static getScreenResolution() {
        const height = screen.height;
        const width = screen.width;
        return height && width ? [screen.height, screen.width] : null;
    }

    getDeviceMemory(){
        const memory = Number.parseFloat(navigator.deviceMemory || "")
        return Number.isNaN(memory) ? void 0 : memory
    }

    isIE() {
        if(navigator.appName === 'Microsoft Internet Explorer') {
            return true;
        } else if(navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)){// IE 11
            return true;
        }
        return false;
    }

    getIEPluginsString():string{
        if(window.ActiveXObject){
            var names = ['ShockwaveFlash.ShockwaveFlash',//flash plugin
                'AcroPDF.PDF', // Adobe PDF reader 7+
                'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
                'QuickTime.QuickTime', // QuickTime
                // 5 versions of real players
                'rmocx.RealPlayer G2 Control',
                'rmocx.RealPlayer G2 Control.1',
                'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
                'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
                'RealPlayer',
                'SWCtl.SWCtl', // ShockWave player
                'WMPlayer.OCX', // Windows media player
                'AgControl.AgControl', // Silverlight
                'Skype.Detection'];
            // starting to detect plugins in IE
            return names.map(function(name){
                try{
                    new ActiveXObject(name);
                    return name;
                } catch(e){
                    return null;
                }
            }).join(';');
        } else {
            return ""; // behavior prior version 0.5.0, not breaking backwards compat.
        }
    }

    getPluginsString() {
        if(this.isIE()){
            return this.getIEPluginsString();
        } else {
            return this.getRegularPluginsString();
        }
    }

    getConcurrency(){
        const Concurrency = Number.parseFloat(navigator.hardwareConcurrency.toString())
        return Number.isNaN(Concurrency) ? void 0 : Concurrency
    }

    getCanvasFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const txt = 'Welcome to zaobao.com';
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        return canvas.toDataURL();
    }

    getGPUInfo(){
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('experimental-webgl') as WebGLRenderingContext;
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info') as WEBGL_debug_renderer_info;
        return {
            vendor:gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            render:gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        } ;
    }

    getColorGamut(){
        for (const gamut of ['rec2020', 'p3', 'srgb'] ) {
            if (matchMedia(`(color-gamut: ${gamut})`).matches) {
                return gamut
            }
        }
        return void 0;
    }

    areColorsForced() {
        if (matchMedia(`(forced-colors: active)`).matches) {
            return true
        }
        if (matchMedia(`(forced-colors: none)`).matches) {
            return false
        }
        return undefined
    }

    isHDR() {
        if (matchMedia(`(dynamic-range: high)`).matches) {
            return true
        }
        if (matchMedia(`(dynamic-range: standard)`).matches) {
            return false
        }
        return undefined
    }

    getLanguages() {
        const n = navigator
        const result = []
        const language = n.language || n.userLanguage || n.browserLanguage || n.systemLanguage
        if (language !== undefined) {
            result.push([language])
        }

        if (Array.isArray(n.languages)) {
            // Starting from Chromium 86, there is only a single value in `navigator.language` in Incognito mode:
            // the value of `navigator.language`. Therefore the value is ignored in this browser.
            if (!(this.isChromium() && this.isChromium86OrNewer())) {
                result.push(n.languages)
            }
        } else if (typeof n.languages === 'string') {
            const languages = n.languages
            result.push((languages as string).split(','))
        }

        return result.join(',')
    }

    isChromium() {
        // Based on research in October 2020. Tested to detect Chromium 42-86.
        const w = window
        const n = navigator

        return (
            this.countTruthy([
                'webkitPersistentStorage' in n,
                'webkitTemporaryStorage' in n,
                n.vendor.indexOf('Google') === 0,
                'webkitResolveLocalFileSystemURL' in w,
                'BatteryManager' in w,
                'webkitMediaStream' in w,
                'webkitSpeechGrammar' in w,
            ]) >= 5
        )
    }

    countTruthy(values:(string | boolean)[]):number {
        return values.reduce((sum, value) => sum + (value ? 1 : 0), 0)
    }

    isChromium86OrNewer():boolean {
        // Checked in Chrome 85 vs Chrome 86 both on desktop and Android
        const w = window
        return (
            this.countTruthy([
                !('MediaSettingsRange' in w),
                'RTCEncodedAudioFrame' in w,
                '' + w.Intl === '[object Intl]',
                '' + w.Reflect === '[object Reflect]',
            ]) >= 3
        )
    }

    getIndexedDB():boolean {
        try {
            return !!window.indexedDB
        } catch (e) {
            /* SecurityError when referencing it means it exists */
            return true
        }
    }

    isMotionReduced() {
        if (matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
            return true
        }
        if (matchMedia(`(prefers-reduced-motion: no-preference)`).matches) {
            return false
        }
        return undefined
    }

}
