/**
 * Created by Administrator on 2017/3/16 0016.
 */
var express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

//登录页面
router.get('/', function (req, res) {
    //console.log(req.cookies);
   res.render('login');//渲染到login.ejs页面
});
router.post('/', function (req, res) {
    var sqlOptStr = 'SELECT * FROM `user` WHERE username = ?',
        user = req.body['userName'],
        pass = req.body['pass'];

        var md5 = crypto.createHash('md5');//指定编码

    sql(sqlOptStr, [user], function (err, data) {
        //console.log(data);
        if(data.length == 0){ //查询结果不存在即该用户名未被注册
            res.json({result: 0});
        }else{  //存在相同的用户名

            var newpass = md5.update(pass).digest('hex');

            if( data[0]['pass'] == newpass ){
                res.cookie('login', {name: user}, {maxAge: 1000*60*60*24}); //设置cookie

                //session 所有后台页面都是可用访问到得
                //保存在服务器上的
                //当关闭页面 session都会清空
                req.session.admin = Number(data[0]['admin']); //Number 将字符串转换为数字
                //console.log('管理员'+ req.session.admin);

                res.json({result: 2}); //成功登陆
            }else{
                res.json({result: 1});// 密码不对
            }
        }
    })
});
router.use(function(req,res){
    res.status(404).render('404');
})

//导出模块
module.exports = router;

