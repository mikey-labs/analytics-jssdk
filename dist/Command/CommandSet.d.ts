import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { GlobalConfiguration } from "../Types/Configuration";
import { BaseInfoConfig } from "../Types/BaseInfo";
export type SetModuleName = "global" | "page";
export declare class CommandSet extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(module: SetModuleName, config: GlobalConfiguration | BaseInfoConfig, trackingId?: string): Promise<void>;
}
