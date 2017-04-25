/**
 * Created by LiJianhua on 2016/3/23.
 */
var languageType = {
    ZH_CN: 'zh_CN',
    EN: "en"
};

var textKey = {
    MENU_EMOTION_LIB : 'MENU_EMOTION_LIB',
    MENU_COMIC_LIB : 'MENU_COMIC_LIB',
    MENU_EMOTION : 'MENU_EMOTION',
    MENU_COMIC : 'MENU_COMIC',
    MENU_ABOUT : 'MENU_ABOUT',
    MENU_TOOL : 'MENU_TOOL',
    MENU_MY_ARTIFACT : 'MENU_MY_ARTIFACT',
    MENU_MY_COLLECTION : 'MENU_MY_COLLECTION',
    INPUT_TEXT: 'INPUT_TEXT',
    PLEASE_LOGIN: 'PLEASE_LOGIN',
    ALREADY_SAVED: 'ALREADY_SAVED',
    SAVE_SUCCESS: 'SAVE_SUCCESS',
    CREATE_YOUR_ARTIFACT: 'CREATE_YOUR_ARTIFACT',
    GUEST: 'GUEST',
    TRY_AGAIN_LAGER: 'TRY_AGAIN_LAGER',
    NO_TITLE: 'NO_TITLE'
};

var allText = {
    "MENU_EMOTION_LIB": {"zh_CN": "表情库", "en": "Emotion Lib"},
    "MENU_COMIC_LIB": {"zh_CN": "漫画库", "en": "Comic Lib"},
    "MENU_EMOTION": {"zh_CN": "表情工厂", "en": "Emotion Factory"},
    "MENU_COMIC": {"zh_CN": "漫画工厂", "en": "Comic Factory"},
    "MENU_ABOUT": {"zh_CN": "关于", "en": "About"},
    "MENU_TOOL": {"zh_CN": "工具箱", "en": "Tools"},
    "MENU_MY_ARTIFACT": {"zh_CN": "我的作品", "en": "My Artifacts"},
    "MENU_MY_COLLECTION": {"zh_CN": "我的收藏", "en": "My Collections"},
    "INPUT_TEXT": {"zh_CN": "请输入文字.", "en": "Please input text."},
    "PLEASE_LOGIN": {"zh_CN": "请先登录.", "en": "Please login first."},
    "ALREADY_SAVED": {"zh_CN": "该作品已经保存.", "en": "Already saved."},
    "SAVE_SUCCESS": {"zh_CN": "保存成功.", "en": "Save succeed."},
    "CREATE_YOUR_ARTIFACT": {"zh_CN": "请先创作作品.", "en": "Please create your artifact first."},
    "GUEST": {"zh_CN": "游客", "en": "Guest"},
    "TRY_AGAIN_LAGER": {"zh_CN": "请稍后重试.", "en": "Please try again later."},
    "NO_TITLE": {"zh_CN": "无标题", "en": "No title."}
};

var curLanguage = languageType.ZH_CN;

function getTxt(key) {
    return allText[key][curLanguage];
}