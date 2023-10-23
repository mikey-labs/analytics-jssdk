import {BaseInfo} from "./BaseInfo";
import {EventEntity} from "./Command";
import {GlobalConfiguration} from "./Configuration";
export type EventType = 'screen_view' | 'timing' | 'exception' | 'event' | 'social'
export interface EventParams {
    name:EventType,
    local_time_ms:number;
    params:EventEntity | BaseInfo
}
export interface Measurement extends GlobalConfiguration{
    tracking_id:string,
    client_id:string,
    version:string,
    events:EventParams[],
}
