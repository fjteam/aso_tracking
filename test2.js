var async = require('async');


var arr=[1,2,3]

async.mapLimit(arr,2,function(obj,cb)
{
    console.log(obj)

    arr.push(obj);
    cb()
})