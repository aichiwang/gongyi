/**
 * Created by 11789 on 2017/3/20.
 * @discription  输出一个匿名jquery div 对象, 包含一个透明度为0.5的背景层和传进来的html,
 * @parameter
 * @example
 */

function _win($obj, op){

    var opt = {
        hasLayout: true,
        zIndex: 10
    }

    opt = $.extend(opt, op);

    var oDiv = $('<div></div>');

    oDiv.css({
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: opt.zIndex
    })

    if(opt.hasLayout){
        var layout = $('<div></div>');

        layout.css({
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background: '#000',
            opacity: 0
        });

        oDiv.append(layout);

    }

    oDiv.append($obj);

    return oDiv;
}

exports.win = _win;