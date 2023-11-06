export interface LinkClickEvent {
  link_id: string; // 链接id
  link_domain: string; //链接域
  link_download_text: string; //下载链接文字
  link_title: string; //下载链接标题
  link_url: string; //链接url
  link_class:string;//链接class
  outbound: boolean; //是否跳出当前域名
}
