import { ICTagContext } from "../Bootstrap/CTagContext";
import { PluginCore } from "./PluginBase";
export declare const FOOT_PRINT_KEY = "fp_";
export declare class PluginFootPrint extends PluginCore {
    static NAME: string;
    readonly version: string;
    private Storage;
    constructor(ctx: ICTagContext);
    setup(): this;
    execute(): Promise<string>;
}
