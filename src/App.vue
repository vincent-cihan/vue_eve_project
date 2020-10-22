<template>
    <div id="app">
        <div class="wrap" v-loading.fullscreen.lock="loading" :element-loading-text="loadingText">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Utils from "./assets/js/Utils";

    export default {
        name: 'App',
        data() {
            return {
                title: ''
            }
        },
        computed: {
            loading() {
                if (!this.$store.state.loading) {
                    this.$store.dispatch('changeLoadingText', '')
                }
                return this.$store.state.loading
            },
            loadingText() {
                return this.$store.state.loadingText
            },
        },
        created() {

        },
        mounted() {
            // // 判断是移动端或PC端
            // let path = window.location.href
            // if (path.indexOf("mobile") <= -1 && !Utils.IsPC()) {
            //     this.$router.replace("/mobile/portal-home")
            //     return
            // }
            // if (path.indexOf("mobile") > -1 && Utils.IsPC()) {
            //     this.$router.replace("/")
            //     return
            // }

            // if (!!window.ActiveXObject || "ActiveXObject" in window) {
            //     // 判断ie浏览器
            //     this.$alert('为了得到我们网站最好的体验效果，我们建议您升级到最新版的Internet Explorer或使用QQ、Chrome、fireFox、360浏览器', '提示', {
            //         confirmButtonText: '前往更新',
            //         callback: action => {
            //             window.location.href = "https://www.microsoft.com/edge"
            //         },
            //         showClose: false
            //     });
            //
            // }
        },
        methods: {

            // 检测登录状态，如已登录，将跳转到已登录界面
            checkToken() {
                let token = this.$store.state.token,
                    routerInfo = this.$store.state.curRouter || "PortalHome" // 之前路由来源记录

                if (token) {
                    this.$router && this.$router.replace && this.$router.replace({name: routerInfo})
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import "assets/css/variables.styl";
</style>
