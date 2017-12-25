window.onload = function() {
    let keyInput = {
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
    keyInput.init(); // 初始化input事件
    $("#avatar").change(function (e) {   // 一寸照片上传
        if (e.target.files.length > 0) {
            var file = e.target.files[0];
            getPhotoSize(file)
        }
    });
    $('#config').click(takeScreenshot)  // 生成图片
    $('#datetimepicker').datetimepicker({  // 时间选择
        format: 'yyyy-mm-dd',
        startView: 2,
        minView: 2,
        autoclose: true
    });
}
//base64回显图片
function setImg(file) {
    var r = new FileReader()
    r.readAsDataURL(file)
    r.onload = function(e){
        $('.avatar img').attr('src', e.target.result)
        setTimeout(() => {console.log(getBase64Images())},300)
    }
}
function getBase64Images() {
    var img = document.getElementById('img')
    var canvas = document.createElement("canvas");
    canvas.width = img.width;  //头像宽度和高度写死
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL("image/png",0.5);
    dataURL = dataURL.split(",")[1];
    return dataURL; // return dataURL.replace("data:image/png;base64,", "");
}
//
function getPhotoSize(obj) { // 大小限制
        fileSize = obj.size;
        fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
        if (fileSize >= 1000) {
            alert("照片最大尺寸为1000KB，请重新上传!");
            return;
        } else {
            setImg(obj);
        }
}

// canvas转base64  https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
function getBase64Image() {  //canvas --- base64
    var canvas = document.querySelector("#view canvas")
    var dataURL = canvas.toDataURL("image/png");
    dataURL = dataURL.split(",")[1];
    return dataURL
}

function takeScreenshot() {  // 将html生成canvas图片
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


//http://blog.csdn.net/swshbon/article/details/51605945
function Download(){
    //cavas 保存图片到本地  js 实现
    //------------------------------------------------------------------------
    //1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
    var type ='png';//你想要什么图片格式 就选什么吧
    var d=document.querySelector('#view canvas');
    var imgdata=d.toDataURL(type);
    //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype=function(type){
        type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
        var r=type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/'+r;
    };
    imgdata=imgdata.replace(fixtype(type),'image/octet-stream');
    //3.0 将图片保存到本地
    var savaFile=function(data,filename)
    {
        var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href=data;
        save_link.download=filename;
        var event=document.createEvent('MouseEvents');
        event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
        save_link.dispatchEvent(event);
    };
    var filename=''+new Date().getDate()+'.'+type;
    //注意咯 由于图片下载的比较少 就直接用当前几号做的图片名字
    savaFile(imgdata,filename);
};


