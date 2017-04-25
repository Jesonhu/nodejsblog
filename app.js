/**
 * Created by Administrator on 2017/3/14.
 */
var http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    sql = require('./module/mysql'),
    ws = require('socket.io');


/*//导出模块
module.exports = {
    app: app,
    io: io
};*/

//设置模板相关
app.set('views', __dirname +'/views'); //设置模板目录
app.set('view engine', 'ejs'); //设置模板的类型

//http(post)方式
app.use(bodyParser.json()); //用json格式来接收数据
app.use(bodyParser.urlencoded({extended: true}));//true 可以接收任何类型的数据

//静态资源设置
app.use(express.static(__dirname +'/public')); //设置静态模板目录
app.use('/', express.static(__dirname +'/public'));

//cookie-parser设置
app.use(cookieParser('asfafaf')); //秘钥

app.use(session({secret: 'node'})); //设置秘钥

//全局路由
app.use(function (req, res, next) {
    //console.log(req.id); //获取ip地址
    if(req.cookies['login']){ //判断是否为登录状态-首页内容显示
        res.locals.login = req.cookies.login.name;// 返回res.locals.login的值
        //console.log('用户名：'+ req.cookies.login.name);
    };
    //console.log('管理员'+ req.session.admin);
    // 为登陆状态 并且 管理员状态为undefined的时候进行查询
    if(res.locals.login && req.session.admin == undefined){
        //查看当前用户是否为管理员
        sql('SELECT * FROM user where username = ?', [res.locals.login], function (err, data) {
            //console.log('用户名：'+ res.locals.login);
            //console.log( Number(data[0]['admin']) );
            req.session.admin = Number(data[0]['admin']);
            //console.log('管理员'+ req.session.admin);
            //继续向下 保证查询好再继续
            next();
        })
        //console.log('sy'+ req.session.admin);

    }else{ //当前用户不是管理员
        next();
    }
    /*//继续向下
    next();*/

});

//富文本编辑器
app.use('/ueditor/ue', require('./ue.js'));

//使用路由
app.use('/', require('./router/index.js'));

//创建服务器并使用300接口
let server = http.createServer(app).listen(300);
//
let io = ws(server);

let userList = {},
    usernum = 0;
io.on('connection', function (socket) {
    
    //console.log(socket);
    //io.emit() 发送消息的方法 1.发送的名称 2 内容
    /*io.emit('wulv', {name:'欢迎加入'}); //监听到有连接时立刻发送这个信息
     socket.on('xiexie', function (data) { //服务器监听到xiexie后操作
     console.log(data);
     })*/
    socket.on('msg', function (data) { //接收前端发送过来的聊天内容
        //console.log('ss'+data);
        //把有前台发来的内容广播出去
        io.emit('chat', data); 

    });
    socket.on('login', function (data) { //服务端监听消息名为login的通信 通过回调函数反应给浏览器
        userList[data.userid] = data.name; //给对象userList添加内容
        socket.name = data.name; //保留客户端发来的该用户username
        socket.userid = data.userid; //保留客户端发来的该用户的userid
        usernum++;//登录一个用户+1
        data.num = usernum; //给data添加一个num属性并赋值
        //console.log(usernum);
        io.emit('login',{data:data, userList:userList}); //把加入聊天室的人广播出去
    });
    // disconnect 退出触发的事件
    socket.on('disconnect', function(){
        delete userList[socket.userid];//删除退出的用户
        usernum--;
        console.log(usernum);
        io.emit('logout',{name:socket.name, num:usernum, userList:userList});
    });
})
//便利提示
console.log('Server running on 127.0.0.1:300');
