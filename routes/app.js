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
            }

        },

        function (err, result) {
            var tpl_data = result

            // console.log(tpl_data.aso_log);

            tpl_data.title = "ASO监控";

            /**
             * 折线图数据
             */
            tpl_data.date_list = _.union(_.map(tpl_data.aso_log, function (obj) {
                return moment(obj.updated).format('Y-M-D H:00')
            }));

            tpl_data.date_list_date = _.union(_.map(tpl_data.aso_log, function (obj) {
                return moment(obj.updated).format('Y-M-D')
            }));

            tpl_data.date_list_json = JSON.stringify(tpl_data.date_list);


            tpl_data.chart_data = _.map(tpl_data.keyword_list, function (keyword_obj) {
                var tmp = {};
                tmp.name = keyword_obj.keyword;

                //日期数据（默认:小时）
                tmp.data = _.map(tpl_data.date_list, function (date) {

                    var found_rank = _.find(tpl_data.aso_log.reverse(), function (aso_obj) {
                        return ((aso_obj.keyword == keyword_obj.keyword) && moment(new Date(date)).format('Y-M-D H:00') == moment(new Date(aso_obj.updated)).format('Y-M-D H:00'));
                    });

                    return found_rank ? found_rank.rank : null;
                });

                //日期数据(日)
                tmp.data_date = _.map(tpl_data.date_list_date, function (date) {

                    var found_rank = _.find(tpl_data.aso_log.reverse(), function (aso_obj) {
                        return ((aso_obj.keyword == keyword_obj.keyword) && moment(new Date(date)).format('Y-M-D') == moment(new Date(aso_obj.updated)).format('Y-M-D'));
                    });

                    return found_rank ? found_rank.rank : null;
                });


                return tmp;
            });

            //排序一下
            tpl_data.chart_data= _.sortBy(tpl_data.chart_data, function(obj)
            {
                return obj.data[obj.data.length-1];
            });


            tpl_data.chart_data_json = JSON.stringify(tpl_data.chart_data);


            

            //最后更新时间
            if (!_.isEmpty(tpl_data.aso_log)) {
                tpl_data.aso_log_last_update_time = moment(tpl_data.aso_log[tpl_data.aso_log.length - 1].updated).format('Y-M-D H:mm');
            }


            res.render('app', tpl_data);

        }
    );


});


module.exports = router;
