(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'juicer'], factory);
    } else {
        factory(jQuery, juicer);
    }
}(function ($, juicer) {

    /**
     *
     * @type {Object}
     */
    var defaultOptions = {
        /**
         * 模版
         * @type {string}
         */
        template: null,
        /**
         * 请求翻页数据
         * @param {number} currentPage
         * @param {number} pageSize
         * @param {Object} deferred
         * @type {Function}
         */
        request: null,
        updateSearch: true,
        mode: 'pagination',
        pageSize: 10,
        nameOfCurrentPage: 'cp',
        nameOfPageSize: 'ps',
        onPageChange: null,
        back: false
    };


    /**
     *
     * @param el
     * @param options
     * @constructor
     */
    function Paging(elem, options) {
        $.extend(this, defaultOptions, options);

        this.elem = $(elem);

        this.dirty = false;
        /**
         * 初始化翻页mode
         */
        Paging.modes[this.mode].call(this);
    }

    Paging.prototype = {
        /**
         * 下一页，通过生成的promise判断是否成功翻页，
         * 若成功，paging.currentPage 更新为targetPage
         * 若失败，什么都不做
         * @param {Number} targetPage
         */
        loadPage: function (targetPage, success, fail) {
            var deferred = $.Deferred(),
                promise = deferred.promise();

            this.request(targetPage, this.pageSize, deferred, $.location.search);
            promise.then(success, fail);
        },
        parse: function (dataList) {
            var template = "{@each _ as _r,_i}" + this.template + "{@/each}";
            if (this.juicer) {
                $.each(this.juicer, function (key, value) {
                    juicer.register(key, value);
                });
            }

            return juicer(template, dataList);
        }
    };

    /**
     *
     * @type {{pagination: {optName: string, init: Function}}}
     */
    Paging.modes = {
        pagination: function () {

            var $list = $('<ul class="pagination"/>');

            var me = this;

            me.pageSize = me.pageSize || $.location.search[me.nameOfPageSize] || 10;

            $(this.pagination).html($list);

            var $pre = $('<li><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>');

            var $next = $('<li><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');

            var go = "<li class='default-color' style='margin:0 10px;'>去<input type='text' id='pagination_gv' style='width:40px;padding:5px;margin:0 5px;'>页</li><li><button class='btn-inter'>跳转</button></li>";

            function addDot() {
                $list.append('<li><span>. . .</span></li>');
            }

            function addPageNum(start, end, currentPage) {
                for (var i = start; i <= end; i++) {
                    $list.append('<li class="' +
                        ((i === currentPage) ? 'active' : '') +
                        '"><a data-pn="' + i + '">' + i + '</a></li>');
                }
            }

            me.render = function (currentPage) {
                var pageAmount = me.pageAmount;
                $list.empty();
                $list.append($pre);
                var $go = go;
                if (typeof (me.totalRecordCount) != 'undefined') {
                    $go = $(go + '<li class="default-color" style="margin-left: 10px;font-size: 14px;">    共：' + me.totalRecordCount + ' 条</li>');
                }
                if (me.back) {
                    $go = $(go + '<li><button class="btn-inter" onclick="history.go(-1)" style="position:absolute;right:16px">返回</button></li>');
                }
                $list.append($go);
                var start = currentPage - 2,
                    end = currentPage + 2;

                if (start < 1) {
                    start = 1;
                    end = Math.min(5, pageAmount);
                } else if (end > pageAmount) {
                    start = Math.max(1, pageAmount - 4);
                    end = pageAmount;
                } else if (end === (pageAmount - 1)) {
                    end = pageAmount;
                }
                if (start <= 3) {
                    addPageNum(1, end, currentPage);
                } else {
                    addPageNum(1, 2, currentPage);
                    addDot();
                    addPageNum(start, end, currentPage);
                }

                if (end < (pageAmount - 1)) {
                    addDot();
                }

                if (end < pageAmount) {
                    addPageNum(pageAmount, pageAmount, currentPage);
                }
                if (currentPage === 1) {
                    $pre.addClass("disabled")
                } else {
                    $pre.removeClass("disabled").children().attr("data-pn", currentPage - 1);
                }

                if (currentPage === pageAmount) {
                    $next.addClass("disabled");
                } else {
                    $next.removeClass("disabled").children().attr("data-pn", currentPage + 1);
                }

                $list.append($next);
            };

            me.goToPage = function (targetPage) {
                if (me.loading) {
                    return;
                }
                var urlParams = $.location.search;

                if (typeof targetPage === 'undefined') {
                    //var urlPage = urlParams[me.nameOfCurrentPage];
                    //targetPage = urlPage ? Number(urlPage) : 1;
                    try {
                        var lastPageNum = commonSearch.getLastPageNum();
                        targetPage = lastPageNum ? Number(lastPageNum) : 1;
                    } catch (err) {
                        targetPage = 1;
                    }
                } else {
                    targetPage = Number(targetPage);
                }

                if (me.updateSearch) {
                    urlParams[me.nameOfCurrentPage] = targetPage;
                    $.location.reloadSearch();
                }

                me.currentPage = targetPage;

                if (me.dirty) {
                    me.render(targetPage);
                }

                me.loading = true;
                me.loadPage(targetPage, function (dataList, pageAmount, totalRecordCount) {
                    me.loading = false;

                    if (pageAmount === 0) {
                        pageAmount = 1;
                    }

                    me.dataList = dataList;
                    me.pageAmount = pageAmount;
                    me.totalRecordCount = totalRecordCount;

                    me.elem.html(me.parse(dataList));

                    if (!me.dirty) {
                        me.render(targetPage);
                    }

                    me.dirty = true;

                    me.changeGoValue(targetPage);

                    if (typeof targetPage == 'undefined') {
                        me.onPageChange && me.onPageChange(1);
                    } else {
                        me.onPageChange && me.onPageChange(targetPage);
                    }
                }, function () {
                    me.loading = false;
                });
            };

            $list.on("click", "a", function (e) {
                var $a = $(this),
                    $li = $a.parent();
                if (!$li.hasClass('disabled')) {
                    var target = Number($a.attr('data-pn'));

                    if (target !== me.currentPage) {
                        if (typeof commonSearch != 'undefined' && commonSearch != null) {
                            commonSearch.gotoPage();
                        }
                        me.goToPage(target);
                    }
                }
            }).on('click', 'button', function () {
                var target = Number($("#pagination_gv").val());
                var pageAmount = me.pageAmount;
                if (target > pageAmount) {
                    target = pageAmount;
                }
                if(!/^[0-9]*[1-9][0-9]*$/.test(target)){
                    target = 1;
                }
                me.goToPage(target);
            });
            me.changeGoValue = function (value) {
                $("#pagination_gv").val(value);
            };

            if (typeof commonSearch != 'undefined' && commonSearch != null) {
                commonSearch.gotoPage();
            }

            me.goToPage();

            me.reload = function () {
                me.dirty = false;

                me.goToPage(1);
            };
        }
    };

    $.fn.paging = function (options) {
        if (this.length > 0) {
            return new Paging(this[0], options);
        }
    }
}));