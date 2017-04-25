/**
 * Created by Administrator on 2017/3/30 0030.
 */
//io.on() 监听事件的 connection 打开前端页面的时候
let {io} = require('./app.js');


io.on('connection', function (socket) {
    let userList = {},
        usernum = 0;
    //console.log(socket);
    //io.emit() 发送消息的方法 1.发送的名称 2 内容
    /*io.emit('wulv', {name:'欢迎加入'}); //监听到有连接时立刻发送这个信息
     socket.on('xiexie', function (data) { //服务器监听到xiexie后操作
     console.log(data);
     })*/
    socket.on('msg', function (data) { //接收前端发送过来的聊天内容
        //console.log(data);
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