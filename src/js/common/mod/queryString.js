/**
 * @author  lijiancheng | lijiancheng@17guagua.com
 * @version 1.0 | 2015/10/9
 * @js作用说明  获取浏览器地址栏字符串
 * @param name 为 要获取的字符串
 * @example queryString(openID)
 */

exports.queryString = function queryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
};
//var toname = '齐齐直播';
//$(function(){
//    initParam();
//    $('.toname').html(toname);
//    $('title').html(toname+'用户隐私条款');
//});
//function queryString(key) {
//    // 获取参数
//    var url = window.location.search;
//    // 正则筛选地址栏
//    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
//    // 匹配目标参数
//    var result = url.substr(1).match(reg);
//    //返回参数值
//    return result ? decodeURIComponent(result[2]) : null;
//}
////获取参数
//function initParam() {
//    var name = queryString("toname");
//    if (name != null && name.toString().length > 0) {
//        toname = name;
//    }
//}