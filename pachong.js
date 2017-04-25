/**
 * Created by Administrator on 2017/3/31 0031.
 */
const http = require('http'),
      fs = require('fs'),
      https = require('https');

//向外发起http(get)请求
/*http.get('http://nodejs.cn', function (res) {
    let html = '';
    //监听 有数据时触发
    res.on('data', function (data) {
        html += data; //数据赋值到html里
    });
    //请求完成的时候
    res.on('end', function () {
        console.log(html); //请求完成打印html
    })
});*/

/*const  options = {
    hostname: 'www.cnblogs.com', //请求的域名
    path: '/', //nodejs.cn/api/
    port: '80',
    /!*headers: {
        'Content-Length': 'utf-8'
    }*!/
};
http.get(options, function (res) {
    let html = '';
    //监听 有数据时触发
    res.on('data', function (data) {
        html += data; //数据赋值到html里
    });
    //请求完成的时候
    res.on('end', function () {
        console.log(html); //请求完成打印html
    })
});*/

/*const  options = {
    hostname: 'www.zhihu.com', //请求的域名
    path: '/', //nodejs.cn/api/
    port: '443',
    /!*headers: {
     'Content-Length': 'utf-8'
     }*!/
};*/
/*https.get('https://lendgiant.cn', function (res) {
    let html = '';
    //监听 有数据时触发
    res.on('data', function (data) {
        html += data; //数据赋值到html里
    });
    //请求完成的时候
    res.on('end', function () {
        console.log(html); //请求完成打印html
    })
});*/

//请求图片
https.get('https://lendgiant.cn/plat/pcindex/images/banner.png', function (res) {
    //设置请求图片为二进制数据
    res.setEncoding('binary');
    let img = '';
    //监听 有数据时触发
    res.on('data', function (data) {
        img += data; //数据赋值到html里
    });
    //请求完成的时候
    res.on('end', function () {
        //console.log(html); //请求完成打印html
        fs.writeFile('./1.png', img, 'binary'); //保存二进制数据
    })
})
