/*
 * 调用页面：添加<script type="text/javascript" src="js/libs/jquery-migrate-1.1.1.js"></script> jquery与老版本兼容
 * 弹出层：  <div class="modal fade hide modal-info" style="background-color: #333333;width:900px;left:35%;" id="demoModal">
				<div class="modal-body" style="max-height: 500px;"></div>
			</div>
 */

//初始化图片选择器
function initGalleriffic(totalNums) {
	// Initialize Advanced Galleriffic Gallery
	var galleryAdv = $('#gallery').galleriffic(
			'#thumbs',
			{
				totalNums : totalNums,
				backfill : true, // 双击图片是否回填
				delay : 2000,
				numThumbs : 9,
				preloadAhead : 9,
				enableTopPager : true,
				enableBottomPager : false,
				imageContainerSel : '#slideshow',
				controlsContainerSel : '#controls',
				captionContainerSel : '#caption',
				loadingContainerSel : '#loading',
				renderSSControls : false,
				renderNavControls : false,
				enableHistory : false,
				autoStart : false,
				onBackfill : function(link) {
					backfillImage(link);
				},
				onChange : function(prevIndex, nextIndex, gallery) {
					syncLoadThumbs(prevIndex, nextIndex, gallery);

					$('#thumbs ul.thumbs').children().eq(prevIndex).fadeTo(
							'fast', onMouseOutOpacity).end().eq(nextIndex)
							.fadeTo('fast', 1.0);
				},
				onTransitionOut : function(callback) {
					$('#caption').fadeTo('fast', 0.0);
					$('#slideshow').fadeTo('fast', 0.0, callback);
				},
				onTransitionIn : function() {
					$('#slideshow').fadeTo('fast', 1.0);
					$('#caption').fadeTo('fast', 1.0);
				},
				onPageTransitionOut : function(callback) {
					$('#thumbs ul.thumbs').fadeTo('fast', 0.0, callback);
				},
				onPageTransitionIn : function() {
					$('#thumbs ul.thumbs').fadeTo('fast', 1.0);
				}
			});
}

// ajax加载下一页的数据
function syncLoadThumbs(prevIndex, nextIndex, gallery) {
	if (gallery.data.length <= nextIndex) { // 已经加载过的不走这
		var start = gallery.data.length;
		var end = nextIndex + gallery.settings.numThumbs;
		var imageSelectPath = $("input[type=hidden][name=imageSelectPath]")
				.val();
		$.post("syncLoadThumds.html", {
			'start' : start,
			'end' : end,
			'imageSelectPath' : imageSelectPath
		}, function(data) {
			var thumds = eval(data.thumds);
			var links = "";
			$.each(thumds, function(index, value) {
				links += "<li>" + "<a class=\"thumb\" href=\""
						+ imageSelectPath + value + "\">" + "<img src=\""
						+ imageSelectPath + value
						+ "\" width=\"75px\" height=\"75px\"/>" + "</a>"
						+ "<div class=\"caption\">" + value + "</div>"
						+ "</li>";
			});
			$("ul.thumbs").append(links);
			initThumbsHoverStyle(); // 为刚追加的li添加样式

			$('#thumbs ul.thumbs').children().eq(prevIndex).fadeTo('fast',
					onMouseOutOpacity).end().eq(nextIndex).fadeTo('fast', 1.0);

			reloadThumbs(gallery);
			gallery.syncLoadCallback();
		});
		gallery.ifSync = true;
	} else {
		gallery.ifSync = false;
	}
}

// 初始化缩略图，添加阴影样式
function initThumbsHoverStyle() {
	$('#thumbs ul.thumbs li').css('opacity', onMouseOutOpacity).hover(
			function() {
				$(this).not('.selected').fadeTo('fast', 1.0);
			}, function() {
				$(this).not('.selected').fadeTo('fast', onMouseOutOpacity);
			});
}

// 异步加载图片
function reloadThumbs(gallery) {
	var currentDataTotal = gallery.data.length;
	gallery.$thumbsContainer.find(
			'ul.thumbs > li:gt(' + (gallery.data.length - 1) + ')').each(
			function(i) {
				var $li = $(this);
				var $aThumb = $li.find('a.thumb');
				var hash = gallery.offset + i + currentDataTotal;

				gallery.data.push({
					title : $aThumb.attr('title'),
					slideUrl : $aThumb.attr('href'),
					caption : $li.find('.caption').remove(),
					hash : hash
				});

				if (gallery.settings.backfill) { // 双击图片回填
					$aThumb.dblclick(function() {
						gallery.settings.onBackfill($aThumb);
					});
				}

				// Setup history
				$aThumb.attr('rel', 'history');
				$aThumb.attr('href', '#' + hash);
			});
}

// 回填选择的图片
function backfillImage(link) {
	var image = link.children("img").attr('src');
	var array = image.split("/");
	var imageName = array[array.length - 1];
	if ($("#backfillImage").size() > 0) {
		$("#backfillImage").attr("src", image);
	}
	if ($("input[type=hidden][name=backfillImgName]").size() > 0) {
		$("input[type=hidden][name=backfillImgName]").val(imageName);
	}
	$(".modal-backdrop").click(); //隐藏掉弹出层
}