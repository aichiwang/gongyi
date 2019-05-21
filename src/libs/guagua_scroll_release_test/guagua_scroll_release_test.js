$.fn.extend({
    mousewheel : function(Func) {

        return this.each(function(i) {
            var _self = this;
            _self.mouseWheel_runFlag=true;
            window.fnWheel=function (e) {
                if(_self.mouseWheel_runFlag===false)return;
                var oEvent=e||event;
                _self.D = oEvent.detail > 0 ? -1 : 1;
                Func && Func.call(_self);
                oEvent.preventDefault();
            };

            if(Func==null){
                _self.mouseWheel_runFlag = false;
                if ($.browser.msie || $.browser.safari) {
                    _self.onmousewheel=null;
                    return false;
                }
            }else{
                _self.mouseWheel_runFlag =true;
                _self.D = 0;
                if ($.browser.msie || $.browser.safari) {
                    _self.onmousewheel = function() {
                        _self.D = event.wheelDelta;
                        event.returnValue = false;
                        Func && Func.call(_self);
                    };
                } else {
                    _self.addEventListener("DOMMouseScroll", window.fnWheel, false);
                }
            }
        });
    }
});
$.fn.extend({
        ggScroll : function(params) {
            return this
                .each(function() {
                    var gg = params;
                    var _self = this;
                    var containerSize = {
                        width : $(_self).width(),
                        height : $(_self).height()
                    };
                    var randomNum = Math.random();
                    var isUp = 0;
                    var containerHeight = $(_self).height();
                    var minHeight = 50;//�������߶�
                    var animateLock = false;
                    if ($(_self).children(".scroll_div").length == 0) {
                        $(_self)
                            .append(
                            "<DIV class='bd-scroll-v1 scroll_div'><DIV class='region'><DIV class='header'></DIV><DIV class='slider'></DIV><DIV class='bottom'></DIV></DIV></DIV>");
                        $(_self)
                            .children(".bd-scroll-v1")
                            .hover(
                            function() {
                                scrollContainer
                                    .removeClass("bd-scroll-v1");
                                scrollContainer
                                    .addClass("bd-scroll-v1-hover")
                            },
                            function() {
                                scrollContainer
                                    .removeClass("bd-scroll-v1-hover");
                                scrollContainer
                                    .addClass("bd-scroll-v1")
                            })
                    }
                    var contentContainer = gg.Content ? $(gg.Content)
                        : $(_self).children(".scrollContent");
                    if (contentContainer == null
                        || contentContainer == undefined
                        || contentContainer.length == 0) {
                        return false
                    }
                    var contentSize = {
                        width : contentContainer.width(),
                        height : contentContainer.height()
                    };
                    var scrollContainer = $(_self).children(
                        ".bd-scroll-v1");
                    var slider = scrollContainer.children(".region");
                    if ($.browser.msie) {
                        document.execCommand("BackgroundImageCache",
                            false, true)
                    }
                    _self.allowSlider = false;
                    var contentHeight = contentContainer.height();
                    var sliderHeight = calcSliderHeight();
                    setSliderHeight(sliderHeight);
                    var stepHeight = calcWheelStep();
                    var sliderTopPos = 0;

                    canScroll();
                    setSliderAndContentPos();
                    function contentContainerResizeHandler() {
                        containerHeight = $(_self).height();
                        contentHeight = contentContainer.height();
                        sliderHeight = calcSliderHeight();
                        setSliderHeight(sliderHeight);
                        stepHeight = calcWheelStep();
                        canScroll();
                        setSliderAndContentPos()
                    }
                    function calcSliderHeight() {
                        var sH = Math.round(containerHeight
                            * containerHeight / contentHeight);
                        if (sH < minHeight) {
                            sH = minHeight
                        }
                        return sH
                    }
                    function calcWheelStep() {
                        return Math.round(sliderHeight / 6)
                    }
                    function canScroll() {
                        if (contentHeight <= containerHeight) {
                            scrollContainer.css({
                                display : "none"
                            });
                            _self.allowSlider = false;

                        } else {
                            scrollContainer.css({
                                display : "block"
                            });
                            _self.allowSlider = true;
                        }
                    }
                    function setSliderAndContentPos() {
                        if ($(_self).attr("autoScroll") == "true"
                            || $(_self).attr("autoScroll") == true) {
                            sliderTopPos = containerHeight
                                - sliderHeight;
                            setT()
                        } else {
                            var topContent = parseInt(contentContainer
                                .css("top"));
                            if (contentHeight >= containerHeight
                                && (containerHeight - topContent) > contentHeight) {
                                topContent = containerHeight
                                    - contentHeight
                            }
                            sliderTopPos = -(topContent
                            * containerHeight / contentHeight);
                            setT(topContent)
                        }
                    }
                    function asetT() {
                        if (sliderTopPos < 0) {
                            sliderTopPos = 0
                        }
                        if (sliderTopPos > containerHeight
                            - sliderHeight) {
                            sliderTopPos = containerHeight
                                - sliderHeight
                        }
                        slider.css({
                            top : sliderTopPos
                        });
                        var scT = -(sliderTopPos * contentHeight / containerHeight);
                        scT = (sliderTopPos == containerHeight
                        - sliderHeight) ? -(contentHeight - containerHeight)
                            : scT;
                        animateLock = true;
                        contentContainer.stop().animate(
                            {
                                top : scT
                            },
                            500,
                            function() {
                                animateLock = false;
                                if (sliderTopPos == containerHeight
                                    - sliderHeight) {
                                    gg["EndFn"]
                                    && gg["EndFn"]
                                        .call(_self)
                                }
                            })
                    }
                    function setT(fixPos) {
                        if (sliderTopPos < 0) {
                            sliderTopPos = 0
                        }
                        if (sliderTopPos > containerHeight
                            - sliderHeight) {
                            sliderTopPos = containerHeight
                                - sliderHeight
                        }
                        slider.css({
                            top : sliderTopPos
                        });
                        if (contentHeight <= containerHeight) {
                            contentContainer.css({
                                top : 0
                            });
                            return
                        }
                        var scT = -(sliderTopPos * contentHeight / containerHeight);
                        scT = (sliderTopPos == containerHeight
                        - sliderHeight) ? -(contentHeight - containerHeight)
                            : scT;
                        contentContainer.css({
                            top : scT
                        })
                    }
                    function setSliderHeight(height) {
                        slider.height(height);
                        slider.children(".slider").height(height - 8);
                    }
                    /*							if ($(_self).attr("eventAlreadyUsed") == "true"
                     || $(_self).attr("eventAlreadyUsed") == true) {
                     } else {
                     _self.resizeFunction = contentContainerResizeHandler;*/
                    if(_self.allowSlider){
                        slider.bind("mousedown", sliderMousedown);
                        scrollContainer.bind("mousedown",scrollMousedown);
                        $(_self).mousewheel(mouseWheel);
                    }else{
                        slider.unbind("mousedown", sliderMousedown);
                        scrollContainer.unbind("mousedown",scrollMousedown);
                        $(_self).mousewheel(null);
                    }
                    /*								$(_self).attr("eventAlreadyUsed", true)
                     }*/
                    function sliderMousedown(e) {
                        var e = e || window.event;
                        isUp = 1;
                        var pageY = e.pageY;
                        var t = parseInt($(this).css("top"));
                        e.stopPropagation();
                        $(document).bind("mousemove", function(e2) {
                            sliderTopPos = t + e2.pageY - pageY;
                            setT();
                            return false;
                        });

                        $(document).bind("mouseup",function(){
                            $(document).unbind("mousemove");
                            $(document).unbind("mouseup");
                        });
                        return false;
                    }
                    function silderMoveCancel(e) {
                        isUp = 0;
                        gg["Fn"] && gg["Fn"].call(_self);
                        if (sliderTopPos == containerHeight
                            - sliderHeight) {
                            gg["EndFn"] && gg["EndFn"].call(_self)
                        }
                        if (slider[0].releaseCapture) {
                            slider[0].releaseCapture()
                        } else {
                            if (window.releaseEvents) {
                                window.releaseEvents(Event.MOUSEMOVE
                                    | Event.MOUSEUP)
                            }
                        }
                        if (window.MessageEvent
                            && !document.getBoxObjectFor) {
                            document.onmousemove = null;
                            document.onmouseup = null
                        } else {
                            $(slider).unbind("mouseup");
                            $(slider).unbind("mousemove")
                        }
                    }
                    function scrollMousedown(e) {
                        gg["Fn"] && gg["Fn"].call(_self);
                        sliderTopPos = sliderTopPos + e.pageY
                            - slider.offset().top - sliderHeight
                            / 2;
                        //asetT();
                        return false
                    }
                    function mouseWheel() {
                        if (_self.allowSlider != true) {
                            return
                        }
                        gg["Fn"] && gg["Fn"].call(_self);
                        if (this.D > 0) {
                            sliderTopPos -= stepHeight
                        } else {
                            sliderTopPos += stepHeight
                        }
                        setT();
                        if (sliderTopPos == containerHeight
                            - sliderHeight) {
                            gg["EndFn"] && gg["EndFn"].call(_self)
                        }
                    }
                })
        },
        ggScroll1 : function(params) {
            return this
                .each(function() {
                    var gg = params;
                    var _self = this;
                    var containerSize = {
                        width : $(_self).width(),
                        height : $(_self).height()
                    };
                    var randomNum = Math.random();
                    var isUp = 0;
                    var containerHeight = $(_self).height();
                    var minHeight = 50;//�������߶�
                    var animateLock = false;
                    if ($(_self).children(".scroll_div").length == 0) {
                        $(_self)
                            .append(
                            "<DIV class='bd-scroll-v2 scroll_div'><DIV class='region'><DIV class='header'></DIV><DIV class='slider'></DIV><DIV class='bottom'></DIV></DIV></DIV>");
                        $(_self)
                            .children(".bd-scroll-v2")
                            .hover(
                            function() {
                                scrollContainer
                                    .removeClass("bd-scroll-v2");
                                scrollContainer
                                    .addClass("bd-scroll-v2-hover")
                            },
                            function() {
                                scrollContainer
                                    .removeClass("bd-scroll-v2-hover");
                                scrollContainer
                                    .addClass("bd-scroll-v2")
                            })
                    }
                    var contentContainer = gg.Content ? $(gg.Content)
                        : $(_self).children(".scrollContent");
                    if (contentContainer == null
                        || contentContainer == undefined
                        || contentContainer.length == 0) {
                        return false
                    }
                    var contentSize = {
                        width : contentContainer.width(),
                        height : contentContainer.height()
                    };
                    var scrollContainer = $(_self).children(
                        ".bd-scroll-v2");
                    var slider = scrollContainer.children(".region");
                    if ($.browser.msie) {
                        document.execCommand("BackgroundImageCache",
                            false, true)
                    }
                    _self.allowSlider = false;
                    var contentHeight = contentContainer.height();
                    var sliderHeight = calcSliderHeight();
                    setSliderHeight(sliderHeight);
                    var stepHeight = calcWheelStep();
                    var sliderTopPos = 0;

                    canScroll();
                    setSliderAndContentPos();
                    function contentContainerResizeHandler() {
                        containerHeight = $(_self).height();
                        contentHeight = contentContainer.height();
                        sliderHeight = calcSliderHeight();
                        setSliderHeight(sliderHeight);
                        stepHeight = calcWheelStep();
                        canScroll();
                        setSliderAndContentPos()
                    }
                    function calcSliderHeight() {
                        var sH = Math.round(containerHeight
                            * containerHeight / contentHeight);
                        if (sH < minHeight) {
                            sH = minHeight
                        }
                        return sH
                    }
                    function calcWheelStep() {
                        return Math.round(sliderHeight / 6)
                    }
                    function canScroll() {
                        if (contentHeight <= containerHeight) {
                            scrollContainer.css({
                                display : "none"
                            });
                            _self.allowSlider = false;

                        } else {
                            scrollContainer.css({
                                display : "block"
                            });
                            _self.allowSlider = true;
                        }
                    }
                    function setSliderAndContentPos() {
                        if ($(_self).attr("autoScroll") == "true"
                            || $(_self).attr("autoScroll") == true) {
                            sliderTopPos = containerHeight
                                - sliderHeight;
                            setT()
                        } else {
                            var topContent = parseInt(contentContainer
                                .css("top"));
                            if (contentHeight >= containerHeight
                                && (containerHeight - topContent) > contentHeight) {
                                topContent = containerHeight
                                    - contentHeight
                            }
                            sliderTopPos = -(topContent
                            * containerHeight / contentHeight);
                            setT(topContent)
                        }
                    }
                    function asetT() {
                        if (sliderTopPos < 0) {
                            sliderTopPos = 0
                        }
                        if (sliderTopPos > containerHeight
                            - sliderHeight) {
                            sliderTopPos = containerHeight
                                - sliderHeight
                        }
                        slider.css({
                            top : sliderTopPos+100
                        });
                        var scT = -(sliderTopPos * contentHeight / containerHeight);
                        scT = (sliderTopPos == containerHeight
                        - sliderHeight) ? -(contentHeight - containerHeight)
                            : scT;
                        animateLock = true;
                        contentContainer.stop().animate(
                            {
                                top : scT
                            },
                            500,
                            function() {
                                animateLock = false;
                                if (sliderTopPos == containerHeight
                                    - sliderHeight) {
                                    gg["EndFn"]
                                    && gg["EndFn"]
                                        .call(_self)
                                }
                            })
                    }
                    function setT(fixPos) {
                        if (sliderTopPos < 0) {
                            sliderTopPos = 0
                        }
                        if (sliderTopPos > containerHeight
                            - sliderHeight) {
                            sliderTopPos = containerHeight
                                - sliderHeight
                        }
                        slider.css({
                            top : sliderTopPos
                        });
                        if (contentHeight <= containerHeight) {
                            contentContainer.css({
                                top : 0
                            });
                            return
                        }
                        var scT = -(sliderTopPos * contentHeight / containerHeight);
                        scT = (sliderTopPos == containerHeight
                        - sliderHeight) ? -(contentHeight - containerHeight)
                            : scT;
                        contentContainer.css({
                            top : scT
                        })
                    }
                    function setSliderHeight(height) {
                        slider.height(height);
                        slider.children(".slider").height(height-20);
                    }
                    if(_self.allowSlider){
                        slider.bind("mousedown", sliderMousedown);
                        scrollContainer.bind("mousedown",scrollMousedown);
                        $(_self).mousewheel(mouseWheel);
                    }else{
                        slider.unbind("mousedown", sliderMousedown);
                        scrollContainer.unbind("mousedown",scrollMousedown);
                        $(_self).mousewheel(null);
                    }
                    function sliderMousedown(e) {
                        var e = e || window.event;
                        isUp = 1;
                        var pageY = e.pageY;
                        var t = parseInt($(this).css("top"));
                        e.stopPropagation();
                        $(document).bind("mousemove", function(e2) {
                            sliderTopPos = t + e2.pageY - pageY;
                            setT();
                            return false;
                        });
                        $(document).bind("mouseup",function(){
                            $(document).unbind("mousemove");
                            $(document).unbind("mouseup");
                        });
                        return false;
                    }
                    function silderMoveCancel(e) {
                        isUp = 0;
                        gg["Fn"] && gg["Fn"].call(_self);
                        if (sliderTopPos == containerHeight
                            - sliderHeight) {
                            gg["EndFn"] && gg["EndFn"].call(_self)
                        }
                        if (slider[0].releaseCapture) {
                            slider[0].releaseCapture()
                        } else {
                            if (window.releaseEvents) {
                                window.releaseEvents(Event.MOUSEMOVE
                                    | Event.MOUSEUP)
                            }
                        }
                        if (window.MessageEvent
                            && !document.getBoxObjectFor) {
                            document.onmousemove = null;
                            document.onmouseup = null
                        } else {
                            $(slider).unbind("mouseup");
                            $(slider).unbind("mousemove")
                        }
                    }
                    function scrollMousedown(e) {
                        gg["Fn"] && gg["Fn"].call(_self);
                        sliderTopPos = sliderTopPos + e.pageY
                            - slider.offset().top - sliderHeight
                            / 2;
                        return false
                    }
                    function mouseWheel() {
                        if (_self.allowSlider != true) {
                            return
                        }
                        gg["Fn"] && gg["Fn"].call(_self);
                        if (this.D > 0) {
                            sliderTopPos -= stepHeight
                        } else {
                            sliderTopPos += stepHeight
                        }
                        setT();
                        if (sliderTopPos == containerHeight
                            - sliderHeight) {
                            gg["EndFn"] && gg["EndFn"].call(_self)
                        }
                    }
                })
        }
    });
