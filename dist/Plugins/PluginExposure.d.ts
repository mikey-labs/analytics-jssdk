import { PluginBase } from "./PluginBase";
import Exposure from "@zhengxy/exposure";
import { IElement } from "@zhengxy/exposure/dist/Types";
export declare class PluginExposure extends PluginBase {
    static NAME: string;
    readonly version: string;
    readonly exposure: Exposure;
    constructor();
    observe(el: IElement, callback: (isIntersecting: boolean, stop: Function) => void): void;
}
