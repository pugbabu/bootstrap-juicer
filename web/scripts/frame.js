(function () {
    var idIndex = 1;
    var $tabList;

    var $tabContent;

    var $navList;
    /**
     * tab列表
     * {id:***,url:***,loaded:***}
     * @type {Array}
     */
    var tabList = [];

    var userInfo;

    /**
     * 当前打开的tab
     * @type {Object}
     */
    var activeTab = null;

    var Template = '{@each _ as first}<li>' +
        '{@if first.children}' +
        '<a data-type="0"><span class="fam-icon ${first.purviewImg}"/>${first.purviewName}</a>' +
        '<ul>' +
        '{@each first.children as sec}' +
        '<li><a data-type="2" data-href="${sec.purviewUrl}" data-id="${sec.purviewId}" data-title="${sec.purviewName}">${sec.purviewName}' +
        '<span class="plus"></span></a></li>' +
        '{@/each}' +
        '</ul>' +
        '{@else}' +
        '<a data-type="1" data-href="${first.purviewUrl}" data-ids="${first.purviewId}" data-title="${first.purviewName}">' +
        '<span class="fam-icon ${first.purviewImg}"/>${first.purviewName}' +
        '<span class="plus"></span></a>' +
        '{@/if}' +
        '</li>{@/each}';

    function navListClick(e) {
        var $navList = $('#leftNavList'),
            $me = $(this),
            type = $me.attr('data-type'),
            href = $me.attr('data-href');

        if (type === '0') {
            if ($me.hasClass('opened')) {
                $me.removeClass('opened');
            } else {
                $navList.find('.opened').removeClass('opened');
                $me.addClass('opened');
            }
        } else {
            if (e.target.tagName === 'SPAN') {
                openTab(openLinkInNewTab($me.attr('data-id'), href, $me.attr('data-title')));
            } else {
                openLinkInCurTab($me.attr('data-id'), href, $me.attr('data-title'));
            }
        }
    }

    function openMenu(menuId) {
        $navList.find('.opened').removeClass('opened');
        $navList.find('a.active').removeClass('active');

        var $el = $navList.find('a[data-id="' + menuId + '"]');
        $el.addClass('active');

        if ($el.attr('data-type') === '2') {
            $el.closest('ul').prev('a').addClass('opened');
        }
    }

    function clearMenu() {
        $navList.find('.opened').removeClass('opened');
        $navList.find('a.active').removeClass('active');
    }

    function generateTabId() {
        return 'tab' + (idIndex++);
    }

    function tabClick(e) {
        e.preventDefault();
        if (e.target.tagName === 'SPAN') {
            removeTab($(this).find('a'));
        } else {
            openTab($(this).find('a'));
        }
    }

    function getTabById(id) {
        var result = null;
        $.each(tabList, function (i, tab) {
            if (tab.id === id) {
                tab.index = i;
                result = tab;
                return false;
            }
        });
        return result;
    }

    function caculateTabWidth(check) {
        if (check === true) {
            var cw = $("#tabList").width();
            var aw = (tabList.length) * 160 - (tabList.length - 1) * 15;
            if (aw > cw) {
                var elw = parseInt((cw + (tabList.length - 1) * 15) / tabList.length);
                if (elw - 46 < 38) {
                    alert('当前页面数量已达最大，无法打开新页面');
                    return false;
                }
            }
        } else {
            var cw = $("#tabList").width();
            var aw = (tabList.length) * 160 - (tabList.length - 1) * 15;
            if (aw > cw) {
                var elw = parseInt((cw + (tabList.length - 1) * 15) / tabList.length);
                $("#tabList>li").width(elw);
                $("#tabList>li>a").width(elw - 46);
            }
        }
        return true;
    }

    function openTab(target) {
        var $el, selector, id, tab;
        if (target instanceof jQuery) {
            $el = target;
            selector = $el.attr('href');
            id = selector.replace(/^#/, '');
            tab = getTabById(id);
        } else {
            tab = target;
            id = target.id;
            selector = '#' + id;
            $el = $tabList.find('a[href="' + selector + '"]');
        }

        if (tab === activeTab) {
            return;
        }

        openMenu(tab.menuId);

        if (activeTab !== null) {
            closeTab(activeTab);
        }

        $el.closest('li').addClass('active');
        $el.closest('li').find('.first-img').attr('src', '../images/newimages/1.png');
        $el.closest('li').find('.last-img').attr('src', '../images/newimages/2.png');
        var $selector = $(selector);
        $selector.addClass('opened');

        if (!tab.loaded) {
            tab.loaded = true;

            var $iframe = $selector.children('iframe');

            $iframe.load(iframeLoad);
            $iframe.attr('src', tab.url);
        }

        activeTab = tab;

        caculateTabWidth();

        saveTabInfo();
    }

    function closeTab(target) {
        var $el, selector, id, tab;

        if (target instanceof jQuery) {
            $el = target;
            selector = $el.attr('href');
        } else {
            id = target.id;
            selector = '#' + id;
            $el = $tabList.find('a[href="' + selector + '"]');
        }

        if (target !== activeTab) {
            return;
        }

        $el.closest('li').removeClass('active');
        $el.closest('li').find('.first-img').attr('src', '../images/newimages/3.png');
        $el.closest('li').find('.last-img').attr('src', '../images/newimages/4.png');
        $(selector).removeClass('opened');
    }

    function removeTab($el) {
        var selector = $el.attr('href'),
            id = selector.replace(/^#/, ''),
            toOpen = null,
            tab = getTabById(id),
            length = tabList.length,
            index = tab.index;
        if (activeTab === tab) {
            if (index < (length - 1)) {
                toOpen = tabList[index + 1];
            } else if (index > 0) {
                toOpen = tabList[index - 1];
            }

            activeTab = null;

            if (!toOpen) {
                clearMenu();
            }
        }
        $el.closest('li').remove();
        $(selector).remove();
        tabList.splice(index, 1);

        if (toOpen) {
            openTab(toOpen);
        } else {
            saveTabInfo();
        }
        caculateTabWidth();

    }

    function removeFromArray(target, array) {
        var index = array.indexOf(target);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    function iframeLoad(e) {
        try {
            var contentWindow = this.contentWindow;

            var id = $(this).parent().attr('id');

            urlChange(id, contentWindow);

            $(contentWindow).on('hashchange', function () {
                urlChange(id, contentWindow);
            });
        } catch (e) {
            console.warn('由于跨域无法获取子窗口信息!');
        }
    }

    function urlChange(id, contentWindow) {
        var tab = getTabById(id),
            title = contentWindow.document.title,
            url = contentWindow.location.href;

        tab.url = url;
        tab.title = title;

        var $tab = $tabList.find('[href="#' + id + '"]');

        $tab[0].firstChild.nodeValue = title;

        saveTabInfo();
    }

    function openLinkInNewTab(menuId, url, title, lazyload) {
        if(!caculateTabWidth(true)){
            return;
        }
        var tabId = generateTabId();
        //todo
        //url.split
        var tabObj = {menuId: menuId, id: tabId, url: url, title: title, loaded: !lazyload};

        tabList.push(tabObj);

        $tabList.append('<li><img src="../images/newimages/3.png" class="first-img"><a href="#' + tabId + '">' + title + '</a><span class="close">&times;</span><img src="../images/newimages/4.png" class="last-img"></li>');

        var $iframe = $('<iframe/>');

        if (!lazyload) {
            $iframe.load(iframeLoad);
            $iframe.attr('src', url);
        }
        $tabContent.append($('<div class="tab-container" id="' + tabId + '"></div>').html($iframe));
        return tabObj;
    }

    function openLinkInCurTab(menuId, url, title) {
        if (url.substring(0, 7) === 'http://') {

            $.get('../services/userResource/getUserTicket', function (data) {
                if (data.result !== 'SUCCESS') {
                    if (url.indexOf("?") > 0) {
                        url += '&ticket=' + data.content.ticket;
                    }
                    else {
                        url += '?ticket=' + data.content.ticket;
                    }
                    // $.cookie('ticketSystem', ticketSystem + currentSystem)
                }
                if (activeTab === null) {
                    openTab(openLinkInNewTab(menuId, url, title));
                    return;
                }
                activeTab.menuId = menuId;
                activeTab.url = url;
                activeTab.title = title;

                openMenu(menuId);

                $('#' + activeTab.id).children('iframe').attr('src', url);
                return activeTab;
            });
        }
        else {
            if (activeTab === null) {
                openTab(openLinkInNewTab(menuId, url, title));
                return;
            }
            activeTab.menuId = menuId;
            activeTab.url = url;
            activeTab.title = title;

            openMenu(menuId);

            $('#' + activeTab.id).children('iframe').attr('src', url);
            return activeTab;
        }
    }

    function saveTabInfo() {
        var info = [tabList.indexOf(activeTab), tabList];
        localStorage.setItem('tabInfo', JSON.stringify(info));
    }

    function initTabInfo() {
        var str = localStorage.getItem('tabInfo');
        if (str !== null) {
            var info = JSON.parse(str),
                index = info[0],
                list = info[1];
            $.each(list, function (i, tab) {
                if (tab.url.indexOf("ticket=") > 0) {
                    $.get('../services/userResource/getUserTicket', function (data) {
                        if (data.result === 'SUCCESS') {

                            tab.url = tab.url.split("ticket=")[0] + "ticket=" + data.content.ticket;

                            openLinkInNewTab(tab.menuId, tab.url, tab.title, true);
                            if (index > -1) {
                                openTab(tabList[index]);
                            }
                            else {
                                openDefaultTab();
                            }
                        }
                    });
                }
                else {
                    openLinkInNewTab(tab.menuId, tab.url, tab.title, true);
                }
            });

            if (index > -1) {
                openTab(tabList[index]);
            }
            else {
                openDefaultTab();
            }
        }
        else {
            openDefaultTab();
        }
    }

    function openDefaultTab() {
        openTab(openLinkInNewTab("", "home/index.htm", "首页"));
        var urlParams = $.location.search;
        var callbackUrl = urlParams.callbackUrl;
        if (callbackUrl) {
            $.each(urlParams, function (n, value) {
                if (n !== "callbackUrl")
                    callbackUrl += '&' + n + "=" + value;
            });
            openTab(openLinkInNewTab("", callbackUrl, "newPage"));
        }

    }

    function purviewSortBy(sort1, sort2) {
        return sort1.purviewOrder - sort2.purviewOrder;
    }

    function toNavListData(rawData) {
        var outData = [];

        var firstLevel = rawData['-1'];

        $.each(firstLevel, function (id, purview) {
            outData.push(purview);

            if (purview.purviewType === "MODULE") {
                purview.children = [];

                $.each(rawData[id], function (childId, childPurview) {
                    purview.children.push(childPurview);
                });

                purview.children.sort(purviewSortBy);
            }
        });

        outData.sort(purviewSortBy);

        return outData;
    }

    function initUserInfo() {
        var userInfoStr = localStorage.getItem('userInfo');

        if (userInfoStr == null) {
            userInfo = {};
        } else {
            userInfo = JSON.parse(userInfoStr);
        }
        var $user = $('#userInfo'),
            $nav = $('.left-nav');

        if (userInfo.leftNavCollapse) {
            $nav.addClass('collapse');
            // $(".nav-toggle").addClass('no-sea');
            $(".header").addClass('collapse');
            $(".tab-list-container").addClass('collapse');
            $(".tab-content").addClass('collapse');
        }

        $user.find('.nav-toggle').on('click', toggleLeftNav);

        $nav.hover(mouseEnterLeftNav, mouseLeaveLeftNav);

        $(".header").hover(mouseEnterLeftNav, mouseLeaveLeftNav);
    }

    function toggleLeftNav() {

        // $(".nav-toggle").toggleClass('no-sea');
        $('#settings').hide()
        if (userInfo.leftNavCollapse) {
            $('.left-nav').removeClass('collapse');
            $('#toggle').attr('src','../images/newimages/kejian@2x.png')
            $(".header").removeClass('collapse');
            $(".tab-list-container").removeClass('collapse');
            $(".tab-content").removeClass('collapse');
            userInfo.leftNavCollapse = false;
        } else {
            $('#toggle').attr('src','../images/newimages/yincang@2x.png')
            $('.left-nav').addClass('collapse');
            $(".header").addClass('collapse');
            $(".tab-list-container").addClass('collapse');
            $(".tab-content").addClass('collapse');
            userInfo.leftNavCollapse = true;
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        caculateTabWidth();
    }

    function mouseEnterLeftNav(e) {
        if (!userInfo.leftNavCollapse) {
            return;
        }
        $(".left-nav").addClass('opened');
        $(".header").addClass('opened');
        $(".tab-list-container").addClass('opened');
        $(".tab-content").addClass('opened');
    }

    function mouseLeaveLeftNav(e) {
        if (!userInfo.leftNavCollapse) {
            return;
        }
        $(".left-nav").removeClass('opened');
        $(".header").removeClass('opened');
        $(".tab-list-container").removeClass('opened');
        $(".tab-content").removeClass('opened');
    }

    $(function () {

        $("#goHome").on("click", function () {
            openLinkInCurTab("", "home/index.htm", "首页");
        });

        $("#userInfo").on("click", function () {
            $('#settings').show()
            $('.moddle').show()
        });
        $('.moddle').click(function(e){
            console.log('qw')
            $('#settings').hide()
            $(this).hide()
            e.stopPropagation();
        })




        $('.open-new-tab').on('click',function () {
            var $this = $(this);
            openTab(openLinkInNewTab("", $this.attr('data-gotarget'), "动态监测"));
        });

        $navList = $('#leftNavList');

        $navList.on('click', 'a', navListClick);

        $tabList = $('#tabList');

        $tabContent = $('#tabContent');

        $tabList.on('click', 'li', tabClick);

        initUserInfo();

        $.get('/api/title', function (data) {   // 获取权限接口

            var data = data.data
            console.log(data)
            if (false) {
                location.href = 'login.htm';
            } else {

                // var userPurviewList = JSON.parse(data.content);
                // console.log(userPurviewList) // 解析数据
                //
                // var navListData = toNavListData(userPurviewList);  //数据整理

                var navListData = data
                $navList.html(juicer(Template, navListData));  // 遍历左侧目录
                console.log(navListData)
                initTabInfo(navListData);
            }
        });
    });
})();

function logout() {
    $.get('/api/logout', function (data) {
        if (data.result === 'SUCCESS') {
            // $.cookie('token', "");
            location.href = "login.htm";
        }
    });
}

//修改密码
function changePassword() {
    var dataInput = {
        "oldPassword": $("#oldPassword").val(),
        "newPassword": $("#newPassword").val()
    };
    $('#changePassword').modal('hide');
    $.post('../services/web/employeeResource/resetPassword', dataInput, function (data) {

        if (data.result == 'SUCCESS') {
            popup("修改成功");
            $("#newPassword").val('');
            $("#oldPassword").val('');
            $("#newPasswordAgain").val('');
        } else {
            popup(data.resultMessage);
            $("#newPassword").val('');
            $("#oldPassword").val('');
            $("#newPasswordAgain").val('');
        }
    })
}

//修改个人信息
function changePersonalInfo(img) {
    var dataInput = {
        "userAlias": $("#companyName").val(),
        "email": $("#email").val(),
        "mobilePhone": $("#phoneNumber").val(),
        "avatarBase64": img
    };
    $.post('../services/web/employeeResource/setUserSelfInfo', dataInput, function (data) {
        if (data.result == 'SUCCESS') {
            $('#personalInfo').modal('hide');
            popup("修改成功,下次登陆生效");
        } else {
            popup(data.resultMessage);
        }
    })
}

function popup(result) {
    if ($("#popup")) {
        $("#popup").remove();
    }
    var div = "<div class='modal fade' id='popup' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>" +
        "<div class='modal-dialog'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
        "<h4 class='modal-title' id='myModalLabel'>系统提示</h4>" +
        "</div>" +
        "<div class='modal-body'>" + result + "</div>" +
        "<div class='modal-footer'>" +
        "<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    $("body").append(div);
    $("#popup").modal('show');
}