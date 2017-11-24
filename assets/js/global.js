
export const getDate = (date) => {
    var Year = date.getFullYear() + '-';
    var Month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Year + Month + Day)
};

export const browserType = (from) => {
    var explorer = from.toLowerCase();
    //ie
    var isIe9 = false;
    if (explorer.indexOf("msie") >= 0) {
        var ver = explorer.match(/msie ([\d.]+)/)[1];
        if (ver <= '9.0') {
            isIe9 = true;
        }
    }
    return isIe9;
};

export const isURL = (str_url) => {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(str_url);
};

//去小数点后两位以及加百分号
export const isInteger = (int, type) => {
    if (isNaN(int)) {
        return '——';
    } else if (typeof int == 'string') {
        return '——'
    }

    if (type == 1) {
        return '￥' + int.toFixed(2);
    } else if (type == 2) {
        return (int * 100).toFixed(2) + '%';
    }
    return int.toFixed(2);
};

//制保留2位小数，如：2，会在2后面补上00.即2.00
export const toDecimal2 = (x) => {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return '';
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
};


//添加更改URL参数
export const changeParam = (name, value) => {
    var url = window.location.href;
    var newUrl = "";
    var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
    var tmp = name + "=" + value;
    if (url.match(reg) != null) {
        newUrl = url.replace(eval(reg), tmp);
    } else {
        if (url.match("[\?]")) {
            newUrl = url + "&" + tmp;
        } else {
            newUrl = url + "?" + tmp;
        }
    }
    var url_after = newUrl.split('?')[1];
    window.history.pushState(null, null, "?" + url_after);
};

//获取url参数
export const getParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

//获取tab
export const getTab = () => {
    let url = window.location.href;
    url = url.substring(url.lastIndexOf("/"));
    let tab = url.charAt(1);
    tab = tab == 'f' ? 0 : tab + '';
    return tab;
};

//获取url最后一个/后面的字符串
export const getLastParam = (url) => {
    url = url.substring(url.lastIndexOf("/"));
    return url;
};


//打开网页
export const newWin = (url, id) => {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', id);
    // 防止反复添加
    if (!document.getElementById(id)) document.body.appendChild(a);
    a.click();
};

//获取字符串长度，区别中文
export const getRealStringLen = (str) => {
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
};

//高亮显示关键词
export const highLighted = (key,str) =>{
    if (str == null) return null;
    if (typeof str != "string"){
        str += "";
    }
    let reg = new RegExp("("+ key +")","ig");
    let newStr = str.replace(reg,
        (word) =>{
            return "<span style='color:#0686F9'>"+word+"</span>"
        }
    );
    return newStr;
}

//字符串长度
export const charCodeLen = (val)=>{
    if(val){
        let list = Array.from(val);
        let len = 0;
        list.forEach((font)=>{
            if(/^[\u4e00-\u9fa5]+$/.test(font)){
                len += 2;
            }else{
                len++;
            }
        })
        return len;
    }else{
        return 0;
    }
}
