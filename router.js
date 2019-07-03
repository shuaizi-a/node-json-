// 路由模块========================================================

// 加载文件
var fs = require('fs')
var express = require('express')

var Status = require('./student')

// 配置路由
var router = express.Router()

router.get('/',function(req,res){
    // 调取封装api
    Status.find(function (err,data){
        //  数据判断
        if( err ){
            return res.status(500).send('错误')
        }
        // 模板引擎
        res.render('index.html',{
            fruits: [
                '苹果',
                '香蕉',
                '橘子'
            ],
            students: data
        })
    })
})

// 跳转到添加信息页
router.get('/students/new',function(req,res){
   res.render('new.html')
})
// 获取添加的数据
router.post('/students/new',function(req,res){

    // 添加数据封装api
    Status.save(req.body,function (err) {
        if( err ){
            return res.status(500).send('错误')
        }
        res.redirect('/')
    })

})

/*
 * 根据id渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
    // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    // 
    // 3. 渲染编辑页面
    //    根据 id 把学生信息查出来
    //    使用模板引擎渲染页面
  
    Status.findById(parseInt(req.query.id), function (err, student) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.render('edit.html', {
        shuju: student
      })
    })
})

// 处理编辑页面
router.post('/students/edit',function(req,res){
    
    // 调取更新数据api
    Status.updateById(req.body, function (err) {
        if (err) {
          return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })

})

// 删除数据
router.get('/students/delete',function(req,res){
    
    // 调取更新数据api
    Status.deleteById(req.query.id, function (err) {
        if (err) {
          return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })

})

module.exports = router

