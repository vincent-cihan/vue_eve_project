import moment from 'moment'
/**
 * 类型、选型常量
 */

// 类型转换select的options
const GetOptionsFunction = (object) => {
    let options = Object.keys(object).map((item, index) => {
        return {
            value: item == '0' ? 0 : (parseInt(item) || item),
            label: object[item]
        }
    })
    return options
}

// 日期筛选类型
const TransactionDateTypes = {
    OneMonth: "1",
    ThreeMonth: '2',
    HalfYear: '3',
    OneYear: '4'
}
// 日期筛选对应日期
const TransactionDateTypesToDate = (type) => {
    const formatStr = 'yyyy-MM-DD';
    let from = '', to = moment().format(formatStr);
    switch (type) {
        case TransactionDateTypes.OneMonth: {
            from = moment().subtract(1, 'months').format(formatStr)
            break
        }
        case TransactionDateTypes.ThreeMonth: {
            from = moment().subtract(3, 'months').format(formatStr)
            break
        }
        case TransactionDateTypes.HalfYear: {
            from = moment().subtract(6, 'months').format(formatStr)
            break
        }
        case TransactionDateTypes.OneYear: {
            from = moment().subtract(12, 'months').format(formatStr)
            break
        }
    }

    return {
        from,to,
    }
}

// 用户类型
const UserType = {
    Donor: 1, // 个人资助人
    OrganizationOperator: 2, // 企业组织操作人
    BusinessManage: 3, // 业务管理员
    AdminManage: 4, // 平台/系统管理员
    Portal: 0, // 门户
    FinanceManage: 5, // 财务人员
}
const UserTypeNames = {
    [UserType.Donor]: '个人资助人',
    [UserType.OrganizationOperator]: '企业组织操作人',
    [UserType.BusinessManage]: '业务管理员',
    [UserType.AdminManage]: '平台管理员',
    [UserType.FinanceManage]: '财务管理员',
}

// 激活状态
const EnableTypeNames = {
    1: '启用',
    0: '禁用',
}

// 用户行为类型    1-用户认证行为 2-用户审批行为 3-新增项目 4-资金划拨 5-批量捐助
const UserActionTypes = {
    Authentication: 1,
    Audit: 2,
    NewProject: 3,
    TransferOfFunds: 4,
    MultipleCharge: 5,
}

// 公开信息管理类型 信息公开分类 1- 善款收入 2-善款支出 3-年度报告 4-工作报告 5-审计报告 6-评估报告
const PublicInformationTypes = {
    BillIn: 1,  // 收入
    BillOut: 2, // 支出
    Annual: 3,  // 年度
    Work: 4,    // 工作
    Audit: 5,   // 审计
    Evaluate: 6,    // 评估
}

const PublicInformationTypesNames = {
    1: '善款收入',
    2: '善款支出',
    3: '年度报告',
    4: '工作报告',
    5: '审计报告',
    6: '评估报告',
}

// 新闻详情类型
const NewsDetailTypes = {
    News: 1,
    ProjectAffairs: 2,
}

// 流水类型 type： 1捐助 2资助 3分红 4资助失败退款
const TransactionTypes = {
    Recharge: 1,
    Donate: 2,
    Bonus: 3,
    FailToRefund: 4,
}

// 交易状态 1-资助待确认 2-资助确认中 3-资助已确认 4-资助确认失败
const TransactionStatusNames = {
    1: '资助确认中',
    2: '资助确认中',
    3: '资助已确认',
    4: '资助确认失败',
}

export default {
    GetOptionsFunction,
    TransactionDateTypes,
    TransactionDateTypesToDate,
    UserType,
    UserTypeNames,
    EnableTypeNames,
    UserActionTypes,
    NewsDetailTypes,

    TransactionTypes,
    PublicInformationTypes,
    PublicInformationTypesNames,

    TransactionStatusNames,
}
