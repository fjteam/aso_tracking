/**
 * Created by tony on 16/5/17.
 */

var _ = require('underscore');
var request = require('request');
var async = require('async');
var moment = require('moment')


var appstore_api = {};


appstore_api.crawl_app_keywords_rank = function (app_list, keywords_list, save_cb) {
    var api_url = 'https://47.90.8.83/search?term=%keywords%&country=cn&entity=software&lang=zh_cn&limit=200';

    var _ret = [];

    async.mapLimit(keywords_list, 10, function (keyword_obj, cb) {

        var url = api_url.replace('%keywords%', "%22" + encodeURIComponent(keyword_obj.keyword) +"%22");

        console.log('开始请求: ' + url)
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var data = JSON.parse(body);

                data.results.forEach(function (v, i) {
                    var tmp_app = _.findWhere(app_list, {appid: v.trackId});
                    if (_.isObject(tmp_app)) {
                        save_cb({
                            keyword: keyword_obj.keyword,
                            appid: tmp_app.appid,
                            rank: i + 1,
                            updated: Date.now(),
                            date: moment().format('Y-M-D')
                        });
                    }
                });
            }

            cb();
        })

    }, function (err, result) {
        console.log('完成所有请求')

    });


};

module.exports = appstore_api;