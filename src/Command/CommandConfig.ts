import { ICTagContext } from "../Bootstrap/CTagContext";
import { Configuration } from "../Types/Configuration";
import { CommandBase } from "./CommandBase";

export class CommandConfig extends CommandBase {
  static NAME = "config";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  execute(config: Configuration, trackingId?: string) {
    const instance = this.ctx.getters.instance(trackingId);
    if (instance) {
      instance.setConfig(config);
    } else {
      throw Error(`Can't find tracking instance ID:[${trackingId}]!`);
    }

    // Object.keys(this.ctx.instances).map((key)=>{
    //     const tagManager = this.ctx.getters.instance(key);
    //     tagManager && tagManager.setConfig(config);
    // })
  }
}
