var dataNum = [
    '<div class="line"><span class="icon-0"></span></div>',
    '<div class="line"><span class="icon-1"></span></div>',
    '<div class="line"><span class="icon-2"></span></div>',
    '<div class="line"><span class="icon-3"></span></div>',
    '<div class="line"><span class="icon-4"></span></div>',
    '<div class="line"><span class="icon-5"></span></div>',
    '<div class="line"><span class="icon-6"></span></div>',
    '<div class="line"><span class="icon-7"></span></div>',
    '<div class="line"><span class="icon-8"></span></div>',
    '<div class="line"><span class="icon-9"></span></div>',
    '<div class="line-d"><span class="icon-d"></span></div>',
    '<div class="line-d"><span class="icon-digit"></span></div>'
];

$(function(){
    setInterval(function(){setNum((Math.random()*12000).toFixed(0),'num',false)},2000)
    setInterval(function(){setNum((Math.random()*12000).toFixed(2),'totalMoney')},2000)
})
function setNum(item,id, digit=true) {
    item = item.toString()
    var htm = ''
    if(digit){                                 //又显示分号 又显示点
        items = item.split('.')
        for(var i=0;i<items[0].length;i++){
            if((items[0].length===4)&&(i===1)){htm += dataNum[11]}
            if((items[0].length===5)&&(i===2)){htm += dataNum[11]}
            if((items[0].length===6)&&(i===3)){htm += dataNum[11]}
            if((items[0].length===7)&&((i===1)||(i===4))){htm += dataNum[11]}
            if((items[0].length===8)&&((i===2)||(i===5))){htm += dataNum[11]}
            htm += dataNum[items[0][i]]
        }
        if(items.length>1){
            for(var i=0;i<items[1].length;i++){
                if(i===0){htm += dataNum[10]}
                htm += dataNum[items[1][i]]
            }
        }
    }else{
        for(var i=0;i<item.length;i++){         // 不显示 分号的点
            if(item[i] === '.'){
                htm += dataNum[10]
            }else{
                htm += dataNum[item[i]]
            }
        }
    }
    document.getElementById(id).innerHTML = htm
}

function getDate(){
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let date = myDate.getDate();
    let h = myDate.getHours();
    let m = myDate.getMinutes();
    let s = myDate.getSeconds();
    let now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
    return now
}
function conver(s) {
    return s < 10 ? '0' + s : s;
}
setInterval(function(){
    document.querySelector('.noeTime').innerHTML = getDate()
},1000)
