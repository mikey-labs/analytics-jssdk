import { ICTagContext } from "../Bootstrap/CTagContext";
import { PluginCore } from "./PluginBase";
import { BaseInfo } from "../Types/BaseInfo";
export declare class PluginMeasurement extends PluginCore {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    setup(): this;
    execute(): Promise<BaseInfo>;
}
