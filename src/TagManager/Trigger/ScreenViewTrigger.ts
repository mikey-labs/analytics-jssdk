import {TriggerBase} from "./TriggerBase";

export class ScreenViewTrigger extends TriggerBase {
    alreadySend:boolean = false; //只发送一次
    constructor(trackingId:string) {
        super(trackingId);
    }

    start(): void {
        if(!this.alreadySend){
            window.CQueue.push([
                "send",
                "screen_view",
                {
                    page_name:document.title,
                    screen_id:"",
                },
                this.trackingId
            ]);
            this.alreadySend = true;
        }
    }

    stop(): void {

    }
}