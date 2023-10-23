export declare abstract class TriggerBase {
    abstract start(): void;
    abstract stop(): void;
    readonly trackingId: string;
    protected constructor(trackingId: string);
}
