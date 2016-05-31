var express = require('express');
var router = express.Router();
var _ = require('underscore');

var appstore = require('../ddashi.com_api');
var async = require('async');
var db = require('../db');


router.get('/spider/addtask', function (req, res, next) {
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

                //先添加队列再执行
                var urls = appstore.get_crawl_urls(result.all_keywords);
                _.each(urls, db.add_spider_queue)

                res.render('spider', {msg:'已添加任务'});
            }
        );

    }
);


router.get('/spider/run', function (req, res, next) {
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


                //运行队列
                db.get_spider_queue(function (spider_queue) {
                    appstore.run_queue(result.all_apps, spider_queue, db.save_aso_log);
                });


                //appstore.crawl_app_keywords_rank(result.all_apps, result.all_keywords, db.save_aso_log);

                res.render('spider', {msg:'已发起抓取队列'});
            }
        );

    }
);


module.exports = router;
