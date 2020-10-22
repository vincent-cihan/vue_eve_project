// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import * as actions from './actions'
import Constants from '@/assets/js/Constants'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    loading: false, // 整个页面loading
    loadingText: '', // 整个页面loading描述
    vLoading: false,  // 内容区域loading
    vLoadingText: '', // 内容区域loading描述
    openId: window.localStorage.getItem('openId'),
    token: window.localStorage.getItem('token'),
    userInfo: window.localStorage.getItem('userInfo'),
    loginRole: window.localStorage.getItem('loginRole'),  // 当前用户角色

    // 门户
    homepageData: {
        bannerList: [], // 轮播
        newsList: [],   // 新闻
        partnerList: [],    // 合作伙伴
        blockchainList: [], // 资助区块链
        donateRecordList: [],   // 资助记录
        projectCategoryList: [],    // 项目分类
        projectLatestList: [],  // 最近项目
        projectImportantList: [],  // 重点项目
        projectFocusList: [],  // 最多关注项目
        publicCategoryList: [], // 公开信息分类列表
        donateSummary: {
            amountForHistory: 0,
            amountForThisYear: 0,
            amountForThisMonth: 0,
        }, // 资助汇总
    },   // 首页数据
    portalMenuList: Constants.portalMenuList,   // 门户导航
}

const mutations = {
    [types.CHANGELOADING](state, val) {
        state.loading = val
    },
    [types.CHANGELOADINGTEXT](state, val) {
        state.loadingText = val
    },
    [types.CHANGEVLOADING](state, val) {
        state.vLoading = val
    },
    [types.CHANGEVLOADINGTEXT](state, val) {
        state.vLoadingText = val
    },
    [types.SETTOKEN](state, val) {
        state.token = val
        if (!val) {
            window.localStorage.removeItem('token')
        } else {
            window.localStorage.setItem('token', val)
        }
    },
    [types.SETUSERINFO](state, val) {
        state.userInfo = val
        if (!val) {
            window.localStorage.removeItem('userInfo')
        } else {
            window.localStorage.setItem('userInfo', val)
        }
    },
    [types.SETOPENID] (state, val) {
        state.openId = val
    },
    // 门户
    [types.HOMEPAGE_DATA](state, menu) {
        state.homepageData = menu;
    },

    // 门户导航
    [types.PORTAL_MENU_LIST](state, menu) {
        state.portalMenuList = menu;
    },

}

// getters are functions
// 有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数
const getters = {
    loading: state => state.loading,
    token: state => state.token,
    userInfo: state => state.userInfo,
    vLoading: state => state.device,
    homepageData: state => state.homepageData,
    portalMenuList: state => state.portalMenuList,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
