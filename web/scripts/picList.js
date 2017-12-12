//转base64
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    dataURL = dataURL.split(",");
    return dataURL; // return dataURL.replace("data:image/png;base64,", "");
}

//把选中的文件显示出来
function setImg(tag,file) {
    var newimg = tag.parent(".photo-upload").siblings(".thumbnail").children(".newImg");
    newimg.show();
    newimg.attr("src",URL.createObjectURL(file)).siblings(".oldImg").hide();
}
//清除input选中的文件
function clearInputImg(tag){
    var $this = tag.parent().siblings(".photo-upload");
    $this.children(".imgFile").remove();
    $this.append("<input type='file' name='imgFile' class='imgFile'>");
    $(".imgFile").on("change",function (e) {
        if(e.target.files.length > 0){
            var file = e.target.files[0];
            getPhotoSize($(this),file);
            $(this).parent(".photo-upload").siblings(".caption").show();
        }
    });
}

//判断文件格式及大小
function getPhotoSize(tag,obj){
    var photoExt=obj.type;//获得文件后缀名
    if((photoExt!='image/jpg')&&(photoExt!='image/png')&&(photoExt!='image/jpeg')&&(photoExt!='image/gif')){
        alert("请上传后缀名为jpg,png,jpeg,gif的文件!");
        return;
    }else{
        var fileSize = 0;
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        if (isIE && !obj.files) {
            var filePath = obj.value;
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            var file = fileSystem.GetFile (filePath);
            fileSize = file.Size;
        }else {
            fileSize = obj.size;
        }
        fileSize=Math.round(fileSize/1024*100)/100; //单位为KB
        if(fileSize>=1024){
            alert("图片最大尺寸为1024KB");
            return;
        }else{
            setImg(tag,obj);
        }
    }
}
//提交商品信息
function addGoodsMessage($save) {
    var base64 = getBase64Image($save.parent().siblings("#imgCon").children(".newImg")[0]);
    var data = {
        dataList:[
            {
                "describe":$save.siblings("input").val(),
                "imgSrc" :$save.parent().siblings("#imgCon").children(".newImg").attr("src")
                //base64[0]+","+base64[1]
            }
        ]
    };
    var html = juicer($("#list").html(),data);
    $(".container").append(html);
    html = null;
    addEvent();
}
//绑定事件
function addEvent(){
    var oldVal;

    $(".edit").unbind().on("click",function () {
        var $this = $(this);
        var newimg =  $this.parent().siblings(".thumbnail").children(".newImg");
        $this.hide();
        newimg.attr("src",newimg.siblings(".oldImg").attr("src"));
        $this.parent(".caption").siblings(".photo-upload").show();
        $this.siblings(".save").show();
        $this.siblings(".delete").hide();
        $this.siblings(".cancel").show();
        $this.siblings("input").addClass("edit-input").removeAttr("readonly").focus();
        oldVal = $this.siblings("input").val();
    });
    $(".cancel").unbind().on("click",function () {
        var $this = $(this);
        $this.closest(".col-sm-6").children(".thumbnail").children(".oldImg").show();
        $this.closest(".col-sm-6").children(".thumbnail").children(".newImg").hide();
        $this.hide();
        $this.siblings(".edit").show();
        $this.parent(".caption").siblings(".photo-upload").hide();
        $this.siblings(".save").hide();
        $this.siblings(".delete").show();
        $this.siblings("input").removeClass("edit-input").attr("readonly","true");
        $this.siblings("input").val(oldVal);
        clearInputImg($this);
    });
    $(".save").unbind().on("click",function () {
        var $this = $(this);
        var newimg = $this.parent().siblings(".thumbnail").children(".newImg");
        newimg.siblings(".oldImg").attr("src",newimg.attr("src")).show();
        newimg.hide();
        $this.hide();
        $this.siblings("input").removeClass("edit-input").attr("readonly","true");
        $this.parent().siblings(".photo-upload").hide();
        $this.siblings(".edit").show();
        $this.siblings(".delete").show();
        $this.siblings(".cancel").hide();
    });
    $(".delete").unbind().on("click",function () {
        var $this = $(this);
        bootbox.setLocale("zh_CN");
        bootbox.confirm("确定删除？",function (res) {
            if(res){
                $this.parents(".col-sm-6").remove();
            }
        });
    });
    $(".imgFile").unbind().on("change",function (e) {
        if(e.target.files.length > 0){
            var file = e.target.files[0];
            getPhotoSize($(this),file);
            $(this).parent(".photo-upload").siblings(".caption").show();
        }
    });
    $("#save").unbind().on("click",function () {
        addGoodsMessage($(this));
    });
    $("#cancel").unbind().on("click",function () {
        var $this = $(this);
        $this.closest(".caption").hide();
        $this.closest(".col-sm-6").children(".thumbnail").children(".oldImg").show();
        $this.closest(".col-sm-6").children(".thumbnail").children(".newImg").hide();
        $this.siblings("input").val("");
        clearInputImg($(this));
    });
    $(".container>div>a>img").unbind().on("click",function () {
        $("#previewImg").attr("src",$(this)[0].src);
        $("#picModal").modal("show");
    });
}

$(function () {
    addEvent();
});