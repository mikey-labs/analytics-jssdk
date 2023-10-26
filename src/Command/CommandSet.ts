import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { GlobalConfiguration } from "../Types/Configuration";
import { PageConfig } from "../Types/BaseInfo";
export type SetModuleName = "global" | "page" | "auto";
export class CommandSet extends CommandBase {
  static NAME = "set";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  async execute(
    module: SetModuleName,
    config: GlobalConfiguration | PageConfig | object,
    trackingId?: string
  ) {
    switch (module) {
      case "global":
        this.ctx.setters.globalConfig(config as GlobalConfiguration);
        break;
      case "page":
        this.ctx.getters
          .instance(trackingId)
          ?.setPageConfig(config as PageConfig);
        break;
      case "auto":
        this.ctx.getters
            .instance(trackingId)
            ?.setAutomaticallyData(config);
        break;
    }
  }
}
