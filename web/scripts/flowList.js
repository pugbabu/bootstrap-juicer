(function () {
    var $table = $('#serviceTable');

    var page;

    var StatusEnum = {
        'UN_PUBLISH': "未发布",
        'PUBLISHED': "已发布",
        'DELETED': "已删除"
    };

    function renderSearchForm() {
        var $form = $('#searchForm');


        $form.juicer();

        $form.submit(function () {
            $.location.extendSearch($form.serializeObject());

            page.reload();

            return false;
        });
    }

    function requestFlowList(currentPage, pageSize, deferred) {
        var urlParams = $.location.search;
        var params = {pageNum: currentPage, pageSize: pageSize};

        if ('flowId' in urlParams) {
            params.flowId = urlParams.flowId;
        }

        if ('flowName' in urlParams) {
            params.flowName = urlParams.flowName;
        }

        $.get('__000000', params, function (data) {
            if (data.code === 0) {
                var result = data.result;
                $table.show();
                //result.flows.StatusEnum = StatusEnum;
                deferred.resolve(result.flows, Math.ceil(result.page.total / pageSize));
            } else {
                deferred.reject();
            }
        });
    }


    function renderTable() {
        var $tbody = $("#serviceTable>tbody");

        page = $tbody.paging({
            pageSize: 10,
            pagination: "#pagination",
            template: $('#template').html(),
            request: requestFlowList,
            juicer:{
                getStatus:function(status){
                    return StatusEnum[status];
                }
            }
        });

        $tbody.on('click', '.edit', function () {
            var id = $(this).closest('tr').attr('data-id');
            location.href = "flowEdit.html?flowId=" + id;
        });

        $tbody.on('click', '.publish', function () {
            var id = $(this).closest('tr').attr('data-id');

            $.post('__000008', {flowId:id}, function (data) {
                if (data.code === 0) {
                    page.reload();
                }
            });

        });

        $tbody.on('click', '.un-publish', function () {
            var id = $(this).closest('tr').attr('data-id');

            $.post('__000009', {flowId:id}, function (data) {
                if (data.code === 0) {
                    page.reload();
                }
            });
        });

        $tbody.on('click', '.delete', function () {
            var id = $(this).closest('tr').attr('data-id');
            if(confirm("确定要删除？")) {
                $.post('__000010', {flowId:id}, function (data) {
                    if (data.code === 0) {
                        page.reload();
                    }
                });
            }
        });
    }

    renderSearchForm();
    renderTable();
})();