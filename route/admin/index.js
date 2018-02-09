/**
 * Created by chang on 2017/12/28.
 */
const express=require('express');
const common = require('../../libs/common');
const banners = require('./banners');
const login = require('./login')

module.exports=function (){
    var router=express.Router();

    //检查登录状态
    router.use((req, res, next)=>{
        if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
            console.log('登录')
            res.redirect('/admin/login');
        }else{
            next();
        }
    });

    //

    router.get('/', (req,res) => {
        res.render('admin/index.ejs')

    });
    router.use('/login',login());
    router.use('/banners/',banners());
    router.use('/custom',require('./custom')());
    return router;
};
