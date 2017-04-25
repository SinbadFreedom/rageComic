/**
 * Created by LiJianhua on 2015/10/20.
 */
var actorId = 0;
var clickId = 0;

var SCALE_RATE = 0.05;
var DEFAULT_SPRITE_WIDTH = 300;
var DEFAULT_SPRITE_HEIGHT = 300;
var SPRITE_NUM_HORIZON = 1;
var SPRITE_NUM_VERTICAL = 1;
var RAGE_LIB_SCALE_RATE = 1;
var URL_IMAGE_LIB = '/rage_comic/rage_canvas_image_lib.php';
var URL_SAVE = '/rage_comic/rage_canvas_save.php';
var URL_COLOR_CONF = '/rage_comic/colorConf.json';
var URL_IMAGE_FOLDER_S = '/image/rc_s/';
var URL_IMAGE_FOLDER_L = '/image/rc_l/';

var isFontBold = false;
var FONT_STYLE_BTN_BG_COLOR = '#5cb85c';
var fontTextColor = '#000000';
var FONT_FAMILY = '微软雅黑';

var editSpriteId = 0;
var publicSpriteId = 0;
var publicActorId = 0;

var lastSaveContent = '';

function init() {
    initEvent();
    initConfigure();
    hideAllUI();
    updatePreview();
}

function initEvent() {
    $("#btnImageLib_0").click(btnImageLib);
    $("#btnImageLib_1").click(btnImageLib);
    $("#btnAddText").click(apeToolAddText);
    $("#btnGoPrevious").click(btnGoPrevious);
    $("#btnGoNext").click(btnGoNext);
    $("#btnDel").click(apeToolDel);
    $("#btnSave").click(apeToolSave);
    $("#btnGoTop").click(apeGoTop);
    $("#btnGoUp").click(apeGoUp);
    $("#btnGoDown").click(btnGoDown);
    $("#btnGoBottom").click(btnGoBottom);
    $("#apeZoomIn").click(apeZoomIn);
    $("#apeZoomOut").click(apeZoomOut);
    $("#apeZoomFitBest").click(apeZoomFitBest);
    $("#clickHideUIArea").click(handleClickCanvas);
    $("#fontColorPicker").click(clickFontColor);
    $("#apeFontFamily").click(clickApeFontFamily);
    $("#apeFontSize").click(clickApeFontSize);
    $("#apeFontBold").click(clickApeFontBold);
    $("#spriteWidth").change(onChangeSpriteSize);
    $("#spriteHeight").change(onChangeSpriteSize);
    $("#horizontalNum").change(onChangeSpriteNum);
    $("#verticalNum").change(onChangeSpriteNum);

    $('#btnSet, #closeRight').click(updateRightOffCanvas);
    $('#btnImageLib_0, #btnImageLib_1, #closeLeft').click(updateLeftOffCanvas);
}

function initConfigure() {
    DEFAULT_SPRITE_WIDTH = $("#spriteWidth").val() ? $("#spriteWidth").val():DEFAULT_SPRITE_WIDTH;
    DEFAULT_SPRITE_HEIGHT = $("#spriteHeight").val() ? $("#spriteHeight").val() : DEFAULT_SPRITE_HEIGHT;
    SPRITE_NUM_HORIZON = $("#horizontalNum").val() ? $("#horizontalNum").val() : SPRITE_NUM_HORIZON;
    SPRITE_NUM_VERTICAL = $("#verticalNum").val() ? $("#verticalNum").val() : SPRITE_NUM_VERTICAL;

    updateSprite();
}

function btnImageLib() {
    if ($("#divImgLib").children().length == 0) {
        // TODO fix ajax duplication
        getImageLib();
    }
}

function apeToolAddText() {
    var id = getNewActorId();
    $("#apeCanvas").append("<textarea class='apeActor' id=" + id + "></textarea>");
    $("#" + id).val(getTxt(textKey.INPUT_TEXT));
    var canvasWidth = $("#apeCanvas").css('width');
    var canvasHeight = $("#apeCanvas").css('height');
    $("#" + id).css({width: canvasWidth, height: canvasHeight});
    $("#" + id).focus(function () {
        if ($("#" + id).val() == getTxt(textKey.INPUT_TEXT)) {
            $("#" + id).val('');
        }
    });

    $("#" + id).blur(function () {
        if ($("#" + id).val() == '') {
            $("#" + id).val(getTxt(textKey.INPUT_TEXT));
        }
    });

    updateTextStyle(id);
}

function updateTextStyle(divId) {
    if (divId == 0) {
        return;
    }
    var fontFamily = FONT_FAMILY;
    var apeFontSize = $("#apeFontSize").val() + 'px';
    $("#" + divId).css({"font-family": fontFamily, "font-size": apeFontSize, "color": fontTextColor});
    if (isFontBold) {
        $("#" + divId).css({"font-weight": 'bold'});
    } else {
        $("#" + divId).css({"font-weight": 'normal'});
    }
    apeAddActor(divId);
}

function handleClickImgLib() {
    var self = this;
    hideAllUI();
    var id = getNewActorId();
    var imgSrc = self.src;
    imgSrc = imgSrc.replace(URL_IMAGE_FOLDER_S, URL_IMAGE_FOLDER_L);
    var imgDiv = "<img class='apeActor' id=" + id + " src=" + imgSrc + ">";
    $("#apeCanvas").append(imgDiv);
    apeAddActor(id);
    updateLeftOffCanvas();
}

function handleBtnApply() {
    hideAllUI();
    setAllTextToValue();
    $('#sprite_' + editSpriteId).append($('#apeCanvas').children().clone());
}

function hideAllUI() {
    $(".apeActor").css("border", "");
    $("#apeColorPicker").hide();
}

function btnGoPrevious() {
    $('#apeCanvas').empty();
    --editSpriteId;
    if (editSpriteId < 0) {
        editSpriteId = 0;
    }
    editSpriteId %= (SPRITE_NUM_HORIZON * SPRITE_NUM_VERTICAL);
    updateCanvas();
}

function btnGoNext() {
    handleBtnApply();
    $('#apeCanvas').empty();
    ++editSpriteId;
    editSpriteId %= (SPRITE_NUM_HORIZON * SPRITE_NUM_VERTICAL);
    updateCanvas();
}

function updateCanvas() {
    handleBtnApply();
    $('#apeCanvas').append($('#sprite_' + editSpriteId).children().clone());
}

function apeToolDel() {
    if (clickId != 0) {
        $("#" + clickId).unbind();
        $("#" + clickId).remove();
        hideAllUI();
    }
}

function apeGoTop() {
    if (clickId != 0) {
        var maxZ = 1;
        $('#apeCanvas').children().each(function () {
            if ($(this).css('z-index') != 'auto') {
                var tempZ = parseInt($(this).css('z-index'));
                if (tempZ > maxZ) {
                    maxZ = tempZ;
                }
            }
        });
        $("#" + clickId).css("z-index", "" + (maxZ + 1));
    }
}

function apeGoUp() {
    if (clickId != 0) {
        var zIndex = parseInt($("#" + clickId).css("z-index"));
        $("#" + clickId).css("z-index", "" + (zIndex + 1));
    }
}

function btnGoDown() {
    if (clickId != 0) {
        var zIndex = parseInt($("#" + clickId).css("z-index"));
        if (zIndex > 0) {
            zIndex -= 1;
        }
        $("#" + clickId).css("z-index", "" + zIndex);
    }
}

function btnGoBottom() {
    if (clickId != 0) {
        $("#" + clickId).css("z-index", "" + 0);
    }
}

function apeZoomIn() {
    if (clickId != 0) {
        var width = $("#" + clickId).width();
        var height = $("#" + clickId).height();
        width = width * (1 + SCALE_RATE);
        height = height * (1 + SCALE_RATE);
        $("#" + clickId).width(width);
        $("#" + clickId).height(height);
    }
}

function apeZoomFitBest() {
    if (clickId != 0) {
        var canvasWidth = $("#apeCanvas").css('width');
        var canvasHeight = $("#apeCanvas").css('height');
        $("#" + clickId).css({'top': '0px', 'left': '0px', width: canvasWidth, height: canvasHeight});
    }
}

function apeZoomOut() {
    if (clickId != 0) {
        var width = $("#" + clickId).width();
        var height = $("#" + clickId).height();
        width = width * (1 - SCALE_RATE);
        height = height * (1 - SCALE_RATE);
        $("#" + clickId).width(width);
        $("#" + clickId).height(height);
    }
}

function apeAddActor(id) {
    $("#" + id).bind("mousedown ontouchstart", handleMouseDown);
    $("#" + id).bind("mouseup ontouchend", handleMouseUp);
    $("#" + id).click(handleClickSprite);
    $("#" + id).css('z-index', id);
}

function handleClickCanvas() {
    hideAllUI();
}

function handleMouseDown(e) {
    var self = this;
    $(self).css("cursor", "move");
    var startX = e.clientX;
    var startY = e.clientY;
    var initLeft = $(self).position().left;
    var initTop = $(self).position().top;
    $(document).bind("mousemove ontouchmove", function (ev) {
        var _x = initLeft + ev.clientX - startX;
        var _y = initTop + ev.clientY - startY;
        $("#" + self.id).css({left: _x + "px", top: _y + "px"});
    });
}

function handleMouseUp() {
    $(".apeActor").css("cursor", "default");
    $(document).unbind("mousemove ontouchmove");
}

function handleClickSprite(e) {
    var self = this;
    hideAllUI();
    $("#" + self.id).css("border", "1px dashed green");
    clickId = self.id;
    // stop event propagation
    e.stopPropagation();
}

function handleClickColor() {
    var self = this;
    var color = self.title;
    fontTextColor = color;
    $("#fontColorPicker").css({"background-color": color});
    updateTextStyle(clickId);
    hideAllUI();
}

function getNewActorId() {
    return ++actorId;
}

function clickFontColor() {
    $("#apeColorPicker").toggle();
    if ($("#apeColorPicker").children().length == 0) {
        getColorConf();
    }
}

function clickApeFontFamily() {
    updateTextStyle(clickId);
}

function clickApeFontSize() {
    updateTextStyle(clickId);
}

function clickApeFontBold() {
    if (isFontBold) {
        $("#apeFontBold").css("background-color", "");
    } else {
        $("#apeFontBold").css("background-color", FONT_STYLE_BTN_BG_COLOR);
    }
    isFontBold = !isFontBold;
    updateTextStyle(clickId);
}

function apeToolSave() {
    handleBtnApply();
    var uid = getCookie('uid');
    var pwd = getCookie('pwd');
    var nName = getCookie('nName');

    if (null == nName || null == uid || null == pwd || 'undefined' == uid || 'undefined' == pwd || 'undefined' == nName) {
        alert(getTxt(textKey.PLEASE_LOGIN));
        return;
    }

    var title = $('#comicTitle').val();
    if (!title) {
        title = getTxt(textKey.NO_TITLE);
    }

    var content = $('#apeComicView').html();
    if(content == lastSaveContent) {
        alert(getTxt(textKey.ALREADY_SAVED));
        return;
    } else {
        lastSaveContent = content;
    }
    var dataObj = new Array();
    if(content) {
        for(var i = 0; i < SPRITE_NUM_HORIZON * SPRITE_NUM_VERTICAL; i++) {
            var divID = "#sprite_" + i;
            var spriteObj = ljhEncode(divID);
            dataObj.push(spriteObj);
        }
    } else {
        // 预览区没有数据时,采用编辑区数据
        var divID = "#apeCanvas";
        var spriteObj = ljhEncode(divID);
        if(spriteObj.length > 0) {
            dataObj.push(spriteObj);
        }
    }

    if (dataObj.length > 0) {
        var encodeData = JSON.stringify(dataObj);
        $.post(URL_SAVE, {uid: uid, pwd: pwd, name: nName, title: title, hn: SPRITE_NUM_HORIZON, vn: SPRITE_NUM_VERTICAL, sw: DEFAULT_SPRITE_WIDTH, sh: DEFAULT_SPRITE_HEIGHT, data: encodeData}, function (result) {
            var obj = JSON.parse(result);
            if (obj.state == 0) {
                alert(getTxt(textKey.SAVE_SUCCESS));
            } else {
                alert(getTxt(textKey.PLEASE_LOGIN));
            }
        });
    } else {
        alert(getTxt(textKey.CREATE_YOUR_ARTIFACT));
    }
}

function setAllTextToValue() {
    $("#apeCanvas textarea").each(function () {
        var str = $(this).val();
        $(this).text(str);
    });
}

function getImageLib() {
    $.ajax({
        url: URL_IMAGE_LIB,
        success: function (data) {
            var jsonObj = JSON.parse(data);
            for (var i in jsonObj) {
                var imgStr = '<img src="' + URL_IMAGE_FOLDER_S + jsonObj[i]
                    + '" class="libImage" style="width: 80px; height: 80px; cursor: pointer; border: 1px solid;">';
                $("#divImgLib").append(imgStr);
            }
            $(".libImage").click(handleClickImgLib);
        },
        error: function () {
            alert("error.");
        }
    });
}

function getColorConf() {
    $.ajax({
        url: URL_COLOR_CONF,
        dataType: 'text',
        success: function (data) {
            var jsonObj = JSON.parse(data);
            for (var i in jsonObj) {
                var imgStr = '<div class="color" title="' + jsonObj[i] + '" style="background-color: ' + jsonObj[i] + ';"></div>';
                $("#apeColorPicker").append(imgStr);
            }
            $(".color").click(handleClickColor);
        },
        error: function () {
            alert("error.");
        }
    });
}

function updatePreview() {
    $('#apeComicView').empty();
    var spriteNumVertical = SPRITE_NUM_VERTICAL;
    var spriteNumHorizon = SPRITE_NUM_HORIZON;
    var previewWidth = DEFAULT_SPRITE_WIDTH;
    var previewHeight = DEFAULT_SPRITE_HEIGHT;
    for (var h = 0; h < spriteNumVertical; h++) {
        for (var w = 0; w < spriteNumHorizon; w++) {
            var id = 'sprite_' + (h * spriteNumHorizon + w);
            var divStr = "<div class='apeSpriteCon' id='" + id + "' style='width: " + previewWidth + "px; height: " + previewHeight
                + "px; top: " + previewHeight * h + "px; left: " + previewWidth * w + "px; " + "'></div>";
            $("#apeComicView").append(divStr);
        }
    }
}

function onChangeSpriteSize() {
    if (DEFAULT_SPRITE_WIDTH != $("#spriteWidth").val()) {
        DEFAULT_SPRITE_WIDTH = $("#spriteWidth").val();
    }
    if (DEFAULT_SPRITE_HEIGHT != $("#spriteHeight").val()) {
        DEFAULT_SPRITE_HEIGHT = $("#spriteHeight").val();
    }

    updateSprite();
    updatePreview();
}

function onChangeSpriteNum() {
    if (SPRITE_NUM_HORIZON != $("#horizontalNum").val()) {
        SPRITE_NUM_HORIZON = $("#horizontalNum").val();
    }
    if (SPRITE_NUM_VERTICAL != $("#verticalNum").val()) {
        SPRITE_NUM_VERTICAL = $("#verticalNum").val();
    }
    updatePreview();
}

function updateSprite() {
    $("#apeCanvas").css({'width': DEFAULT_SPRITE_WIDTH + 'px', height: DEFAULT_SPRITE_HEIGHT + 'px'});
}

function ljhEncode(divID) {
    var spriteObj = new Array();
    var apeTextArea = divID + " textarea";
    $(apeTextArea).each(function () {
        var apeText = new Object();
        apeText.type = 1;
        apeText.id = $(this).attr("id");
        apeText.z = $(this).css('z-index');
        apeText.w = $(this).css('width');
        apeText.h = $(this).css('height');
        apeText.t = $(this).css('top');
        apeText.l = $(this).css('left');
        apeText.text = $(this).val();
        apeText.ff = $(this).css('font-family');
        apeText.fs = $(this).css('font-size');
        apeText.fw = $(this).css('font-weight');
        apeText.c = $(this).css('color');
        spriteObj.push(apeText);
    });

    var imgArea = divID + " img";
    $(imgArea).each(function () {
        var apeImg = new Object();
        apeImg.type = 2;
        apeImg.id = $(this).attr("id");
        apeImg.z = $(this).css('z-index');
        apeImg.w = $(this).css('width');
        apeImg.h = $(this).css('height');
        apeImg.t = $(this).css('top');
        apeImg.l = $(this).css('left');
        apeImg.s = $(this).attr("src");
        spriteObj.push(apeImg)
    });
    return spriteObj;
}

function updateLeftOffCanvas() {
    $('.row-offcanvas-left').toggleClass('active');
}

function updateRightOffCanvas() {
    $('.row-offcanvas-right').toggleClass('active');
}

function getComicPage() {
    var aID = getUrlParam('aid');
    if (aID) {
        $.post("comic_show.php", {aid: aID}, function (result) {
            var obj = JSON.parse(result);
            if(obj.state == 0) {
                var comic = obj.data;
                $("#comicTitle").append(comic.title);
                if(obj.name) {
                    $("#comicAuthor").append(comic.name);
                } else {
                    $("#comicAuthor").append(getTxt(textKey.GUEST));
                }
                var timeStr = formatDate(comic.time);
                $("#comicTime").append(timeStr);
                renderComic('comicContent', comic, 1);
            }
        });
    }
}

function renderComic(divId, artifactData, scaleRate) {
    var comicData = JSON.parse(artifactData.data);
    var previewWidth = artifactData.sw.split("px", 1) * scaleRate;
    var previewHeight = artifactData.sh.split("px", 1) * scaleRate;
    for(var i = 0; i < comicData.length; i++) {
        ++publicSpriteId;
        var spriteID = 'sprite_' + publicSpriteId;
        var divStr = "<div class='apeSpriteCon' id='" + spriteID + "' style='width: " + previewWidth + "px; height: " + previewHeight + "px;'></div>";
        $("#" + divId).append(divStr);

        var spriteArr = comicData[i];
        for(var j = 0; j < spriteArr.length; j++) {
            publicActorId++;
            var htmlStr = "";
            var actorObj = spriteArr[j];
            var id = actorObj.id;
            var z = actorObj.z;
            var w = actorObj.w.split("px", 1) * scaleRate;
            var h = actorObj.h.split("px", 1) * scaleRate;
            var l = actorObj.l.split("px", 1) * scaleRate;
            var t = actorObj.t.split("px", 1) * scaleRate;
            if(actorObj.type == 1) {
                var ff = actorObj.ff;
                var fs = actorObj.fs.split("px", 1) * scaleRate;
                var fw = actorObj.fw.split("px", 1) * scaleRate;
                var c = actorObj.c;
                var text = actorObj.text;
                htmlStr = "<textarea class='apeActor' id=" + publicActorId + " readonly='readonly'>" + text +"</textarea>";
                $("#" + spriteID).append(htmlStr);
                $("#" + publicActorId).css({"font-family": ff, "font-size": fs, "font-weight":fw, "color": c, "resize": 'none'});
            } else if(actorObj.type == 2) {
                htmlStr = "<img class='apeActor' id=" + publicActorId + " src=" + actorObj.s + ">";
                $("#" + spriteID).append(htmlStr);
            }
            $("#" + publicActorId).css({"width": w, "height": h, "top": t, "left": l, "z-index": "" +z});
        }
        $("#" + spriteID).click(function() {
            drawComic($("#" + spriteID));
        });
    }
}

function getAllArtifact() {
    $.ajax({
        url: "/rage_comic/rage_lib.php",
        success: function (comicDataList) {
            showArtifact(comicDataList);
        },
        error: function () {
            showError();
        }
    });
}

function getSelfArtifact(uid) {
    $.ajax({
        url: "/rage_comic/rage_lib.php",
        type:"POST",
        data:{uid:uid},
        success: function (comicDataList) {
            showArtifact(comicDataList);
        },
        error: function () {
            showError();
        }
    });
}

function showArtifact(comicDataList) {
    var artifacts = JSON.parse(comicDataList);
    for(var i = 0; i < artifacts.length; i++) {
        renderComic('comicContent', artifacts[i], RAGE_LIB_SCALE_RATE);
    }
}

function showError() {
    $("#rageLib").append(getTxt(textKey.TRY_AGAIN_LAGER));
}

function drawComic(element) {
    html2canvas(element).then(function(canvas) {
        $("#comicImage").empty();
        $("#comicImage").append(canvas);
        var triggerDownload = $("<a>").attr("href", canvas.toDataURL()).attr("download", new Date().valueOf()).appendTo("body");
        triggerDownload[0].click();
        triggerDownload.remove();
    });
}