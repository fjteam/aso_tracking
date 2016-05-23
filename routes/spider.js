var express = require('express');
var router = express.Router();
var _ = require('underscore');

var appstore = require('../ddashi.com_api');
var async = require('async');
var db = require('../db');


router.get('/spider', function (req, res, next) {
        async.series(
            {
                all_keywords: function (cb) {
                    db.get_all_keywords(function (data) {
                        cb(null, data);
                    });
                },
                all_apps: function (cb) {
                    db.get_apps(function (data) {
                        cb(null, data);
                    });

                }
            },
            function (err, result) {
                appstore.crawl_app_keywords_rank(result.all_apps, result.all_keywords, db.save_aso_log);

                res.render('spider', {});
            }
        );

    }
);


module.exports = router;
