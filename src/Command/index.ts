import {createArrayAddWatcher} from "../Utils/ArrayWatcher";
import {ICTagContext} from "../Bootstrap/CTagContext";
import {Command} from "../Types/Command";

export async function createCommandQueueProcessor(ctx:ICTagContext) {
    createArrayAddWatcher(window.CQueue,executeQueueCommand.bind(ctx));
    await executeQueueCommand.call(ctx);
}

async function executeQueueCommand(this:ICTagContext) {
    while (window.CQueue.length > 0){
        await this.executor.execute( window.CQueue.shift() as Command);
    }
}