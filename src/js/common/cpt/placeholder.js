/**
 * Created by Administrator on 2018/3/2 0002.
 */
(function($) {
    var placeholderfriend = {
        focus: function(s) {
            s = $(s).hide().prev().show().focus();
            var idValue = s.attr("id");
            if (idValue) {
                s.attr("id", idValue.replace("placeholderfriend", ""));
            }
            var clsValue = s.attr("class");
            if (clsValue) {
                s.attr("class", clsValue.replace("placeholderfriend", ""));
            }
        }
    }

    //判断是否支持placeholder
    function isPlaceholer() {
        var input = document.createElement('input');
        return "placeholder" in input;
    }
    //不支持的代码
    if (!isPlaceholer()) {
        $(function() {

            var form = $(this);
            //var elements = form.find("input[type='text'][placeholder]");
            var elementRoomId = form.find("#roomId");
            elementRoomId.each(function() {
                var s = $(this);
                var pValue = s.attr("placeholder");
                var sValue = s.val();
                if (pValue==sValue) {
                    s.addClass("phcolor");
                };
                if (pValue) {
                    if (sValue == '') {
                        s.val(pValue).addClass("phcolor");
                    }
                }
            });

            elementRoomId.focus(function() {
                var s = $(this);
                var pValue = s.attr("placeholder");
                var sValue = s.val();
                if (sValue && pValue) {
                    if (sValue == pValue) {
                        s.val('').removeClass("phcolor");
                    }
                }
            });

            elementRoomId.blur(function() {
                var s = $(this);
                var pValue = s.attr("placeholder");
                var sValue = s.val();
                if (!sValue) {
                    s.val(pValue).addClass("phcolor");
                }
            });

            var elementAnchorId = form.find("#anchorId");
            elementAnchorId.each(function() {
                var s = $(this);
                var pValue = s.attr("placeholder");
                var sValue = s.val();
                if (pValue==sValue) {
                    s.addClass("phcolor");
                };
                if (pValue) {
                    if (sValue == '') {
                        s.val(pValue).addClass("phcolor");
                    }
                }
            });

            elementAnchorId.focus(function() {
                var s = $(this);
                var pValue = s.attr("placeholder");
                var sValue = s.val();
                if (sValue && pValue) {
                    if (sValue == pValue) {
                        s.val('').removeClass("phcolor");
                    }
                }
            });

            elementAnchorId.blur(function() {
                var s = $(this);
                var pValue = s.attr("placeholder");
                var sValue = s.val();
                if (!sValue) {
                    s.val(pValue).addClass("phcolor");
                }
            });


        });
    }
    window.placeholderfriendfocus = placeholderfriend.focus;
})(jQuery);