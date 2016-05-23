
# 关于aso_tracking

用nodejs自动实现跟踪app在appstore的关键词排名

### 启动脚本:

`npm start`


### 定时抓取需要设置
建议每两小时一次

`crontab -e`

    # m h  dom mon dow   command

    30 */12 * * *  curl http://localhost:3000/spider/


