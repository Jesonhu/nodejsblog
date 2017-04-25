/**
 * Created by Administrator on 2017/3/16 0016.
 */
var express = require('express'),
    sql = require('../module/mysql'),
    router = express.Router(),
    crypto = require('crypto');

//注册页面

router.get('/', function (req, res) {
    res.render('reg'); //渲染到reg.ejs
});

router.post('/', function (req, res) {
    var sqlInsert = 'INSERT INTO `user` (`id`, `username`, `pass`, `admin`) VALUES (0, ?, ?, 0)',
        sqlSelect = 'SELECT * FROM user where username = ?',
        user = req.body.userName,
        pass = req.body.pass;
    sql(sqlSelect, [user], function (err, data) {
        //console.log(data);
        var md5 = crypto.createHash('md5');//指定编码
        //console.log('可以注册111');
        if(data.length == 0){ //未存在与当前数据用户名相同的可以注册
            //最后插入时候加密
            var newpass = md5.update(pass).digest('hex');
            //console.log('可以注册');
            sql(sqlInsert, [user, newpass], function (err, data) {
                if(err){
                    res.locals.result = '<p class="err">注册失败，请重试</p>';
                    return;
                }
                res.locals.result = '<p class="ok">恭喜注册成功</p>';
                res.render('login');
            })
        }else{ //已存在同用户名 不能注册 或直接登录
            //console.log('不能注册')
            res.locals.result = '<p class="err">该用户名已被注册</p>';
            res.render('reg'); //
        }
    });
})

//404
router.use(function(req,res){
    res.status(404).render('404');
})

//暴露这个模块
module.exports = router;
