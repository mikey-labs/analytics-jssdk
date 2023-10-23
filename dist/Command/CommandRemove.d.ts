import { CommandBase } from "./CommandBase";
import { ICTagContext } from "../Bootstrap/CTagContext";
export type RemoveModuleName = "instance" | "plugin";
export declare class CommandRemove extends CommandBase {
    ctx: ICTagContext;
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(methodName: string, callback: (result: boolean) => void): void;
}
