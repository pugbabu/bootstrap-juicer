//选择图标
(function($){
    $.fn.qqFace = function(options){
        var defaults = {
            id : 'facebox',
            icons : [],	//图标
            assign : 'content',	//选中图标后，要显示的地方
            hidden : null
        };
        var option = $.extend(defaults, options);
        var assign = $('#'+option.assign);
        var id = option.id;
        var icons = option.icons;
        if(icons.length <= 0){
            icons = ['fam-1','fam-2','fam-3','fam-4','fam-5','fam-6','fam-7','fam-8','fam-9','fam-10','fam-11','fam-12','fam-13',
                'fam-14','fam-15','fam-application-form','fam-calendar-view-day','fam-chart-line','fam-house','fam-picture'];
        }

        if(assign.length<=0){
            return false;
        }

        $(this).click(function(e){
            var strFace;
            if($('#'+id).length<=0){
                strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:10000;padding: 8px;" class="qqFace">' +
                '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for(var i=1; i<=icons.length; i++){
                    strFace += '<td><span class="' + icons[i] + '" onclick="$(\'#'+option.assign+'\').setCaret(\'' + icons[i] + '\', \'' + option.hidden + '\');"></span></td>';
                    if( i % 10 == 0 ) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
            }
            $('body').append(strFace);
            var offset = $(this).offset();
            var top = offset.top + $(this).outerHeight();
            $('#'+id).css('top',top);
            $('#'+id).css('left',offset.left);
            $('#'+id).show("blind");
            e.stopPropagation();
        });

        $(document).click(function(){
            $('#'+id).hide();
            $('#'+id).remove();
        });
    };

})(jQuery);

jQuery.fn.extend({
    setCaret: function(iconCss, hidden) {
        $(this).removeClass().addClass(iconCss);
        if(hidden != null){
            $("input[name=" + hidden + "]").val(iconCss);
        }
    }
});