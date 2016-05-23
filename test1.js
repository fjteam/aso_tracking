/**
 * Created by tony on 16/5/17.
 */


var _ = require('underscore');
var request = require('request');
var async = require('async');
var moment = require('moment')
var cheerio = require('cheerio');
var fs = require('fs');
var proxy_list = require('./proxy_list')


var url = 'http://m.zuzuche.com/'


var options = {
    url: url,
    headers: {
        'Cache-Control': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Referer': 'http://www.chandashi.com/',
        'Cookie': 'PHPSESSID=ligglj5dg2nt7h6p75m76aj8s1; homepage=1; Hm_lvt_0cb325d7c4fd9303b6185c4f6cf36e36=1463982373; Hm_lpvt_0cb325d7c4fd9303b6185c4f6cf36e36=1463982373; gr_user_id=4ea21246-7bb1-4222-8371-5b14a0a951cb; gr_session_id_bbbf4f3982c24d55=2c7d2c6b-7c92-4995-9221-dd037a249e7f',
    },
    method: 'GET',
    gzip: true,
    jar: true,
    proxy: proxy_list[0]
};

console.log('开始请求: ' + url)
request(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        console.log(body)
    }

    if (error)
    {
        console.log(error);
    }
});