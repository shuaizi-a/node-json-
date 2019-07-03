// 加载文件模块
var fs = require('fs')

var dbpath = './db.json'

// 获取数据 封装api
exports.find = function(callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        // 报错
        if(err){
            return callback(err)
        }
        // 传输数据
        callback(null,JSON.parse(data).students)
    })
}

/**
 * 根据 id 获取单个信息
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
   
    fs.readFile(dbpath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }

      var students = JSON.parse(data).students
      var ret = students.find(function (item) {
        return item.id === parseInt(id)
      })
      callback(null, ret)
    })
  }

// 添加数据 封装api
exports.save = function(student,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        // 报错
        if(err){
            return callback(err)
        }
        // 获取json数据
        var shuju = JSON.parse(data).students

        //添加id
        student.id = shuju[shuju.length - 1].id + 1

        // 追加数据到json中
        shuju.push(student)

        // 把追加的数据保存到students对象中
        var fileData = JSON.stringify({
            students:shuju
        })

        // 添加数据
        fs.writeFile(dbpath,fileData,function (err) {
            if( err ){
                return callback(err)
            }
            callback(null)
        })
    }) 
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      var students = JSON.parse(data).students
  
      // 注意：这里记得把 id 统一转换为数字类型
      student.id = parseInt(student.id)
      student.gender = parseInt(student.gender)
  
      // 你要修改谁，就需要把谁找出来
      // EcmaScript 6 中的一个数组方法：find
      // 需要接收一个函数作为参数
      // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
      var stu = students.find(function (item) {
        return item.id === student.id
      })
  
      // 这种方式你就写死了，有 100 个难道就写 100 次吗？
      // stu.name = student.name
      // stu.age = student.age
  
      // 遍历拷贝对象
      for (var key in student) {
        stu[key] = student[key]
      }
      
      //   保存数据
      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
        students: students
      })
  
      // 把字符串保存到文件中
      fs.writeFile(dbpath, fileData, function (err) {
        if (err) {
          // 错误就是把错误对象传递给它
          return callback(err)
        }
        // 成功就没错，所以错误对象是 null
        callback(null)
      })
    })
  }

//   删除数据
exports.deleteById = function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        // 报错
        if(err){
            return callback(err)
        }
        //找到数据
        var students = JSON.parse(data).students

        // 找到要删除的数据的下标
        var deleteId = students.findIndex(function(item){
            return item.id === parseInt(id)
        })

        // 删除找到的数据数据下标的数据
        students.splice(deleteId,1)

        //   保存数据
        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
          students: students
        })
      
        // 把字符串保存到文件中
        fs.writeFile(dbpath, fileData, function (err) {
          if (err) {
            // 错误就是把错误对象传递给它
            return callback(err)
          }
          // 成功就没错，所以错误对象是 null
          callback(null)
        })

    })
}