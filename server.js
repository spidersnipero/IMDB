const express = require("express");
const http = require("https");

const bodyparser = require("body-parser");
const { urlencoded, json } = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({encoded:true}));
app.post("/",(request,respond)=>{
    var st = request.body.name.split(" ");
    console.log(st);
    var name = "";
    var len = st.length;
    console.log(len);
    for(let i = 0;i<st.length-1;i++){
        name +=st[i]+"%20"
    }
    name = name+st[st.length-1];
    console.log(name);
    const options = {
	"method": "GET",
	"hostname": "online-movie-database.p.rapidapi.com",
	"port": null,
	"path": "/auto-complete?q="+name,
	"headers": {
		"X-RapidAPI-Key": "45877265e7mshff09b6ecbbd8985p1ea5a0jsn71148bb82eb6",
		"X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
		"useQueryString": true
	    }
    };
        const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            const need = JSON.parse(body.toString());
            respond.send(need)
        });
    });
    req.end();
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.listen(3000,()=>{
    console.log("waiting at port 3000 ");
})