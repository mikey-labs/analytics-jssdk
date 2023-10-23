import { ICTagContext, ICTagContextGetters } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";

export class CommandPlugin extends CommandBase {
  static NAME = "plugin";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  async execute(
    pluginAndMethodName: string,
    ...params: any
  ) {
    const [pluginName,methodName] = pluginAndMethodName.split(":");
    const plugin = this.ctx.plugins[pluginName];
    if (plugin) {
      //@ts-ignore
      return await plugin[methodName](...params);
    }
    throw Error(`Can't find plugin:[${pluginName}]!`);
  }
}
