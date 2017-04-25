/**
 * Created by Administrator on 2017/3/25 0025.
 */
$(function () {
    //面包屑导航设置
    (function () {
        let $li = $('li[data-type]'),
            typename,
            attrVal = $li.attr('data-type');
        switch(Number(attrVal)){
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

        if($li.length){ //存在面包屑导航的时候
            $li.find('a').text(typename.toUpperCase());
        }

    })();

    //点击喜欢的时候
    (function () {
        $('i.icon-heart-empty').click(function () {
            $.ajax({
                url: '/article/store',
                type: 'post',
                data: {
                    id: $('h1.article').attr('data-id')
                },
                success: function (data) {
                    location.reload();
                },
                err: function () {

                }
            })
        });
    })();

    //使用提示bs工具
    $('[data-toggle="tooltip"]').tooltip();

    //用户删除
    $('a.delete').click(function(){
        $.ajax({
            url:'/admin/user',
            type: 'post',
            data: {
                id: $(this).attr('data-id')
            },
            dataType: 'json',
            success: function (data) {
                if(data.result){
                    alert('删除成功');
                }else{
                    alert('删除失败');
                }
                location.reload();
            }
        })
    });

    //用户文章删除
    $('a.arcdelete').click(function(){
        $.ajax({
            url:'/admin/article/delete',
            type: 'post',
            data: {
                id: $(this).attr('data-id')
            },
            dataType: 'json',
            success: function (data) {
                if(data.result){
                    alert('删除成功');
                }else{
                    alert('删除失败');
                }
                location.reload();
            }
        })
    });
});