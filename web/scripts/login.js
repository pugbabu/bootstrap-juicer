(function () {
    var urlParams = $.location.search;
    var callbackUrl = urlParams.callbackUrl;
    $.each(urlParams, function (n, value) {
        if (n !== "callbackUrl")
            callbackUrl += '&' + n + "=" + value;
    });

    var OsObject = "";
    getOs();

    $("#login").validate({
        submitHandler: function (form) {
            try {
                var params = $(form).serializeObject();
                params.client = OsObject;
                if(callbackUrl) {
                    params.callbackUrl = callbackUrl;
                }
                $.get('/api/login', params, function (data) {
                    //
                    if (data.result === 'SUCCESS') {
                        location.href = "frame.htm"
                        // var token = data.content.token;

                        //var expires = new Date();
                        //expires.setTime(expires.getTime()+token.expire*1000);

                        $.cookie('token', token, {expires: 10000});
                        $.cookie('userName', data.content.userName, {expires: 10000});
                        $.cookie('userAlias', data.content.userAlias, {expires: 10000});
                        // if (callbackUrl) {
                        //     var ticket = data.content.ticket;
                        //     var url;
                        //     if (self != top) {
                        //         url = callbackUrl;
                        //     } else {
                        //         url = 'frame.htm?callbackUrl=' + callbackUrl;
                        //     }
                        //     if (callbackUrl.indexOf("?") > 0) {
                        //         location.href = url  + "&ticket=" + ticket;
                        //     }
                        //     else {
                        //         location.href = url  + "?ticket=" + ticket;
                        //     }
                        // }
                        // else {
                        //     location.href = "./pages/frame.htm"
                        // }
                    } else {
                        $('#alertMsg').addClass('in').removeClass('hidden').children('span').html(data.resultMessage);
                    }
                }, true);
            } catch (e) {
                console.error(e);
            }
        },
        rules: {
            username: {
                required: true
            },
            pwd: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            pwd: {
                required: "请输入密码"
            }
        },
        errorClass: 'help-block',
        errorElement: "span",
        errorPlacement: function (error, element) {
            element.after(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parent('.form-group').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parent('.form-group.has-error').removeClass('has-error');
        }
    });

    $('#alertMsg>button').click(function () {
        var $alert = $('#alertMsg');

        $alert.on('transitionend', function () {
            $alert.addClass('hidden');
            $alert.off('transitionend');
        });

        $alert.removeClass('in');
    });

    function getOs() {
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            OsObject = "MSIE";
        }
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            OsObject = "Firefox";
        }
        if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
            OsObject = "Safari";
        }
        if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
            OsObject = "Camino";
        }
        if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
            OsObject = "Gecko";
        }
    }

})();