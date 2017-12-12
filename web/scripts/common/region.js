var defaultCodeObj = {
    provinceCode : "110000",
    cityCode:"110100"
};
function getProvinces() {
    var p = new Promise(function (resolve, reject) {
        var params = {};
        $.get('../services/web/communalResource/getProvinces', params, function (data) {
            if (data.result === 'SUCCESS') {
                var list = data.content;
                var listTpl = juicer('{@each list as _r,_i}' + '<option id="provinceCode"  value="${_r.provinceCode}">${_r.provinceName}</option>' + '{@/each}');
                var obj = {list: data.content};
                $("#provinceCode option:gt(0)").remove();
                $('#provinceCode').append(listTpl.render(obj));
                resolve(1);
            } else {
                reject(0);
            }
        });
    });
    return p;
}

function getCities(code,state) {
    var codes = defaultCodeObj.provinceCode;
    if (code) {
        codes = code;
    }
    var p = new Promise(function (resolve, reject) {
        var params = {code: codes};
        $.get('../services/web/communalResource/getCities', params, function (data) {
            if (data.result === 'SUCCESS') {
                var listTpl = juicer('{@each list as _r,_i}' + '<option id="cityCode"  value="${_r.cityCode}">${_r.cityName}</option>' + '{@/each}');
                var obj = {list: data.content};
                $("#cityCode option:gt(0)").remove();
                if(typeof state !== "undefined"){
                    $('#districtCode option:gt(0)').remove();
                }
                $('#cityCode').append(listTpl.render(obj));
                resolve(1);
            } else {
                reject(0);
            }
        });
    });
    return p;
}

//获取已上线的区
function getDistricts(code) {
    var codes = defaultCodeObj.cityCode;
    if (code) {
        codes = code;
    }
    var p = new Promise(function (resolve, reject) {
        var params = {code: codes};
        $.get('../services/web/communalResource/getSpecialDistricts', params, function (data) {
            if (data.result === 'SUCCESS') {
                var listTpl = juicer('{@each list as _r,_i}' + '<option id="districtCode"  value="${_r.districtCode}">${_r.districtName}</option>' + '{@/each}');
                var obj = {list: data.content};
                $('#districtCode option:gt(0)').remove();
                $('#districtCode').append(listTpl.render(obj));
                resolve(1);
            }
            else {
                reject(0);
            }
        });
    });
    return p;
}
//加载所有区
function getAllDistricts(code) {
    var codes = defaultCodeObj.cityCode;
    if (code) {
        codes = code;
    }
    var p = new Promise(function (resolve, reject) {
        var params = {code: codes};
        $.get('../services/web/communalResource/getDistricts', params, function (data) {
            if (data.result === 'SUCCESS') {
                var listTpl = juicer('{@each list as _r,_i}' + '<option id="districtCode"  value="${_r.districtCode}">${_r.districtName}</option>' + '{@/each}');
                var obj = {list: data.content};
                $('#districtCode option:gt(0)').remove();
                $('#districtCode').append(listTpl.render(obj));
                resolve(1);
            }
            else {
                reject(0);
            }
        });
    });
    return p;
}

//加载企业类型为企业的企业筛选
function rendSearchBizzUser() {
    var p = new Promise(function (resolve, reject) {
        var bizzUserType = "Business";
        var params = {bizzUserType: bizzUserType};
        $.get('../services/userResource/getBizzUserListForSelect', params, function (data) {
            if (data.result === 'SUCCESS') {
                var listTpl = juicer('{@each list as _r,_i}' + '<option id="${_r.userId}" value="${_r.userId}">${_r.userAlias}</option>' + '{@/each}');
                var obj = {list: data.content};
                $('#parkingOwner option:gt(0)').remove();
                $('#parkingOwner').append(listTpl.render(obj));
                resolve(1);
            } else {
                reject(0);
            }
        });
    });
    return p;
}
//加载企业类型为企业的企业编辑
function rendSearchBizzUserEdit() {
    var p = new Promise(function (resolve, reject) {
        var bizzUserType = "Business";
        var params = {bizzUserType: bizzUserType};
        $.get('../services/userResource/getBizzUserListForSelect', params, function (data) {
            if (data.result === 'SUCCESS') {
                var listTpl = juicer('{@each list as _r,_i}' + '<option id="${_r.userId}" value="${_r.userId}_${_r.departCode}">${_r.userAlias}</option>' + '{@/each}');
                var obj = {list: data.content};
                $('#parkingOwner option:gt(0)').remove();
                $('#parkingOwner').append(listTpl.render(obj));
                resolve(1);
            } else {
                reject(0);
            }
        });
    });
    return p;
}
//获取所有费率(停车场的)
function rendSearchParkCommRule() {
    var p = new Promise(function (resolve, reject) {
        var params = {
            status:'0'
        };
        $.get('../services/web/parkResource/getCommRuleListForSelect', params, function (data) {
            if (data.result === 'SUCCESS') {
                var listTpl = juicer('{@each list as _r,_i}' + '<option id="${_r.id}" value="${_r.id}">${_r.ruleName}</option>' + '{@/each}');
                var obj = {list: data.content};
                $('#commonId option:gt(0)').remove();
                $('#commonId').append(listTpl.render(obj));
                resolve(1);
            } else {
                reject(0);
            }
        });
    });
    return p;
}
