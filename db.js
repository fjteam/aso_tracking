/**
 * Created by tony on 16/5/18.
 */



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aso_tracking');
var async = require('async');
var _ = require('underscore');


var AppSchema = new mongoose.Schema({
    appid: Number,
    name: String
});
AppSchema.index({appid: 1});


var KeywordSchema = new mongoose.Schema({
    appid: Number,
    keyword: String
});
KeywordSchema.index({appid: 1, keyword: 1});

var AsoRankSchema = new mongoose.Schema({
    appid: Number,
    keyword: String,
    rank: Number,
    date: String,
    updated: Date,
});
AsoRankSchema.index({appid: 1, keyword: 1},{"unique":true,"dropDups":true});


//数据对象
var AppModel = mongoose.model('app', AppSchema);
var KeywordModel = mongoose.model('keyword', KeywordSchema);
var AsoRankModel = mongoose.model('aso_rank', AsoRankSchema);


db_obj = {}

db_obj.get_apps = function (cb) {
    AppModel.find(function (err, data) {
        cb(data)
    });
}

db_obj.add_app = function (appinfo) {
    var new_app = new AppModel(appinfo);
    new_app.save();

    return new_app._id;
}

db_obj.del_app = function (appid) {
    AppModel.remove({appid: appid}, function (err) {
        if (err) return handleError(err);
        // removed!
    });
}


db_obj.get_app_info = function (appid, cb) {
    AppModel.findOne({appid: appid}).exec(function (err, data) {
        cb(data)
    });
}

db_obj.get_app_keywords = function (appid, cb) {
    KeywordModel.find({appid: appid}).exec(function (err, data) {
        cb(data)
    });

}

db_obj.get_all_keywords = function (cb) {
    KeywordModel.find().exec(function (err, data) {
        cb(data)
    });
}

db_obj.add_keyword = function (appid, keyword) {
    var new_obj = new KeywordModel({appid: appid, keyword: keyword});
    new_obj.save();

    console.log('添加关键词' + appid + ' ' + keyword);

    return new_obj._id;
}

db_obj.del_keyword = function (appid, keyword) {
    KeywordModel.remove({appid: appid, keyword: keyword}, function (err) {
        if (err) return handleError(err);
        // removed!
    });
}

db_obj.get_app_aso_rank_log = function (appid, cb) {
    AsoRankModel.find({appid: appid}).sort({updated: 1}).exec(function (err, data) {
        cb(data)
    });
}

db_obj.get_app_keyword_aso_rank_log = function (appid, keyword, cb) {
    AsoRankModel.find({appid: appid, keyword: keyword}).exec(function (err, data) {
        cb(data)
    });
}


db_obj.save_aso_log = function (logs) {
    if (!_.isArray(logs)) {
        logs = [logs]
    }

    logs.forEach(function (v, i) {
        console.log('---准备保存aso_log----')
        console.log(v)
        var new_rank = new AsoRankModel(v);

        new_rank.save();
    });
}


module.exports = db_obj;