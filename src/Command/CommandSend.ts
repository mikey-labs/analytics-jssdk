import {ICTagContext} from "../Bootstrap/CTagContext";
import {CommandBase} from "./CommandBase";
import {EventEntity, EventType} from "../Types/Command";
import {Measurement} from "../Types/Measurement";
import {object2UrlString} from "../Utils/Object2UrlString";
import {PluginFootPrint} from "../Plugins/PluginFootPrint";

export class CommandSend extends CommandBase {
    static NAME = "send";
    readonly version:string = "1.0.0";
    constructor(ctx:ICTagContext) {
        super(ctx)
    }
    async execute(eventType:EventType,entity:EventEntity,trackingId?:string) {
        const instance = this.ctx.getters.instance(trackingId);
        if(!instance) throw Error(`Can't find instance tracking ID:${trackingId}!`)
        const {api_secret,api_version,user_id} = this.ctx.getters.globalConfig() ;
        const measurement:Measurement = {
            tracking_id:instance.trackingId,
            api_secret:api_secret,
            user_id:user_id,
            api_version:api_version,
            version:this.ctx.version,
            client_id:await this.ctx.core.plugins[PluginFootPrint.NAME].execute(),
            events:[
                {
                    name:eventType,
                    local_time_ms:Date.now(),
                    params:{
                        ...instance.baseInfo,
                        ...entity
                    }
                }
            ]
        }
        await this.send(measurement);
    }
    async send(measurement:Measurement){
        const stringify = object2UrlString(measurement);
        const carrier = new Image();
        carrier.src = "./cg.gif?" + stringify;
        carrier.onload = function (e) {
            console.log(e)
        }
    }
}