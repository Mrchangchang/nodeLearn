/**
 * Created by chang on 2018/1/5.
 */
const express = require('express');
const common = require('../../libs/common');
const pathLib = require('path');
const fs = require('fs');
const mysql = require('mysql');
const custom_evaluation_table = require('../modules/custom_evaluation');
module.exports = function () {
    var router = express.Router();
    router.get('/',(req,res) => {
        "use strict";
        switch (req.query.act) {
            case 'del':
                custom_evaluation_table.findOne({_id: req.query.id},(err,doc) =>{
                    if (err) {
                        console.log(err);
                        res.status(500).send('database is error').end();
                    } else {
                        if (doc) {
                            fs.unlink('static/upload/'+ doc.src, (err) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send('fs is error').end();
                                } else {
                                    doc.remove(function (err,doc) {
                                        if (err) {
                                            console.log(err);
                                            res.status(500).send('database is error').end();
                                        } else {
                                            res.redirect('/admin/custom');

                                        }
                                    })
                                }
                            })
                        } else {
                            res.status(404).send('doc is not find').end();
                        }
                    }
                });
                break;
            case 'mod':
                custom_evaluation_table.find({},(err,docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('database is error').end();
                    } else {
                        let actItem;
                        docs.forEach((item) => {
                            if (item._id = req.query.id) {
                                actItem = item;
                            }
                        })
                        res.render('admin/custom.ejs', {evaluations: docs, mod_data: actItem});
                    }
                });
                break;
            default:
                custom_evaluation_table.find({},(err, docs) => {
                    if(err) {
                        console.log(err);
                        res.send(err).send('database is error').end();
                    } else {
                        res.render('admin/custom.ejs', {evaluations: docs});
                    }
                })
        }
    });
    router.post('/',(req, res) => {
        "use strict";
        var title = req.body.title;
        var description = req.body.description;
        console.log(req.files);
        if (req.files[0]) {
            var ext = pathLib.parse(req.files[0].originalname).ext;
            var oldPath = req.files[0].path;
            var newPath = req.files[0].path + ext;
            var newFileName = req.files[0].filename + ext;
        } else {
            var newFileName = null;
        }
        if (newFileName) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('file opration error').end();
                } else {
                    if (req.body.mod_id) {
                        //修改
                        custom_evaluation_table.findOne({_id: req.body.mod_id},(err, doc) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('file opration error').end();
                            } else {
                                //删除之前的图片
                                fs.unlink('static/upload/'+doc.src, (err) => {
                                    if (err) {
                                        console.error(err);
                                        res.status(500).send('file opration error').end();
                                    } else {
                                        doc.title = title ;
                                        doc.description = description;
                                        doc.src = newFileName;
                                        doc.save((err) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(500).send('file opration error').end();
                                            } else {
                                                res.redirect('/admin/custom');
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        //添加
                        new custom_evaluation_table({
                            title: title,
                            description: description,
                            src: newFileName
                        }).save((err) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('database error').end();
                            } else {
                                res.redirect('/admin/custom');
                            }
                        })
                    }
                }
            })
        }
        if (req.body.mod_id) {

        } else {

        };
    })
    return router;
}