const http = require("http");
const app = http.createServer((req, res)=>{
    const e = new URLSearchParams(req.url);
    let postData = "";
    req.on("data", chunk => (postData += chunk));
    req.on("end",()=>{
        console.log(postData)})
    console.log("in")
    res.end("ok");
})
app.listen("5000",()=>{
    console.log("start")
})