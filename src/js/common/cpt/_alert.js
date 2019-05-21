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
        tpl: '<div class="alert">\
                <div class="alert-body">\
                	<h5 class="til">恭喜获得</h5>\
                    <i class="close icons icons-close alert-close"></i>\
                    <div class="rewards">'+
                    	((function(){
                    		var str = '';
                    		for( var i in op.giftJson){
                    			str += '<div>'+
											'<img src="'+ (op.giftJson[i].goodsImg||op.giftJson[i].goodsimg) +'" />'+
											'<p>'+ (op.needSlice?(op.giftJson[i].goodsName||op.giftJson[i].goodsname).slice(1):(op.giftJson[i].goodsName||op.giftJson[i].goodsname)) +'</p>'+
											'<span>x'+ (op.giftJson[i].goodsNum||op.giftJson[i].goodsnum) +'</span>'+		
										'</div>'
                    		}
                    		return str;
                    	})())
						
					+'</div>\
                </div>\
            </div>',
        txt: '',
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
            title: this.opt.title,
            txt: this.opt.txt,
            num: this.opt.num,
            btnTxt: this.opt.btnTxt,
            btnTxt1: this.opt.btnTxt1,
            btnTxt2: this.opt.btnTxt2
        });

        oWrapper.append($alertHTML);

        this.oDiv = win(oWrapper, {zIndex: 999999});

        $('body').append(this.oDiv);

        setCenter(oWrapper.find('.alert'));

        this.events();
        
        setTimeout(function(){
        	that.oDiv.find('.alert-close').trigger('click');
        },2*1000)
    },
    events: function () {
        var that = this;

        that.oDiv.on('click', '.alert-close',function(){
        	if(that.opt.closeFunc != null){
                that.opt.closeFunc();
            }
            $(that.oDiv).remove();
        });

        that.oDiv.on('click', '.alert-btn', function(){
            if(that.opt.Func != null){
                that.opt.Func();
            }
            that.oDiv.remove();
        });
		
    }
};

exports.alert = _alert;
