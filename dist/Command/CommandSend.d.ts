import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { EventEntity, EventType } from "../Types/Events";
import { Measurement } from "../Types/Measurement";
export declare const API_HOST = "https://www.zaobao.com/cg.gif";
export declare class CommandSend extends CommandBase {
    static NAME: string;
    readonly version: string;
    constructor(ctx: ICTagContext);
    execute(eventType: EventType, entity: EventEntity, trackingId?: string): Promise<void>;
    send(measurement: Measurement, api_host?: string): Promise<void>;
}
