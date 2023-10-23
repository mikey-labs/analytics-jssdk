import { TriggerBase } from "./TriggerBase";
export declare class StayDurationTrigger extends TriggerBase {
    time: number;
    private stopper;
    constructor(trackingId: string);
    stop(): void;
    start(): void;
}
