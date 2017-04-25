/**
 * Created by Administrator on 2017/3/25 0025.
 */
var  express= require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

//文章喜欢
router.post('/store', function (req, res) {
   let sqlOptStr1 = 'SELECT * FROM article where id = ?',
       sqlOptStr2 = 'update `article` set `store`= ? where id = ?',
       id = req.body.id;
   sql(sqlOptStr1, [id], function (err, data) {
       let nowStore = Number(data[0]['store']);
       sql(sqlOptStr2, [(nowStore+1),id], function (err, data) {
           res.cookie('store', {has: true}, {maxAge: 1000*60*60*24*7}); //设置cookie
           res.send({result:'1'});
       });
   });
});
router.use(function(req,res){
    res.status(404).render('404');
})

//导出模块
module.exports = router;
