/**
 * Created by Administrator on 2017/3/17 0017.
 */
/*$(function(){
    //通过cookie状态控制顶部菜单显示
    var $cookieLogin = $.cookie('login');
    if($cookieLogin){ //cookie存在
        //console.log($cookieLogin);
        //console.log($cookieLogin.j.name);
        //console.log($cookieLogin['j']['name']);
        //console.log($cookieLogin['name']);

        /!*<ul class="nav navbar-nav navbar-right">
         <li><a href="/login">登录</a></li>
         <li><a href="/reg">注册</a></li>
         </ul>*!/

        var $navbar = $('ul.navbar-right');
        var login = '<li><a href="">你好xxx</a></li>'+
            +'<li><a href="/logout">退出</a></li>';
    }else{
        console.log('cookie不存在')
    }
})*/


$(function(){
    //无缝轮播
    (function () {
        var $wrap = $('div.b-pic'),
            $ul = $('div.b-pic>ul.img'),
            $li = $ul.children('li'),
            $navUl = $('div.tab>ul.nav'),
            $navLi,
            len = $li.length,
            html = '',
            i = 0,
            timer,
            width = $wrap.width();

        //初始化
        $li.width(width);
        //添加nav li
        for(let i=0;i<len;i++){
           html += '<li></li>';
        }
        $navUl.html(html)
            .children('li:first').addClass('hover');
        $navLi = $navUl.children('li');
        var firstimg=$('ul.img>li').first().clone(); //复制第一张图片
        $ul.append(firstimg);
            //将第一张图片放到最后一张图片
        $ul.width(width*(len+1));

        //点击按钮
        $('div.carousel div.button a').click(function () {
            let index = $(this).index();
            if(index){ //点击右按钮
                i++;
                if (i==$('ul.img li').length) {
                    i=1; //这里不是i=0
                    $('ul.img').css({left:0}); //保证无缝轮播，设置left值
                };
                $('ul.img').stop().animate({left:-i*width},300);
                if (i==$('ul.img li').length-1) { //设置小圆点指示
                    $navLi.eq(0).addClass('hover')
                    .siblings().removeClass('hover');
                }else{
                    $navLi.eq(i).addClass('hover')
                    .siblings().removeClass('hover');
                }
            }else{ //点击左按钮
                i--;
                if (i==-1) {
                    i = $('ul.img li').length-2;
                    $('ul.img').css({left:-($('.img li').length-1)*width});
                }
                $('ul.img').stop().animate({left:-i*width},300);
                $navLi.eq(i).addClass('hover')
                .siblings().removeClass('hover');
            }
        });

        //点击底部按钮
        $navUl.children('li').click(function () {
            let index = $(this).index();
            $(this).addClass('hover')
            .siblings().removeClass('hover');
            $('ul.img').stop().animate({left:-index*width},300);
        });

        //自动轮播
        auto();
        function auto(){
          timer = setInterval(function () {
              i++;
              if (i==$('ul.img li').length) {
                  i=1; //这里不是i=0
                  $('ul.img').css({left:0}); //保证无缝轮播，设置left值
              };
              $('ul.img').stop().animate({left:-i*width},300);
              if (i==$('ul.img li').length-1) { //设置小圆点指示
                  $navLi.eq(0).addClass('hover')
                      .siblings().removeClass('hover');
              }else{
                  $navLi.eq(i).addClass('hover')
                      .siblings().removeClass('hover');
              }
          },3000)
        };

        //划入停止轮播移出开始轮播
        $('div.carousel').hover(function(){
            $('div.button').show();
            clearInterval(timer);
        },function(){
            $('div.button').hide();
            auto();
        })
    })();

    //首页文章点击切换
    (function(){
        let $li = $('div.con2-a-title').find('li'), //tab标题li
            $conUl = $('div.article-list').children('.media-list'),
            index,
            typeId;
        $li.on('click', function () {
            index = $(this).index(); //当前li的索引
            typeId = $(this).attr('data-type'); //当前li的data-type属性值
            $(this).addClass('active')
            .siblings().removeClass('active');

            //下面内容区切换
            $conUl.eq(index).addClass('active')
            .siblings().removeClass('active');

            //点击更多地址更改
            var url;

            if(index){ //分类导航设置
                url = '/article_list/'+ typeId +'/1.html';
                $('div.more>a').attr('href',url);
            }else{ //汇总导航设置
                console.log(1)
                url = '/article_list/0/1.html';
                $('div.more>a').attr('href',url);
            }

            //ajax显示数据
            if(index){
                $.ajax({
                    url: '/indexhtml'+typeId,
                    type: 'post',
                    data: {
                        typeId : parseInt(typeId)
                    },
                    dataType: 'json',
                    success: function (data) {
                        //console.log(data.result);
                        let html = '';
                        for(let i = 0;i<data.result.length;i++){
                            html += '<li class = "media" data-id="'+ data.result[i]["id"] +'">'
                                +'<a class = "pull-left" href = "javascript:void(0)">'
                                +'<img class = "media-object"  src = "'+ data.result[i]["cover"] +'" alt="1" width="100%" height="100%" />'
                                +'</a>'
                                +'<div class = "media-body">'
                                +'<a href="/article_detail/'+ data.result[i]["id"] +'.html">'
                                +'<h3 class = "media-heading">'+ data.result[i]["title"] +'</h3>'
                                +'</a>'
                                +'<div class="detail">'+ data.result[i]["summary"] +'</div>'
                                +'<div class="public">'
                                +'<a href="article-detail.html">'
                                +'<img class="img-circle" src="'+ data.result[i]["avatar"] +'" alt="logo"/>'
                                +'<span class="public-author">'+ data.result[i]["author"] +'</span>'
                                +'</a>'
                                +'<span class="public-time">'+ data.result[i]["time"] +'</span>'
                                +'<span class="public-like pull-right" href="">'
                                +'<i class="icon-heart-empty"></i>'
                                +'<em class="like-num">'+ data.result[i]["store"] +'</em>'
                                +'</span>'
                                +'</div>'
                                +'</div>'
                                +'</li>'
                        };
                        $conUl.eq(index).empty().html( html ); //添加到dom里面
                        $conUl.find('li:gt(2)').hide();
                    },
                    error: function (data) {
                        console.log('失败');
                    }
                })
            }
        });
    })();

    //首页导航菜单
    (function(){
        let $panelHeading = $('div.panel .panel-heading');

        $panelHeading.on('click', function () {
            $(this).addClass('active')
                .parent('.panel').siblings()
                .children('.panel-heading').removeClass('active');
        });
    })();

    //首页懒加载
    (function(){
        let $panelHeading = $('div.panel .panel-heading'),
            iniLiLen, //初始li显示数量
            nowLiLen, //现在显示的li数量
            lastLiLen = 3, //懒加载前显示的li数量
            speed = 3, //每次加载量
            $activeUl, //当前显示的ul
            liLen; //当前显示ul的li总数

        //初始显示

        function init(){
            $activeUl = $('div.article-list').children('.media-list:visible');
            liLen = $activeUl.children('li').length;
            //console.log(liLen);
            if(liLen >= 3){ //当li的总条数大于3条的时候 只显示前三条，其他隐藏
                $('.media-list:visible > li:gt(2)').hide(); //索引大于2的都隐藏
                iniLiLen = 3;
                lastLiLen = iniLiLen;
            }
        };
        init();

        function lazyShow(){
            $(document).on('scroll', function () {
                $activeUl = $('ul.media-list.active');
                let scrollTop = $(this).scrollTop(),
                    startHei = $activeUl.find('li:visible:last').offset().top - scrollTop;
                //console.log(startHei);
                if(startHei <= 600){ //当最后一个li距离顶部小于100px的时候
                    nowLiLen = $activeUl.find('li:visible').length;
                    //console.log(nowLiLen);
                    if(lastLiLen == nowLiLen){
                        $activeUl.find('li:lt('+ (lastLiLen+speed) +')').css('display','block');
                        lastLiLen += speed;
                    }else if(nowLiLen == liLen){ //当从数据库查询的li全部显示完的时候
                        if($activeUl.find('p.bottom').length){ //p.bottom已经存在的时候
                            return;
                        }else{
                            $activeUl.append('<p class="bottom">到底了o(╯□╰)o...请点击浏览更多</p>');
                        }

                    }else{
                        return;
                    }
                }
            });
        };
        lazyShow();

        $('div.con2-a-title').find('li').click(function () {
            var index = $(this).index();
            $activeUl = $('div.article-list').children('.media-list').eq(index);
            liLen = $activeUl.children('li').length;
            lastLiLen = 3;
            // console.log(liLen);
            $(document).on('scroll', function () {
                let scrollTop = $(this).scrollTop(),
                    startHei = $activeUl.find('li:visible:last').offset().top - scrollTop;
                // console.log(startHei);
                if(startHei <= 600){ //当最后一个li距离顶部小于100px的时候
                    nowLiLen = $activeUl.find('li:visible').length;
                    //console.log(nowLiLen);
                    //console.log(nowLiLen)
                    if(lastLiLen == nowLiLen){
                        $activeUl.find('li:lt('+ (lastLiLen+speed) +')').css('display','block');
                        // console.log(1)
                        lastLiLen += speed;
                    }else if(nowLiLen == liLen){ //当从数据库查询的li全部显示完的时候
                        if($activeUl.find('p.bottom').length){ //p.bottom已经存在的时候
                            return;
                        }else{
                            $activeUl.append('<p class="bottom">到底了o(╯□╰)o...请点击浏览更多</p>');
                        }

                    }else{
                        return;
                    }
                }
            });
        });
    })();


});




