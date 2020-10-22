<template>
    <div class="portal-header" :class="{'portal-header-swiper': hasSwiper}">
        <!--滚动图-->
        <!--<div v-if="hasSwiper && carouselLinks.length" class="top-swiper-container">-->
            <!--<swiper :options="swiperOption">-->
                <!--<swiper-slide v-for="item in carouselLinks" :key="item.id">-->
                    <!--<div class="img1920_600" style="cursor: pointer;">-->
                        <!--<img :src="item.coverLinkUrl" :alt="item.coverLinkUrl">-->
                    <!--</div>-->
                <!--</swiper-slide>-->
                <!--<div class="swiper-pagination" slot="pagination"></div>-->
            <!--</swiper>-->
        <!--</div>-->
        <portal-header-top-card-component v-if="hasSwiper && carouselLinks.length" :carouselLinks="carouselLinks" class="top-swiper-container"/>
        <!--如果是门户项目列表、门户项目详情，不显示banner-->
        <div v-else-if="isPProject"></div>
        <img v-else-if="UserType.AdminManage == userInfo.type" src="../assets/img/banner_thin03.png" alt=""
             class="top-swiper-container thin-banner">
        <img v-else-if="UserType.BusinessManage == userInfo.type" src="../assets/img/banner_thin02.png" alt=""
             class="top-swiper-container thin-banner">
        <img v-else src="../assets/img/banner_thin01.png" alt="" class="top-swiper-container thin-banner">

        <!--logo、登录等-->
        <div class="header-top dis-flex flex-middle">
            <div class="maxw-container header-top-content">
                    <div class="dis-flex flex" style="align-items: flex-end">
                        <img src="../assets/img/logo.png" alt="" style="margin-bottom: 14px;">
                        <!--导航栏-->
                        <portal-nav-component/>
                    </div>
                <div class="dis-flex flex-column flex-center">
                    <div v-if="token == null" class="userinfo-container">
                        <div>
                            您好，欢迎参与光大公益
                        </div>
                        <el-button class="login-btn" @click="handleShowLogin()">登录</el-button>
                    </div>
                    <div v-else class="userinfo-container">
                        <div>
                            您好，{{userName}}
                        </div>
                        <div class="link-text-btn" @click="handleUserCenter">
                            个人中心
                        </div>
                        <div class="link-text-btn">
                            帮助
                        </div>
                        <div class="link-text-btn" @click="handleLoginOut">
                            退出
                        </div>
                    </div>
                    <div class="search-container">
                        <div class="search-box">
                            <el-input v-model="search" @keyup.enter.native="handleSearch" placeholder="请输入要搜索的项目名称">
                                <img slot="append" class="pointer" src="../assets/img/search-icon.png" alt=""
                                     @click="handleSearch">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <LoginDialog ref="LoginDialog" :successCallback="handleLoginCallback"></LoginDialog>
    </div>
</template>

<script>
    import Constants from '@/assets/js/Constants'
    import Utils from '@/assets/js/Utils'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import PortalNavComponent from './PortalNavComponent'
    import LoginDialog from './LoginDialog'
    import PortalHeaderTopCardComponent from "./PortalHeaderTopCardComponent";
    // import RegisterDialog from '@/pages/RegisterDialog'

    let vm = null

    export default {
        name: "PortalHeader",
        components: {
            PortalHeaderTopCardComponent,
            swiper,
            swiperSlide,
            PortalNavComponent,
            LoginDialog,
            // RegisterDialog
        },
        data() {
            return {
                // 轮播配置
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    on: {
                        click: function () {
                            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
                            // console.log(this); // -> Swiper
                            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                            const realIndex = this.realIndex;
                            vm.handleClickSwiper(realIndex);
                        }
                    }
                },

                navActiveId: null,
                search: '',
                UserType: Constants.SelectOptionsManager.UserType
            }
        },
        computed: {
            userInfo() {
                let userInfo = this.$store.state.userInfo && JSON.parse(this.$store.state.userInfo) || {}

                return userInfo
            },
            userName() {
                return this.userInfo.name || this.userInfo.phone || this.userInfo.email || this.userInfo.qq || ''
            },
            token() {
                return this.$store.state.token || null
            },
            hasSwiper() {
                return this.$route.path == '/'
            },
            isPProject() {
                return this.$route.path.indexOf('portal/project/') > -1
            },

            homepageData() {
                return this.$store.state.homepageData || {}
            },
            carouselLinks() {
                return this.homepageData.bannerList || []
            },
            projectCategoryList() {
                return this.homepageData.projectCategoryList || []
            },
        },
        mounted() {
            vm = this
            this.fetchData()

            eventBus.$on(Constants.MyEventBusTypes.Login,function(data){

                vm.handleShowLogin(data && data.isRegist || false)

            });

        },
        methods: {

            fetchData() {
                // 加载首页banner
                // this.$store.dispatch('changeLoadingView', true)
                axios.get(Constants.URL.getHomepageBanner).then((response) => {
                    // this.$store.dispatch('changeLoadingView', false)
                    let homepageData = this.$store.state.homepageData
                    homepageData.bannerList = response.data.rows
                    this.$store.dispatch("setHomepageData", homepageData);
                }, (error) => {
                    // this.$store.dispatch('changeLoadingView', false)
                    // this.$alert(error && error.errorMessage || Constants.errorText)
                })

                // 加载项目分类
                axios.get(Constants.URL.getProjectCategory).then((response) => {
                    let homepageData = this.$store.state.homepageData
                    homepageData.projectCategoryList = response.data.rows
                    this.$store.dispatch("setHomepageData", homepageData);

                    let portalMenuList = this.$store.state.portalMenuList
                    for (let menuItem of portalMenuList) {
                        if (menuItem.id == 3) {
                            menuItem.children = homepageData.projectCategoryList.map((item, index) => {
                                return {
                                    ...item,
                                    href: `#/portal/project/project-list?index=${index}`,
                                }
                            })
                            break
                        }
                    }
                    this.$store.dispatch("setPortalMenuList", portalMenuList);
                }, (error) => {

                })
            },

            // 轮播图跳转
            handleClickSwiper(index) {
                let targetLinkUrl = this.carouselLinks[index].targetLinkUrl
                if (targetLinkUrl && targetLinkUrl.length) {
                    window.location.href = targetLinkUrl
                }
            },

            arraySortBySeq(array) {
                if (!array || !array.length) {
                    return []
                }
                return array.sort(function (a, b) {
                    return a.seq - b.seq
                })
            },

            // 点击搜索
            handleSearch() {
                if (!this.search || !this.search.trim().length) {
                    this.$alert('请输入搜索内容进行搜索')
                    return
                }
                this.$router.push({name: 'PSearchList', query: {keyword: this.search}})
            },

            // 登录
            handleShowLogin(isRegist = false) {
                // var hello = "<html><body><center>hello</center></body></html>";
                // var newWindow=window.open();
                // newWindow.document.open("text/html");
                // newWindow.document.write(hello);
                // newWindow.document.close();
                // return
                this.$refs.LoginDialog && this.$refs.LoginDialog.setMaskVisible(true, {
                    isRegist
                })
            },

            // 注册
            handleShowRegist() {
                this.$refs.RegisterDialog && this.$refs.RegisterDialog.setMaskVisible(true)
            },

            // 登录回调
            handleLoginCallback(data) {

            },

            // 注册回调
            handleRegisterCallback() {

            },

            // 登出
            handleLoginOut() {
                const clearFun = () => {
                    this.$store.dispatch("setToken", null)
                    this.$store.dispatch("setUserInfo", null)
                    this.$router.replace({name: 'PortalHome'})
                }

                this.$store.dispatch('changeLoadingView', true)
                axios.get(Constants.URL.logout).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)
                    clearFun()
                }, (error) => {
                    this.$store.dispatch('changeLoadingView', false)
                    clearFun()
                })

            },

            // 个人中心
            handleUserCenter() {

                switch (this.userInfo.type) {
                    case Constants.UserType.Donor:
                    case Constants.UserType.OrganizationOperator: {
                        // 资助人、企业组织操作人
                        this.$router && this.$router.replace({name: 'DMyDonate'})
                        break
                    }
                    case Constants.UserType.BusinessManage: {
                        // 业务管理员
                        this.$router && this.$router.replace({name: 'BAccountManage'})
                        break
                    }
                    case Constants.UserType.AdminManage: {
                        // 平台管理员
                        this.$router && this.$router.replace({name: 'AAccountManage'})
                        break
                    }
                    case Constants.UserType.FinanceManage: {
                        // 财务管理员
                        this.$router && this.$router.replace({name: 'FAppropriateConfirmManage'})
                        break
                    }
                    default: {
                        return []
                    }
                }
            },

            // 搜索
            handleSearch() {
                if (Utils.isEmpty(this.search)) {
                    this.$toast('请输入搜索内容')
                    return
                }
                this.$router && this.$router.push({
                    name: 'PProjectSearch', query: {
                        keyword: this.search
                    }
                })
            },
        }
    }
</script>

<style scoped lang="stylus">
    .portal-header-swiper {
        position: relative;
        height: $bannerHeight;
    }

    .portal-header {
        position: relative;
    }

    .header-top {
        height: $headerTopHeight;
        background-color: white;
        box-shadow: 1px 2px 1px 0px rgba(0, 0, 0, 0.12);
        opacity: 0.7;
        z-index: 10;
        .header-top-content {
            height: 100%;
            display: flex;
            padding-top: 10px;
            justify-content: space-between;
            .userinfo-container {
                font-family: SimSun;
                font-size: 12px;
                letter-spacing: 0px;
                color: #717171;
                display flex
                flex-direction row
                align-items center
                justify-content space-between
                padding 0 7px
                .login-btn {
                    font-family: MicrosoftYaHeiLight;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 1px;
                    color: #fffefe;
                    padding 0
                    width: 69px;
                    height: 24px;
                    background-image: linear-gradient(0deg, #c03838 0%, #eb5757 100%), linear-gradient(#191919, #191919);
                    background-blend-mode: normal, normal;
                    box-shadow: 0px 2px 0px 0px rgba(84, 11, 11, 0.16), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.38);
                    border-style: solid;
                    border-width: 1px;
                    border-image-source: linear-gradient(0deg, #9d1d1d 0%, #b13e3e 100%);
                    border-image-slice: 1;
                }
                .login-btn:active, .login-btn:hover {
                    opacity 0.7
                }
                .link-text-btn {
                    cursor pointer
                }
                .link-text-btn:hover {
                    color: $themeColor
                }
            }
            .search-container {
                margin-top: 20px;
            }
        }
    }

    .top-swiper-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
    .thin-banner {
        height: $headerTopHeight
    }

    .search-box {
        background-image: linear-gradient(
                #e9e9e9,
                #e9e9e9),
                linear-gradient(
                        #adadad,
                        #adadad);
        background-blend-mode: normal, normal;
        box-shadow: 0px 1px 0px 0px #ffffff, inset 0px 1px 0px 0px #bfbfbf;
        border-radius: 2px;
        height: 30px;
        max-height: 30px;
        overflow: hidden;
    }

    .search-box /deep/ .el-input__inner {
        width: 222px;
        height: 30px;
        max-height: 30px;
        background-color transparent
        border none;
    }

    .search-box /deep/ .el-input-group__append {
        padding 0 10px;
        border none;
        background-color transparent;
    }

</style>
