import { ICTagContext, PluginDerived } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";

export class CommandInstall extends CommandBase {
  static NAME = "install";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }

  execute(plugin: PluginDerived, options?: any): void {
    this.ctx.registerPlugin(plugin, options);
  }
}
