
# 关于aso_tracking

用nodejs（express）去抓取跟踪app在appstore的关键词排名

* 可添加多个app
* 可设置关键词
* 支持图表曲线显示


### 启动脚本:

* `npm start`

或者使用 pm2模块来启动

*   `pm2 ./pm2_startup.json`


### 定时抓取需要设置

`crontab -e`

    # m h  dom mon dow   command


    #添加抓取任务,每天2次
    * 8,19 * * *  curl http://localhost:3000/spider/addtask

    #每15分钟跑抓取队列
     */15 * * * *  curl http://localhost:3000/spider/run


