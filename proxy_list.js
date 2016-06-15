/**
 * Created by tony on 16/5/23.
 */

var _ = require('underscore');

var proxy_list = []

//proxy_list.push('http://0.0.0.0:80')
proxy_list.push('http://122.225.107.145:80')
proxy_list.push('http://123.157.233.138:8003')
proxy_list.push('http://120.55.160.110:8088')
proxy_list.push('http://183.245.147.37:80')
proxy_list.push('http://163.177.159.144:81')
proxy_list.push('http://106.75.128.87:80')



//随机
proxy_list = _.shuffle(proxy_list);

module.exports = proxy_list;