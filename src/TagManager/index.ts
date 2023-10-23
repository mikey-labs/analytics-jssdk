import {Configuration} from "../Types/Configuration";
import {BaseInfo, BaseInfoConfig} from "../Types/BaseInfo";
import {assignObjectFilterSource} from "../Utils/AssignObjectFilterSource";
import {StayDurationTrigger} from "./Trigger/StayDurationTrigger";
import {TriggerBase} from "./Trigger/TriggerBase";
import {ExceptionReportTrigger} from "./Trigger/ExceptionReportTrigger";
import {ScreenViewTrigger} from "./Trigger/ScreenViewTrigger";
export type ITagManagerTriggers = {
    stay_duration:TriggerBase,
    exception_report:TriggerBase,
    screen_view:TriggerBase
}
export interface ITagManager {
    readonly trackingId:string;
    readonly hTime:number;
    triggers:ITagManagerTriggers;
    baseInfo:BaseInfo;
    config:Configuration;
    setConfig(config:Configuration):void;
    setBaseInfo(baseInfo:BaseInfoConfig):void;
    run():void;
}
export class TagManager implements ITagManager{
    readonly trackingId:string;
    readonly hTime:number = Date.now();
    readonly triggers;
    config:Configuration = {
        stay_duration:true,
        screen_view:true,
        exception_report:false,
        disable:false,
    };
    baseInfo:BaseInfo;
    constructor(trackingId:string,baseInfo:BaseInfo,options?:Configuration) {
        this.trackingId = trackingId;
        this.baseInfo = baseInfo;
        this.triggers = {
            stay_duration: new StayDurationTrigger(trackingId),
            exception_report: new ExceptionReportTrigger(trackingId),
            screen_view: new ScreenViewTrigger(trackingId)
        };
        options && (this.config = assignObjectFilterSource(this.config,options));
    }
    setConfig(config:Configuration){
        this.config = assignObjectFilterSource(this.config,config);
        this.run(config);
    }
    setBaseInfo(baseInfo:BaseInfoConfig){
        this.baseInfo = assignObjectFilterSource(this.baseInfo,baseInfo);
    }
    run(config:Configuration = this.config):void{
       const {stay_duration,exception_report,screen_view,disable} = config;

       if(disable){
           this.stopAll();
           return;
       }

       if(screen_view){
           this.triggers.screen_view.start();
       } else {
           this.triggers.screen_view.stop();
       }
       if(stay_duration){
           this.triggers.stay_duration.start();
       } else {
           this.triggers.stay_duration.stop();
       }
       if (exception_report){
           this.triggers.exception_report.start();
       } else {
           this.triggers.exception_report.stop();
       }

    }
    stopAll(){
        Object.keys(this.triggers).map(key=>{
            this.triggers[key as keyof ITagManagerTriggers ].stop();
        })
    }

}
