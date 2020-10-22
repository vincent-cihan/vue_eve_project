<template>
    <aside class="main-sidebar animated" :class="{ showSlide: false, hideSlide: true, expandSide:(true)}">
        <div class="sidebar">
            <el-menu :default-active="onRoutes"
                     :default-openeds="onRouteKeys"
                     class="el-menu-style"
                     theme="light" router :collapse="false" @select="handleSelect">
                <sub-menu v-for="item in menuList" :key="item.name" :param="item"></sub-menu>
            </el-menu>
        </div>
        <div style="border-right: solid 1px #eaeaea; flex: 1; min-height: 0;">

        </div>
    </aside>
</template>
<script>
    import subMenu from "./subMenu.vue"
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import Constants from '@/assets/js/Constants'

    export default {
        props: {
            show: Boolean,
        },
        data() {
            return {}
        },
        components: {
            subMenu,
        },
        computed: {
            onRoutes() {
                // return this.$route.path;
                return this.onRouteKeys[this.onRouteKeys.length - 1]
            },
            onRouteKeys() {
                const getParentArray = (path, ms, kas = []) => {
                    if (ms && ms.length > 0) {
                        for (let k = 0, length = ms.length; k < length; k++) {
                            if (path.indexOf(ms[k].href) > -1) {
                                // if (path == ms[k].href) {
                                kas.push(ms[k].href);
                            }
                            let i = kas.length;
                            if (ms[k].children && ms[k].children.length > 0) {
                                getParentArray(path, ms[k].children, kas);
                            }
                            if (i < kas.length) {
                                kas.push(ms[k].href);
                            }
                        }
                    }

                    function unique5(arr) {
                        var set = new Set(arr);
                        return [...set];
                    }

                    return unique5(kas);
                }
                return getParentArray(this.$route.path, this.menuList);
            },

            menuList() {
                let userInfo = this.$store.state.userInfo && JSON.parse(this.$store.state.userInfo) || {}
                switch (userInfo.type) {
                    case Constants.UserType.Donor:
                    case Constants.UserType.OrganizationOperator: {
                        // 资助人
                        return Constants.donorMenuList
                    }
                    case Constants.UserType.BusinessManage: {
                        // 业务管理员
                        return Constants.businessMenuList
                    }
                    case Constants.UserType.AdminManage: {
                        // 平台管理员
                        return Constants.adminMenuList
                    }
                    case Constants.UserType.FinanceManage: {
                        // 财务管理员
                        return Constants.financeMenuList
                    }
                    default: {
                        return []
                    }
                }
            },
        },
        mounted() {
            let route = this.$route
//      console.log(route)
//      if (route.name) {
//        this.shouldExpandMatchItem(route)
//      }

            this.fetchData()
        },
        created: function () {
        },
        methods: {
            handleSelect(row) {
                console.log(row)
                // 跳转消息提醒页，不更新
                if (row.indexOf('message') > -1) return
                this.fetchData()
            },

            fetchData() {
                let userInfo = this.$store.state.userInfo && JSON.parse(this.$store.state.userInfo) || {}
                if (userInfo.type == Constants.UserType.Donor || userInfo.type == Constants.UserType.OrganizationOperator) {
                    this.fetchMessageCount()
                }
            },

            fetchMessageCount() {
                axios.get(Constants.URL.DNotificationUnReadCount).then((response) => {
                    if (response.data > 0) {
                        Constants.donorMenuList[3].showBadge = true
                    } else {
                        Constants.donorMenuList[3].showBadge = false
                    }
                }, (error) => {

                })
            },
        },
    }
</script>
<style lang="stylus" scoped>

    .main-sidebar {
        background-color: #ffffff;
        /*position: fixed;*/
        /*top: 80px;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*height: calc(100vh - 80px);*/
        width: 165px;
        min-height: 500px;
        /*z-index: 810;*/
        -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;

        display flex
        flex-direction column

    }

    /deep/ .el-menu-style,
    .el-menu-style .el-menu {
        background-color: #ffffff;
    }

    /deep/ .el-menu-style .el-menu-item:hover,
    /deep/ .el-menu-style .el-submenu__title:hover {
        background-color: #eeeeee !important;
    }

    /deep/ .el-menu-style .el-menu-item:focus,
    /deep/ .el-menu-style .el-submenu__title:focus {
        background-color: #ffffff !important;
    }

    /deep/ .el-menu-style .el-submenu .el-menu-item {
        height: 40px;
        line-height: 40px;
        font-size 16px;
        color: #0c0c0c;
    }

    /deep/ .el-menu-style .el-menu-item,
    /deep/ .el-menu-style .el-submenu__title {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid $borderColor;
        font-size 16px;
        color: #0c0c0c;
        vertical-align: middle;
        border-right: 1px solid $borderColor;

    }

    .main-sidebar /deep/ .el-menu--collapse {
        width: 44px;
    }

    .main-sidebar /deep/ .el-menu--collapse > .el-menu-item,
    .main-sidebar /deep/ .el-menu--collapse > .el-submenu > .el-submenu__title {
        padding-left: 13px !important;
    }

    .main-sidebar /deep/ .el-scrollbar__bar.is-vertical {
        display: none;
    }

    .sidebar {
        /*min-height: 450px;*/
    }

    .main-sidebar /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    /deep/ .el-menu-item.is-active {
        border-right: none;

    }
</style>
