export interface LinkClickEvent {
  link_id: string; // 链接id
  link_domain: string; //链接域
  link_text: string; //链接文字
  link_url: string; //链接url
  outbound: boolean; //是否跳出当前域名
}
