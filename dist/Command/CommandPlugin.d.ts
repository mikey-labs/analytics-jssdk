import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
export declare class CommandPlugin extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(pluginAndMethodName: string, ...params: any): Promise<any>;
}
