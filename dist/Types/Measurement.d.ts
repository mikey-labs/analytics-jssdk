import { BaseInfo } from "./BaseInfo";
import { EventEntity, EventType } from "./Events";
import { GlobalConfiguration } from "./Configuration";
export interface EventParams {
    name: EventType;
    local_time_ms: number;
    params: EventEntity & BaseInfo;
}
export interface Measurement extends GlobalConfiguration {
    tracking_id: string;
    client_id: string;
    version: string;
    events: EventParams[];
}
