import { Command, FuncOnReady } from "../Types/Command";
import { CommandBase } from "./CommandBase";
import { ICTagContext } from "../Bootstrap/CTagContext";

export interface IExecutor {
  ctx: ICTagContext;
  factory: {
    [props: string]: CommandBase;
  };
  records: Command[];
  addCommand(command: string, execute: CommandBase): void;
  execute(command: Command): Promise<void>;
}

export class Executor implements IExecutor {
  factory: { [p: string]: CommandBase } = {};
  ctx: ICTagContext;
  records: Command[] = [];

  constructor(ctx: ICTagContext) {
    this.ctx = ctx;
  }
  addCommand(command: string, execute: CommandBase) {
    this.factory[command] = execute;
  }
  async execute(command: Command): Promise<void> {
    const [...record] = command;
    this.records.push(record);
    const [instruction, ...arg] = record;
    if (typeof instruction === "function") {
      //on ready
      (instruction as FuncOnReady)(this.ctx);
    } else {
      await this.factory[instruction].execute(...arg);
    }
  }
}
