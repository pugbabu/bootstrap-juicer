(function () {
    $.location = {
        queryParse: function (str) {
            var splits = str.split("&"),
                parse = {};

            for (var i = 0, l = splits.length; i < l; i++) {
                var query = splits[i],
                    eqIndex = query.indexOf("=");

                if (eqIndex !== -1) {
                    var key = query.substring(0, eqIndex),
                        value = query.substring(eqIndex + 1);
                    parse[key] = decodeURIComponent(value);
                }
            }
            return parse;
        },
        reloadSearch: function () {
            history.replaceState(null, "", "?" + $.param(this.search));
        },
        extendSearch: function (data) {
            $.extend(this.search, data);
            this.reloadSearch();
        }
    };

    function getSearchParams() {
        var search = location.search;
        if (search[0] === "?") {
            search = search.substring(1);
        }

        return $.location.queryParse(search);
    }

    function initProjectRootPath() {
        var reg = new RegExp('(\\S+)' + $.properties.pagePath),
            mat = location.href.match(reg);

        if (mat) {
            $.properties.rootPath = mat[0];
        } else {

        }
        $.properties.rootPath = mat ? mat[1] : '/';
    }

    $.location.search = getSearchParams();
    initProjectRootPath();

    var token = $.cookie('token');
    $.post = function (url, params, success, withoutToken) {
        $('body').loading().open();
        var random = Math.random();
        var properties = $.properties;
        if (typeof params === "function") {
            success = params;
            params = {token: token};
        } else if(typeof params.token === 'undefined'){
            params.token = token ;
            params.random = random;
        }
        return $.ajax({
            url: properties.rootPath + properties.ajaxPath + url,
            data: (params && JSON.stringify(params)),
            processData: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                $('body').loading().close();
                if (data.result === 'INVALID_TOKEN' || data.result === "INVALID_USER_TOKEN") {
                    if (self != top) {

                        window.top.location.href = properties.rootPath + properties.pagePath + 'login.htm';
                    }
                    location.href = properties.rootPath + properties.pagePath + 'login.htm';
                } else if (data.result === "INVALID_PURVIEW") {
                    alert(data.resultMessage);
                    return;
                }
                else {
                    success && success(data);
                }
            },error:function () {
                $('body').loading().close();
            }
        });
    };

    $.get = function (url, params, success, withoutToken) {
        $('body').loading().open();
        var random = Math.random();
        var properties = $.properties;
        if (typeof params === "function") {
            success = params;
            params = {token: token};
        } else if(typeof params.token === 'undefined'){
            params.token = token ;
            params.random = random;
        }
        return $.ajax({
            url: 'http://127.0.0.1' + url,
            data: params,
            type: "GET",
            success: function (data) {
                $('body').loading().close();
                if (data.result === 'INVALID_TOKEN' || data.result === "INVALID_USER_TOKEN") {
                    if (self != top) {
                        window.top.location.href = properties.rootPath + properties.pagePath + 'login.htm';
                    }
                    location.href = properties.rootPath + properties.pagePath + 'login.htm';
                } else if (data.result === "INVALID_PURVIEW") {
                    alert(data.resultMessage);
                    return;
                }
                else {
                    success && success(data);
                }
            },error:function () {
                $('body').loading().close();
            }
        });
    };

    var interpolateOpen = '${', interpolateClose = '}';

    function fillElement($el, value) {
        var tagName = $el[0].tagName;

        switch (tagName) {
            case 'INPUT':
                var type = $el.attr('type');

                if (type === 'radio' || type === 'checkbox') {
                    $el.prop('checked', $el.val() === value);
                } else {
                    $el.val(value);
                }
                break;
            case 'SELECT':
                $el.val(value);
                break;
            case 'IMG':
                $el.attr('src', value);
                break;
            case 'TEXTAREA':
                $el.val(value);
                break;
            default :
                $el.html(value);
                break;
        }
    }

    $.fn.extend({
        juicer: function (data) {
            if (data === null) {
                this.data('juicer', null);
                return;
            }

            var scope = this.data('juicer');
            if (!scope) {
                scope = {_search: $.location.search};
                this.data('juicer', scope);
            }

            $.extend(scope, data);

            this.find('[juicer]').each(function () {

                var $this = $(this),
                    tpl = $this.attr('juicer');

                if (tpl.charAt(0) === '#') {
                    $this.html(juicer($(tpl).html(), scope));
                } else {
                    var value = juicer(interpolateOpen + tpl + interpolateClose, scope);

                    fillElement($this, value);
                }
            });

            return scope;
        }
    });

    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    if (browser == "Microsoft Internet Explorer") {
        var trim_Version = version[0].replace(/[ ]/g, "");
        if (trim_Version == "MSIE6.0") {
            alert("请使用IE10及以上版本访问");
            return false;
        }
        else if (trim_Version == "MSIE7.0") {
            alert("请使用IE10及以上版本访问");
            return false;
        }
        else if (trim_Version == "MSIE8.0") {
            alert("请使用IE10及以上版本访问");
            return false;
        }
        else if (trim_Version == "MSIE9.0") {
            alert("请使用IE10及以上版本访问");
            return false;
        }
    }

})();
(function () {
    var loadingHtml = '<div class="loading">' +
        '<div class="spinner">' +
        '<div class="spinner-container"><div class="spinner-circle" ></div><div class="spinner-circle" style="-webkit-animation-delay: -0.9s;"></div> <div class="spinner-circle" style=" -webkit-animation-delay: -0.6s;"></div> <div class="spinner-circle" style="-webkit-animation-delay: -0.3s;"></div></div>' +
        '<div class="spinner-container" style="-webkit-transform: rotateZ(45deg);"><div class="spinner-circle" style="-webkit-animation-delay: -1.1s;"></div><div class="spinner-circle" style="-webkit-animation-delay: -0.8s;"></div><div class="spinner-circle" style="-webkit-animation-delay: -0.5s;"></div><div class="spinner-circle" style=" -webkit-animation-delay: -0.2s;"></div></div>' +
        '<div class="spinner-container" style="-webkit-transform: rotateZ(90deg);"><div class="spinner-circle" style="-webkit-animation-delay: -1.0s;"></div><div class="spinner-circle" style="-webkit-animation-delay: -0.7s;"></div><div class="spinner-circle" style="-webkit-animation-delay: -0.4s;"></div><div class="spinner-circle" style="-webkit-animation-delay: -0.1s;"></div> </div>' +
        '</div></div>';

    function createLoading(el) {

        var $ldEl = $(loadingHtml).appendTo(el);

        return {
            open: function () {
                $ldEl.show();
            },
            close: function () {
                $ldEl.hide();
            }
        };
    }

    $.fn.loading = function () {
        var loading = this.data('loading');

        if (!loading) {
            this.data('loading', loading = createLoading(this));
        }

        return loading;
    };
})();
$(function () {
    if ($("#searchForm").length > 0) {
        $("#searchForm").find(".row").last().append(
            "<button type='submit' class='btn-cancel' id='clearCondition'>清空</button>"
        );
        $("#clearCondition").on("click", function () {
            $.each($(this).closest("#searchForm").find("select"), function (index, obj) {
                $(obj).find("option:first").prop("selected", "selected")
            });

            $.each($(this).closest("#searchForm").find("input"), function (index, obj) {
                $(obj).val("");
            });
            try {
                if (clearConditionFunc) {
                    clearConditionFunc();
                }
            } catch (err) {
            }
            try {
                if (commonSearch) {
                    commonSearch.deleteSearchParamsFromStorage();
                }
            } catch (err) {
            }

            try {
                if (commonSort) {
                    commonSort.deleteSort($("#searchForm"));
                }
            } catch (err) {
            }
        })
    }
    if ($(".table-detail-style").length > 0) {
        $.each($(".table-detail-style tr"), function (index, obj) {
            var $this = $(this);
            if ($this.index() % 2 == 0) {
                $this.find('th').addClass('first-line');
                $this.find('td').addClass('first-line');
            } else {
                $this.find('th').addClass('second-line');
                $this.find('td').addClass('second-line');
            }
        })
    }
});
//解析URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
//返回URL到项目名
function getUrlPortFlolder() {
    var pathNameList = window.location.pathname.split("/");
    var pathList = "/" + pathNameList[1];
    return (window.location.protocol + '//' + window.location.host + pathList + "/");
}
(function () {
    !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=t("vertx");return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?(j(t,it.error),it.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(T,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=P(r,o),s===st?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"==typeof require?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new M,st=new M,ut=0;return Y.prototype._enumerate=function(t){for(var e=0;this._state===nt&&e<t.length;e++)this._eachEntry(t[e],e)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U.polyfill(),U});
})();