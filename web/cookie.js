/**
 * Created by LiJianhua on 2015/11/20.
 */

$(document).ready(function () {
    $("#logout").click(onClickLogout);
    updateInfo();
});

function updateInfo() {
    var nName = getCookie('nName');
    if (nName == null) {
        $("#nName").html('<a href=/login.html>登录</a>');
        $("#logout").html('');
    } else {
        $("#nName").html('<a href="#">'+ nName +'</a>');
        $("#logout").html('<a id="logout" href="#">退出</a>');
    }
}

function setCookie(name, value) {
    var Days = 365 * 100;
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURI(value) + ";expires=" + expireDate.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}

function setAccountCookie(account) {
    setCookie('uid', account.uid);
    setCookie('pwd', account.pwd);
    setCookie('nName', account.name);
}

function clearCookie() {
    delCookie('uid');
    delCookie('pwd');
    delCookie('nName');
}

function delCookie(name) {
    var now = new Date();
    now.setTime(now.getTime() - 1);
    var cookieVar = getCookie(name);
    if (cookieVar != null) {
        document.cookie = name + "=" + cookieVar + ";expires=" + now.toGMTString();
    }
}

function onClickLogout() {
    clearCookie();
    updateInfo();
}