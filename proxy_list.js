/**
 * Created by tony on 16/5/23.
 */

var _ = require('underscore');

var proxy_list = []

//proxy_list.push('http://0.0.0.0:80')
proxy_list.push('http://122.225.107.145:80')
proxy_list.push('http://111.56.13.164:80')
proxy_list.push('http://111.161.126.109:80')
proxy_list.push('http://61.179.110.8:8081')
proxy_list.push('http://123.56.28.108:8888')
proxy_list.push('http://117.177.250.152:86')
proxy_list.push('http://58.252.2.5:8003')
proxy_list.push('http://120.203.7.246:80')
proxy_list.push('http://111.56.32.70:80')
proxy_list.push('http://183.245.147.50:80')
proxy_list.push('http://117.177.250.152:81')
proxy_list.push('http://122.96.59.104:83')
proxy_list.push('http://112.112.70.118:80')
proxy_list.push('http://101.200.182.29:3128')


//随机
proxy_list = _.shuffle(proxy_list);

module.exports = proxy_list;