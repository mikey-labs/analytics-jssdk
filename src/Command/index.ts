import { createArrayAddWatcher } from "../Utils/ArrayWatcher";
import { ICTagContext } from "../Bootstrap/CTagContext";
import { Command } from "../Types/Command";

export async function createCommandQueueProcessor(ctx: ICTagContext) {
  createArrayAddWatcher(window.ctag.q, executeQueueCommand.bind(ctx));
  await executeQueueCommand.call(ctx);
}

async function executeQueueCommand(this: ICTagContext) {
  while (window.ctag.q.length > 0) {
    await this.executor.execute(window.ctag.q.shift() as Command);
  }
}
