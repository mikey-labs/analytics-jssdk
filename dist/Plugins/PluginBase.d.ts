import { ICTagContext } from "../Bootstrap/CTagContext";
export declare abstract class PluginBase {
    static NAME: string;
    abstract version: string;
    protected constructor(options?: any);
}
export declare abstract class PluginCore extends PluginBase {
    ctx: ICTagContext;
    abstract setup(): this;
    abstract execute(...args: any): any;
    protected constructor(ctx: ICTagContext);
}
