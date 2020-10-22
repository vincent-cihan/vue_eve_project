import wx from 'weixin-js-sdk';

var api = (location.href.indexOf(':8080') < 0 ? (window.location.protocol + "//" + window.location.host) : "http://guangda.51yxxg.com") + '/api/pay/wechat/',
    app_id = 'wx07f9aaa2d9afa475',
    wl = window.location,
    openid = null;

function getBackUrl() {
    var search = wl.search
    if (!judgeHasQuery()) {
        // if (search === '') {
        search = '?_wc_checked=1'
    } else {
        search += '&_wc_checked=1'
    }

    var url = wl.origin + wl.pathname + wl.hash + search
    return encodeURIComponent(url)
}

function judgeHasQuery() {
    var reg = new RegExp("(^|&)" + ".*" + "=([^&]*)(&|$)")
    var r = window.location.hash.substr(1).match(reg)
    if (r != null)
        return true
    return false
}

function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = window.location.hash.substr(1).match(reg)
    if (r != null)
        return unescape(r[2])
    return null
}

function get_broswer_info() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/weibo/i) == "weibo") {  //weibo
        return 10;
    } else if (ua.indexOf('qq/') != -1) {  //qq
        return 9;
    } else if (ua.match(/MicroMessenger/i) == 'micromessenger') { //wechat
        return 3;
    }
    return 4;
}

function getOpenId() {
    var channel = get_broswer_info();
    if (channel === 3) {
        openid = openid || getQuery('open_id');
        // 没有openid，调用微信接口
        if (!openid && wl.search.indexOf('_wc_checked=1') <= 0) {
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app_id + '&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
            var source_url = encodeURIComponent(api + 'access_info?source_url=' + getBackUrl());
            url = url.replace('REDIRECT_URI', source_url);
            window.location.href = url;
            return null
        } else {
            return openid
        }
    } else {
        return channel;
    }
}

// 注册微信
window.getWechatSignature = function (res) {
    res = res || []
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: app_id, // 必填，公众号的唯一标识
        timestamp: res[2], // 必填，生成签名的时间戳
        nonceStr: res[1], // 必填，生成签名的随机串
        signature: res[0], // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showOptionMenu', 'showAllNonBaseMenuItem', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
}

function callJsonpApi(url) {
    var script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
}

function showOptionMenu() {
    wx.ready(function () {
        wx.showOptionMenu();
        wx.showAllNonBaseMenuItem();
    })
    callJsonpApi(api + 'js_signature_gk/?callback=getWechatSignature&url=' + encodeURIComponent(location.href))
}

function wechatShare(shareurl, title, desc, cover, callback) {
    var data = {
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: shareurl, // 分享链接
        imgUrl: cover, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            if (callback) {
                callback();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    }
    wx.ready(function () {
        wx.onMenuShareTimeline(data);
        wx.onMenuShareAppMessage(data);
        wx.showOptionMenu();
        wx.showAllNonBaseMenuItem();
        wx.hideMenuItems({
            menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    })
    callJsonpApi(api + 'js_signature_gk/?callback=getWechatSignature&url=' + encodeURIComponent(location.href))
}

function hideAchieveOptionMenu() {
    wx.hideOptionMenu()
}

function hideOptionMenu() {
    wx.ready(function () {
        wx.hideOptionMenu()
    })
    callJsonpApi(api + 'js_signature_gk/?callback=getWechatSignature&url=' + encodeURIComponent(location.href))
}

// 发送给朋友: "menuItem:share:appMessage"
// 分享到朋友圈: "menuItem:share:timeline"
// 分享到QQ: "menuItem:share:qq"
// 分享到Weibo: "menuItem:share:weiboApp"
// 收藏: "menuItem:favorite"
// 分享到FB: "menuItem:share:facebook"
// 分享到 QQ 空间/menuItem:share:QZone
function hideMenuItems() {
    wx.ready(function () {
        wx.hideMenuItems({
            menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    })

}

//微信浏览器支付
function wxpay(params, callback) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(params, callback), false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(params, callback));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(params, callback));
        }
    } else {
        onBridgeReady(params, callback);
    }
}

function onBridgeReady(params, callback) {
    var that = this
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": params.appId,
            "timeStamp": params.timeStamp,
            "nonceStr": params.nonceStr,
            "package": params.package,
            "signType": params.signType,
            "paySign": params.paySign
        },
        function (res) {
            callback(res)
        }
    );
}


export default {
    getOpenId: getOpenId,
    wechatShare: wechatShare,
    showOptionMenu: showOptionMenu,
    hideOptionMenu: hideOptionMenu,
    hideMenuItems: hideMenuItems,
    hideAchieveOptionMenu: hideAchieveOptionMenu,
    wxpay: wxpay,
    getBackUrl: getBackUrl,
}
