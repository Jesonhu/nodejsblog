/**
 * Created by Administrator on 2017/3/23 0023.
 */
const sql = require('./module/mysql');

/*sql('SELECT * FROM `nav` WHERE leve = 1', function (err, data) {
    //console.log(data);
    for(let i in data){ //
        sql('SELECT * FROM `nav` WHERE leve = 2 and navid = ?',[data[i]['navid']], function (err, data) {
            console.log(data);
        });
    }
});*/

/*sql('SELECT * FROM `nav` WHERE leve = 1', function (err, onedata) {
    //console.log(data);
    for(let i in onedata){ //把每个导航下面的二级导航查询出来
        sql('SELECT * FROM `nav` WHERE leve = 2 and navid = ?',[onedata[i]['navid']], function (err, towdata) {
            onedata[i].child = towdata;
            //console.log(data);
            console.log(onedata);
        });
    }
});*/


//异步控制展示
/*let fn = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            console.log(1);
        },1000)
    })
};

fn().then(function () {
    console.log(2)
})*/

/*let fn = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            console.log(1);
            resolve(); //成功 添加后
        },1000)
    })
};

fn().then(function () {
    console.log(2) //成功添加后才打印
})*/

/*let fn = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            console.log(1);
            resolve(); //成功 添加后
        },1000)
    })
};

fn().then(function () {
    setTimeout(function () {
        console.log(2) //成功添加后才打印
    },1000)

}).then(function () {
   console.log(3);
});*/

/*sql('SELECT * FROM `nav` WHERE leve = 1', function (err, onedata) {
    //console.log(data);
    for(let i in onedata){ //把每个导航下面的二级导航查询出来
        sql('SELECT * FROM `nav` WHERE leve = 2 and navid = ?',[onedata[i]['navid']], function (err, towdata) {
            onedata[i].child = towdata;
            //console.log(data);
            console.log(onedata);
        });
    }
    res.render('模板'); //for循环完后才显示模板--问题
});*/

//改写
//数据查询时间大于 res.render()时间 这里采用promise解决方法
let fn = function () {
    return  new Promise(function (resolve, reject) {
        sql('SELECT * FROM `nav` WHERE leve = 2 and navid = ?',[onedata[i]['navid']], function (err, towdata) {
            onedata[i].child = towdata;
            //console.log(data);
            //console.log(onedata);
            resolve();
        });
    })
}
sql('SELECT * FROM `nav` WHERE leve = 1', function (err, onedata) {
    let arr = [];
    for(let i in onedata){ //把每个导航下面的二级导航查询出来
        arr[i] = fn(onedata, i); //i传递过去
        console.log(arr);
    }
    Promise.all(arr).then(function () {
        //res.render('模板'); //问题解决
    });

    //res.render('模板'); //for循环完后才显示模板--问题
});

