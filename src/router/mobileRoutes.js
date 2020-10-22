const MobileManage = () =>
    import('@/pages/mobile/MobileManage')
const MPortalHome = () =>
    import('@/pages/mobile/MPortalHome')
const MPortalDonate = () =>
    import('@/pages/mobile/MPortalDonate')
const MPortalProject = () =>
    import('@/pages/mobile/MPortalProject')
const MPortalSetting = () =>
    import('@/pages/mobile/MPortalSetting')

const MMessageList = () =>
    import('@/pages/mobile/MMessageList')
const MProjectDetail = () =>
    import('@/pages/mobile/MProjectDetail')
const MNewsList = () =>
    import('@/pages/mobile/MNewsList')
const MNewsDetail = () =>
    import('@/pages/mobile/MNewsDetail')
const MPortalProjectMy = () =>
    import('@/pages/mobile/MPortalProjectMy')

const TabBarRoutes = [
    //首页
    {
        path: '/mobile/portal-home',
        name: 'MPortalHome',
        component: MPortalHome,
        meta: {
            icon: 'lanmupeizhi',
            title: '首页',
            needLogin: false,
        },
        children: [
        ],
    },
    //资助
    {
        path: '/mobile/portal-donate',
        name: 'MPortalDonate',
        component: MPortalDonate,
        meta: {
            icon: 'diqiu',
            title: '资助详情',
            needLogin: true,
        },
        children: [],
    },
    //项目
    {
        path: '/mobile/portal-project',
        name: 'MPortalProject',
        component: MPortalProject,
        meta: {
            icon: 'xiazai',
            title: '项目管理',
            needLogin: true,
        },
        children: [],
    },
    //设置
    {
        path: '/mobile/portal-setting',
        name: 'MPortalSetting',
        component: MPortalSetting,
        meta: {
            icon: 'taiyang',
            title: '设置',
            needLogin: true,
        },
        children: [],
    },
]

// 含有左侧导航栏的页面路由（大部分路由放在这）
const mobileRoutesForManage = [
    {
        path: '/mobile',
        name: 'MobileManage',
        component: MobileManage,
        meta: {
            title: '光大公益基金',
        },
        children: [
            ...TabBarRoutes,
            {
                path: '/mobile/message-list',
                name: 'MMessageList',
                component: MMessageList,
                meta: {
                    title: '消息列表',
                }
            },
            {
                path: '/mobile/project-detail',
                name: 'MProjectDetail',
                component: MProjectDetail,
                meta: {
                    title: '项目详情'
                }
            },
            {
                path: '/mobile/news-list',
                name: 'MNewsList',
                component: MNewsList,
                meta: {
                    title: '新闻列表'
                }
            },
            {
                path: '/mobile/news-detail',
                name: 'MNewsDetail',
                component: MNewsDetail,
                meta: {
                    title: '详情'
                }
            },
            {
                path: '/mobile/my-project-list',
                name: 'MPortalProjectMy',
                component: MPortalProjectMy,
                meta: {
                    title: '已资助项目'
                }
            }
        ]
    },
]

// 独立页面（不含左侧导航栏）的路由
const mobileRoutesIndependent = [
]

export default {
    mobileRoutesForManage,
    mobileRoutesIndependent,
    TabBarRoutes
}
