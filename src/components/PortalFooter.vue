<template>
    <div class="portal-footer-container">

        <!--链接导航-->
        <div class="link-container-bg">
            <div class="dis-flex maxw-container flex-between link-container">
                <div v-for="item in menuList" :key="item.id" class="flex-column">
                    <div class="menu-title" style="color: #fff; font-weight: bold;">
                        {{item.name}}
                    </div>
                    <div v-for="childItem in item.children" :key="childItem.id">
                        <a class="menu-sec-title link-text-btn" style="color: #fff;" v-if="item.needLogin && !token"
                           href="javascript:void(0);"
                           @click="handleLogin">{{childItem.name}}</a>
                        <a v-else class="menu-sec-title link-text-btn" style="color: #fff;" :href="childItem.href">
                            {{childItem.name}}
                        </a>
                    </div>

                </div>
            </div>
        </div>

        <!--版权-->
        <div class="copyright-container">
            <div class="maxw-container dis-flex flex-center flex-middle" style="height: 100%;">
                {{"Copyright © 2016 - 2020 Everbright. All Rights Reserved\n光大集团 版权所有"}}
            </div>
        </div>
    </div>
</template>

<script>
    import Constants from '@/assets/js/Constants'

    export default {
        name: "PortalFooter",
        data() {
            return {
                // menuList: Constants.portalMenuList
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo && JSON.parse(this.$store.state.userInfo) || null
            },
            token() {
                return this.$store.state.token || null
            },
            menuList() {
                return this.$store.state.portalMenuList
            },
        },
        methods: {
            handleLogin() {
                eventBus.$emit(Constants.MyEventBusTypes.Login);
            },
        }
    }
</script>

<style scoped lang="stylus">
    .portal-footer-container {
        @extends .dis-flex, .flex-column
    }

    .menu-title {
        font-size: 16px;
        line-height: 30px;
        letter-spacing: 0px;
        color: #010101;
    }

    .menu-sec-title {
        font-family: MicrosoftYaHeiLight;
        font-size: 12px;
        line-height: 30px;
        letter-spacing: 0px;
        color: #8c8c8c;
    }

    .link-container-bg {
        background-image: linear-gradient(#e60012, #e60012), linear-gradient(#0094c3, #0094c3);
        background-blend-mode: normal, normal;
        margin-top 40px;
    }

    .link-container {
        margin-top 40px
        margin-bottom 103px
    }

    .copyright-container {
        height 184px
        background-color #f4f4f4
        font-size: 12px;
        line-height: 18px;
        color: #010101;
        text-align center
        white-space pre-line
    }
</style>
