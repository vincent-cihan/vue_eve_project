<!--光大公益基金-->
<template>
    <div class="protal dis-flex flex-column" v-if="initComplete">
            <!--<portal-header></portal-header>-->
            <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
                <div class="dis-flex">
                    <div class="flex" v-loading.lock="loading" :element-loading-text="loadingText">

                        <keep-alive :include="keepAliveArray">
                            <router-view></router-view>
                        </keep-alive>

                    </div>
                </div>
            </transition>
            <!--<portal-footer></portal-footer>-->
    </div>
</template>

<script type="text/javascript">
    import Constants from '@/assets/js/Constants'
    // import PortalHeader from '../components/PortalHeader'
    // import PortalFooter from '../components/PortalFooter'
    // import {mapGetters, mapActions, mapMutations} from 'vuex'
    // import {TOGGLE_SIDEBAR, TOGGLE_SIDEBAR_SHOW} from "@/store/mutation-types"

    let vm = null
    export default {
        name: 'Manage',
        data() {
            return {
                initComplete: false,    // 是否初始化完成
                active: true,
                headerFixed: true,

                keepAliveArray: []
            }
        },
        components: {
            // PortalHeader,
            // PortalFooter
        },
        mounted() {
            // this.initUserInfo()
        },
        computed: {
            // ...mapGetters({
            //     sidebar: 'sidebar',
            //     currentMenus: 'currentMenus',
            // }),
            loading() {
                if (!this.$store.state.vLoading) {
                    this.$store.dispatch('changeVLoadingText', '')
                }
                return this.$store.state.vLoading
            },
            loadingText() {
                return this.$store.state.vLoadingText
            }
        },
        created() {
            vm = this
        },
        methods: {

            initUserInfo() {
                if (!this.$store.state.token) {
                    this.initComplete = true
                    return
                }
                this.$store.dispatch('changeLoadingView', true)
                axios.get(Constants.URL.getUserInfo).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)
                    const userInfo = response.data
                    this.$store.dispatch("setUserInfo", JSON.stringify(userInfo))
                    this.initComplete = true
                }, (error) => {
                    this.initComplete = true
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert(error && error.errorMessage || Constants.errorText)
                })
            },

        },
        beforeRouteEnter(to, from, next) {
            console.log('enter', to, from)

            next(() => { //参数vm就是当前组件的实例。
            })
        },
        beforeRouteLeave(to, from, next) {
            next((vm) => { //参数vm就是当前组件的实例。

            })
        },
    }
</script>

<style lang="stylus" scoped>
    .protal {
        min-height: 100%;
    }
</style>
