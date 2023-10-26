var a =


{
  "tracking_id": "TK-HEWM4FW",
  "api_secret": "",
  "user_id": "",
  "api_version": "1.0.0",
  "version": "1.0.0",
  "client_id": "fa56ce52cc1d55d051b1c82a397a6c6d",
  "events": [
    {
      "name": "screen_view",
      "local_time_ms": 1698286941125,
      "params": {
        //配置的自定义自动上报数据
        "recommend_id":"",

        //配置的自定义手动上报数据，与page view内置参数一同传入
        "scene_id":"",
        "custom_id":"",

        /*基础信息公共部分*/
        "ga_id": "", //ga id,
        "ip": "", // ip 服务端填
        "referrer": "", //来源
        "geoid": "", //地理位置信息
        "resolution": "", //分辨率

        /*website base info*/
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/117.0.0.0 Safari/537.36",
        "url": "http://localhost:63342/analytics/analytics/test",
        "host": "localhost:63342",
        "path": "/analytics/analytics/test/test.html",
        "title": "Title",
        "page_load_time": 0,
        "page_download_time": 0.2000000011175871,
        "redirect_time": 0,
        "tcp": 0,
        "dns": 0,
        "serve_response_time": 1.799999998882413,
        "content_load_time": 0,
        "browser_view_type": "desktop",

        /*app base info*/
        "app_name": "", //app名称
        "package_name": "", // app 包名
        "app_version": "", // app版本
        "os_name": "", //系统名称
        "device_model": "", //设备名称
        "os_version": "", //系统版本
        "template_version": "",

        /*一下是自动上报内置参数*/

        /*异常信息：name=exception*/
        "ex_fatal": "boolean", //是否致命
        "ex_timestamp":"number", // 发生时间
        "ex_desc": "string", // 异常描述

        /*屏幕浏览：name=screen_view*/
        "page_name": "string", //页面名称
        "screen_id": "string",//页面class名称

        /*网页链接点击事件：name=click*/
        "link_id": "string", // 链接id
        "link_domain": "string", //链接域
        "link_text": "string", //链接文字
        "link_url": "string", //链接url
        "outbound": "boolean", //是否跳出当前域名

        /*用户首次打开网页：name=first_open*/
        "first_open_version":"string",//第一次打开网站/app的时间

        /*用户搜索关键词：name=search*/
        "search_term":"string",//关键词

        /*用户分享：name=share*/
        "share_method": "string", //分享方式，wechat，facebook，system...
        "share_content_type": "string", //分享类型，图片，文字...
        "share_item_id": "string", //分享的内容，文章id等

        /*用户页面停留时长：name=page_timing*/
        "page_timing_duration": "number" //计时时长



      },
    },
  ]
}
