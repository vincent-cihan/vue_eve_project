/**
 * 管理导航
 */
let portalMenuList = [
    // {
    //     id: 1,
    //     href: '/',
    //     name: '首页',
    //     active: false,
    //     children: []
    // },
    {
        id: 2,
        href: '/',
        name: '关于我们',
        active: false,
        children: [
            {
                id: 201,
                href: '#/portal/info/fund-introduction',
                name: '基金会简介',
            },
            {
                id: 202,
                href: '#/portal/info/fund-idea',
                name: '基金会理念',
            },
            {
                id: 203,
                href: '#/portal/info/fund-organization-structure',
                name: '组织结构',
            },
            {
                id: 204,
                href: '#/portal/info/fund-history',
                name: '发展历程',
            },
            {
                id: 205,
                href: '/static/other/浙江光信公益基金会管理制度手册.pdf',
                name: '规章制度',
                isBlank: true,
            },
        ]
    },
    {
        id: 3,
        href: '/',
        name: '公益项目',
        active: false,
        needLogin: true,
        children: [
            // {
            //     id: 301,
            //     href: '#/portal/project/project-list',
            //     name: '医疗',
            // },
            // {
            //     id: 302,
            //     href: '#/portal/project/project-list',
            //     name: '教育',
            // },
        ]
    },
    {
        id: 4,
        href: '/',
        name: '信息公开',
        active: false,
        children: [
            {
                id: 401,
                href: '#/portal/public/base-info',
                name: '基本信息',
            },
            {
                id: 402,
                href: '#/portal/public/bill-info',
                name: '捐款收支报告',
            },
            {
                id: 403,
                href: '#/portal/public/report-info?categoryId=3',
                name: '年度报告',
            },
            {
                id: 404,
                href: '#/portal/public/report-info?categoryId=5',
                name: '财务审计报告',
            },
            {
                id: 405,
                href: '#/portal/public/report-info?categoryId=4',
                name: '工作报告',
            },
            {
                id: 406,
                href: '#/portal/public/report-info?categoryId=6',
                name: '项目评估报告',
            },
        ]
    },
    {
        id: 5,
        href: '/',
        name: '加入光大',
        active: false,
        children: [
            {
                id: 501,
                href: '#/portal/info/become-donor',
                name: '成为资助人',
            },
            // {
            //     id: 502,
            //     href: '/',
            //     name: '爱心企业',
            // },
            {
                id: 503,
                href: '#/portal/info/fund-connect-us',
                name: '联系我们',
            },
        ]
    }
]

/**
 * 资助人menu
 */
let donorMenuList = [
    {
        id: 1,
        href: '/donor/my-donate',
        name: '我的资助',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
    {
        id: 2,
        href: '/donor/donate-project',
        name: '资助项目',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
    {
        id: 3,
        href: '/donor/base-info',
        name: '基础信息',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
    {
        id: 4,
        href: '/donor/message-info',
        name: '消息提醒',
        active: false,
        showBadge: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
]

/**
 * 业务管理menu
 */
let businessMenuList = [
    {
        id: 1,
        href: '/business/account-manage',
        name: '虚拟专户管理',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
    {
        id: 2,
        href: '/business/project-manage',
        name: '公益项目管理',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
    {
        id: 3,
        href: '/business/fund-manage',
        name: '公益基金管理',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
    {
        id: 4,
        href: '/business/appreciation-manage',
        name: '专户增值管理',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
    {
        id: 5,
        href: '/business/account-recharge-manage',
        name: '虚拟专户捐助',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    },
]

/**
 * 平台管理menu
 */
let adminMenuList = [
    {
        id: 1,
        href: '/admin/account-manage',
        name: '账号管理',
        active: false,
        children: [
        ]
    },
    // {
    //     id: 2,
    //     href: '/admin/permission-manage',
    //     name: '权限属性管理',
    //     active: false,
    //     children: []
    // },
    {
        id: 3,
        href: '/admin/organization-manage',
        name: '组织结构管理',
        active: false,
        children: [
        ]
    },
    {
        id: 4,
        href: '/admin/safe-audit-manage',
        name: '安全审计',
        active: false,
        children: [
        ]
    },
    {
        id: 5,
        href: '/admin/news-manage',
        name: '新闻管理',
        active: false,
        children: [
        ]
    },
    {
        id: 6,
        href: '/admin/partner-manage',
        name: '合作伙伴管理',
        active: false,
        children: [
        ]
    },
    {
        id: 7,
        href: '/admin/banner-manage',
        name: '轮播图管理',
        active: false,
        children: [
        ]
    },
    {
        id: 8,
        href: '/admin/public-manage',
        name: '公开信息管理',
        active: false,
        children: [
        ]
    },
    {
        id: 9,
        href: '/admin/portal-money-manage',
        name: '首页金额配置',
        active: false,
        children: [
        ]
    },
]

/**
 * 财务管理menu
 */
let financeMenuList = [
    {
        id: 1,
        href: '/finance/appropriate-confirm-manage',
        name: '划拨确认',
        active: false,
        children: [
            // {
            //     id: 201,
            //     href: '/',
            //     name: '基金会简介',
            // },
        ]
    }
]

export default {
    portalMenuList,
    donorMenuList,
    businessMenuList,
    adminMenuList,
    financeMenuList,
}
