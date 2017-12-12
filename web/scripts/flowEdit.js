(function () {
    var FLOW_TEST_INPUT_TEMPLATE = '{@each _ as type,name}' +
        '<div class="form-group" data-type="${type}" data-name="${name}">' +
        '<label class="col-xs-3 control-label">${name}</label>' +
        '<div class="col-xs-9">' +
        '{@if type=="String" }<input type="text" class="form-control" placeholder="String">' +
        '{@else if type=="Number" }<input type="number" class="form-control" placeholder="Number">' +
        '{@else if type=="Boolean" }<label class="radio-inline"><input type="radio" name="flow_test_${name}" value="true">true</label><label class="radio-inline"><input type="radio" name="flow_test_${name}" value="false">false</label>' +
        '{@else if type=="Null" }<input type="text" readonly class="form-control" value="Null">' +
        '{@/if}' +
        '</div>' +
        '</div>{@/each}';

    SvgPanel.dataToCmpDtd = $.Deferred();
    SvgPanel.cmpToDataDtd = $.Deferred();

    /**
     * 初始化表单提交
     */
    var urlParams = $.location.search;

    function initFlowAdd() {
        var containerWidth = SvgPanel.container.clientWidth * SvgPanel.aspectRatio,
            containerHeight = SvgPanel.container.clientHeight * SvgPanel.aspectRatio;

        SvgPanel.DataToCmp.START({
            place: {x: containerWidth / 2, y: 40},
            name: '开始', httpMethod: 'GET', contentType: 'application/json'
        });

        SvgPanel.DataToCmp.END({
            place: {x: containerWidth / 2, y: containerHeight - 40},
            name: '结束'
        });
    }

    function initFlowEdit() {
        $.get('__000001', {flowId: urlParams.flowId}, function (data) {
            if (data.code === 0) {
                var flow = data.result.flow,
                    definition = JSON.parse(flow.definition);
                console.log(definition);
                $('#flowForm').juicer(definition);


                $.each(definition.nodes, function (i, node) {

                    if(node.type in SvgPanel.DataToCmp){
                        SvgPanel.DataToCmp[node.type](node);
                    }
                });

                $.each(definition.lines, function (i, line) {
                    if(SvgPanel.TypeEnum.LINE in SvgPanel.DataToCmp){
                        SvgPanel.DataToCmp[SvgPanel.TypeEnum.LINE](line);
                    }
                });

                SvgPanel.dataToCmpDtd.resolve();

            }
        });
    }

    if (urlParams.flowId) {
        initFlowEdit();
    } else {
        initFlowAdd();
    }

    $('#flowFormSubmit').click(function () {
        var definition = $('#flowForm').serializeObject();

        console.log(definition);
        definition.globalTransactionEnabled = true;

        var nodes = definition.nodes = [],
            lines = definition.lines = [];

        $.each(SvgPanel.svgCmp.componentStore, function (cmpId, cmp) {
            var data = SvgPanel.CmpToData[cmp.type](cmp);

            if (cmp instanceof BlockComponent) {
                nodes.push(cmp.submitData = data);
            } else if (cmp instanceof LineComponent) {
                lines.push(cmp.submitData = data);
            }
        });

        SvgPanel.cmpToDataDtd.resolve();

        var url = $.location.search.flowId ? '__000003' : '__000002';

        $.post(url, {
            "flowId": definition.flowId,
            "flowName": definition.flowName,
            "remark": definition.remark,
            "definition": JSON.stringify(definition)
        }, function (data) {
            if (data.code === 0) {
                $.location.extendSearch({flowId: definition.flowId});
                alert('保存成功!');
            } else {
                alert(data.msg);
            }
        });
    });

    $('#flowTest').click(function () {
        var $modal = $('#flowTestModal');
        $modal.modal('show');

        var paramsTemplate;

        $.each(SvgPanel.svgCmp.componentStore, function (id, cmp) {
            if (cmp.type === 'START') {
                paramsTemplate = cmp.data.paramsTemplate;
                $modal.find('input[name="httpMethod"]').val(cmp.data.httpMethod);
            }
        });

        if (paramsTemplate) {
            $('#flowTestInput').html(juicer(FLOW_TEST_INPUT_TEMPLATE, paramsTemplate));
        }
    });

    $('#flowTestBtn').click(function () {
        var params = {};
        $('#flowTestInput').children().each(function () {
            var $this = $(this);

            var type = $this.attr('data-type'),
                name = $this.attr('data-name');

            switch (type) {
                case 'String':
                    params[name] = $this.find('input').val();
                    break;
                case 'Number':
                    params[name] = Number($this.find('input').val());
                    break;
                case 'Boolean':
                    params[name] = $this.find('input:checked').val() === 'true';
                    break;
                case 'Null':
                    params[name] = null;
                    break;
            }
        });

        var httpMethod = $('#flowTestModal').find('input[name="httpMethod"]').val().toLowerCase();
        var flowId = $('#flowId').val();

        $[httpMethod](flowId, params, function (data) {
            $('#flowTestOutput').html(JSON.stringify(data));
        });
    });
})();