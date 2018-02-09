/**
 * Created by chang on 2017/12/28.
 */
const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const multerObj=multer({dest: './static/upload'});
const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');
const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/learn";


var server=express();
server.listen(8080);
console.log(8080);

//连接数据库
const db = mongoose.connect(url).then(()=> {
    "use strict";
    console.log('连接成功');
},(err) => {
    "use strict";
    console.log(err);
    console.log('连接错误');
});


//1.获取请求数据
//get自带
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(multerObj.any());

//2.cookie、session
server.use(cookieParser());
(function (){
    var keys=[];
    for(var i=0;i<100000;i++){
        keys[i]='a_'+Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20*60*1000  //20min
    }));
})();

//3.模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

//4.route
server.use('/', require('./route/web')());
server.use('/admin/', require('./route/admin/index.js')());


//5.default：static
server.use(static('./static/'));

