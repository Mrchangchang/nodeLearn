/**
 * Created by chang on 2018/1/5.
 */
const express = require('express');
const banner_table = require('../modules/banner');

module.exports = function () {
    var router = express.Router();
    router.get('/',(req, res) =>{
        switch (req.query.act) {
            case 'mod':
                let param = {
                    _id: req.query.id
                };
                banner_table.find(param, (err, docs) => {
                    "use strict";
                    if (err) {
                        console.error(err);
                        res.status(500).send(`database error`).end();
                    } else if (docs.length == 0) {
                        res.status(404).send('not find').end()
                    } else {
                        res.render('admin/banners.ejs',{
                            banners: docs,
                            mod_data: docs[0]
                        })
                    }
                });
                break;
            case 'del':
                banner_table.remove({_id: req.query.id}, (err) => {
                    "use strict";
                    if (err) {
                        console.log(err);
                        res.status(500).send(`database error`).end();
                    } else {
                        res.redirect('/admin/banners')
                    }
                });
                break;
            default:
                banner_table.find({}, (err,docs) => {
                    "use strict";
                    if (err) {
                        console.log(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.render('admin/banners.ejs',{
                            banners: docs
                        })
                    }
                });
                break;
        }


    });
    //添加banner
    router.post('/', (req, res) => {
        let title = req.body.title;
        let description = req.body.description;
        let href = req.body.href;
        console.log(title,description,href);
        if (!title || !description || !href) {
            res.send('arg error').end();
        }else {
            console.log(req.body);
            if (req.body.mod_id) {//修改

                banner_table.updateOne({_id: req.body.mod_id}, {
                    title: title,
                    description: description,
                    href: href
                },(err) => {
                    "use strict";
                    if (err) {
                        console.log(err);
                        res.status(500).send('database error').end();
                    } else {
                        console.log('修改成功')
                        res.redirect('/admin/banners')
                    }
                });
            } else {//添加
                new banner_table({
                    title: title,
                    description: description,
                    href: href
                }).save(function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('database error').end();
                    } else {
                        console.log(doc);
                        console.log('成功');
                        res.redirect('/admin/banners')
                    }
                });
            }
        }
    });
    return router;
}