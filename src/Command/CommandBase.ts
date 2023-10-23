import {ICTagContext} from "../Bootstrap/CTagContext";

export abstract class CommandBase {
    readonly ctx: ICTagContext;
    abstract version:string;
    static NAME: string;
    protected constructor(ctx:ICTagContext) {
        this.ctx = ctx;
    }
    abstract execute(...args: any): void ;
}
