import { ICTagContext, ICTagContextGetters } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
export declare class CommandGet extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(methodName: string | keyof ICTagContextGetters, callback: (data: string) => void, params: any): Promise<void>;
}
