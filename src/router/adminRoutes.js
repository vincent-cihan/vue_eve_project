
// 含有左侧导航栏的页面路由（大部分路由放在这）
const adminRoutesForManage = [
    // {
    //     path: '/admin',
    //     name: 'AdminManage',
    //     component: AdminManage,
    //     meta: {
    //         title: '业务管理系统',
    //     },
    //     children: [
    //         //账号管理
    //         {
    //             path: '/admin/account-manage',
    //             name: 'AAccountManage',
    //             component: AAccountManage,
    //             meta: {
    //                 title: '账号管理',
    //             }
    //         },
    //     ]
    // },
]

// 独立页面（不含左侧导航栏）的路由
const adminRoutesIndependent = [
]

export default {
    adminRoutesForManage,
    adminRoutesIndependent
}
