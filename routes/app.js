var express = require('express');
var router = express.Router();
var _ = require('underscore');
var async = require('async');
var moment = require('moment')
var db = require('../db');


router.get('/app/:appid', function (req, res, next) {

    var tpl_data = {};

    var appid = req.params.appid * 1;


    async.parallel(
        {
            appinfo: function (cb) {
                db.get_app_info(appid, function (data) {
                    cb(null, data);
                });
            },
            keyword_list: function (cb) {
                db.get_app_keywords(appid, function (data) {
                    cb(null, data);
                });

            },
            aso_log: function (cb) {
                db.get_app_aso_rank_log(appid, function (data) {
                    cb(null, data);
                })
            },

            app_log_distinct_dt: function (cb) {
                db.get_app_aso_rank_log_distinct_dt(appid, function (data) {
                    cb(null, data);
                })
            },

            app_log_distinct_date: function (cb) {
                db.get_app_aso_rank_log_distinct_date(appid, function (data) {
                    cb(null, data);
                })
            }

        },

        function (err, result) {
            var tpl_data = result

            // console.log(tpl_data.aso_log);

            tpl_data.title = "ASO监控";

            /**
             * 折线图数据
             */
            tpl_data.dt_list = result.app_log_distinct_dt;
            tpl_data.dt_list_json = JSON.stringify(tpl_data.dt_list);


            tpl_data.date_list = result.app_log_distinct_date;
            tpl_data.date_list_date_json = JSON.stringify(tpl_data.dt_list);

            tpl_data.chart_data = [];
            tpl_data.chart_data_date = [];


            async.map(tpl_data.keyword_list, function (keyword_obj, cb) {
                    var tmp = {};
                    tmp.name = keyword_obj.keyword;

                    async.mapLimit(tpl_data.dt_list, 5, function (dt, cb) {
                            db.get_app_keyword_dt_rank(appid, keyword_obj.keyword, dt, function (rank) {
                                cb(null, rank);
                            });


                        },
                        function (err, ranks) {

                            var tmp = {}

                            tmp.name = keyword_obj.keyword;
                            tmp.data = ranks;

                            tpl_data.chart_data.push(tmp);


                            async.mapLimit(tpl_data.date_list, 5, function (date, cb) {
                                    db.get_app_keyword_date_rank(appid, keyword_obj.keyword, date, function (rank) {
                                        cb(null, rank);
                                    });


                                },
                                function (err, ranks) {

                                    var tmp = {}

                                    tmp.name = keyword_obj.keyword;
                                    tmp.data = ranks;

                                    tpl_data.chart_data_date.push(tmp);

                                    cb();
                                });
                        });


                },
                function (err, results) {
                    console.log(tpl_data.chart_data);

                    //排序一下
                    tpl_data.chart_data= _.sortBy(tpl_data.chart_data, function(obj)
                    {
                        return  _.find(obj.data.reverse(),function(v)
                        {
                            if (v!=null) return true;
                        });
                    });

                    //排序一下
                    tpl_data.chart_data_date= _.sortBy(tpl_data.chart_data_date, function(obj)
                    {
                        return  _.find(obj.data.reverse(),function(v)
                        {
                            if (v!=null) return true;
                        });
                    });


                    tpl_data.chart_data_json = JSON.stringify(tpl_data.chart_data);

                    console.log(tpl_data.chart_data_json);
                    //最后更新时间
                    if (!_.isEmpty(tpl_data.dt_list)) {
                        tpl_data.aso_log_last_update_time = _.last(tpl_data.dt_list);
                    }


                    res.render('app', tpl_data);
                });


        }
    );


});


module.exports = router;
