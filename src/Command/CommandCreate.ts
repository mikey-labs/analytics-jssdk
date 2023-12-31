import { DEFAULT_TAG_NAME, ICTagContext } from "../Bootstrap/CTagContext";
import { TagManager } from "../TagManager";
import { CommandBase } from "./CommandBase";
import { Configuration } from "../Types/Configuration";

export class CommandCreate extends CommandBase {
  static NAME = "create";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  async execute(trackingId: string, options?: Configuration) {
    if (!trackingId) {
      throw Error(`Tracking ID can not be null!`);
    }
    if (this.ctx.getters.instance(trackingId)) {
      throw Error(`This tracking ID:[${trackingId}] has already been created!`);
    }
    //将基础上报信息设置为默认
    const tagManager = new TagManager(trackingId, options);
    //如果是第一个则设置为默认实例,key为default
    const instanceKey =
      Object.keys(this.ctx.instances).length === 0
        ? DEFAULT_TAG_NAME
        : trackingId;
    //添加实例到instance
    this.ctx.instances[instanceKey] = tagManager;
  }
}
