import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { EventEntity, EventType } from "../Types/Command";
import { Measurement } from "../Types/Measurement";
export declare class CommandSend extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(eventType: EventType, entity: EventEntity, trackingId?: string): Promise<void>;
    send(measurement: Measurement): Promise<void>;
}
