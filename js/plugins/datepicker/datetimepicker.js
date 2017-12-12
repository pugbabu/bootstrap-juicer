/*
* Kendo UI Complete v2012.3.1114 (http://kendoui.com)
* Copyright 2012 Telerik AD. All rights reserved.
*
* Kendo UI Complete commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-complete-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
(function(e,t){function n(e,t,n){var i,o=e.getTimezoneOffset();e.setTime(e.getTime()+t),n||(i=e.getTimezoneOffset()-o,e.setTime(e.getTime()+i*D))}function i(){var e=new N,t=new N(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0),n=new N(e.getFullYear(),e.getMonth(),e.getDate(),12,0,0);return-1*(t.getTimezoneOffset()-n.getTimezoneOffset())}function o(e){return 60*e.getHours()*D+e.getMinutes()*D+1e3*e.getSeconds()+e.getMilliseconds()}function r(e,t,n){var i,r=o(t),a=o(n);return e&&r!=a?(i=o(e),r>i&&(i+=V),r>a&&(a+=V),i>=r&&a>=i):!0}function a(e){var t=e.parseFormats;e.format=c(e.format||l.getCulture(e.culture).calendars.standard.patterns.t),t=O(t)?t:[t],t.splice(0,0,e.format),e.parseFormats=t}function s(e){e.preventDefault()}var l=window.kendo,u=l.keys,c=l._extractFormat,p=l.ui,f=p.Widget,d="open",m="close",h="change",v=".kendoTimePicker",g="touchend"+v+" click"+v,_="k-state-default",w="disabled",k="li",x="<span/>",y="k-state-focused",C="k-state-hover",b="mouseenter"+v+" mouseleave"+v,T="mousedown"+v,D=6e4,V=864e5,H="k-state-selected",M="k-state-disabled",S="aria-selected",F="aria-expanded",W="aria-hidden",A="aria-activedescendant",I="id",O=e.isArray,B=e.extend,E=e.proxy,N=Date,P=new N;P=new N(P.getFullYear(),P.getMonth(),P.getDate(),0,0,0);var z=function(t){var n=this,i=t.id;n.options=t,n.ul=e('<ul tabindex="-1" role="listbox" aria-hidden="true" unselectable="on" class="k-list k-reset"/>').css({overflow:l.support.kineticScrollNeeded?"":"auto"}).on(g,k,E(n._click,n)).on("mouseenter"+v,k,function(){e(this).addClass(C)}).on("mouseleave"+v,k,function(){e(this).removeClass(C)}),n.list=e("<div class='k-list-container'/>").append(n.ul).on(T,s),i&&(n._timeViewID=i+"_timeview",n._optionID=i+"_option_selected",n.ul.attr(I,n._timeViewID)),n._popup(),n.template=l.template('<li tabindex="-1" role="option" class="k-item" unselectable="on">#=data#</li>',{useWithBlock:!1})};z.prototype={current:function(n){var i=this,o=i.options.active;return n===t?i._current:(i._current&&i._current.removeClass(H).removeAttr(S).removeAttr(I),n&&(n=e(n).addClass(H).attr(I,i._optionID).attr(S,!0),i.scroll(n[0])),i._current=n,o&&o(n),t)},close:function(){this.popup.close()},destroy:function(){var e=this;e.ul.off(v),e.list.off(v),e.popup.destroy()},open:function(){var e=this;e.ul[0].firstChild||e.bind(),e.popup.open(),e._current&&e.scroll(e._current[0])},dataBind:function(e){for(var t,n=this,i=n.options,o=i.format,a=l.toString,s=n.template,u=e.length,c=0,p="";u>c;c++)t=e[c],r(t,i.min,i.max)&&(p+=s(a(t,o,i.culture)));n._html(p,u)},refresh:function(){var e,t=this,r=t.options,a=r.format,s=i(),u=0>s,c=r.min,p=r.max,f=o(c),d=o(p),m=r.interval*D,h=l.toString,v=t.template,g=new N(+c),_=0,w="";for(e=u?(V+s*D)/m:V/m,f!=d&&(f>d&&(d+=V),e=(d-f)/m+1);e>_;_++)_&&n(g,m,u),d&&o(g)>d&&(g=new N(+p)),w+=v(h(g,a,r.culture));t._html(w,e)},bind:function(){var e=this,t=e.options.dates;t&&t[0]?e.dataBind(t):e.refresh()},_html:function(e,t){var n=this;n.ul[0].innerHTML=e,n._height(t),n.current(null),n.select(n._value)},scroll:function(e){if(e){var t=this.ul[0],n=e.offsetTop,i=e.offsetHeight,o=t.scrollTop,r=t.clientHeight,a=n+i;t.scrollTop=o>n?n:a>o+r?a-r:o}},select:function(t){var n=this,i=n.options,o=n._current;t instanceof Date&&(t=l.toString(t,i.format,i.culture)),"string"==typeof t&&(o&&o.text()===t?t=o:(t=e.grep(n.ul[0].childNodes,function(e){return(e.textContent||e.innerText)==t}),t=t[0]?t:null)),n.current(t)},toggle:function(){var e=this;e.popup.visible()?e.close():e.open()},value:function(e){var t=this;t._value=e,t.ul[0].firstChild&&t.select(e)},_click:function(t){var n=this,i=e(t.currentTarget);t.isDefaultPrevented()||(n.select(i),n.options.change(i.text(),!0),n.close())},_height:function(e){if(e){var t=this,n=t.list,i=n.parent(".k-animation-container"),o=t.options.height;n.add(i).show().height(t.ul[0].scrollHeight>o?o:"auto").hide()}},_parse:function(e){var t=this,n=t.options,i=t._value||P;return e instanceof N?e:(e=l.parseDate(e,n.parseFormats,n.culture),e&&(e=new N(i.getFullYear(),i.getMonth(),i.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds())),e)},_popup:function(){var e,t=this,n=t.list,i=t.options,o=i.anchor;t.popup=new p.Popup(n,B(i.popup,{anchor:o,open:i.open,close:i.close,animation:i.animation,isRtl:l.support.isRtl(i.anchor)})),e=o.outerWidth()-(n.outerWidth()-n.width()),n.css({fontFamily:o.css("font-family"),width:e}),l.touchScroller(t.popup.element)},move:function(e){var n=this,i=e.keyCode,o=n.ul[0],r=n._current,a=i===u.DOWN;if(i===u.UP||a){if(e.altKey)return n.toggle(a),t;r=a?r?r[0].nextSibling:o.firstChild:r?r[0].previousSibling:o.lastChild,r&&n.select(r),n.options.change(n._current.text()),e.preventDefault()}else(i===u.ENTER||i===u.TAB||i===u.ESC)&&(e.preventDefault(),r&&n.options.change(r.text(),!0),n.close())}},z.getMilliseconds=o,l.TimeView=z;var R=f.extend({init:function(e,t){var n,i,o=this;f.fn.init.call(o,e,t),e=o.element,t=o.options,a(t),o._wrapper(),o.timeView=i=new z(B({},t,{id:e.attr(I),anchor:o.wrapper,format:t.format,change:function(t,n){n?o._change(t):e.val(t)},open:function(t){o.trigger(d)?t.preventDefault():(e.attr(F,!0),n.attr(W,!1))},close:function(t){o.trigger(m)?t.preventDefault():(e.attr(F,!1),n.attr(W,!0))},active:function(t){e.removeAttr(A),t&&e.attr(A,i._optionID)}})),n=i.ul,o._icon(),o._reset(),e[0].type="text",e.addClass("k-input").on("keydown"+v,E(o._keydown,o)).on("blur"+v,E(o._blur,o)).on("focus"+v,function(){o._inputWrapper.addClass(y)}).attr({role:"textbox","aria-haspopup":!0,"aria-expanded":!1,"aria-owns":i._timeViewID}),o.enable(!e.is("[disabled]")),o.value(t.value||e.val()),l.notify(o)},options:{name:"TimePicker",min:P,max:P,format:"",dates:[],parseFormats:[],value:null,interval:30,height:200,animation:{}},events:[d,m,h],setOptions:function(e){var t=this,n=t.timeView,i=n.options;f.fn.setOptions.call(t,e),a(t.options),n.options=B(i,t.options,{active:i.active,change:i.change,close:i.close,open:i.open}),n.ul[0].innerHTML=""},dataBind:function(e){O(e)&&this.timeView.dataBind(e)},enable:function(e){var t=this,n=t.element,i=t._arrow.off(v),o=t._inputWrapper.off(b);e===!1?(o.removeClass(_).addClass(M),n.attr(w,w)):(o.removeClass(M).addClass(_).on(b,t._toggleHover),n.removeAttr(w),i.on(g,E(t._click,t)).on(T,s))},destroy:function(){var e=this;f.fn.destroy.call(e),e.timeView.destroy(),e.element.off(v),e._arrow.off(v),e._inputWrapper.off(v),e._form&&e._form.off("reset",e._resetHandler)},close:function(){this.timeView.close()},open:function(){this.timeView.open()},min:function(e){return this._option("min",e)},max:function(e){return this._option("max",e)},value:function(e){var n=this;return e===t?n._value:(n._old=n._update(e),t)},_blur:function(){var e=this;e.close(),e._change(e.element.val()),e._inputWrapper.removeClass(y)},_click:function(e){var t=this,n=t.element;t.timeView.toggle(),"click"===e.type&&n[0]!==document.activeElement&&n.focus()},_change:function(e){var t=this;e=t._update(e),+t._old!=+e&&(t._old=e,t.trigger(h),t.element.trigger(h))},_icon:function(){var t,n=this,i=n.element;t=i.next("span.k-select"),t[0]||(t=e('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-clock">select</span></span>').insertAfter(i)),n._arrow=t.attr({role:"button","aria-controls":n.timeView._timeViewID})},_keydown:function(e){var t=this,n=e.keyCode,i=t.timeView;i.popup.visible()||e.altKey?i.move(e):n===u.ENTER&&t._change(t.element.val())},_option:function(e,n){var i=this,o=i.options;return n===t?o[e]:(n=i.timeView._parse(n),n&&(n=new N(+n),o[e]=n,i.timeView.options[e]=n,i.timeView.bind()),t)},_toggleHover:function(t){e(t.currentTarget).toggleClass(C,"mouseenter"===t.type)},_update:function(e){var t=this,n=t.options,i=t.timeView,o=i._parse(e);return r(o,n.min,n.max)||(o=null),t._value=o,t.element.val(o?l.toString(o,n.format,n.culture):e),i.value(o),o},_wrapper:function(){var t,n=this,i=n.element;t=i.parents(".k-timepicker"),t[0]||(t=i.wrap(x).parent().addClass("k-picker-wrap k-state-default"),t=t.wrap(x).parent()),t[0].style.cssText=i[0].style.cssText,i.css({width:"100%",height:i[0].style.height}),n.wrapper=t.addClass("k-widget k-timepicker k-header").addClass(i[0].className),n._inputWrapper=e(t[0].firstChild)},_reset:function(){var e=this,t=e.element,n=t.closest("form");n[0]&&(e._resetHandler=function(){e.value(t[0].defaultValue)},e._form=n.on("reset",e._resetHandler))}});p.plugin(R)})(window.kendo.jQuery);