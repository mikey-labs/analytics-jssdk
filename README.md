## Usage
```html
<!-- Start Zaobao CN Analytics -->
<script async src="../dist/ctag.js?id=TK-HEWM4FW&screen_view=false"></script>
<script>
    window.CQueue = window.CQueue || [];
    function ctag() {window.CQueue.push(arguments);}
    //如果scr脚本未携带key，则需要手动创建实例
    //手动创建带参
    ctag("create","TK-SGSKQWNI",{
        stay_duration:false,
        aaa:123,//无作用
        screen_view:false,
        exception_report:true,
        disable:true
    });
    //手动创建实例不带参
    ctag("create","TK-CNNZIOMO");
    //配置命令
    ctag("config",{
        stay_duration:false,
        screen_view:true,
        exception_report:false,
    })
    //获取指纹
    ctag('get',"clientId",console.log);
    //获取网页基础信息
    ctag('get',"measurement",console.log);
    //获取配置
    ctag('get',"config",console.log)//
    //获取实例，最后个参数不传，则使用默认实例（第一个）
    ctag('get',"instance",console.log,"TK-HEWM4FW")//
    //获取实例，最后个参数不传，则使用默认实例（第一个）
    ctag('get',"instance",console.log)//
    //获取插件实例
    ctag('get',"plugin",console.log,"measurement")//
    //移除实例
    ctag('remove',"instance.TK-CNNZIOMO",console.log)
    //发送screen_view埋点
    ctag('send',"screen_view",{
        page:"home",
        screenId:'124'
    },"TK-SGSKQWNI")
    
    //设置全局参数
    ctag("set","global",{
        api_secret:"345",
        user_id:"userid",
        api_version:"1.3.0"
    });
    //获取全局参数
    ctag('get',"globalConfig",console.log)//
    //设置页面信息
    ctag("set","page",{
        title:"你好"
    });
    // ctag('send',"screen_view",{
    //     page_name:"home",
    //     screen_id:'124'
    // })
    //初始化完成回调
    ctag((ctx)=>{
        console.log("ready")
        console.log(ctx)
    })
</script>
<!-- End Zaobao CN Analytics -->
```
## plugin

### 曝光埋点
```html
<script>
    ctag('plugin',"exposure:observe",document.getElementById("d1"),(intersection,stop)=>{
        // console.log(intersection)
        if(intersection){
            ctag("send","event",{
                event_name:"",// 事件名称
                event_category:"曝光",//事件类别
                event_label:"中国发展高科技",//事件标签
                event_action:"exposure",//事件动作
                event_value:0,
                experiment_id:2,
                variant_id:4
            })
            // stop()
        }
    });
</script>
```