/* golbal params*/
import SelectOptionsManager from './SelectOptionsManager'
import MyEventBusTypes from './MyEventBusTypes'
import Urls from './Urls'
import MenuConfig from './MenuConfig'

// 用户类型
const UserType = SelectOptionsManager.UserType;

// 全局静态变量管理
const STATIC_PARAMETER = {
    ENCRYPT_MAGIC_CODE: 'banxue@2018',
    FILE_DOMAIN: 'https://store.51yxxg.com/',
};
// ECharts全局配置
const EChartsConfig = {
    barWidth: 40,
};

export default {
    STATIC_PARAMETER,
    UserType,
    SelectOptionsManager, // 类型管理
    ...Urls,
    ...MenuConfig,  // 导航菜单
    EChartsConfig,
    MyEventBusTypes,    // 全局事件类型
}
