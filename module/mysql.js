/**
 * Created by Administrator on 2017/3/14.
 */
var mysql = require('mysql');

//创建这个mysql模块并暴露出去
module.exports = function(handlerStr, value, callback){
    //设置数据库连接信息
    var config = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'mynode'
    });

    //创建数据库连接
    config.connect();

    //数据库操作
    /*config.query('SELECT * FROM user', function(err, data){ //数据库静态操作
        console.log(data);
    });*/
    config.query(handlerStr, value, function (err, data) {
        callback && callback(err, data); //回调函数优化
    });

    //终止数据库连接
    config.end();
}