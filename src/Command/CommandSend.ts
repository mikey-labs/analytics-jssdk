import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { EventEntity, EventType } from "../Types/Events";
import {EventParams, Measurement} from "../Types/Measurement";
import { object2UrlString } from "../Utils/Object2UrlString";
import {ITagManager} from "../TagManager";
import {usePageVisibility} from "@zhengxy/use";

export const API_HOST = "https://www.zaobao.com/cg.gif";
export class CommandSend extends CommandBase {
  static NAME = "send";
  readonly version: string = "1.0.0";
  sendImmediately:boolean = true;
  sendTimer:number[] = [];
  Queue:{
    [trackingId:string]:{
      measurement:Measurement,
      api_host:string
    }
  } = {};
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  async execute(
    eventType: EventType,
    entity: EventEntity,
    trackingId?: string
  ) {
    const instance = this.ctx.getters.instance(trackingId);
    if (!instance)throw Error(`Can't find instance tracking ID:${trackingId}!`);

    const { api_secret, api_version, user_id,api_host,ssid } =
    this.ctx.getters.globalConfig();

    if(!this.Queue[instance.trackingId]){
      this.Queue[instance.trackingId] = {
        measurement:{
          tracking_id: instance.trackingId,
          api_secret: api_secret,
          user_id: user_id,
          ssid:ssid,
          api_version: api_version,
          version: this.ctx.version,
          client_id: await this.ctx.getters.clientId(),
          events: [],
        },
        api_host:api_host || API_HOST
      }
    }
    this.Queue[instance.trackingId].measurement.events.push({
      name: eventType,
      local_time_ms: Date.now(),
      params: {
        ...entity,
        ...await this.ctx.getters.measurement(),
        ...instance.automaticallyData,
        ...instance.pageConfig,
      },
    });
    if(this.sendImmediately){
      this.handlerPageVisibility();
      this.sendImmediately = false;
    }
    this.sendTimer.push(setTimeout(()=>{
      this.sendTimer.map(clearTimeout);
      this.sendTimer = [];
      this.sendImmediately = true;
      this.handlerPageVisibility();
    },2000));
  }

  handlerPageVisibility() {
    Object.keys(this.Queue).map((trackingId:string)=>{
      const itemData = this.Queue[trackingId];
      if(itemData.measurement.events.length === 0)return;
      this.send(itemData.api_host,itemData.measurement);
      itemData.measurement.events = [];
    })
  }
  send(apiHost:string,measurement:Measurement){
    (typeof navigator.sendBeacon === "function" ? this.sendBeacon : this.sendImage)(apiHost,measurement);
  }
  sendImage(api_host:string,measurement:Measurement){
    const stringify = object2UrlString(measurement);
    let carrier:HTMLImageElement | null = new Image();
    carrier.src = api_host + "?" + stringify;
    carrier.onload = carrier.onerror = function (){
      carrier = null;
    }
  }
  sendBeacon(api_host:string,measurement:Measurement){
    navigator.sendBeacon(api_host ,JSON.stringify(measurement));
  }
}
