var commonSearch = {
    $form: $('#searchForm'),
    saveSearchParamsToStorage: function ($form) {
        if (typeof $form === 'undefined') {
            $form = commonSearch.$form;
        }
        var sessionStorage = window.sessionStorage;
        var URL = document.URL.split('/');
        var urlKey = URL[URL.length - 1];
        urlKey = urlKey.split('?')[0];
        var searchParams = sessionStorage.getItem("searchParams");
        if (typeof searchParams != 'undefined' && searchParams != null) {
            searchParams = JSON.parse(searchParams);
            var params__ = {};
            $.extend(params__, searchParams[urlKey], $form.serializeObject());
            searchParams[urlKey] = params__;
        } else {
            searchParams = {};
            searchParams[urlKey] = $form.serializeObject();
        }
        sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
    },
    getListPageState: function (callback) {
        var urlParams = $.location.search;
        if ('state' in urlParams && urlParams.state == 'back') {
            var sessionStorage = window.sessionStorage;
            var searchParams = sessionStorage.getItem("searchParams");
            var URL = document.URL.split('/');
            var urlKey = URL[URL.length - 1];
            urlKey = urlKey.split('?')[0];
            searchParams = JSON.parse(searchParams);
            try {
                if (searchParams[urlKey] != 'undefined' && searchParams[urlKey] != null) {
                    this.gotoPage(callback);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            this.deleteSearchParamsFromStorage();
        }
    },
    gotoPage: function (callback) {
        var sessionStorage = window.sessionStorage;
        var URL = document.URL.split('/');
        var urlKey = URL[URL.length - 1];
        urlKey = urlKey.split('?')[0];
        var searchParams = JSON.parse(sessionStorage.getItem("searchParams"));
        if (searchParams == null || typeof searchParams == 'undefined') {
            return;
        }
        var searchTableParams = searchParams[urlKey];

        if (typeof searchTableParams == 'undefined') {
            return;
        }
        $("#searchForm input").each(function () {
            var id_ = $(this).attr('id');
            fillElement($(this), searchTableParams[id_]);
        });
        $("#searchForm select").each(function () {
            var id_ = $(this).attr('id');
            fillElement($(this), searchTableParams[id_]);
        });

        callback && callback(searchTableParams);

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

    },
    deleteSearchParamsFromStorage: function () {
        var sessionStorage = window.sessionStorage;
        var URL = document.URL.split('/');
        var urlKey = URL[URL.length - 1];
        urlKey = urlKey.split('?')[0];
        var searchParams = sessionStorage.getItem("searchParams");
        if (typeof searchParams != 'undefined' && searchParams != null) {
            searchParams = JSON.parse(searchParams);
            delete searchParams[urlKey];
            sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
        }
    },
    saveLastPageNum: function (pageNum) {
        var sessionStorage = window.sessionStorage;
        var URL = document.URL.split('/');
        var urlKey = URL[URL.length - 1];
        urlKey = urlKey.split('?')[0];
        var searchParams = sessionStorage.getItem("searchParams");
        searchParams = JSON.parse(searchParams);
        var params__ = {};
        $("#searchForm").find('input').each(function () {
            var obj = {};
            obj[$(this).attr('id')] = $(this).val();
            $.extend(params__, params__, obj);
        });
        $("#searchForm").find('select').each(function () {
            var obj = {};
            obj[$(this).attr('id')] = $(this).val();
            $.extend(params__, params__, obj);
        });
        if (typeof searchParams !== 'undefined' && searchParams !== null) {
            if(typeof searchParams[urlKey] === 'undefined'){
                searchParams[urlKey] = {};
            }
            $.extend(searchParams[urlKey], searchParams[urlKey], params__);
        } else {
            searchParams = {};
            searchParams[urlKey] = params__;
        }
        var data1 = {
            lastPageNum: pageNum
        };
        $.extend(searchParams[urlKey], searchParams[urlKey], data1);
        sessionStorage.setItem("searchParams", JSON.stringify(searchParams));

    },
    getLastPageNum: function () {
        var sessionStorage = window.sessionStorage;
        var URL = document.URL.split('/');
        var urlKey = URL[URL.length - 1];
        urlKey = urlKey.split('?')[0];
        var searchParams = sessionStorage.getItem("searchParams");
        if (searchParams) {
            searchParams = JSON.parse(searchParams);
            var PageNum;
            try {
                PageNum = searchParams[urlKey].lastPageNum;
            } catch (err) {

            }
            return PageNum;
        }
    },
    deleteLastPageNum: function () {
        var sessionStorage = window.sessionStorage;
        var URL = document.URL.split('/');
        var urlKey = URL[URL.length - 1];
        urlKey = urlKey.split('?')[0];
        var searchParams = JSON.parse(sessionStorage.getItem("searchParams"));
        searchParams[urlKey].lastPageNum = 1;
        sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
    }
};

