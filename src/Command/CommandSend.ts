import { ICTagContext } from "../Bootstrap/CTagContext";
import { CommandBase } from "./CommandBase";
import { EventEntity, EventType } from "../Types/Events";
import { Measurement } from "../Types/Measurement";
import { object2UrlString } from "../Utils/Object2UrlString";
export const API_HOST = "https://www.zaobao.com/cg.gif";

export class CommandSend extends CommandBase {
  static NAME = "send";
  readonly version: string = "1.0.0";
  constructor(ctx: ICTagContext) {
    super(ctx);
  }
  async execute(
    eventType: EventType,
    entity: EventEntity,
    trackingId?: string
  ) {
    const instance = this.ctx.getters.instance(trackingId);
    if (!instance)
      throw Error(`Can't find instance tracking ID:${trackingId}!`);
    const { api_secret, api_version, user_id,api_host } =
      this.ctx.getters.globalConfig();
    const measurement: Measurement = {
      tracking_id: instance.trackingId,
      api_secret: api_secret,
      user_id: user_id,
      api_version: api_version,
      version: this.ctx.version,
      client_id: await this.ctx.getters.clientId(),
      events: [
        {
          name: eventType,
          local_time_ms: Date.now(),
          params: {
            ...entity,
            ...await this.ctx.getters.measurement(),
            ...instance.automaticallyData,
            ...instance.pageConfig,
          },
        },
      ],
    };
    await this.send(measurement,api_host);
  }
  async send(measurement: Measurement,api_host?:string) {
    const stringify = object2UrlString(measurement);
    const carrier = new Image();
    carrier.src = (api_host || API_HOST) + "?" + stringify;
  }
}
