-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-04-25 03:23:42
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mynode`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL COMMENT '文章名称',
  `tag` varchar(64) NOT NULL COMMENT '文章标签',
  `author` varchar(64) NOT NULL COMMENT '作者',
  `avatar` varchar(64) NOT NULL COMMENT '头像',
  `cover` varchar(64) NOT NULL COMMENT '文章封面',
  `summary` longtext NOT NULL COMMENT '文章摘要',
  `content` longtext NOT NULL COMMENT '文章内容',
  `view` int(11) NOT NULL COMMENT '浏览次数',
  `class` int(11) NOT NULL COMMENT '文章分类',
  `typename` varchar(64) NOT NULL COMMENT '分类名称',
  `store` int(11) NOT NULL COMMENT '收藏次数',
  `time` varchar(64) NOT NULL COMMENT '发布时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=33 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `tag`, `author`, `avatar`, `cover`, `summary`, `content`, `view`, `class`, `typename`, `store`, `time`) VALUES
(18, '啊发发 阿发a', 'div', 'jesonhu', '/img/1490195211001.png', '/img/1490195210974.jpg', '阿发发阿发阿发阿发啊', '阿发发啊', 0, 5, 'js', 4, '2017-3-22 '),
(19, '极乐空间拉开距离', 'html,jquery', 'jesonhu', '/img/1490195556779.png', '/img/1490195556743.jpg', '拉开了距离科技理解', '就看见噢穷了康师傅啊', 0, 7, 'angularjs', 1, '2017-3-22 '),
(20, 'html标题html标题html标题html标题html标题html标题', 'html', 'jesonhu', '/img/1490248965626.png', '/img/1490248965608.jpg', '摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要', '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容', 0, 1, 'html', 1, '2017-3-23 '),
(21, 'js标题', 'js', 'jesonhu', '/img/1490249018697.png', '/img/1490249018439.png', '大街上福利卡积分垃圾分类就', '开始发力会计法辣椒粉垃圾分类进啦 ', 0, 5, 'js', 1, '2017-3-23 '),
(22, 'jquyer文章标题jquyer文章标题jquyer文章标题', 'jqueyr', 'jesonhu', '/img/1490249081317.png', '/img/1490249081291.jpg', '骗我就让我家人立即', '捡垃圾了可乐 浏览记录', 0, 6, 'jquery', 1, '2017-3-23 '),
(23, 'angularjs标题', 'angualrjs', 'jesonhu', '/img/1490249121742.png', '/img/1490249121716.jpg', '吉林市解放路会计分录建安费了', '可垃圾分类会计分录卡积分来看就', 0, 7, 'angularjs', 1, '2017-3-23 '),
(25, '几号放假卡号发非', 'angularjs', 'jesonhu', '/img/1490349557979.png', '/img/1490349557967.jpg', '在哟啊舒服撒是否', '沙发沙发安抚安抚安抚', 0, 7, 'angularjs', 10, '2017-3-24 '),
(27, '是发发 ', 'html5', 'jesonhu', '/img/1490592414638.png', '/img/1490592414128.png', '沙发发发发', '发顺丰单大神按时 ', 0, 3, 'html5', 1, '2017-3-27 '),
(28, '富文本编辑器使用', 'ueditor', 'jesonhu', '/img/1490677501172.png', '/img/1490677501147.jpg', '摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要', '<p>舒服撒发发非是否是 冯绍峰三是<img src="/img/ueditor/846588868382822400.png" title="" alt="1490195556779.png"/><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/></p>', 0, 4, 'css3', 1, '2017-3-28 '),
(29, 'nodejs代码太多?是时候用一波express了', 'express', 'jesonhu', '/img/1490679790975.png', '/img/1490679790959.png', '为什么现在express这么火，nodejs都能实现的功能，为什么还要用express，这篇文章可以做简单的说明', '<p>nodejs原生实现hello world:<br/></p><pre style="background-color: rgb(39, 40, 34); color: rgb(248, 248, 242); font-size: 12pt;"><font face="Courier New">var http = require(&#39;http&#39;); //</font><span style="font-family: 宋体;">依赖</span><font face="Courier New">http模块</font><span style="font-family: 宋体;"><br/></span><font face="Courier New">server = http.createServer(function(req, res){ //request </font><span style="font-family: 宋体;">请求 </span><font face="Courier New">response </font><span style="font-family: 宋体;">返回<br/></span><span style="font-family: 宋体;"> &nbsp; &nbsp;</span><font face="Courier New">res.writeHeader(200, { //200</font><span style="font-family: 宋体;">请求成功 </span><font face="Courier New">Content-Type</font><span style="font-family: 宋体;">请求类型<br/></span><span style="font-family: 宋体;"> &nbsp; &nbsp; &nbsp; &nbsp;</span><font face="Courier New">&#39;Content-Type&#39;: &#39;text/plain&#39;,<br/> &nbsp; &nbsp;});<br/> &nbsp; &nbsp;res.end(&#39;&lt;p&gt;hello world --by nodeJS&lt;/p&gt;&#39;); //end()</font><span style="font-family: 宋体;">表示请求结束<br/></span><p style="font-family: &quot;Courier New&quot;;">}).listen(300); //<span style="font-family:&#39;宋体&#39;;">服务器开启在</span>300<span style="font-family:&#39;宋体&#39;;">接口<br/></span></p><p><font face="宋体">//服务器运行便利提示，我选择了加上去，不需要提示可以不加</font></p><font face="Courier New">console.log(&#39;Server running at http://127.0.0.1:300&#39;);</font></pre><p><img src="/img/ueditor/846598385682223104.png" title="" alt="QQ截图20170328134148.png"/></p><p>express实现 hello world:</p><pre style="background-color:#272822;color:#f8f8f2;font-family:&#39;Courier New&#39;;font-size:12.0pt;">var http = require(&#39;http&#39;),<br/>    express = require(&#39;express&#39;),<br/>    app = express();<br/><p><br/></p><p>//express <span style="font-family:&#39;宋体&#39;;">简单使用</span></p>app.get(&#39;/&#39;, function(req, res){<br/>    res.send(&#39;hello world -- by express&#39;);<br/>});<br/>//<span style="font-family:&#39;宋体&#39;;">创建服务器并监听500接口<br/></span><p>http.createServer(app).listen(500);</p><pre style="font-size: 12pt; background-color: rgb(39, 40, 34); color: rgb(248, 248, 242);"><p><span style="font-family:宋体">//服务器运行便利提示，我选择了加上去，不需要提示可以不加</span></p><span style="font-family:Courier New">console.log(&#39;Server running at http://127.0.0.1:300&#39;);</span></pre><p><br/></p></pre><p><br/></p>', 0, 8, 'nodejs', 1, '2017-3-28 '),
(30, '沙发沙发', 'css', 'jesonhu', '/img/1490349557979.png', '/img/1490697191055.jpg', 'sfsf ', '<p>sfsf&nbsp;</p>', 0, 2, 'css', 0, '2017-3-28 '),
(31, '文章ss', 'js', 'jesonhu', '/img/1490757020290.png', '/img/1490757020304.png', 'sssssssddddddd', '<p><span style="color: rgb(255, 0, 0);">内容ssddddddd</span></p><p><img src="/img/ueditor//846588868382822400.png" alt="846588868382822400.png"/></p><p><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/></p>', 0, 1, 'html', 0, '2017-3-29 '),
(32, '即将上线ssss', 'html5', 'jesonhu', '/img/1490769720817.png', '/img/1490769720823.jpg', '收款方式交流看法就是老费劲死了', '<p>沙发沙发</p><p><img src="/img/ueditor//846389560383508480.jpg" style="width: 198px; height: 193px;" width="198" height="193"/><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/><img src="http://img.baidu.com/hi/youa/y_0003.gif"/></p><p><br/></p>', 0, 1, 'html', 0, '2017-3-29 ');

-- --------------------------------------------------------

--
-- 表的结构 `article_comment`
--

CREATE TABLE IF NOT EXISTS `article_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(64) NOT NULL COMMENT '用户id',
  `pid` varchar(64) NOT NULL COMMENT '文章id',
  `content` varchar(64) NOT NULL,
  `time` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `article_comment`
--

INSERT INTO `article_comment` (`id`, `uid`, `pid`, `content`, `time`) VALUES
(1, '', '18', 'sfsfafdfa', '2017-3-23 12:14:59'),
(2, '', '18', 'afsadfafa', '2017-3-23 12:21:51'),
(3, '', '18', 'afaffasfsfsfaa', '2017-3-23 12:49:16'),
(4, '', '18', '是发发啊父', '2017-3-23 12:54:04'),
(5, '', '25', 'sfafafd', '2017-3-25 17:50:13'),
(6, '', '26', 'sfafads', '2017-3-27 13:24:31'),
(7, '', '30', 'sfsfsf', '2017-3-29 11:14:01'),
(8, '', '30', '再评论', '2017-3-29 11:19:33'),
(9, '', '30', 'ssss', '2017-3-29 11:20:10');

-- --------------------------------------------------------

--
-- 表的结构 `article_type`
--

CREATE TABLE IF NOT EXISTS `article_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `typename` varchar(64) NOT NULL,
  `typeunder` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `article_type`
--

INSERT INTO `article_type` (`id`, `type`, `typename`, `typeunder`) VALUES
(1, 1, 'html', 0),
(2, 2, 'css', 0),
(3, 3, 'html5', 0),
(4, 4, 'css3', 0),
(5, 5, 'js', 0),
(6, 6, 'jquery', 0),
(7, 7, 'angularjs', 0),
(8, 8, 'nodejs', 1),
(9, 9, 'mysql', 1);

-- --------------------------------------------------------

--
-- 表的结构 `banner`
--

CREATE TABLE IF NOT EXISTS `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(64) NOT NULL,
  `url` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- 转存表中的数据 `banner`
--

INSERT INTO `banner` (`id`, `type`, `url`, `name`) VALUES
(8, '2', '/img/1490544644195.jpg', '01'),
(9, '2', '/img/1490544649484.jpg', '02'),
(10, '2', '/img/1490716953208.jpg', '03'),
(11, '2', '/img/1490614328751.jpg', '04'),
(12, '3', '/img/1490544672430.jpg', '01'),
(14, '3', '/img/1490613902904.jpg', '02'),
(15, '3', '/img/1490544811146.jpg', '03'),
(16, '3', '/img/1490544816807.jpg', '04'),
(17, '4', '/img/1490613483664.jpg', '01'),
(18, '1', '/img/1490544994965.jpg', '04'),
(20, '1', '/img/1490545001303.png', '03'),
(21, '1', '/img/1490716992468.jpg', '02'),
(22, '1', '/img/1490716978423.jpg', '01'),
(23, '4', '/img/1490613492948.jpg', '02'),
(24, '4', '/img/1490613364508.jpg', '04'),
(25, '4', '/img/1490611327608.jpg', '03');

-- --------------------------------------------------------

--
-- 表的结构 `nav`
--

CREATE TABLE IF NOT EXISTS `nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `navid` varchar(64) NOT NULL,
  `leve` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `nav`
--

INSERT INTO `nav` (`id`, `title`, `navid`, `leve`) VALUES
(1, '第一个一级导航', '1', '1'),
(2, '第二个一级导航', '2', '1'),
(3, '第一个二级导航', '1', '2');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `avatar` varchar(64) NOT NULL COMMENT '头像',
  `pass` varchar(64) NOT NULL,
  `admin` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=33 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `avatar`, `pass`, `admin`) VALUES
(25, 'a3181651', '', '7a1e6ccdb3d64fc532b60a6d2c07356a', '0'),
(26, 'a3181835', '', 'b7ba4191b3e2e8625c8a782dc9dcb5d9', '0'),
(27, 'a3182129', '', 'aee5bc3292340c56d7eefa2da902e3ec', '0'),
(28, 'a3203035', '', 'd8812cf0e4cde056b63b98722439545e', '0'),
(29, 'a3202315', '', 'a0dcbb4ecb1e8026cac6c4028a9f9c03', '0'),
(30, 'jesonhu', '/img/1490349557979.png', '9ae2be73b58b565bce3e47493a56e26a', '1'),
(31, 'sfsfsf', '', '8f60c8102d29fcd525162d02eed4566b', '0'),
(32, 'a450818', '', '77df425f7466c09c951de8e39e715fae', '0');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
