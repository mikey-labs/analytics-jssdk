import { Configuration } from "../Types/Configuration";
import { BaseInfo, BaseInfoConfig } from "../Types/BaseInfo";
import { StayDurationTrigger } from "./Trigger/StayDurationTrigger";
import { TriggerBase } from "./Trigger/TriggerBase";
import { ExceptionReportTrigger } from "./Trigger/ExceptionReportTrigger";
import { ScreenViewTrigger } from "./Trigger/ScreenViewTrigger";
export type ITagManagerTriggers = {
    stay_duration: TriggerBase;
    exception_report: TriggerBase;
    screen_view: TriggerBase;
};
export interface ITagManager {
    readonly trackingId: string;
    readonly hTime: number;
    triggers: ITagManagerTriggers;
    baseInfo: BaseInfo;
    config: Configuration;
    setConfig(config: Configuration): void;
    setBaseInfo(baseInfo: BaseInfoConfig): void;
    run(): void;
}
export declare class TagManager implements ITagManager {
    readonly trackingId: string;
    readonly hTime: number;
    readonly triggers: {
        stay_duration: StayDurationTrigger;
        exception_report: ExceptionReportTrigger;
        screen_view: ScreenViewTrigger;
    };
    config: Configuration;
    baseInfo: BaseInfo;
    constructor(trackingId: string, baseInfo: BaseInfo, options?: Configuration);
    setConfig(config: Configuration): void;
    setBaseInfo(baseInfo: BaseInfoConfig): void;
    run(config?: Configuration): void;
    stopAll(): void;
}
