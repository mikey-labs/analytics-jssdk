import { CommandBase } from "./CommandBase";
import {DEFAULT_TAG_NAME, ICTagContext} from "../Bootstrap/CTagContext";
export type RemoveModuleName = "instance" | "plugin";
export class CommandRemove extends CommandBase {
  static NAME = "remove";
  readonly version: string = "1.0.0";
  constructor(public ctx: ICTagContext) {
    super(ctx);
  }
  execute(methodName: string, callback: (result: boolean) => void): void {
    if (!methodName.includes(".")) {
      throw Error(
        `The param ${methodName} must have "." for separate module and name, e.g:instance.\${trackingId}`
      );
    }
    const [module, name] = methodName.split(".");
    switch (module as RemoveModuleName) {
      case "instance":
        const targetName = name === this.ctx.getters.instance()?.trackingId
          ? DEFAULT_TAG_NAME : name
        callback(delete this.ctx.instances[targetName]);
        break;
      case "plugin":
        callback(delete this.ctx.plugins[name]);
        break;
      default :
          throw Error("The module name mush 'instance' or 'plugin'!");
    }
  }
}