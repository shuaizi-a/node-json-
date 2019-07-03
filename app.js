// 配置Express框架
var express = require('express')
// 加载路由模块
var router = require('./router.js')
//加载解析post插件
var bodyParser = require('body-parser')

var app = express()

//配置获取posts数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 加载模板引擎
app.engine('html', require('express-art-template'));

// 加载静态资源
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

// 挂载路由
app.use(router)

// 路由响应
app.listen(3000,function(){
    console.log('启动成功...')
})
