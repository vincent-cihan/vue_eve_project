<template>
    <div class="flex-middle">
        <a href="/" class="nav-item-container"
           :class="{'nav-item-container-active': false}">
            首页
        </a>
        <div v-for="item in menuList" :key="item.id">
            <a v-if="!item.children.length" :href="item.href" class="nav-item-container"
               :class="{'nav-item-container-active': false}">
                {{item.name}}
            </a>
            <el-dropdown v-else @visible-change="item.active = !item.active" class="pointer">
                  <span class="nav-item-container" :class="{'nav-item-container-active': item.active}">
                    {{item.name}}
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="childItem in item.children" :key="childItem.id">
                        <a v-if="item.needLogin && !token" href="javascript:void(0);" class="pointer"
                           style="width: 100%; height: 100%; display: block;"
                           @click="handleLogin">{{childItem.name}}</a>
                        <a v-else :href="childItem.href" :target="childItem.isBlank ? '_blank' : '_self'" class="pointer"
                           style="width: 100%; height: 100%; display: block;">{{childItem.name}}</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import Constants from '@/assets/js/Constants'

    export default {
        name: "PortalNavComponent",
        components: {},
        data() {
            return {}
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
        mounted() {
        },
        methods: {
            handleLogin() {
                eventBus.$emit(Constants.MyEventBusTypes.Login);
            },
        }
    }
</script>

<style>
    .el-popper .popper__arrow {
        display: none !important
    }
</style>

<style scoped lang="stylus">
    .nav-item-container {
        justify-content: center;
        align-items: center;
        display: flex;
        width: 107px;
        height: 80px;
        font-size: 15px;
        letter-spacing: 0px;
        color: #000000;
        z-index: 11;
    }

    .nav-item-container:hover, .nav-item-container-active {
        /*border-top solid 3px #409EFF;*/
        /*background-color: #d9e7ec;*/
        /*opacity: 0.86;*/
        color: $themeRedColor;
    }

    .el-popper[x-placement^=bottom] {
        margin-top: 0;
        margin-bottom 0
        box-shadow: none;
        border-radius: 0;
        border: none;
        background-color: #fff;
        width: 107px;
        margin-left: 5px;
        opacity: 0.7;
        overflow hidden;
        border-bottom 3px solid $themeRedColor
    }

    .el-dropdown-menu {
        margin 0
        padding 0
        padding-bottom 10px
    }

    /deep/ .el-dropdown-menu__item {
        font-size 12px
        padding 0
        text-align center
        color: #444
    }
</style>
