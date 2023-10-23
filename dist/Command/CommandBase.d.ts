import { ICTagContext } from "../Bootstrap/CTagContext";
export declare abstract class CommandBase {
    readonly ctx: ICTagContext;
    abstract version: string;
    static NAME: string;
    protected constructor(ctx: ICTagContext);
    abstract execute(...args: any): void;
}
