<!--修改密码-->
<template>
    <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="540px"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            append-to-body>
        <form @submit.prevent="submit">
            <ul>
                <li>
                    <el-input class="b10" size="large" type="password" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" v-model="oldPassword" placeholder="请输入原密码"></el-input>
                </li>
                <li>
                    <el-input class="b10" type="password" size="large" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" v-model="newPassword"
                              placeholder="请输入新密码"></el-input>
                </li>
                <li>
                    <el-input class="b10" type="password" size="large" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" v-model="newPasswordRepeat"
                              placeholder="请再次输入新密码进行确认"></el-input>
                </li>
            </ul>
            <el-button class="btn-style btn-all m10 b20" native-type="submit">修改密码</el-button>
        </form>
    </el-dialog>
</template>

<script type="text/javascript">
    import Constants from '@/assets/js/Constants'
    import Utils from '@/assets/js/Utils'
    import Blowfish from 'blowfish'

    export default {
        name: 'EditPasswordDialog',
        props: ['successCallback'],
        data() {
            return {
                dialogVisible: false,
                oldPassword: '',
                newPassword: '',
                newPasswordRepeat: '',
            }
        },
        watch: {
            dialogVisible(newVal, oldVal) {
                if (newVal == false) {
                    Object.assign(this.$data, this.$options.data())
                }
            }
        },
        methods: {

            // 显示弹出层
            setMaskVisible(val) {
                this.dialogVisible = val
            },

            // blowfish加密
            encryptPsd(key, text) {
                var bf = new Blowfish(key);
                return bf.encrypt(Utils.pkcs7_encode(text, 8));
            },

            // 注册
            submit() {
                let oldPassword = this.oldPassword,
                    newPassword = this.newPassword,
                    newPasswordRepeat = this.newPasswordRepeat

                if (!oldPassword || (oldPassword.length == 0)) {
                    this.$alert("请输入原密码！")
                    return;
                }
                if (!newPassword || (newPassword.length == 0)) {
                    this.$alert("请输入新密码！")
                    return;
                }
                if (newPassword != newPasswordRepeat) {
                    this.$alert("两次输入的新密码不同，请确认后重新输入！")
                    return;
                }

                if (newPassword.match(/^\s*$/)) {
                    this.$alert("密码不能为空！")
                    return;
                }

                let userInfo = JSON.parse(this.$store.state.userInfo)

                // let data = {
                //     old_password: this.encryptPsd(username + Constants.STATIC_PARAMETER.ENCRYPT_MAGIC_CODE, oldPassword),
                //     password: this.encryptPsd(username + Constants.STATIC_PARAMETER.ENCRYPT_MAGIC_CODE, newPassword)
                // }

                let data = {
                    oldPassword: oldPassword,
                    password: newPassword
                }

                this.$store.dispatch('changeLoadingView', true)
                axios.post(Constants.URL.changePassword, data).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.oldPassword = ''
                    this.newPassword = ''
                    this.newPasswordRepeat = ''

                    // 处理登录成功事件
                    this.$toast('修改密码成功')
                    this.dialogVisible = false
                    this.successCallback && this.successCallback()

                }, (error) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert((error && error.errorMessage) || Constants.errorText)
                })
            },

        }
    }
</script>
