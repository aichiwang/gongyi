/**
 * Created by 11789 on 2016/5/18.
 * @discription 大厅总导航查询房间模块
 * @parameter
 * @example
 */

var config = require('../../common/config').config;

function Search(){
    this.init();
}

Search.prototype = {
    init: function(){
        var that = this;
        //搜索事件
        $('#roomId').on('focus', function(){
            $(this).addClass('focus');

            if($.trim($(this).val()) == '房间ID'){
                $(this).val('');
            }
        });

        $('#roomId').on('keyup', function(e){
            if($(this).hasClass("focus") && e.keyCode == 13){
                $('#search').trigger('click');
            }

        });

        $('#roomId').on('keydown', function(){

            $('.roomidErrTip').hide();
        });

        $('#roomId').on('blur', function(){
            $(this).removeClass('focus');
            if($.trim($(this).val()) == ''){
                $(this).val('房间ID');
            }else{
                that.checkRoomId();
            }
        });

        $('#anchorId').on('focus', function(){
            $(this).addClass('focus');

            if($.trim($(this).val()) == '主播ID'){
                $(this).val('');
            }
        });

        $('#anchorId').on('keyup', function(e){
            if($(this).hasClass("focus") && e.keyCode == 13){
                $('#search').trigger('click');
            }

        });

        $('#anchorId').on('keydown', function(){

            $('.anchoridErrTip').hide();
        });

        $('#anchorId').on('blur', function(){
            $(this).removeClass('focus');
            if($.trim($(this).val()) == ''){
                $(this).val('主播ID');
            }else{
                that.checkAnchorId();
            }

        });


    },
    checkRoomId:function(){
        if(!/^[0-9]*$/ .test($.trim($('#roomId').val()))){

            $('.roomidErrTip').show();

        }else{

        }
    },
    checkAnchorId:function(){
        if(!/^[0-9]*$/.test($.trim($('#anchorId').val()))){

            $('.anchoridErrTip').show();

        }
    }

}

exports.Search = Search;