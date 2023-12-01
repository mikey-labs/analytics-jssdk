import { TriggerBase } from "./TriggerBase";
import { LinkClickEvent } from "../../Types/Events/LinkClickEvent";
import { useEventListener } from "@zhengxy/use";

export class LinkClickTrigger extends TriggerBase {
  outboundWhiteList: string[] = ["zaobao.com", "zaobao.com.sg"];
  constructor(trackingId: string) {
    super(trackingId);
    this.closestPolyfill();
    this.attachPageAnchorEvent();
  }
  closestPolyfill() {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (selector: string) {
        let el: Element | null = this;
        if (!document.documentElement.contains(el)) return null;
        do {
          if (el.matches(selector)) return el;
          el = el.parentElement;
        } while (el !== null);
        return null;
      };
    }
  }
  attachPageAnchorEvent() {
    const _self = this;
    useEventListener(document, "click", function (e: MouseEvent) {
      const linkElement: HTMLAnchorElement | null = (
        e.target as Element
      ).closest("a[href]");
      if (linkElement) {
        const { download, href, title, id, className } = linkElement;
        const { host } = new URL(href);
        const entity: LinkClickEvent = {
          link_download_text: download || "",
          link_title: title,
          link_id: id,
          link_domain: host,
          link_url: href,
          link_class: className,
          outbound: !_self.outboundWhiteList.some((domain) =>
            host.includes(domain)
          ),
        };
        window.ctag("send", "click", entity);
      }
    });
  }
  stop(): void {}
  start(): void {}
}
