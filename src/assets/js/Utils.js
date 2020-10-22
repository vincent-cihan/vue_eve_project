import Constatnts from './Constants'

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

// 处理htmlcontent
String.prototype.dealHtmlContent = function () {
    // let content = this
    // let contentArray = content && content.split('>') || []
    // if (contentArray.length >= 2) {
    //     let content2 = contentArray[1]
    //     return content2.split('<')[0]
    // } else {
    //     return content
    // }
    let value = this
    value = value.replace(/(\n)/g, "");
    value = value.replace(/(\t)/g, "");
    value = value.replace(/(\r)/g, "");
    value = value.replace(/<\/?[^>]*>/g, "");
    value = value.replace(/\s*/g, "");
    return value
}

// 时间只保留日期
String.prototype.getDate = function () {
    let content = this
    if (content.length < 10) {
        return content
    } else {
        return content.slice(0, 10)
    }
}

// 数组去重
Array.prototype.unique = function () {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

export default {
    // 手机号正则
    isPhonePattern: /^1[3456789]\d{9}$/,
    // 邮箱正则
    isEmailPattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
    // QQ号正则
    isQQPattern: /^[1-9]\d{4,10}$/,
    // 身份证号正则
    isNationalNoPattern: /^(\d{18,18}|\d{15,15}|\d{17,17}x)/,
    // 正实数正则
    isPositiveNumber: /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
    // 实数正则
    isNumberPattern: /^-?\d+\.?\d*$/,
    // 正整数正则
    isPositiveIntNumber: /^[1-9]\d*$/,
    //大于等于0
    isPositiveZeroNumber: /^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
    //URL参数
    getParam: (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    //浏览器信息
    get_broswer_info: () => {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/weibo/i) == "weibo") { //weibo
            return 10;
        } else if (ua.indexOf('qq/') != -1) { //qq
            return 9;
        } else if (ua.match(/MicroMessenger/i) == 'micromessenger') { //wechat
            return 3;
        }
        return 4;
    },

    /**
     * 截取文字(包括中文和英文)
     */
    subString: (str, len, hasDot) => {
        if (str === null) {
            return '';
        }
        var newLength = 0;
        var newStr = '';
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = '';
        var strLength = str.replace(chineseRegex, '**').length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    },

    //手机号码
    isPhone: (str) => {
        const phone = str.substring(0, 3) === '+86' ? str.substring(3) : str //判定区号
        const reg = /^1[3456789]\d{9}$/;
        return reg.test(phone);
    },

    getFileType: (path) => {
        const re = /.(\w*)$/;
        const idx = path.search(re);
        const file_type = path.substring(idx, path.length);
        return file_type.toLowerCase();
    },

    // add for pkcs7 encode
    pkcs7_encode: (text, block_size) => {
        var amount_to_pad = block_size - (text.length % block_size);
        if (amount_to_pad === 0) {
            amount_to_pad = block_size;
        }
        var pad = String.fromCharCode(amount_to_pad),
            arr = [];
        for (var i = 0; i < amount_to_pad; ++i) {
            arr.push(pad);
        }
        return text + arr.join('');
    },

    isEmpty(obj) {
        if (typeof obj == "undefined" || obj == null) {
            return true;
        } else if (typeof obj === 'string' && obj.trim() === '') {
            return true
        } else {

            return false;
        }
    },

    // 下载文件
    downloadFile(url, name) {
        var a = document.createElement("a");
        a.target = "_blank"
        a.href = url;
        a.setAttribute("download", name || url || '');
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        a.dispatchEvent(evt);
    },

    // 数组根据id去重
    arrayUniqueById(arr) {
        let newArr = []
        arr.forEach(el => {
            const result = newArr.findIndex(ol => {
                return el.id === ol.id
            })
            if (result == -1) {
                newArr.push(el)
            }
        })
        return newArr
    },

    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒
     */
    sec_to_time(s) {
        var t;
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }

            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec.toFixed(2);
        }
        return t;
    },

    /**
     * 时间转为秒
     * @param time 时间(00:00:00)
     * @returns {string} 时间戳（单位：秒）
     */
    time_to_sec(time) {
        var s = '';

        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];

        s = Number(hour * 3600) + Number(min * 60) + Number(sec);

        return s;
    },

    // json字符串转json对象（加判断是否可转，不可转返回null）
    strToJson(str) {
        let result = null
        try {
            result = JSON.parse(str);
        } catch (e) {

        }
        return result
    },

    openNewPage(url_path) {
        url_path && window.open(url_path, '_blank')
    },

    // 对象拷贝
    copyObject(obj) {
        return JSON.parse(JSON.stringify(obj))
    },

    // 一级组织机构转化多级组织机构
    departmentResetChildren(departmentList) {
        let arr = departmentList;
        let temp = {}
        let tree = {}
        // 数组转 键值对
        arr.forEach(item => {
            temp[item.id] = item
        })

        let tempKeys = Object.keys(temp)
        tempKeys.forEach(key => {
            // 获取当前项
            let item = temp[key]
            // 当前项 parentId
            let _itemPId = item.parentId
            // 获取父级项
            let parentItemByPid = temp[_itemPId]
            if (parentItemByPid) {
                if (!parentItemByPid.children) {
                    parentItemByPid.children = []
                }
                parentItemByPid.children.push(item)
            } else {
                tree[item.id] = item
            }
        })
        // 对象转数组并返回
        return Object.keys(tree).map(key => tree[key])
    },

    // 多级分类选项数组转最后一级id  e.g. [1, 101, 10101] => 1
    IdsGroup2Id(ids) {
        return ids[ids.length - 1]
    },

    // 多级分类最后一级id 转 选项数组 e.g. 1 => [1, 101, 10101]
    Id2IdsGroup(id, categoryList) {
        let IdGroup = []

        const searchIdFunc = (itemList) => {
            for (var item of itemList) {
                if (item.id == id) {
                    IdGroup.push(item.id)
                    return true
                } else {
                    if (item.children && item.children.length) {
                        if (searchIdFunc(item.children)) {
                            IdGroup.push(item.id)
                            return true
                        }
                    }
                }
            }
            return false
        }
        searchIdFunc(categoryList)
        return IdGroup.reverse()
    },

    // api图片数组字符串转上传图片数组
    apiImgUrls2FileList(imgUrlsStr) {
        let fileList = []
        try {
            let imgUrls = JSON.parse(imgUrlsStr)
            fileList = imgUrls.map(item => {
                return {
                    name: item,
                    url: item
                }
            })
        } catch (e) {

        }
        return fileList
    },
    // 上传图片数组转api图片数组字符串
    fileList2ApiImgUrls(fileList) {
        let imgUrls = fileList.map(item => {
            return item.url
        })
        let imgUrlsStr = JSON.stringify(imgUrls)
        return imgUrlsStr
    },

    importExcelResponseHanlder(context, response) {
        if (response.success && response.data) {
            if (response.data.errorCount > 0 && response.data.errorExcelUrl) {
                context.$confirm(`导入记录成功${response.data.successCount}条，失败${response.data.errorCount}条，是否下载失败记录？`).then(() => {
                    window.open(response.data.errorExcelUrl, '_blank')
                }).catch((err) => {
                })
            } else {
                context.$alert('导入完成');
            }
        } else {
            context.$alert('请求失败');
        }
    },

    //返回值：arg1乘以arg2的精确结果
    accMul(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },

    //返回值：arg1除以arg2的精确结果
    accDiv(arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {
        }

        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    //加法
    accAdd(arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },
    //减法
    accSub(arg1, arg2) {
        return accAdd(arg1, -arg2);
    },

    // 判断是否pc
    IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

}
