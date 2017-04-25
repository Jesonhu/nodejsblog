/**
 * Created by Administrator on 2017/3/17 0017.
 */
var express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    fs = require('fs'),
    upload = require('../module/multer');




// post get 任何形式的访问都会走
router.use(function (req, res, next) {
    if(req.session.admin){ //当前是管理员时
        next();
    }else{
        res.send('请用管理员账号登录');
    }
});

router.get('/', function (req, res) {
    res.render('admin/admin'); //注意admin文件夹
});

//用户管理  地址/admin/user
router.get('/user', function (req, res) {
    sql('SELECT * FROM `user`', function (err, data) {
        res.render('admin/user', {data: data});
    });
});

//用户删除 form name="id" 传递id
router.post('/user', function (req, res) {
    //console.log(req.body);
    var id = req.body.id;
    sql('DELETE FROM user WHERE id = ?', [id], function (err, data) {
        if(err){
            res.json({result:0});
        }else{
            res.json({result:1});
        }
    });
});

//用户修改
router.get('/user/updateuser', function (req, res) {
    //console.log('需要修改的id为：'+ req.query.id); // ?id=123 req.query 可以显示 id:123
    sql('SELECT * FROM user where id = ?', [req.query.id], function(err, data){
        res.render('admin/updateuser',{data:data})
    });
});
router.post('/user/updateuser', function (req, res) {
    var id = req.body.id,
        oldUserName = req.body.oldUserName,
        oldAdmin = req.body.oldAdmin,
        newUserName = req.body.newUserName,
        newAdmin = req.body.newAdmin;
    //console.log('获取id: '+ id);
    //console.log(parseInt(newUserName) +','+ parseInt(newAdmin));
    //当用户名为空  '' parseInt(newUserName)位NaN
    if( newUserName ){ // 用户名不为空-用户名要修改
        var sqlOptStr = 'update `user` set `username`=? , `admin`=?  where `id`= ?';
        if( parseInt(newAdmin) == 0 || newAdmin){  // '0'或'1' --用户名和管理员都要修改
            sql(sqlOptStr, [newUserName, newAdmin, id], function (err, data) {
                res.json({result: 1});
                if(err){
                    res.send('更新失败')
                }
            })
        }else{ //管理员未输入 即 "" --只修改管理员
            var sqlOptStr1 = 'update `user` set `username`=? where `id`='+id;
            sql(sqlOptStr1, [newUserName], function (err, data) {
                res.json({result: 1})
            })
        }
    }else if(parseInt(newAdmin) == 0 || newAdmin ){ //用户名为空且输入的为 '0' 或 '1'--只修改管理员
        var sqlOptStr2 = 'update `user` set `admin`=? where `id`='+id;
        sql(sqlOptStr2, [newAdmin], function (err, data) {
            res.json({result: 1})
        })
    }

    //res.redirect('admin/user'); //重新定位
});

//文章发布
// 显示文章发布页面/admin/article
router.get('/article', function (req, res) {
   res.render('admin/article')
});
//文章发布提交
router.post('/article', upload.fields([{name: 'cover',maxCount:4},{name:'avatar',maxCount:8}]), function (req, res) {
    var title = req.body.title,  //文章标题
        tag = req.body.tag,   //文章标签
        author = req.body.author, //文章作者
        content = req.body.artcon, //文章内容
        summary = req.body.summary, 文章摘要
        typenum = req.body.typenum,  //文章类型
        avatar = '/img/'+req.files['avatar'][0]['filename'], //作者头像
        cover = '/img/'+req.files['cover'][0]['filename'], //文章封面
        pubTime = new Date().toLocaleString().substring(0,10), //发布时间
        sqlOptStr = 'INSERT INTO `article` (`id`, `title`, `tag`,`author`, `avatar`,`class`,`typename`, summary, `cover`, `content`, `time`) VALUES (0,?,?,?,?,?,?,?,?,?,?)';
    var typename; //文章名称
        //img = '/img/' + req.files.filename; //多个文件 单个 req.file
        //文章名称设置
        switch (parseInt(typenum)){
            case 1:
                typename = 'html';
                break;
            case 2:
                typename = 'css';
                break;
            case 3:
                typename = 'html5';
                break;
            case 4:
                typename = 'css3';
                break;
            case 5:
                typename = 'js';
                break;
            case 6:
                typename = 'jquery';
                break;
            case 7:
                typename = 'angularjs';
                break;
            case 8:
                typename = 'nodejs';
        };
        sql(sqlOptStr, [title, tag, author, avatar, typenum, typename, summary,cover, content, pubTime], function (err, data) {
            if(err){
                res.locals.result = '发布失败';
                res.render('admin/article');
            }else{
                res.locals.result = '发布成功';
                res.render('admin/article');
            }
        });
})
//文章列表显示文章
router.get('/article_list/:page.html', function (req, res) {
    let page = req.params.page,
        sqlOptStr1 = 'SELECT * FROM `article`',
        sqlOptStr2 = 'SELECT * FROM `article` order by id desc limit ?,?';
    sql(sqlOptStr1, function (err, data1) {
        sql(sqlOptStr2,[(page-1)*5,page*5], function (err, data) {
            res.locals.all = data1.length;
            res.render('admin/article_list', {data:data});
        });
    })
});
//文章修改 http://127.0.0.1:300/admin/article/updatearticle?id=31
router.get('/article/updatearticle/:id', function (req, res) {
    let id = req.params.id,
        sqlOptStr = 'SELECT * FROM `article` where id = ?';
    sql(sqlOptStr, [id], function (err, data) {
        res.render('admin/updatearticle',{data:data});
    })

})
router.post('/updatearticle', function (req, res) {
    var id = req.body.id,
        title = req.body.title,  //文章标题
        tag = req.body.tag,   //文章标签
        content = req.body.artcon, //文章内容
        summary = req.body.summary, 文章摘要
    typenum = req.body.typenum,  //文章类型
        sqlOptStr = 'update `article` set `title`=?,`tag`=?,`class`=?,`typename`=?,`content`=?,`summary`=?  where `id`=?';
    var typename; //文章名称
    switch (parseInt(typenum)){
        case 1:
            typename = 'html';
            break;
        case 2:
            typename = 'css';
            break;
        case 3:
            typename = 'html5';
            break;
        case 4:
            typename = 'css3';
            break;
        case 5:
            typename = 'js';
            break;
        case 6:
            typename = 'jquery';
            break;
        case 7:
            typename = 'angularjs';
            break;
        case 8:
            typename = 'nodejs';
    };
    sql(sqlOptStr,[title,tag,typenum,typename,content,summary,id], function (err, data) {
        if(err){
            res.json({
                result : '修改失败'
            })
        }else{
            res.json({
                result : '修改成功'
            })
        }
    });
});
//删除文章
router.post('/article/delete', function (req, res) {
    let id = req.body.id;
    sql('DELETE FROM article WHERE id = ?', [id], function (err, data) {
        if(err){
            res.json({result:0});
        }else{
            res.json({result:1});
        }
    });
});

//单文件上传及重命名
/*router.post('/article', upload.single('cover'), function (req, res) {
    //res.json({result:req.upload});
});*/

//多文件上传重命名
/*router.post('/articles', upload.array('cover'), function (req, res) {
    res.json({result:'ok'});
});*/

//多上传框上传多文件及重命名
/*router.post('/articles', upload.fields([{name: 'cover',maxCount:4},{name:'avatar',maxCount:8}]), function (req, res) {
    //console.log(req.upload); //上传失败
    res.json({result:'ok'});
});*/


//banner1路由
router.get('/banner1', function (req, res) {
    let sqlOptStr = 'SELECT * FROM `banner` WHERE type = 1 order by name asc limit 4';
    sql(sqlOptStr, function (err, data) {
        res.render('admin/banner1', {data:data});
    });
})
router.post('/banner1', upload.single('url'), function (req, res) {
    let sqlOptStr1 = 'INSERT INTO `banner` (`id`, `type`, `name` , `url`) VALUES (0,1,?,?)',
        sqlOptStr2 = 'update `banner` set `url`=?,`name`=? where `type`= 01',
        url = '/img/'+req.file.filename,
        name = req.body.name;
    switch(Number(name)){
        case 1:
            let sqlOptStr01 = 'update `banner` set `url`=? where `name`=01 and `type`= 1';
            sql(sqlOptStr01, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 2:
            let sqlOptStr02 = 'update `banner` set `url`=? where `name`=02 and `type`= 1';
            sql(sqlOptStr02, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 3:
            let sqlOptStr03 = 'update `banner` set `url`=? where `name`=03 and `type`= 1';
            sql(sqlOptStr03, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 4:
            let sqlOptStr04 = 'update `banner` set `url`=? where `name`=04 and `type`= 1';
            sql(sqlOptStr04, [url], function () {
                res.json({result:'修改成功'});
            });
    };

});
//banner2路由
router.get('/banner2', function (req, res) {
    let sqlOptStr = 'SELECT * FROM `banner` WHERE type = 2 order by name asc limit 4';
    sql(sqlOptStr, function (err, data) {
        res.render('admin/banner2', {data:data});
    });
})
router.post('/banner2', upload.single('url'), function (req, res) {
    let sqlOptStr1 = 'INSERT INTO `banner` (`id`, `type`, `name` , `url`) VALUES (0,2,?,?)',
        sqlOptStr2 = 'update `banner` set `url`=? where `name`=? `type`= 2',
        url = '/img/'+req.file.filename,
        name = req.body.name;
    switch(Number(name)){
        case 1:
            let sqlOptStr01 = 'update `banner` set `url`=? where `name`=01 and `type`= 2';
            sql(sqlOptStr01, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 2:
            let sqlOptStr02 = 'update `banner` set `url`=? where `name`=02 and `type`= 2';
            sql(sqlOptStr02, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 3:
            let sqlOptStr03 = 'update `banner` set `url`=? where `name`=03 and `type`= 2';
            sql(sqlOptStr03, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 4:
            let sqlOptStr04 = 'update `banner` set `url`=? where `name`=04 and `type`= 2';
            sql(sqlOptStr04, [url], function () {
                res.json({result:'修改成功'});
            });
    };
});
//banner3路由
router.get('/banner3', function (req, res) {
    let sqlOptStr = 'SELECT * FROM `banner` WHERE type = 3 order by name asc limit 4';
     sql(sqlOptStr, function (err, data) {
        res.render('admin/banner3', {data:data});
     });
})
router.post('/banner3', upload.single('url'), function (req, res) {
    let sqlOptStr1 = 'INSERT INTO `banner` (`id`, `type`, `name` , `url`) VALUES (0,3,?,?)',
        sqlOptStr2 = 'update `banner` set `url`=? where `name`=? `type`= 3',
        url = '/img/'+req.file.filename,
        name = req.body.name;
    switch(Number(name)){
        case 1:
            let sqlOptStr01 = 'update `banner` set `url`=? where `name`=01 and `type`= 3';
            sql(sqlOptStr01, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 2:
            let sqlOptStr02 = 'update `banner` set `url`=? where `name`=02 and `type`= 3';
            sql(sqlOptStr02, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 3:
            let sqlOptStr03 = 'update `banner` set `url`=? where `name`=03 and `type`= 3';
            sql(sqlOptStr03, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 4:
            let sqlOptStr04 = 'update `banner` set `url`=? where `name`=04 and `type`= 3';
            sql(sqlOptStr04, [url], function () {
                res.json({result:'修改成功'});
            });
    };
});
//banner4路由
router.get('/banner4', function (req, res) {
    let sqlOptStr = 'SELECT * FROM `banner` WHERE type = 4 order by name asc limit 4';
     sql(sqlOptStr, function (err, data) {
        res.render('admin/banner4', {data:data});
     });
})
router.post('/banner4/', upload.single('url'), function (req, res) {
    let sqlOptStr1 = 'INSERT INTO `banner` (`id`, `type`, `name` , `url`) VALUES (0,4,?,?)',
        sqlOptStr2 = 'update `banner` set `url`=? where `name`=? `type`= 4',
        url = '/img/'+req.file.filename,
        name = req.body.name;
    switch(Number(name)){
        case 1:
            let sqlOptStr01 = 'update `banner` set `url`=? where `name`=01 and `type`= 4';
            sql(sqlOptStr01, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 2:
            let sqlOptStr02 = 'update `banner` set `url`=? where `name`=02 and `type`= 4';
            sql(sqlOptStr02, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 3:
            let sqlOptStr03 = 'update `banner` set `url`=? where `name`=03 and `type`= 4';
            sql(sqlOptStr03, [url], function () {
                res.json({result:'修改成功'});
            });
            break;
        case 4:
            let sqlOptStr04 = 'update `banner` set `url`=? where `name`=04 and `type`= 4';
            sql(sqlOptStr04, [url], function () {
                res.json({result:'修改成功'});
            });
    };

});


//后台模板管理
router.get('/views', function (req, res) {
    let dir = fs.readdirSync(`${process.cwd()}/views`); //读取views文件夹里的文件
    res.render('views', {dir:dir})
});
router.post('/views', function (req, res) {
    let dirtype = req.body.dirtype,
        content = req.body.content,
        dirname = req.body.dirname;

    if(dirtype === '1'){ //模板页面 data-type="1" --说明就是文件这读取这个文件
        fs.readFile(`${process.cwd()}/views/${dirname}`,'utf-8', function (err, data) {
            res.json({
                dirname: dirname,
                content: data,
            })
        })
        return;
    }
    if(dirtype === '2'){ //模板页面 data-type="2" --说明是文件夹读取这个文件夹里面的文件
        fs.readdir(`${process.cwd()}/views/${dirname}`, function (err, data) {
            res.json({
                dirtype: '2',
                dirname: dirname,
                content: data
            })
        });
        return;
    }
    if(dirtype === '3'){ //修改这个文件
        fs.writeFile(`${process.cwd()}/views/${dirname}`,content, function (err, data) {
            res.json({
                result: '成功'
            })
        });
    }

    //在后台把所有的一起读取出来，返回给前台
    let dir = fs.readdirSync(`${process.cwd()}/views`);
    for(let i in dir){
        dir[i].includes('.')  //读取文件
    }
});
router.use(function(req,res){
    res.status(404).render('404');
})

//导出模块
module.exports = router;
