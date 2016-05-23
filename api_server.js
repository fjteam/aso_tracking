var hprose = require('hprose');
var _ = require('underscore');

var appstore = require('./appstore_api');
var async = require('async');
var db = require('./db');


function add_app(appid, name) {
    return db.add_app({appid: appid, name: name});
}

function del_app(appid) {
    return db.del_app(appid);
}


function add_keywords(appid, keywords) {

    //支持逗号分割
    var keywords_list = keywords.split(/[,，\s]/);

    async.mapLimit(keywords_list, 1, function (kw, cb) {
        kw = kw.replace(/(^\s+)|(\s+$)/g, '');
        if (/.+/.test(kw) == true) {
            db.add_keyword(appid, kw)
        }
        cb();
    });
}

function del_keyword(appid, keyword) {
    return db.del_keyword(appid, keyword);
}


var server = hprose.Server.create("http://0.0.0.0:2999");
server.addFunction(add_app);
server.addFunction(del_app);
server.addFunction(add_keywords);
server.addFunction(del_keyword);


server.start();