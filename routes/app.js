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
                return moment(obj.updated).format('M-D H:00')
            }));
            tpl_data.date_list_json = JSON.stringify(tpl_data.date_list);

            tpl_data.chart_data = _.map(tpl_data.keyword_list, function (keyword_obj) {
                var tmp = {};
                tmp.name = keyword_obj.keyword;

                //日期数据
                tmp.data = _.map(tpl_data.date_list, function (date) {

                    var found_rank = _.find(tpl_data.aso_log, function (aso_obj) {
                        return ((aso_obj.keyword == keyword_obj.keyword) && moment(new Date(date)).format('M-D H:00') == moment(new Date(aso_obj.updated)).format('M-D H:00'));
                    });

                    return found_rank ? found_rank.rank : null;
                });


                return tmp;
            });
            tpl_data.chart_data_json = JSON.stringify(tpl_data.chart_data);


            /**
             * 每个词最后的排名
             */
            tpl_data.keyword_list_last_rank = _.groupBy(tpl_data.aso_log, 'keyword');

            tpl_data.keyword_list_last_rank = _.map(tpl_data.keyword_list_last_rank, function (v) {
                return v.pop();
            });
            tpl_data.keyword_list_last_rank = _.sortBy(tpl_data.keyword_list_last_rank, function (v) {
                return v.rank;
            });

            _.map(result.keyword_list,function(v)
            {
                if (!_.find(tpl_data.keyword_list_last_rank,{keyword:v.keyword}))
                {
                    tpl_data.keyword_list_last_rank.push({keyword:v.keyword,rank:'无排名'});
                }
            });

            //最后更新时间
            if (!_.isEmpty(tpl_data.aso_log)) {
                tpl_data.aso_log_last_update_time = moment(tpl_data.aso_log[tpl_data.aso_log.length - 1].updated).format('Y-M-D H:mm');
            }


            res.render('app', tpl_data);

        }
    )
    ;


});


module.exports = router;
