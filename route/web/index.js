/**
 * Created by chang on 2018/2/6.
 */
const express = require('express');
const Banner = require('../modules/banner');
const Custorm = require('../modules/custom_evaluation');
module.exports = function () {
    let router = express.Router();
    router.get('/get_banners', (req, res) => {
        "use strict";
        Banner.find({}, function (err,data) {
            if (err) {
                console.log(err);
                res.send(500).send('database is error').end();
            } else {
                res.send(data).end();
            }
        })
    });
    router.get('/get_custom_evaluations', (req, res) => {
        "use strict";
        Custorm.find({}, (err,data) => {
            if (err) {
                console.log(err);
                res.status(500).send("database is error").end()
            } else {
                res.send(data).end();
            }
        })
    })
    return router;
}