import { TriggerBase } from "./TriggerBase";
import { useEventListener } from "@zhengxy/use";

export class ExceptionReportTrigger extends TriggerBase {
  stopper:Function | null = null;
  constructor(trackingId: string) {
    super(trackingId);
  }

  start(): void {
    const errorHandler = (event:ErrorEvent)=>{
      const {error,message,timeStamp} = event;
      const info = error?.stack.toString() || message;
      window.ctag(
          "send",
          "exception",
          {
            ex_fatal: false, //计时时间
            ex_desc:info,
            ex_timestamp:Date.now() - timeStamp
          },
          this.trackingId
      );
    }
    const {stop:errorStop} = useEventListener(window, "error", errorHandler);
    const {stop:rejectionStop} = useEventListener(window, "unhandledrejection", errorHandler);
    this.stopper = ()=>{
      errorStop();
      rejectionStop();
    };
  }

  stop(): void {
    this.stopper?.()
  }
}
