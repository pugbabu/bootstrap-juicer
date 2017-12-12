/**
 * Created by pc on 2017/2/22.
 */

function addPopover() {
    var html;
    var $th = $(".table_hideHtml");
    var width = $th.width();
    var $td;
    var div;
    var index = $th.index();
    $($th.parents("table").children("tbody").children("tr")).each(function () {
        $td = $($(this).children("td")[index]);
        html = $td.html();
        div = "<div class='table_hideHtml_div'>"+ html +"</div>";
        $td.empty();
        $td.append(div);
    });
    $(".table_hideHtml_div").css({
        "width" : width+"px",
        "height": "100%",
        "overflow":"hidden",
        "white-space":"nowrap",
        "text-overflow":"ellipsis",
        "display":"inline-block",
        "cursor":"pointer",
        "vertical-align": "middle"
    });

    $(".table_hideHtml_div").hover(function () {
        var $this = $(this);
        $this.attr({
            "data-container":"body",
            "data-toggle":"popover",
            "data-placement":"bottom",
            "data-trigger":"hover",
            "data-content":$this.html()
        });
        $("[data-toggle='popover']").popover();
    });

}
// 证件号码失去焦点事件
function cardCodeOnBlurCallback() {
    $("input[name=cardNumber]").blur(function () {
        var cardType = $("select[name=cardType]").val();
        if (cardType != '') {
            if (cardType == 'identityCard') { // 身份证
                $("input[name=birthDate]").val(
                    getBirthdatByIdNo($(this).val()));
                /*var sexis = getSexByIdNo($(this).val());
                 $("select[name=sex]").val(sexis);*/
            }
        }
    });
    // 从身份证中提取出生日期
    function getBirthdatByIdNo(iIdNo) {
        var tmpStr = "";
        var idDate = "";
        var tmpInt = 0;
        var strReturn = "";

        iIdNo = $.trim(iIdNo);

        if ((iIdNo.length != 15) && (iIdNo.length != 18)) {
            return tmpStr;
        }

        if (iIdNo.length == 15) {
            tmpStr = iIdNo.substring(6, 12);
            tmpStr = "19" + tmpStr;
            tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-"
                + tmpStr.substring(6);
        } else if (iIdNo.length == 18) {
            tmpStr = iIdNo.substring(6, 14);
            tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-"
                + tmpStr.substring(6);
        }
        return tmpStr;
    }
    // 从身份证中提取性别
    function getSexByIdNo(idNo) {
        if (!idNo) {
            return "未知";
        } else if (idNo.length == 15) {
            return parseInt(idNo.substr(14, 1)) % 2 ? "0" : "1";
        } else if (idNo.length == 18) {
            return parseInt(idNo.substr(16, 1)) % 2 ? "0" : "1";
        } else {
            return "未知";
        }
    }
}