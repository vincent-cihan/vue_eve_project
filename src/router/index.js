import Vue from 'vue'
import VueRouter from 'vue-router'

import adminRoutes from "./adminRoutes";
// import mobileRoutes from "./mobileRoutes";

Vue.use(VueRouter)

const Manage = () =>
    import ('@/pc/Manage')

let routes = [
    // ...mobileRoutes.mobileRoutesForManage,
    {
        path: '/',
        name: 'Manage',
        component: Manage,
        meta: {
            title: '钢之云',
        },
        children: [
            ...adminRoutes.adminRoutesForManage,    // 平台管理系统
            // {
            //     path: '/',
            //     name: 'PortalHome',
            //     component: PortalHome,
            //     meta: {
            //         title: '光大公益基金',
            //         keepAlive: false,
            //         isBack: false,
            //         active: 'PortalHome',
            //     }
            // }
        ]
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes: routes,
    scrollBehavior(to, from, savedPosition) { // 滚动行为,只在支持 history.pushState 的浏览器中可用
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

export default router
