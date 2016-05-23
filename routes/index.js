var express = require('express');
var router = express.Router();
var db = require('../db');


/* GET home page. */
router.get('/', function (req, res, next) {


    db.get_apps(function (data) {
        res.render('index', {title: 'ASO监控', apps: data});
    });

});

module.exports = router;
