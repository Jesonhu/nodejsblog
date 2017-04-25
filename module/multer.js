/**
 * Created by Administrator on 2017/3/21 0021.
 */
const multer = require('multer'),
      path = require('path');  //处理路径

//文件上传
let storage = multer.diskStorage({  //上传路径处理 上传之后重命名
    //上传路径处理
    //desctination: '${process.cwd()}/public/',
    destination: path.join(process.cwd(), 'public/img'),
    filename: function (req, file, callback) {
        //console.log(file); //[1.gif]
        let filename = (file.originalname).split('.');// 获取扩展名
        callback(null, `${Date.now()}.${filename[filename.length-1]}`); //参数1用不到设为null
    }
});
let fileFilter = function (req, file, cb) {
    if(file.mimetype == 'image/jpeg'){ //只有.jpg文件并且小于500K时才能上传  && file.encoding <= 512000
        req.upload = '上传成功';
        cb(null, true); //允许上传
    }else{
        req.upload = '只能上传jpg并且不超过500K的图片'; //自定义属性upload
        cb(null, false); //不允许上传
    }
};

let upload = multer({
    storage: storage, //上面的配置信息放到总的配置信息里
    /*limits: {

    },
    fileFilter: fileFilter  //文件上传筛选*/
});

//导出模块
module.exports = upload;

