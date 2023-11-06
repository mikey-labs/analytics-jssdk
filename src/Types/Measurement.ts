import { BaseInfo } from "./BaseInfo";
import { EventEntity, EventType } from "./Events";
import { GlobalConfiguration } from "./Configuration";

export interface EventParams {
  name: EventType; //事件类型，与实体对应
  local_time_ms: number; //本地触发事件
  params: EventEntity & BaseInfo;
}
export interface Measurement extends GlobalConfiguration {
  tracking_id: string; //跟踪ID
  client_id: string;//用户指纹
  version: string;//SDK版本
  events: EventParams[];
}
