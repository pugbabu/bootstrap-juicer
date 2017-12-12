/**
 * Created by qzq on 2017/6/30.
 */

var commonSort = {
    bindClickEvent:function ($table,$form) {
        this.sortTable = $table;
        $form.append('<input id="parameter" name="parameter" class="hide-input hidden"/>');
        $form.append('<input id="sort" name="sort" class="hide-input hidden"/>');
        var sortList = ['','DESC','ASC'];
        $table.find('[sort]').on('click',function () {
            var $this = $(this);
            var oldSort = $this.attr('sort');
            var newSort,parameter;
            for(var i = 0;i < sortList.length ; i++){
                if(oldSort == sortList[i]){
                    if(i == sortList.length -1){
                        $this.attr('sort',sortList[0]);
                        newSort = sortList[0];
                    }else{
                        $this.attr('sort',sortList[i+1]);
                        newSort = sortList[i+1];
                    }
                    parameter = $this.attr('desc');
                }
            }
            $this.siblings('[sort]').attr('sort','');
            commonSort.renderTable(newSort,parameter,$form);
        })
    },
    renderTable:function (sort,parameter,$form) {
        if(sort == ''){
            parameter = '';
        }
        if(typeof $form != 'undefined'){
            $form.find('.hide-input').remove();
            $form.append(juicer('<input id="parameter" name="parameter" value="${parameter}" class="hide-input hidden"/>',{parameter:parameter}));
            $form.append(juicer("<input id='sort' name='sort' value='${sort}' class='hide-input hidden'/>",{sort:sort}));
        }
        $form.trigger('submit');
    },
    deleteSort:function ($form) {
        $form.find('.hide-input').val('');
        this.sortTable.find('[sort]').attr('sort','');
    }

};