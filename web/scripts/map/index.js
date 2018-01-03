window.onload = function(){

}
var heatmap;
$(function(){
    createMap()

})
function createMap(){
     map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.397428, 39.90923],//地图中心点
        zoom: 11,
        zooms: [3, 18],
        showIndoorMap: false,
        features: ['road']
    })

    map.plugin(['AMap.ToolBar', 'AMap.Scale', "AMap.Heatmap"], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
    });
    map.on('complete',function(){
       var marker;
       tubiao();
        device();
       // 停车场图标
       function tubiao(){
           dataInterface.init(function(data){
               $.each(data.content.dataList,function(index,obj){
                   var a = [obj.positionLong, obj.positionLat];
                    var pre = obj.Uing / obj.total ;
                   if(pre > 0.7){
                       var html = juicer( $('#park0').html(), obj);
                   }else if(pre < 0.3){
                       var html = juicer( $('#park1').html(), obj);
                   }else{
                       var html = juicer( $('#park2').html(), obj);
                   }
                   marker = new AMap.Marker({
                       map: map,
                       position:a ,
                       offset: new AMap.Pixel(-17, -42),
                       content: html,
                       extData: {
                           parkingId: '共有车位'+ obj.total + "剩余车位" + (obj.total - obj.Uing),
                           parkName: obj.parkName
                       },
                       zIndex: 2
                   });
                   marker.on('click', function (e) {
                       console.log(e)

                       $('#myModal').modal('show')
                       $('#myModalLabel').html(e.target.G.extData.parkName)
                       // $('#myModalLabel').html(e.target.G.extData.parkName)
                       $('#bod h2').html(e.target.G.extData.parkingId)
                       console.log()
                   });
               })

           })
       };
       // 热力图图标
       function heat(){
           map.plugin(["AMap.Heatmap"],function() {      //加载热力图插件
               heatmap = new AMap.Heatmap(map, {   //在地图对象叠加热力图
                   radius: 25, //给定半径
                   opacity: [0, 0.8]
               });
               heatmap.setDataSet({data:heatmapData,max:100}); //设置热力图数据集
               //具体参数见接口文档
           });
       };
       // 检测地图缩放级别
        function device(){
            map.on('zoomchange',function(){  // 地图缩放级别发生变化
                console.log(map.getZoom());
                if(map.getZoom()<=9){   //   只能调用一次
                    map.clearMap();
                    if(heatmap){
                        heatmap.show();
                    }else{
                        heat()
                    }
                }
                if((map.getZoom()<14)&&(map.getZoom()>9)){
                    console.log(heatmap)
                    if (heatmap) {
                        heatmap.hide();
                    }
                    tubiao()
                }
                if(map.getZoom()>=14){
                    map.clearMap();
                    console.log(heatmap)
                }
            })
        }
        function yunyin(){
            map.on('zoomchange',function(){  // 地图缩放级别发生变化
                console.log(map.getZoom());
                if(map.getZoom()<=9){   //   只能调用一次
                    map.clearMap();
                    if(heatmap){
                        heatmap.show();
                    }else{
                        heat()
                    }
                }
                if((map.getZoom()<14)&&(map.getZoom()>9)){
                    console.log(heatmap)
                    if (heatmap) {
                        heatmap.hide();
                    }
                    tubiao()
                }
                if(map.getZoom()>=14){
                    map.clearMap();
                    console.log(heatmap)
                }
            })
        }

        function d(){

        }
        function y(){

        }
        $('.changeMapModal').on('click',function(){
            if(!$(this).hasClass('checked')){
                $(".changeMapModal").removeClass("checked");
                $(this).addClass("checked");

            }
        })
    })
}

var dataInterface = {
    init:function(callback){
        var params = {
            "a": 1,
            "b": 2
        };
        $.get('/date.json', function (data) {
            data = JSON.parse(data)
            if (data.result == 'success') {
                callback(data);
            } else {
                alert(data.resultMessage);
            }
        })
    }
}