import { TriggerBase } from "./TriggerBase";
export declare class ExceptionReportTrigger extends TriggerBase {
    constructor(trackingId: string);
    start(): void;
    stop(): void;
}
