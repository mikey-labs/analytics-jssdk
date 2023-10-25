import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { GlobalConfiguration } from "../Types/Configuration";
import { PageConfig } from "../Types/BaseInfo";
export type SetModuleName = "global" | "page" | "custom";
export declare class CommandSet extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(module: SetModuleName, config: GlobalConfiguration | PageConfig | object, trackingId?: string): Promise<void>;
}
