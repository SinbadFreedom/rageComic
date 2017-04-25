/**
 * Created by LiJianhua on 2015/12/8.
 */
var COLOR_WHITE = '#FFFFFF';
var COLOR_BLACK = '#000000';
var FONT_TYPE_YA_HEI = 'Microsoft YaHei';
var MAX_FONT_SIZE = 200;
var ADD_FONT_SIZE = 2;
var INIT_FOUNT_SIZE = 50;
var INTERVAL = 5;

var canvas = null;
var ctx = null;
var fountSize = INIT_FOUNT_SIZE;
var lynicX = 0;
var lynicY = 0;
var lynicIndex = 0;
var middleShowIndex = 0;

var startTime = 0;

var timeLine = [];
var lynic = {
    "5025": "老 男 孩 - 游 戏 人 生",
    "10025": "演 唱 : 李 建 华",
    "13025": "",
    "20073": "在 那 花 一 样 岁 月 一 起 疯 狂 玩 游 戏",
    "26076": "网 吧 同 学 包 夜 泡 面",
    "28076": "无 价 青 春 年 华",
    "33092": "在 那 花 一 样 岁 月 满 怀 激 情 做 游 戏",
    "40037": "公 司 同 事 加 班 快 餐",
    "42037": "心 血 灌 溉 收 获",

    "46072": "分 分 秒 秒 风 云 莫 测",
    "48072": "世 界 变 外 表 也 变",
    "52098": "日 复 一 日 年 复 一 年",
    "55098": "道 不 变 内 心 不 变",

    "65042": "那 些 激 情 澎 湃 的 代 码",
    "68074": "那 些 精 雕 细 刻 的 变 化",
    "71088": "跟 随 着 指 尖 的 律 动 丰 富 多 彩 的 世 界",
    "78072": "那 些 繁 杂 精 密 的 表 格",
    "81088": "那 些 精 美 绝 伦 的 画 作",
    "85026": "这 里 的 故 事 我 永 远 会 记 得",
    "90000": ""
};

var middleShowTimeLine = [];
var middleShow = {
    "5000": "5",
    "6000": "4",
    "7000": "3",
    "8000": "2",
    "9000": "1",
    "10000": "",
    "15073": "C",
    "16076": "C++",
    "17000": "C#",
    "18000": "JAVA",
    "19000": "NodeJS",
    "20000": "PHP",
    "21000": "JS",
    "22000": "HTML",
    "23000": "CSS",
    "24000": "python",
    "25000": "lua",
    "26000": ""
};

var textRainTimeLine = [];
var textRain = {
    "30000": ["Windows", "Linux", "CentOS", "UBUNTU", "RedHat"],
    "35000": ["HTTP", "SOCKET", "HTTPS", "UDP"]
};

$(document).ready(function () {
    for (var index in lynic) {
        timeLine.push(parseInt(index));
    }

    for (var index in middleShow) {
        middleShowTimeLine.push(parseInt(index));
    }

    for (var index in textRain) {
        textRainTimeLine.push(parseInt(index));
    }

    initCanvas();
    startTime = Date.parse(new Date());
    setInterval(render, INTERVAL);
});

function initCanvas() {
    canvas = document.getElementById("myCanvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    ctx = canvas.getContext("2d");
    lynicX = canvas.width;
    lynicY = canvas.height;
    clearCanvas();
}

function clearCanvas() {
    ctx.fillStyle = "#004A80";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function render() {
    clearCanvas();
    showMiddleShow();
    showTextRain();
    showLynic();
}

function drawMiddleText(text, color, x, y) {
    if(fountSize < MAX_FONT_SIZE) {
        fountSize += ADD_FONT_SIZE;
    }
    ctx.font = fountSize + "px " + FONT_TYPE_YA_HEI;
    ctx.fillStyle = color || '#FFFFFF';
    ctx.fillText(text, x, y);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
}

function drawText(text, color, x, y) {
    ctx.font = INIT_FOUNT_SIZE + "px " + FONT_TYPE_YA_HEI;
    ctx.fillStyle = color || '#FFFFFF';
    ctx.fillText(text, x, y);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
}


function showMiddleShow() {
    var curTime = Date.parse(new Date());
    for (var i = middleShowTimeLine.length - 1; i >= 0; i--) {
        var time = middleShowTimeLine[i];
        if (curTime - startTime > time) {
            if (middleShowIndex != i) {
                middleShowIndex = i;
                fountSize = INIT_FOUNT_SIZE;
            }
            var text = middleShow["" + time];
            drawMiddleText(text, "#FFFFFF", canvas.width / 2, canvas.height / 2);
            break;
        }
    }
}

function showTextRain() {

}

function showLynic() {
    var curTime = Date.parse(new Date());
    for (var i = timeLine.length - 1; i >= 0; i--) {
        var time = timeLine[i];
        if (curTime - startTime > time) {
            if (lynicIndex != i) {
                lynicIndex = i;
                lynicY = canvas.height;
            }
            var text = lynic["" + time];
            drawText(text, "#00FF00", canvas.width / 2, lynicY);
            if (lynicY > canvas.height * 4 / 5) {
                lynicY -= 1;
            }
            break;
        }
    }
}