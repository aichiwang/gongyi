/**
 * Created by 11789 on 2017/3/20.
 * @discription
 * @parameter
 * @example
 */

var compile = require('../mod/compile').compile;
var win = require('../cpt/_win').win;

function setCenter($obj){
    if(!$obj) return;

    var width = parseInt($obj.css('width'));
    var height = parseInt($obj.css('height'));

    var bodyWidth = $('body').width();
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var bodyHeight = Math.min($('body').height(), clientHeight);

    $obj.css({
        position: 'fixed',
        left: (bodyWidth - width)/2,
        top: (bodyHeight - height)/2
    });

    setTimeout(function(){
        $obj.css('visibility', 'visible');
    }, 10)
}

function _alert(op){

    this.opt = {
        tpl: '<div class="confirm">\
                <div class="alert-body">\
                   <span class="txt">#{txt}</span>\
                </div>\
                <div class="alert-footer">\
                    <a href="javascript:void(0)" class="alert-btn1">#{btnTxt1}</a >\
                    <a href="javascript:void(0)" class="alert-btn2">#{btnTxt1}</a >\
                </div>\
            </div>',
        txt: '',
        num: '',
        btnTxt1: '',
        btnTxt2: '',
        hasLayout: true,
        Func: null
    };

    this.opt = $.extend(this.opt, op);
    this.init();
}

_alert.prototype = {
    init: function () {

        var that = this;

        var oWrapper = $('<div></div>');

        var $alertHTML = compile(this.opt.tpl, {
            txt: this.opt.txt,
            num: this.opt.num,
            btnTxt: this.opt.btnTxt,
            btnTxt1: this.opt.btnTxt1,
            btnTxt2: this.opt.btnTxt2
        });

        oWrapper.append($alertHTML);

        this.oDiv = win(oWrapper, {zIndex: 999999});

        $('body').append(this.oDiv);

        setCenter(oWrapper.find('.confirm'));

        this.events();
        //this.remove();
    },
    events: function () {
        var that = this;

        that.oDiv.on('click', '.alert-btn1', function(){
            if(that.opt.Func != null){
                that.opt.Func();
            }

            that.oDiv.remove();

            $(".checkbox").trigger('click');


        });

        //that.oDiv.on('click', '.alert-btn2', function(){
        //    if(that.opt.Func != null){
        //        that.opt.Func();
        //    }
        //
        //    that.oDiv.remove();
        //
        //});

    }

};

exports.alert = _alert;
