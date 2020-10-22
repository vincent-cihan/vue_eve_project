// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'default-passive-events'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import App from './App'
import router from './router'
import store from './store/index'
import echarts from 'echarts'
import {Alert, Confirm, Toast} from 'wc-messagebox'
import VueLazyload from 'vue-lazyload'
import VueAreaLinkage from 'vue-area-linkage';
import 'wc-messagebox/style.css'
import 'swiper/dist/css/swiper.css'
import 'vue-area-linkage/dist/index.css' // v2 or higher
import format from './assets/js/StringFormat';
// import '../static/css/element-reset/index.css'   // element-ui主题样式
// import '../static/css/public.css'
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
// import './assets/iconfont/iconfont.css'
// 将Promise抛出为全局对象,兼容ie等低版本浏览器
import Print from 'vue-print-nb';

window.Promise = Promise
window.axios = axios
import Constants from '@/assets/js/Constants'
import Utils from '@/assets/js/Utils'

window.Constants = Constants;
window.Utils = Utils;

const ElementUI = require('element-ui');
require('element-ui/lib/theme-chalk/index.css');
Vue.use(ElementUI)

const loadCss = url => {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    document.body.appendChild(link);
};

// if (Utils.IsPC()) {
    loadCss('../static/css/public.css')
// } else {
//     const Vant = require('vant');
//     loadCss('../static/css/public_mobile.css')
//     require('vant/lib/index.less');
//     Vue.use(Vant);
// }

let options = {
    title: '', // 默认无标题
    btn: {
        text: '',
        style: {
            'backgroun-color': 'red',
            'font-size': '20px',
            'color': 'blue'
        }
    }
}

Vue.config.productionTip = false
Vue.use(Alert, options)
Vue.use(Confirm, options)
Vue.use(Toast, options)
Vue.use(VueAreaLinkage)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'static/img/error.jpeg',
    loading: 'static/img/loading.gif',
    attempt: 1
})
Vue.use(Viewer, {
    defaultOptions: {
        toolbar: false
    }
})

Vue.prototype.$echarts = echarts
Vue.config.devtools = true
// 扩展JavaScript String占位格式化方法format
// 用于网络请求链接地址中参数的占位匹配
format && format.extend(String.prototype, {});

window.eventBus = new Vue();//注册全局事件对象

Vue.use(Print);

//axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 设置正常请求为form表单形式
    // if(config.method!='get' && config.headers['Content-Type'] != 'multipart/form-data' && !(config.data instanceof FormData)){
    //     config.data=qs.stringify(config.data);
    //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // }

    // 设置token
    const token = window.localStorage.getItem('token');
    if (token && token !== 'undefined')
        config.headers['token'] = token
    //config.withCredentials = true

    if (config.url.indexOf('?') > -1) {
        config.url = config.url + "&timestamp=" + new Date().getTime();
    } else {
        config.url = config.url + "?timestamp=" + new Date().getTime();
    }
    return config;
}, function (error) {
    // 对响应错误做点什么
    /*if(error.response){
      if(error.response.status === 401){ // 接口返回401，token失效
        window.localStorage.clear()
        router.replace && router.replace({name: 'Login'})
      }
    }*/
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response && response.data && response.data.success == false) {
        return Promise.reject(response.data)
    }
    return response && response.data || response;
}, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) { // 接口返回401，token失效
            let toPath = Utils.IsPC() ? '/' : '/mobile/portal-home'
            store.dispatch("setToken", null)
            store.dispatch("setUserInfo", null)
            router.replace && router.replace({path: toPath})
            return Promise.reject({
                code: 1,
                errorMessage: error.response.data && error.response.data.errorMessage || "登录已过期，请重新登录！"
            });
        }
    }
    return Promise.reject(error.response && error.response.data);
});

// 全局设置router跳转
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
