import { ICTagContext, PluginDerived } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
export declare class CommandInstall extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(plugin: PluginDerived, options?: any): void;
}
