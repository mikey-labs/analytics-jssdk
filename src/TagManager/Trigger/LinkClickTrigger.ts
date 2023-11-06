import { TriggerBase } from "./TriggerBase";
import { LinkClickEvent } from "../../Types/Events/LinkClickEvent";
import { useEventListener } from "@zhengxy/use";

export class LinkClickTrigger extends TriggerBase {
  outboundWhiteList: string[] = ["zaobao.com", "zaobao.com.sg"];
  constructor(trackingId: string) {
    super(trackingId);
    this.attachPageAnchorEvent();
  }
  attachPageAnchorEvent() {
    const anchors: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll("a[href]");
    const _self = this;
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      useEventListener(anchor, "click", function (this: HTMLAnchorElement) {
        const { host } = new URL(this.href);
        const entity: LinkClickEvent = {
          link_download_text: this.download || "",
          link_title: this.title,
          link_id: this.id,
          link_domain: host,
          link_url: this.href,
          link_class: this.className,
          outbound: !_self.outboundWhiteList.some((domain) =>
            host.includes(domain)
          ),
        };
        window.ctag("send", "click", entity);
      });
    }
  }
  stop(): void {}
  start(): void {}
}
