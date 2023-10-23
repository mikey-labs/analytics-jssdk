import { ICTagContext } from "../Bootstrap/CTagContext";
import { Configuration } from "../Types/Configuration";
import { CommandBase } from "./CommandBase";
export declare class CommandConfig extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(config: Configuration, trackingId?: string): void;
}
