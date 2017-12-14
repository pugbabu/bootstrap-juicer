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
window.onload=function(){
    var one = 1234567,two = 12.321
    setNum(one)
}
function setNum(item) {
    console.log(item.toString().length)
    item = item.toString()
    var htm = ''
    for(var i=0;i<item.length;i++){
        htm += dataNum[item[i]]
    }
    document.getElementById('num').innerHTML = htm
}

