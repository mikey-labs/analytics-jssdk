import { TriggerBase } from "./TriggerBase";
export declare class ScreenViewTrigger extends TriggerBase {
    alreadySend: boolean;
    constructor(trackingId: string);
    start(): void;
    stop(): void;
}
