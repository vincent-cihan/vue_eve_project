import * as types from './mutation-types'
import Constants from '@/assets/js/Constants'
import pathToRegexp from "path-to-regexp";
import Utils from '@/assets/js/Utils'

// ChangeCurrentMenu 时menu尚未加载完毕保存临时route
let tempChangeCurrentMenuRoute = null

const changeLoadingView = ({commit}, val) => {
    commit(types.CHANGELOADING, val)
}

const changeLoadingText = ({commit}, val) => {
    commit(types.CHANGELOADINGTEXT, val)
}

const changeVLoadingView = ({commit}, val) => {
    commit(types.CHANGEVLOADING, val)
}
const changeVLoadingText = ({commit}, val) => {
    commit(types.CHANGEVLOADINGTEXT, val)
}

const setToken = ({commit}, val) => {
    commit(types.SETTOKEN, val)
}

const setUserInfo = ({commit}, val) => {
    commit(types.SETUSERINFO, val)
}

const setOpenId = ({ commit}, val) => {
    commit(types.SETOPENID, val)
}

const setHomepageData = ({commit}, val) => {
    commit(types.HOMEPAGE_DATA, val)
}

const setPortalMenuList = ({commit}, val) => {
    commit(types.PORTAL_MENU_LIST, val)
}


export {
    changeLoadingView,
    changeLoadingText,
    changeVLoadingView,
    changeVLoadingText,
    setToken,
    setUserInfo,
    setOpenId,
    setHomepageData,
    setPortalMenuList,
}
