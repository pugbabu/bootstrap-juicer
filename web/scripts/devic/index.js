'use strict';
    new VConsole();
let eyeLeftPosition = {
    start: [70, 78],
    end: [100, 110]
};

let eyeRightPosition = {
    start: [150, 78],
    end: [190, 110]
};

let eyeLeftCenterPosition = {
    x: (eyeLeftPosition.end[0] - eyeLeftPosition.start[0]) / 2 + eyeLeftPosition.start[0],// X轴 100 - （70 / 2） + 70  = 135
    y: (eyeLeftPosition.end[1] - eyeLeftPosition.start[1]) / 2 + eyeLeftPosition.start[1] // Y轴 110 - （78 / 2）+ 70 = 135
};

let eyeRightCenterPosition = {
    x: (eyeRightPosition.end[0] - eyeRightPosition.start[0]) / 2 + eyeRightPosition.start[0],
    y: (eyeRightPosition.end[1] - eyeRightPosition.start[1]) / 2 + eyeRightPosition.start[1]
};

let r = 40;  // 控制旋转

let eyeLeft = document.querySelector('#eyeLeft');
let eyeRight = document.querySelector('#eyeRight');

if (window.DeviceOrientationEvent) {

    window.addEventListener('deviceorientation', function (event) {

        let {alpha, beta, gamma} = event;
        console.log(alpha) // Y轴  // 没有使用
        console.log(beta) // X轴
        console.log(gamma) // Z轴
        document.querySelector('#alpha').innerHTML = alpha;
        document.querySelector('#beta').innerHTML = beta;
        document.querySelector('#gamma').innerHTML =gamma + '----' + gamma / 90 * r;

        eyeLeft.style.left = eyeLeftCenterPosition.x + gamma / 90 * r + 'px'; // 左眼边距位置
        eyeRight.style.left = eyeRightCenterPosition.x + gamma / 90 * r + 'px';  // 右眼的边距状态
        eyeLeft.style.top = eyeRight.style.top = eyeLeftCenterPosition.y + beta / 180 * r + 'px';  // 到顶部距离
        eyeRight.style.transform = eyeLeft.style.transform = 'rotate(' + beta + 'deg)';  // 眼睛旋转角度

    }, false);
} else {
    document.querySelector('body').innerHTML = '浏览器不支持DeviceOrientationEvent';
}