import { ICTagContext, ICTagContextGetters } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";

export class CommandGet extends CommandBase {
  static NAME = "get";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  async execute(
    methodName: string | keyof ICTagContextGetters,
    callback: (data: string) => void,
    params: any
  ) {
    if (typeof this.ctx.getters[methodName] === "function")
      return callback(await this.ctx.getters[methodName](params));
    throw Error(`Can't find command:[${methodName}]!`);
  }
}
