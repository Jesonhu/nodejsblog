/**
 * Created by Administrator on 2017/3/14.
 */
var express = require('express'),
    sql = require('../module/mysql'),
    router = express.Router();

// http(get)方式 访问 '/'
router.get('/', function(req, res){
   //数据库操作
   //console.log(req.cookies);
   //console.log(req.admin);
   res.locals.admin = req.session.admin;
   //console.log(res.locals.admin);
   let dataOptStr = 'SELECT * FROM article order by id desc limit 20',
       sqlOptStr1 = 'SELECT * FROM banner where type = 1 order by name asc limit 4',
       sqlOptStr2 = 'SELECT * FROM banner where type = 2 order by name asc limit 4',
       sqlOptStr3 = 'SELECT * FROM banner where type = 3 order by name asc limit 4',
       sqlOptStr4 = 'SELECT * FROM banner where type = 4 order by name asc limit 1',
       sqlOptStr5 = 'SELECT * FROM article order by time desc limit 1',
       sqlOptStr6 = 'SELECT * FROM article order by time desc limit 20'
   sql(dataOptStr, function (err, data) { //最新文章显示
      //banner1图片
      sql(sqlOptStr1, function (err, data1) {
         //banner2图片
         sql(sqlOptStr2, function (err, data2) {
            sql(sqlOptStr3, function (err, data3) {
               sql(sqlOptStr4, function (err, data4) {
                  sql(sqlOptStr5, function (err, data5) {
                     let firstTime = data5[0]['time'], //获取最近一次发布文章的时间
                         arcArr = [];
                         arcArr.push(data5[0]); //将最近发布的一次文章添加进去
                     sql(sqlOptStr6, function (err, data6) {
                        for(let i=0;i<data6.length;i++){
                           if(firstTime > data6[i]['time']){ //匹配最近第二个时间段发布的一些文章
                              if(arcArr.length <= 4){ //最新文章只显示4个文章
                                 arcArr.push(data6[i]);
                              }
                           }
                        }
                        res.render('index.ejs', {data:data,data1:data1,data2:data2,data3:data3,data4:data4,data5:arcArr});
                     })
                  })
               })
            })
         })

      })

   });
});


//导航--这里仅仅 /nav 显示--未使用
router.get('/nav', function (req, res) {
   sql('SELECT * FROM `nav` WHERE leve = 1', function (err, onedata) {
      //console.log(data);
      for(let i in onedata){ //把每个导航下面的二级导航查询出来
         // for循环之后再响应模板！！！-- promise 异步控制
         sql('SELECT * FROM `nav` WHERE leve = 2 and navid = ?',[onedata[i]['navid']], function (err, towdata) {
            onedata[i].child = towdata;
            //console.log(data);
            console.log(onedata);
         });
      }
   });
});

//首页文章分类切换
router.post('/indexhtml1', function (req, res) { //处理首页 html ajax（post）请求
   const sqlOptStr = 'SELECT * FROM `article` WHERE class = ?';
   sql(sqlOptStr, [req.body.typeId], function (err, data) {
      res.json({result: data});
      if(err){
         res.json({result: '失败'});
      }
   });
});
router.post('/indexhtml5', function (req, res) { //处理首页 js ajax（post）请求
   const sqlOptStr = 'SELECT * FROM `article` WHERE class = ?';
   sql(sqlOptStr, [req.body.typeId], function (err, data) {
      res.json({result: data});
      if(err){
         res.json({result: '失败'});
      }
   });
});
router.post('/indexhtml6', function (req, res) { //处理首页 jquery ajax（post）请求
   const sqlOptStr = 'SELECT * FROM `article` WHERE class = ?';
   sql(sqlOptStr, [req.body.typeId], function (err, data) {
      res.json({result: data});
      if(err){
         res.json({result: '失败'});
      }
   });
});
router.post('/indexhtml7', function (req, res) { //处理首页 angulrjs ajax（post）请求
   const sqlOptStr = 'SELECT * FROM `article` WHERE class = ?';
   sql(sqlOptStr, [req.body.typeId], function (err, data) {
      res.json({result: data});
      if(err){
         res.json({result: '失败'});
      }
   });
});


//默认http(get)方式和form(get)方式提交 访问 '/formget'
router.get('/formget', function(req, res){
   var dataOptStr = 'INSERT INTO `user` (`id`, `username`, `pass`) VALUES (0,?,?)',
       value = [req.query.name, req.query.pass];
   sql(dataOptStr, value, function(err, data){
      res.render('form_get'); //渲染到form_get.ejs
   });
});

//$.ajax http(get)方式提交和默认http(get)提交 访问'/ajaxget'
router.get('/ajaxget', function(req, res){
   var dataOptStr = 'INSERT INTO `user` (`id`, `username`, `pass`) VALUES (0,?,?)',
       value = [req.query.name, req.query.pass];
   sql(dataOptStr, value, function(err, data){
      res.render('ajax_get'); //渲染到ajax_get.ejs
   });
});

//默认http(get)方式  访问'/formpost'
router.get('/formpost', function(req, res){
   var dataOptStr = 'SELECT * FROM `user`';
   sql(dataOptStr, function(err, data){
      res.render('form_post', {outData: data});//渲染到 form_post.ejs
   });
});

//表单http(post)方式提交 提交地址'/formpost'
router.post('/formpost', function(req, res){
   var dataOptStr = 'INSERT INTO `user` (`id`, `username`, `pass`) VALUES (0,?,?)',
       value = [req.body.name, req.body.pass];
   sql(dataOptStr, value, function(err, data){});
   res.json({
      ok: '成功'
   })
});

//默认http(get)方式访问 '/ajaxpost'
router.get('/ajaxpost', function(req, res){
   var dataOptStr = 'SELECT * FROM `user`';
   sql(dataOptStr, function(err, data){
      res.render('ajax_post', {outData: data});//渲染到 ajax_post.ejs
   });
});
//$.ajax(post)方式提交 提交地址'/ajaxpost111'
router.post('/ajaxpost111', function(req, res){
   var dataOptStr = 'INSERT INTO `user` (`id`, `username`, `pass`) VALUES (0,?,?)',
       value = [req.body.name, req.body.pass];
   sql(dataOptStr, value, function(err, data){});
   res.json({
      ok: '成功'
   })
});

//注册页面
router.use('/reg', require('./reg'));//地址有/reg 使用当前同级的reg.js路由

//登录页面
router.use('/login', require('./login')); //地址有/login 使用当前同级的login.js路由

//清除cookie 退出登录状态
router.get('/logout', function (req, res) {
   res.clearCookie('login');
   //网址重定向
   res.redirect('/'); //重新定位到
})

//后台路由
router.use('/admin', require('./admin'));

//文章相关(收藏 浏览)
router.use('/article', require('./article'));

//文章详情为设置seo伪静态时
/*router.get('/article_detail', function (req, res) {
   var sqlOptStr = 'SELECT * FROM `shuoshuo` WHERE id = ?',
       id = req.query.id;
   sql(sqlOptStr, [id], function (err, data) {
      res.render('article_detail', {data:data})
   })
})*/
//seo优化 设置静态页面  访问/article_detail/xxx.html
router.get('/article_detail/:id.html', function (req, res) {
   //console.log(req.params) //可以打印id {id=7} req.params显示当前地址的信息

   var sqlOptStr = 'SELECT * FROM `article` WHERE id = ?',
       sqlOptStr2 = 'SELECT * FROM `article_comment` WHERE uid = ?',
       id = req.params.id;
   if(id>=1){
      sql(sqlOptStr, [id], function (err, data) {  //文章详情页面数据库查询
      if(data.length == 0 || err){ //不存在的跳转到404页面
            res.status(404).render('404.ejs'); //只当404才调到这个页面（避免被收录）
            return;
      };
      let dataType = data[0]['class'],
          author = data[0]['author'],
          sqlOptStr3 = 'SELECT * FROM `article` WHERE class = ? order by store desc limit 3',
          sqlOptStr4 = 'SELECT * FROM `article` WHERE author = ? order by store desc limit 11';


      sql(sqlOptStr3, [dataType], function (err, data3) { //同类型文章查询
         //返回结果去自身
         for(let i=0;i<data3.length;i++){
            if(data3[i]['id'] == id){
               data3 = data3.splice((i+1));
            }
         }
         if(data3.length == 0){ //没有相似文章(去掉自身)
            sql(sqlOptStr4, [author], function(err, data4){ //该作者还发布同类型的其他文章查询
               //返回结果去自身
               for(let i=0;i<data4.length;i++){
                  if(data4[i]['id'] == id){
                     data4 = data4.splice((i+1));
                  }
               }
               if(data4.length == 0){ //该作者没有发布同类型的其他文章
                  sql(sqlOptStr2, [id], function (err, data2) { //评论查询
                     res.locals.more = 0;
                     res.locals.author = 0;
                     res.render('article_detail',{data:data,commentData:data2});
                  })
               }else{ //该作者有发布同类型的其他文章
                  sql(sqlOptStr2, [id], function (err, data2) { //评论查询
                     res.locals.author = 1;
                     res.locals.more = 0;
                     res.render('article_detail',{data:data,commentData:data2,author:data4});
                  })
               }

            })
         }else{ //有相似文章显示
            sql(sqlOptStr4, [author], function (err, data4) { //该作者还发布同类型的其他文章查询
               //返回结果去自身
               for(let i=0;i<data4.length;i++){
                  if(data4[i]['id'] == id){
                     data4 = data4.splice((i+1));
                  }
               }
               if(data4.length == 0){ //该作者没有发布同类型的其他文章
                  sql(sqlOptStr2, [id], function (err, data2) { //评论查询
                     res.locals.more = 1;
                     res.locals.author = 0;
                     res.render('article_detail',{data:data,commentData:data2,data3:data3});
                  })
               }else{ //该作者有发布同类型的其他文章
                  sql(sqlOptStr2, [id], function (err, data2) { //评论查询
                     res.locals.more = 1;
                     res.locals.author = 1;
                     res.render('article_detail',{data:data,commentData:data2,data3:data3,author:data4});
                  })
               }
            })

         }

      })

   })
   }else{
      res.status(404).render('404');
      return;
   }
});

//发布文章评论
router.post('/article_detail/:id.html', function (req, res) {
   /*console.log('评论'+req.params.id);
   console.log('评论'+req.body.commentcon);*/
   const time = pubTime = new Date().toLocaleString(),
         uid = req.params.id,
         content = req.body.commentcon,
         sqlOptStr = 'INSERT INTO `article_comment` (`id`, `pid`, `content`, `time`) VALUES (0,?,?,?)';

   //文章评论插入数据库
   sql(sqlOptStr, [uid,content,time], function (err, data1) {
      if(err){
         //res.locals.result = '评论失败';
         res.json({rsult:'评论失败'});
      }
      res.json({rsult:'评论成功'});
   })
});


//文章列表页面
router.get('/article_list/:type/:page.html' , function (req, res) {
   let sqlOptStr = 'SELECT * FROM `article` WHERE class = ?',
       sqlOptStr1 = 'SELECT * FROM `article` WHERE class = ? order by id desc limit ?,?',
       sqlOptStr2 = 'SELECT * FROM `article` order by id',
       sqlOptStr3 = 'SELECT * FROM `article` order by id desc limit ?,?',
       sqlOptStr5 = 'SELECT * FROM article order by time desc limit 1',
       sqlOptStr6 = 'SELECT * FROM article order by time desc limit 20',
       type = req.params.type,
       page = req.params.page;
   if(page >=1){
      if(Number(type)){ //分类文章的列表页面
         sql(sqlOptStr, [type], function (err, data1) {
            if(data1.length == 0){
               res.status(404).render('404');
               return;
            }
            sql(sqlOptStr1, [type, (page-1)*5, page*5], function (err, data) {
               if(data.length == 0){
                  res.status(404).render('404');
                  return;
               }
               sql(sqlOptStr5, function (err, data5) {
                  let firstTime = data5[0]['time'], //获取最近一次发布文章的时间
                      arcArr = [];
                  arcArr.push(data5[0]); //将最近发布的一次文章添加进去
                  sql(sqlOptStr6, function (err, data6) {
                     for(let i=0;i<data6.length;i++){
                        if(firstTime > data6[i]['time']){ //匹配最近第二个时间段发布的一些文章
                           if(arcArr.length <= 4){ //最新文章只显示4个文章
                              arcArr.push(data6[i]);
                           }
                        }
                     }
                     res.locals.all = data1.length;
                     res.locals.type = type;
                     res.render('article_list', {data:data,data5:arcArr});
                  })
               })

            })
         })

      }else{ //汇总页面的文章列表页面
         sql(sqlOptStr2, function (err, data1) {
            if(data1.length == 0){
               res.status(404).render('404');
               return;
            }
            sql(sqlOptStr3, [(page-1)*5,page*5], function (err, data) {
               if(data.length == 0){
                  res.status(404).render('404');
                  return;
               }
               sql(sqlOptStr5, function (err, data5) {
                  let firstTime = data5[0]['time'], //获取最近一次发布文章的时间
                      arcArr = [];
                  arcArr.push(data5[0]); //将最近发布的一次文章添加进去
                  sql(sqlOptStr6, function (err, data6) {
                     for(let i=0;i<data6.length;i++){
                        if(firstTime > data6[i]['time']){ //匹配最近第二个时间段发布的一些文章
                           if(arcArr.length <= 4){ //最新文章只显示4个文章
                              arcArr.push(data6[i]);
                           }
                        }
                     }
                     res.locals.all = data1.length;
                     res.locals.type = type;
                     res.render('article_list', {data:data,data5:arcArr});
                  })
               })
            })
         })
      }
   }else{
      res.status(404).render('404');
      return;
   }
});
//分类页面 不能类型文章列表
/*router.get('/article_list/:type/:page.html', function (req, res) {
   /!*console.log(req.params.type);
   console.log(req.params.page);*!/
   let sqlOptStr1 = 'SELECT * FROM `article` WHERE class = ?',
       sqlOptStr2 = 'SELECT * FROM `article` WHERE class= ? order by id desc limit ? ?',
       type = req.params.type;
   sql(sqlOptStr1,[req.params.type] ,function (err, alldata) {
      if(alldata.length == 0){
         res.status(404).render(404);
      }
      sql(sqlOptStr2, [req.params.type,(req.params.page-1)*5,req.params.page*5], function (err, data) {
         res.locals.all = alldata; //全部文章数量
         req.locals.type = type;
         res.render('article_list', {data:data}); //显示到文章汇总列表页
      })
   })
});*/

//文章汇总列表 未使用
router.get('/article_list/all/list-:page.html', function (req, res) {
   let sqlOptStr1 = 'SELECT * FROM `article` order by id',
       sqlOptStr2 = 'SELECT * FROM `article` order by id desc limit ?,?';
   //console.log(req.params.page);
   sql(sqlOptStr1, function (err, alldata) {
      sql(sqlOptStr2, [(req.params.page-1)*5,req.params.page*5], function (err, data) {
         if(data.length == 0){
            res.status(404).render(404);
         }
         //console.log(alldata)
         res.locals.allnum = alldata.length; //全部文章数量
         res.render('article_alllist', {data:data}); //显示到文章汇总列表页
      })
   })
});
//站内搜索
router.get('/search', function (req, res) {
   //console.log(req.query.search);
   let sqlOptStr = 'SELECT * FROM `article` WHERE `title` LIKE ?',
       sqlOptStr2 = 'SELECT * FROM `article` WHERE `title` LIKE ? order by id desc limit ?,?';
   sql(sqlOptStr, ['%'+ req.query.search +'%'], function (err, data) {
      res.render('search', {data:data});
   });

})

router.use(function(req,res){
   res.status(404).render('404');
})
//导出这个模块
module.exports = router;
//mysqlHandle = 'INSERT INTO `user` (`id`, `username`, `pass`) VALUES (0,?,?)',
//'SELECT * FROM `user`'