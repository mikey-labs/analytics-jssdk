import { Command } from "../Types/Command";
import { CommandBase } from "./CommandBase";
import { ICTagContext } from "../Bootstrap/CTagContext";
export interface IExecutor {
    ctx: ICTagContext;
    factory: {
        [props: string]: CommandBase;
    };
    records: Command[];
    addCommand(command: string, execute: CommandBase): void;
    execute(command: Command): Promise<void>;
}
export declare class Executor implements IExecutor {
    factory: {
        [p: string]: CommandBase;
    };
    ctx: ICTagContext;
    records: Command[];
    constructor(ctx: ICTagContext);
    addCommand(command: string, execute: CommandBase): void;
    execute(command: Command): Promise<void>;
}
