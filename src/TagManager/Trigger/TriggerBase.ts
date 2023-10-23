export abstract class TriggerBase {
    abstract start():void;
    abstract stop():void;
    readonly trackingId:string;
    protected constructor(trackingId:string) {
        this.trackingId = trackingId;
    }
}