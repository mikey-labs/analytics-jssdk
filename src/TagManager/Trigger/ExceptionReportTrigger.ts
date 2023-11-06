import { TriggerBase } from "./TriggerBase";
import { useEventListener } from "@zhengxy/use";

export class ExceptionReportTrigger extends TriggerBase {
  constructor(trackingId: string) {
    super(trackingId);
  }

  start(): void {
    useEventListener(window, "error", (e: Error) => {
      console.log(e);
    });
  }

  stop(): void {}
}
