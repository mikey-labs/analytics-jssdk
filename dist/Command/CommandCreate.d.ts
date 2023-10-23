import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { Configuration } from "../Types/Configuration";
export declare class CommandCreate extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(trackingId: string, options?: Configuration): Promise<void>;
}
