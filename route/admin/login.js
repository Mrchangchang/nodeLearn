/**
 * Created by chang on 2018/1/5.
 */
const express=require('express');
const common = require('../../libs/common');
const admin_table = require('../modules/admin');

module.exports = function () {
    var router = express.Router();
    router.get('/', (req, res) => {
        res.render('admin/login.ejs', {});
    })
    router.post('/', (req, res)=>{
        let username = req.body.username;
        let password = common.md5(req.body.password + common.md5.MD5_FUFFIX);
        console.log(password);
        let param = {
            username: username
        };
        console.log(param);
        var p = {
            username: username,
            password: password
        };
        admin_table.findOne(param, (err, doc) => {
            "use strict";
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (doc) {
                    if (doc.password == password) {
                        //成功
                        console.log(doc._id);
                        req.session['admin_id'] = doc._id;
                        res.redirect('/admin/');
                        console.log('跳转成功')
                    } else {
                        console.log(doc.password);
                        console.log(password);
                        res.status(400).send('this password in incorrect').end()
                    }
                } else {
                    res.status(400).send('this username is not find').end()
                }
            }
        })

    });
    return router;
}