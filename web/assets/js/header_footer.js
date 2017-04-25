/**
 * Created by LiJianhua on 2016/3/31.
 */

function writeHeader() {
    document.writeln("<nav class=\"navbar navbar-inverse\">");
    document.writeln("    <div class=\"container-fluid\">");
    document.writeln("        <div class=\"navbar-header\">");
    document.writeln("            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">");
    document.writeln("                <span class=\"sr-only\">Toggle navigation</span>");
    document.writeln("                <span class=\"icon-bar\"></span>");
    document.writeln("                <span class=\"icon-bar\"></span>");
    document.writeln("                <span class=\"icon-bar\"></span>");
    document.writeln("            </button>");
    document.writeln("            <a class=\"navbar-brand\" href=\"/index.html\">ApeTools.cn</a>");
    document.writeln("        </div>");
    document.writeln("        <div id=\"navbar\" class=\"collapse navbar-collapse\">");
    document.writeln("            <ul class=\"nav navbar-nav\">");
    document.writeln("                <li><a href=\"/rage_comic/rage_lib.html\">" + getTxt(textKey.MENU_EMOTION_LIB)+ "</a></li>");
    document.writeln("                <li><a href=\"/rage_comic/rage_emotion.html\">" + getTxt(textKey.MENU_EMOTION) + "</a></li>");
    document.writeln("                <li><a href=\"/rage_comic/rage_comic.html\">" + getTxt(textKey.MENU_COMIC) + "</a></li>");
    document.writeln("                <li><a href=\"/contact.html\">" + getTxt(textKey.MENU_ABOUT) + "</a></li>");
    document.writeln("                <li><a href=\"/rage_comic/my_artifact.html\">" + getTxt(textKey.MENU_MY_ARTIFACT) + "</a></li>");
    document.writeln("                <li><a href=\"/coder/index.html\">" + getTxt(textKey.MENU_TOOL) + "</a></li>");
    document.writeln("                <li><a id=\"nName\"></a></li>");
    document.writeln("            </ul>");
    document.writeln("        </div>");
    document.writeln("    </div>");
    document.writeln("</nav>");
}

function writeFooter() {
    document.writeln("<footer id=\"footer\" class=\"navbar-fixed-bottom\">");
    document.writeln("    <hr>");
    document.writeln("    &copy;2015 QQ 1群:<span style=\"color: #16a765\"><b>156500043</b></span><a href=\'http://www.miitbeian.gov.cn/\'>冀ICP备10008352号</a>");
    document.writeln("</footer>");
}
