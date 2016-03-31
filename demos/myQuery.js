
/**
 *   self-made-jquery  zhuhaha1.5.js
 *   version-1.5
 *   connect cupxiaoxiaosu@qq.com
 */

(function(){
    window.$=window.z=window.S=$
    //辅助函数区域
    function unbindEvent(obj,events,fn){
        if(obj.addEventListener){
            obj.removeEventListener(events,fn,false)
        }else{
            obj.detachEvent("on"+events,fn)
        }
    }
    function bindEvent(obj,events,fn) {
        obj.listioners = obj.listioners || {};
        obj.listioners[events] = obj.listioners[events] || [];
        obj.listioners[events].push(fn);

        var systemFun=function (ev){
            if(fn.call(obj,ev)==false){
                if(obj.addEventListener){
                    ev.preventDefault();
                    ev.cancelBubble=true;
                }else{
                    window.event.cancelable=true;
                    return false
                }
            }
        }
        obj.systemEvent=obj.system || {};
        obj.systemEvent[events]=obj.systemEvent[events] || [];
        obj.systemEvent[events].push(systemFun)

        if(obj.addEventListener){
            obj.addEventListener(events,systemFun,false)
        }else{
            obj.attachEvent("on"+events,systemFun)
        }

        obj.systemEvent = obj.system || {};
        obj.systemEvent[events] = obj.systemEvent[events] || [];
        obj.systemEvent[events].push(systemFun)

        if (obj.addEventListener) {
            obj.addEventListener(events, systemFun, false)
        } else {
            obj.attachEvent("on" + events, systemFun)

        }
    }
    function getByClass(oParent,sClass){
        var arr=[];
        var ele=oParent.getElementsByTagName("*");
        for(var i=0;i<ele.length;i++){
            var arrClass=ele[i].className.split(" ")
            for(var j=0;j<arrClass.length;j++){
                if(arrClass[j]==sClass){
                    arr.push(ele[i])
                    break
                }
            }

        }
        return arr;
    }
    function toArray(ele){
        var arr=[];
        for(var i=0;i<ele.length;i++){
            arr.push(ele[i])
        }
        return arr
    }
    function arrayToJson(arr){

    }

    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr]
        }else{
            return getComputedStyle(obj,false)[attr]
        }
    }
    function now(){
        return (new Date()).getTime();
    }
    function jsonLength(json){
        var len=0
        for(var attr in json){
            len++
        }
        return len;
    }

    function classIndex(arrClass,className){
        for(var i=0;i<arrClass.length;i++){
            console.log(arrClass[i]+"=="+className)
            if(arrClass[i]==className){
                return i
            }
        }
        return -1
    }
    function addClass(obj,className){
        if(obj.className==""){
            obj.className+=className
        }else{
            var arrClass=obj.className.split(" ");
            var index=classIndex(arrClass,className);
            if(index==-1){
                arrClass.push(className);
                obj.className=arrClass.join(" ")
            }
            console.log(arrClass)
        }
    }
    function removeClass(obj,className){
        var arrClass=obj.className.split(" ");
        var index=classIndex(arrClass,className);
        if(index!=-1){
            arrClass.splice(index,1)
            obj.className=arrClass.join(" ")
        }
    }


    //辅助函数区域

    // Tween.js 算法区域
    var Tween = {
        linear: function (t, b, c, d){  //匀速
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){  //加速减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){  //加加速曲线
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){  //减减速曲线
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c;
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 3.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        backBoth: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },
        bounceOut: function(t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },
        bounceBoth: function(t, b, c, d){
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    };

    function move(obj,queue){
        var inform = queue.shift()
        var iCur={};

        for(var attr in inform[0]){
            if(attr=="opacity"){
                iCur[attr]=Math.round(getStyle(obj,attr)*100)
            }else{
                iCur[attr]=parseInt(getStyle(obj,attr))
            }
        }

        var startTime=now();
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            var changeTime=now();
            var t=inform[1]-Math.max(0,startTime-changeTime+inform[1]);
            for(var attr in inform[0]){
                var value=Tween[inform[2]](t,iCur[attr],parseInt(inform[0][attr])-iCur[attr],inform[1]);    //时间版运动框架好像在时间上有少许误差所以回掉函数得换种方式写
                if (attr =="opacity"){
                    obj.style.opacity=value/100;
                    obj.style.filter="alpha(opacity="+value+")"
                }else{
                    obj.style[attr]=value+"px";
                }
            }
            if(t==inform[1]){
                clearInterval(obj.timer)
                queue.length && move(obj,queue)
                inform[3] && inform[3]()
            }
        },13)
    }




    // Tween 算法区域





    //构造函数区域 每一次$都是新建一个新对象的过程
    function $(vArg) {
        return new zhuhaha(vArg)
    }


    function zhuhaha(vArg) {
        this.elements = [];              //选择元素的一个集合
        switch (typeof vArg) {
            case "function":
                bindEvent(window, "load", vArg)
                break;
            case "string":
                var re = /^<\w+>\w{0,}<\/\w+>$/
                if (re.test(vArg)) {
                    var re = /^<\w+>(\w{0,})<\/(\w+)>$/
                    var s = vArg.match(re)
                    this.elements = [document.createElement(s[s.length - 1])]
                    this.elements[0].innerHTML = s[s.length - 2]
                } else {
                    var infor = vArg.split(" ");
                    var obj = $(document).find(infor[0])
                    for (var i = 1; i < infor.length; i++) {
                        obj = obj.find(infor[i])
                    }
                    this.elements = obj.elements
                }
                break
            case "object":
                if (vArg.constructor == Array) {
                    this.elements = vArg
                } else if (vArg.constructor == zhuhaha) {
                    this.elements = vArg.elements
                }
                else {
                    this.elements.push(vArg);
                }
                break
        }

    }

    zhuhaha.prototype={
        eq: function (num) {
            return $(this.elements[num])
        },
        index: function () {
            var ele = this.elements[0].parentNode.children;
            for (var i = 0; i < ele.length; i++) {
                if (ele[i] == this.elements[0]) {
                    return i
                }
            }
        },
        find:function (str) {
            var arr = [];
            if (str.charAt(0) == "#") {
                arr = arr.concat(document.getElementById(str.substring(1)))
            }
            else if (str.charAt(0) == ".") {
                for (var i = 0; i < this.elements.length; i++) {
                    arr = arr.concat(getByClass(this.elements[i], str.substring(1)))
                }
            } else {
                for (var i = 0; i < this.elements.length; i++) {
                    arr = arr.concat(toArray(this.elements[i].getElementsByTagName(str)))
                }
            }
            return $(arr)
        },
        pick:function (attr, value) {
            var arr = [];

            if (arguments.length == 2) {
                for (var i = 0; i < this.elements.length; i++) {
                    if (attr == "class") {
                        if (this.elements[i].className == value) {
                            arr.push(this.elements[i])
                        }
                    }
                    else {
                        if (getStyle(this.elements[i], attr) == value) {
                            arr.push(this.elements[i])
                        }
                    }
                }
            }
            else {
                var len = jsonLength(attr);
                for (var i = 0; i < this.elements.length; i++) {
                    var ele = 0;
                    for (var j in attr) {
                        if (getStyle(this.elements[i], j) == attr[j]) {
                            ele++;
                        }
                    }
                    if (ele == len) {
                        arr.push(this.elements[i])
                    }
                }
            }
            return $(arr)
        },
        siblings: function () {
            var ele = this.elements[0].parentNode.children;
            var arr = [];
            for (var i = 0; i < ele.length; i++) {
                if (this.elements[0] != ele[i]) {
                    arr.push(ele[i])
                }
            }
            return $(arr)
        },
        next: function () {
            var arr = [];
            var ele = this.elements[0].parentNode.children;
            var id = this.index();
            if (id == ele.length - 1) {
                alert("当前元素为兄弟节点中的最后一个，没有下一个元素")
            }
            else {
                return $(ele[id + 1])
            }
        },
        nextAll:function () {
            var arr = [];
            var ele = this.elements[0].parentNode.children;
            var id = this.index();
            for (var i = id + 1; i < ele.length; i++) {
                arr.push(ele[i])
            }
            return $(arr)
        },
        pre:function () {
            var arr = [];
            var ele = this.elements[0].parentNode.children;
            var id = this.index();
            if (id == 0) {
                alert("当前元素是兄弟节点的第一个,没有上一个元素")
            }
            else {
                return $(ele[id - 1])
            }
        },
        preAll:function () {
            var arr = [];
            var ele = this.elements[0].parentNode.children;
            var id = this.index();
            for (var i = 0; i < id; i++) {
                arr.push(ele[i])
            }
            return $(arr)
        },
        parent:function () {
            var arr = [];
            return $(this.elements[0].parentNode)
        },
        children: function () {
            var arr = [];
            return $(toArray(this.elements[0].children))
        },
        first: function () {
            return $(this.elements[0])
        },
        last:function () {
            var len = this.elements.length
            return $(this.elements[len - 1])
        },
        //选择器区域
        length:function () {
            var i = 0
            for (var attr in this.elements) {
                i++;
            }
            return i
        },
        css:function (attr, value) {
            if (arguments.length == 2) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style[attr] = value
                }
                return this
            } else {
                if (typeof attr == "object") {
                    for (var j in attr) {
                        for (var i = 0; i < this.elements.length; i++) {
                            this.elements[i].style[j] = attr[j]
                        }
                    }
                    return this
                }
                else {
                    return getStyle(this.elements[0], attr)
                }
            }
        },
        width: function (value) {
            if (this.elements[0].constructor.toString().substring(9, 15) == "Window") {
                return document.documentElement.clientWidth
            }

            if (value) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style.width = value + "px"
                }
                return this
            } else {
                return parseInt(getStyle(this.elements[0], "width"))
            }
        },
        height: function (value) {
            if (this.elements[0].constructor.toString().substring(9, 15) == "Window") {
                return document.documentElement.clientHeight
            }

            if (value) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style.height = value + "px"
                }
                return this
            } else {
                return parseInt(getStyle(this.elements[0], "height"))
            }
        },
        position:function () {
            var pos = {left: 0, top: 0}
            var obj = this.elements[0]
            while (obj.parentNode) {
                pos.left += obj.offsetLeft;
                pos.top += obj.offsetTop
                obj = obj.parentNode
            }
            return pos
        },
        offset:function () {
            var pos = {left: 0, top: 0}
            var obj = this.elements[0]
            while (obj.parentNode) {
                pos.left += obj.offsetLeft;
                pos.top += obj.offsetTop
                obj = obj.parentNode
                var sty = getStyle(obj, 'position');
                if (sty == 'absolute' || sty == 'relative' || sty == 'fixed') {
                    return pos
                }
            }
            return pos
        },
        css3:function (attr, value) {
            if (arguments.length == 2) {
                var f = attr[0].toUpperCase()
                var style = f + attr.substring(1)
                var sheet = {}
                sheet[attr] = value
                sheet["webkit" + style] = value;
                sheet["moz" + style] = value;
                sheet["o" + style] = value;
                sheet["ms" + style] = value;
                this.css(sheet)
                return this
            } else {
                if (typeof attr == "object") {
                    for (var j in attr) {
                        var f = j[0].toUpperCase()
                        var style = f + j.substring(1)
                        var sheet = {}
                        sheet[j] = attr[j]
                        sheet["webkit" + style] = attr[j];
                        sheet["moz" + style] = attr[j];
                        sheet["o" + style] = attr[j];
                        sheet["ms" + style] = attr[j];
                        this.css(sheet)
                    }
                    return this
                }
                else {
                    return this.css(attr)          //竟然有问题 我擦
                }
            }
        },
        attr:function (attr, value) {
            if (arguments.length == 2) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].setAttribute(attr, value)
                }
                return this
            } else {
                if (typeof attr == 'object') {
                    for (var i = 0; i < this.elements.length; i++) {
                        for (var key in attr) {
                            console.log(key)
                            this.elements[i].setAttribute(key, attr[key]);
                        }
                    }
                    return this
                } else {
                    return this.elements[0].getAttribute(attr)
                }
            }
        },
        val: function (value) {
            if (value) {
                this.attr("value", value)
                return this
            } else {
                return $(this.elements[0]).attr("value")
            }
        },
        html: function (str) {
            if (str) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].innerHTML = str
                }
                return this
            } else {
                return this.elements[0].innerHTML
            }
        },
        text: function (str) {
            if (str) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].innerText = str
                }
                return this
            } else {
                return this.elements[0].innerText
            }
        },
        each: function (fn) {
            for (var i = 0; i < this.elements.length; i++) {
                fn.call(this.elements[i], i)
            }
        },
        eachAndDelay:function (fn, time) {
            var This = this;
            var timer = null;
            this.each(function (i) {
                timer = setTimeout(function () {
                    fn.call(This.elements[i], i)
                }, i * time)
            });
            return this
        },
        //功能区域
        click:function (fn) {
            this.on("click", fn)
        },
        hover:function (fnOver, fnOut) {
            this.on("mouseover", fnOver);
            this.on("mouseout", fnOut)
        },
        on:function (events, fn) {
            if (typeof events == "object") {
                for (var i = 0; i < this.elements.length; i++) {
                    for (var types in events) {
                        bindEvent(this.elements[i], types, events[types])
                    }
                }
            }
            for (var i = 0; i < this.elements.length; i++) {
                bindEvent(this.elements[i], events, fn)
            }
            return this
        },
        off:function (events) {
            for (var i = 0; i < this.elements.length; i++) {
                for (var j = 0; j < this.elements[i].systemEvent[events].length; j++) {
                    this.elements[i].removeEventListener(events, this.elements[i].systemEvent[events][j], false)
                    console.log(this.elements[i].systemEvent[events][j])
                }
                this.elements[i].listioners[events] = [];
            }
            return this
        },
        trigger: function (events) {
            for (var i = 0; i < this.elements.length; i++) {
                for (var j = 0; j < this.elements[i].listioners[events].length; j++) {
                    this.elements[i].listioners[events][j]();
                }
            }
            return this
        },
        once:function (events, fn) {
            for (var i = 0; i < this.elements.length; i++) {
                var obj = this.elements[i];
                bindEvent(obj, events, function () {
                    fn.call(obj)
                    $(obj).off(events)
                })
            }
        },
        hide:function () {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = "none"
            }
            return this
        },
        show:function () {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = "block"
            }
            return this
        },
        slideUp:function (t) {
            if (t) {
                var time = t
            }
            else {
                var time = 500
            }
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].height = this.elements[i].style.height
                startMove(this.elements[i], {height: "0"}, 2000, "linear")
            }
            return this
        },
        slideDown:function (t) {
            if (t) {
                var time = t
            }
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].height = this.elements[i].style.height
                startMove(this.elements[i], {height: this.elements[i].height}, 2000, "linear")
            }
            return this
        },
        fadeIn: function (t) {
            t = t ? t : 1000
            for (var i = 0; i < this.elements.length; i++) {
                startMove(this.elements[i], {opacity: 1}, t, 'linear')
            }
            return this
        },
        fadeOut: function (t) {
            t = t ? t : 1000
            for (var i = 0; i < this.elements.length; i++) {
                startMove(this.elements[i], {opacity: 0}, t, 'linear')
            }
            return this
        },
        animate:function (json, times, fx, fn) {
            this.queue= this.queue || []
            var fn=[json,times,fx]
            var This=this
            if(!this.queue.length){
                setTimeout(function(){
                    move(This.elements[0],This.queue)
                },0)
            }
            this.queue.push(fn)
            return this
        },
        stop:function(){
            var This=this
            setTimeout(function(){
                for(var i=0;i<This.elements.length;i++){
                    This.elements[i].timer=null
                }
            },0)
        },
        transition: function (json, times) {
            this.trans = this.trans || []
            if (!times) {var times = "0s 0s"}
            var t = times.split(" ");
            if(!t[0]){t[0]="0s"}
            if(!t[1] || t[1]==" "){t[1]="0s"}
            if(!t[2]){t[2]="ease"}
            if(!t[3]){t[3]="front"}
            var runtime = t[0];
            var delayTime = parseFloat(t[1])

            if(t[3]=="front"){
                $(this).each(function (i) {
                    $(this).css3({"transition": runtime + " " + delayTime * i + 's '+t[2]}).css(json)
                })
            }

            if(t[3]=="back"){
                var len=$(this).length

                $(this).each(function (i) {
                    $(this).css3({"transition": runtime + " " + delayTime * (len-i-1) + 's '+t[2]}).css(json)
                })
            }

            return this
        },
        transitionEnd: function (fn) {
            this.elements[0].addEventListener("webkitTransitionEnd",end,false)
            this.elements[0].addEventListener("mozTransitionEnd",end,false)
            this.elements[0].addEventListener("msTransitionEnd",end,false)
            this.elements[0].addEventListener("oTransitionEnd",end,false)
            this.elements[0].addEventListener("transitionend",end,false)
            function end(){
                fn.call(this)
                this.removeEventListener("webkitTransitionEnd",end,false)
                this.removeEventListener("mozTransitionEnd",end,false)
                this.removeEventListener("msTransitionEnd",end,false)
                this.removeEventListener("oTransitionEnd",end,false)
                this.removeEventListener("transitionend",end,false)
            }
            return this
        },
        addClass:function (className) {
            for (var i = 0; i < this.elements.length; i++) {
                addClass(this.elements[i], className)
            }
            return this
        },
        removeClass:function (className) {
            for (var i = 0; i < this.elements.length; i++) {
                removeClass(this.elements[i], className)
            }
            return this
        },
        class: function (className) {
            if (className) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].className = className
                }
                return this
            } else {
                return this.elements[0].className
            }
        },
        append:function (obj) {
            console.log(obj.elements[0])
            this.elements[0].appendChild(obj.elements[0])
            return this
        },
        remove: function () {
            for (var i = 0; i < this.elements.length; i++) {
                var par = this.elements[i].parentNode;
                par.removeChild(this.elements[i])
            }
            return this
        },
        before: function (obj) {
            for (var i = 0; i < this.elements.length; i++) {
                var par = this.elements[i].parentNode;
                par.insertBefore(this.elements[0], obj.elements[i])
            }
            return this
        },
        get: function (i) {
            return this.elements[i]
        },
        constructor:zhuhaha
    }

    //扩展区域
    $.fn = zhuhaha.prototype
    zhuhaha.prototype.check = function (type) {
        var re = {
            qq: /^[1-9]\d{5,11}$/,
            email: /(^\w+@[0-9a-z]+)(\.(com)|(cn)(net))$/g,
            phone: /^1\d{10}$/
        }
        return re[type].test(this.elements[0].value)
    }
    //调试函数
    $.fn.console=function(){
        for(var i=0;i<this.elements.length;i++){
            console.log(this.elements[i])
        }
    }

    $.extend = function (json1, json2) {
        for (var attr in json2) {
            json1[attr] = json2[attr]
        }
    }

    $.fn.extend = function (json, obj) {
        if (obj) {
            for (var attr in obj) {
                json[attr] = obj[attr]
            }
        } else {
            for (var attr in json) {
                zhuhaha.prototype[attr] = json[attr]
            }
        }
    }
    //模板引擎
    $.fn.MVC=$.MVC=function(){
        var tags=this.elements || document.body.getElementsByTagName("*")
        var tagsWithControl = [];
        for (var i = 0; i < tags.length; i++) {
            tags[i].hasAttribute("control") && tagsWithControl.push(tags[i])
        }

        for (var i = 0; i < tagsWithControl.length; i++) {
            var controller = tagsWithControl[i].getAttribute("control")
            tagsWithControl[i].data=window[controller].data
            tagsWithControl[i].update=update;
            var html=tagsWithControl[i].innerHTML;
            var re = /{{[a-zA-Z0-9\.]+}}/g
            var repHtml=html.replace(re,function($0){
                var keyList=$0.match( /{{([a-zA-Z0-9\.]+)}}/)
                var key=keyList[1];
                var keySplit=key.split(".")
                var data=window[controller].data[keySplit[0]]
                if(keySplit.length>1){
                    for(var j=1;j<keySplit.length;j++){
                        data=data[keySplit[j]]
                    }
                }
                return "<span data-model="+controller+"-"+key+">"+data+"</span>"
            })
            tagsWithControl[i].innerHTML=repHtml
            var fn=window[controller].init
            fn.call(tagsWithControl[i])
        }

        function update(from,to){
            var f=from.split(".");
            var str="this.data."+from+"="+"to"
            eval(str)
            var control=this.getAttribute("control")+"-"+from;
            var tags=this.getElementsByTagName("*")
            var tagsWithData=[]
            for(var i=0;i<tags.length;i++){
                tags[i].hasAttribute("data-model") && tags[i].getAttribute("data-model")==control && tagsWithData.push(tags[i])
            }
            for(var i=0;i<tagsWithData.length;i++){
                tagsWithData[i].innerText=to
            }
        }
        $.js()
    }
    $.js=function(){
        var js=document.getElementsByTagName("js")
        var fn=[];
        for(var i=0;i<js.length;i++){
            fn.push(function(){
                eval(js[i].innerText)
            })
        }
        for(var i=0;i<js.length;i++){
            fn[i].call(js[i].parentNode)
        }
        $("js").remove()
        return this
    }

    //链式闭包ajax
    $.ajax=function(args){
        var obj = (function(){
            var xmlHttpRequest;
            if (window.ActiveXObject) {
                xmlHttpRequest = new ActiveXObeject('Microsoft.XMLHTTP');
            } else {
                xmlHttpRequest = new XMLHttpRequest();
            }
            return xmlHttpRequest;
        })();
        args.data=args.data || {}
        if(args.type && args.type=="post"){
            obj.open('post', args.url, true);
            obj.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")
            obj.send(toRequest(args.data))
        }else{
            obj.open('get', args.url + "?" + toRequest(args.data), true)
            obj.send(null)
        }

        function toRequest(json) {
            var res = "";
            for (var key in json) {
                res += key + "=" + json[key] + "&";
            }
            return res.substring(0, res.length - 1)
        }
        return {
            success:function(fn){
                obj.addEventListener("readystatechange",function(){
                    if (obj.readyState == 4 && obj.status==200 ) {
                        fn &&  fn(obj.responseText)
                        return obj.responseText;
                    }
                },false)
                return this
            },
            fail:function(fn){
                obj.addEventListener("readystatechange",function(){
                    if (obj.readyState == 4 && obj.status!=200) {
                        fn && fn(obj.status)
                    }
                },false)
                return this
            }
        }
    }



    //数据缓存机制
    $.version="zhuhaha1.4"
    $.expando=("zhuhaha"+Math.random()).replace("\.","")
    $.expandoIndex=0
    $.expandoData={}

    $.fn.data=function(){
        if(arguments.length==1){
            return $.expandoData[this.elements[0].getAttribute($.expando)][arguments[0]]
        }else{
            for(var i=0;i<this.elements.length;i++){
                if(!this.elements[i].hasAttribute($.expando)){
                    this.elements[i].setAttribute($.expando, $.expandoIndex)
                    $.expandoData[$.expandoIndex]={}
                    $.expandoData[$.expandoIndex][arguments[0]]=arguments[1]
                    $.expandoIndex++
                }else{
                    var id=this.elements[i].getAttribute($.expando)
                    var newJson={}
                    newJson[arguments[0]]=arguments[1]
                    $.extend($.expandoData[id],newJson)
                }
            }
            return this
        }
    }
    //扩展移动端事件
    $.fn.extend({
        touch:{},
        _bindSwipe:function(fn,type){
            var This=this
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].addEventListener("touchstart",function(e){
                    This.touch.x1= e.changedTouches[0].clientX
                    This.touch.y1= e.changedTouches[0].clientY
                },false)
                this.elements[i].addEventListener("touchend",function(e){
                    This.touch.x2= e.changedTouches[0].clientX
                    This.touch.y2= e.changedTouches[0].clientY
                    if(Math.abs(This.touch.x1 - This.touch.x2)>30 || Math.abs(This.touch.y1 - This.touch.y2) > 30 ){
                        var dir=This._swipeDirection(  This.touch.x1,This.touch.x2,This.touch.y1, This.touch.y2)
                    }
                    type===dir && fn.call(This)
                    type==="swipe" && fn.call(This)
                },false)
            }
        },
        swipe:function(fn){
            $(this)._bindSwipe(fn,"swipe")
            return this
        },
        swipeLeft:function(fn){
            $(this)._bindSwipe(fn,"Left")
            return this
        },
        swipeUp:function(fn){
            $(this)._bindSwipe(fn,"Up")
            return this
        },
        swipeRight:function(fn){
            $(this)._bindSwipe(fn,"Right")
            return this
        },
        swipeDown:function(fn){
            $(this)._bindSwipe(fn,"Down")
            return this
        },
        ontouch:function(dir,fn){
            var first=dir.substr(0,1).toUpperCase();
            var second=dir.substr(1)
            $(this)._bindSwipe(fn,first+second)
            return this
        },
        _swipeDirection:function (x1,x2,y1,y2){
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },
        _bindTap:function(fn,type){
            var This=this
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].addEventListener("touchstart",function(e){
                    This.touch.x1= e.changedTouches[0].clientX
                    This.touch.y1= e.changedTouches[0].clientY
                    This.start= This.time()
                },false)
                this.elements[i].addEventListener("touchend",function(e){
                    This.touch.x2= e.changedTouches[0].clientX
                    This.touch.y2= e.changedTouches[0].clientY
                    var taping=(Math.abs(This.touch.x1 - This.touch.x2)<30 && Math.abs(This.touch.y1 - This.touch.y2) < 30)
                    This.end= This.time()

                    if(This.end-This.start<200 && taping && type=="short"){
                        fn.call(This)
                    }
                    if(This.end-This.start>500 && taping && type=='long'){
                        fn.call(This)
                    }

                },false)
            }
        },
        tap:function(fn){
            $(this)._bindTap(fn,'short')
            return this
        },
        longTap:function(fn){
            $(this)._bindTap(fn,'long')
            return this
        },
        time:function(){
            return new Date().getTime()
        }
    })

    // 自己创造 的 jquery 没有的方法 有 pick  css3  transition transitionend eachandDelay MVC ajax touch 扩展 几个方法 都很好玩哦
})(window)