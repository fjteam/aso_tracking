
# 关于aso_tracking

用nodejs（express）实现抓去跟踪app在appstore的关键词排名

* 可添加多个app
* 可设置关键词
* 支持图表曲线显示


### 启动脚本:

`npm start`


### 定时抓取需要设置
建议每两小时一次

`crontab -e`

    # m h  dom mon dow   command

    30 */2 * * *  curl http://localhost:3000/spider/


