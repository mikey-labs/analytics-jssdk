import { Configuration } from "../Types/Configuration";
import { PageConfig } from "../Types/BaseInfo";
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
    pageConfig: PageConfig;
    config: Configuration;
    setConfig(config: Configuration): void;
    setPageConfig(pageConfig: PageConfig): void;
    setCustomData(customData: object): void;
    customData: {
        [p: string]: any;
    };
    run(): void;
}
export declare class TagManager implements ITagManager {
    customData: {};
    readonly trackingId: string;
    readonly hTime: number;
    readonly triggers: {
        stay_duration: StayDurationTrigger;
        exception_report: ExceptionReportTrigger;
        screen_view: ScreenViewTrigger;
    };
    config: Configuration;
    pageConfig: PageConfig;
    constructor(trackingId: string, options?: Configuration);
    setCustomData(customData: object): void;
    setConfig(config: Configuration): void;
    setPageConfig(pageConfig: PageConfig): void;
    run(config?: Configuration): void;
    stopAll(): void;
}
