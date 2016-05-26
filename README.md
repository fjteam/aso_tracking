
# 关于aso_tracking

用nodejs（express）实现抓去跟踪app在appstore的关键词排名

* 可添加多个app
* 可设置关键词
* 支持图表曲线显示


### 启动脚本:

* `npm start`

或者使用 pm2模块来启动

*   `pm2 ./pm2_startup.json`


### 定时抓取需要设置
建议每15分钟跑一次抓队列 (1小时内同一个url不重复抓)

`crontab -e`

    # m h  dom mon dow   command

    */15 * * * *  curl http://localhost:3000/spider/


