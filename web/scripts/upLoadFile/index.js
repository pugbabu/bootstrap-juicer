window.onload = function() {
    var keyInput = {
        init: function(){
            this.userName()
            this.works()
            this.bussenissName()
            this.grad()
            this.time()
        },
        userName: function() {
            $('#userName').blur(function(){
                $('.useName').html($(this).val())
            })
        },
        works: function() {
            $('#works').blur(function(){
                $('.works').html($(this).val())
            })
        },
        bussenissName: function() {
            $('#bussenissName').blur(function(){
                $('.bussiness').html($(this).val())
            })
        },
        grad: function() {
            $('#grad').blur(function(){
                 $('.grade').html($(this).val())
            })
        },
        time: function() {
            $('#datetimepicker').change(function(){
                $('.yelar').html($(this).val().substring(0,4))
                $('.month').html($(this).val().substring(5,7))
                $('.data').html($(this).val().substring(8,10))
            })
        },
    }
    keyInput.init();
    $("#avatar").change(function (e) {   // 一寸照片上传
        if (e.target.files.length > 0) {
            var file = e.target.files[0];
            getPhotoSize(file)
        }
    });
    $('#config').click(takeScreenshot)
    $('#datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd',      /*此属性是显示顺序，还有显示顺序是mm-dd-yyyy*/
        startView: 2,
        minView: 2,
        autoclose: true
    });
}

//回显图片
function setImg(num,file) {
    var img = new Image(), url = img.src = URL.createObjectURL(file);
    var $img = $(img);
    img.onload = function () {
        URL.revokeObjectURL(url);
        $('.avatar').empty().append($img);
    }
}

function getPhotoSize(obj) {
    var photoExt = obj.type;
    if ((photoExt != 'image/jpg') && (photoExt != 'image/png') && (photoExt != 'image/jpeg') && (photoExt != 'image/gif')) {
        alert("请上传后缀名为jpg,png,jpeg的文件!");
        return;
    } else {
        var fileSize = 0;
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        if (isIE && !obj.files) {
            var filePath = obj.value;
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            var file = fileSystem.GetFile(filePath);
            fileSize = file.Size;
        } else {
            fileSize = obj.size;
        }
        fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
        if (fileSize >= 1000) {
            alert("照片最大尺寸为1000KB，请重新上传!");
            return;
        } else {
            setImg(obj);
        }
    }
}

// canvas转base64  https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
function getBase64Image() {
    var canvas = document.querySelector("#view canvas")
    var dataURL = canvas.toDataURL("image/png");
    var triggerDownload = $("#tttt").attr("href", dataURL).attr("download", "order-1111111111.png");
    triggerDownload[0].click();
    // dataURL = dataURL.split(",")[1];
    // return dataURL
}

function takeScreenshot() {  // 生成图片
    html2canvas(document.getElementById('diploma'), {
        onrendered: function(canvas) {
            console.log(canvas)
            $('#view').html(canvas);  // 容器
        },
        width: 547,
        height: 398
    });
    $('#taggle').show();  // 显示路径
    $('#lookPhont').trigger('click'); // 模拟点击跳转
    setTimeout(() => { console.log(getBase64Image())}, 300)
}
