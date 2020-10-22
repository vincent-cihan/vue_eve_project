const errorText = "加载失败，请稍后再试"
const deleteError = "删除失败，请稍后再试"
const saveError = "保存失败，请稍后再试"

const isStaging = location.href.indexOf(':8080') >= 0
// const domain = !isStaging ? (window.location.protocol + "//" + window.location.host) : "http://guangda.51yxxg.com"
// const domain = !isStaging ? (window.location.protocol + "//" + window.location.host) : "http://106.120.108.117:9081"
const domain = "http://106.120.108.117:9081"
const api_perfix_v1 = '/api/v1/'
const URL = {
    // qiniu_upload_url: 'https://up.qiniup.com',
    // uptoken_url: domain + api_perfix + 'util/upload_token/qiniu/',

};

export default {
    URL,
    isStaging,
    domain,
    errorText,
    deleteError,
    saveError
}
