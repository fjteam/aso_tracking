/**
 * Created by tony on 16/5/23.
 */

var _ = require('underscore');

var proxy_list = []

//proxy_list.push('http://0.0.0.0:80')
proxy_list.push('http://120.55.160.110:8088')
proxy_list.push('http://101.81.242.78:8118')
proxy_list.push('http://183.245.147.26:80')
proxy_list.push('http://183.203.22.103:8080')



//随机
proxy_list = _.shuffle(proxy_list);

module.exports = proxy_list;