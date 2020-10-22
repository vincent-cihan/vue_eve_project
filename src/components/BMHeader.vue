<template>
    <div class="bm-header">
        <img src="../assets/img/manage_logo.png" alt="">
        <div class="ml10 flex">
            {{userName}}
        </div>

        <el-button v-if="showCP" class="btn-style ml20 mr20" @click="handleChangePassword">修改密码</el-button>

        <EditPasswordDialog ref="EditPasswordDialog"/>
    </div>
</template>

<script>
    import EditPasswordDialog from "./EditPasswordDialog";
    import Constants from "../assets/js/Constants";

    export default {
        components: {EditPasswordDialog},
        name: "BMHeader",

        computed: {
            userInfo() {
                return this.$store.state.userInfo && JSON.parse(this.$store.state.userInfo) || {}
            },
            userName() {
                return this.userInfo.name || this.userInfo.phone || this.userInfo.email || this.userInfo.qq || ''
            },
            token() {
                return this.$store.state.token || null
            },

            showCP() {
                return this.userInfo.type != Constants.UserType.Donor
            }
        },
        mounted() {
        },
        methods: {
            handleChangePassword() {
                this.$refs.EditPasswordDialog && this.$refs.EditPasswordDialog.setMaskVisible(true, {});

            }
        }
    }
</script>

<style scoped lang="stylus">
    .bm-header {
        @extend .flex-middle
        border-bottom 1px solid $borderColor
        box-sizing border-box
        padding 4px 7px
        font-size: 14px;
        letter-spacing: 1px;
        color: #868686;
    }
</style>
