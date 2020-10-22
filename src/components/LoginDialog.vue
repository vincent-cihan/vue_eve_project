<!--登录系统 - 管理员/助教-->
<template>
    <div class="dialog">
        <el-dialog
                width="679px"
                :title="isRegist ? '注册新账号' : '账号密码登录'"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                center
                append-to-body>
            <div v-if="!isRegist" class="dialog-content">
                <div id="login" class="content flex-middle flex-center">
                    <div class="loginbox box-size flex-middle flex-between">
                        <form @submit.prevent="submit">
                            <ul>
                                <li>
                                    <el-input size="large" v-model="account" placeholder="请输入QQ/手机号/邮箱">
                                        <img slot="prefix" src="../assets/img/login_accound_icon.png" alt="">
                                    </el-input>
                                </li>
                                <li>
                                    <el-input type="password" size="large" v-model="password"
                                              show-password
                                              placeholder="请输入密码">
                                        <img slot="prefix" src="../assets/img/login_password_icon.png" alt="">

                                    </el-input>
                                </li>
                            </ul>
                            <el-button class="login-btn gradient-btn-style btn-all" native-type="submit">登录</el-button>
                        </form>
                    </div>
                </div>
                <div class="dis-flex"
                     style="margin-top: 40px; justify-content: flex-end; font-size: 13px; color: #939393;">
                    <div class="link-text-btn" @click="handleForgetPassword">忘记密码?</div>
                    <div class="bottom-btn-line"></div>
                    <div class="link-text-btn" @click="handleChangeRegist(true)">注册新账号</div>
                    <!--<div class="bottom-btn-line"></div>-->
                    <!--<div class="link-text-btn" @click="handleFeedback">意见反馈</div>-->
                </div>
            </div>
            <div v-else class="dialog-content">
                <div id="login" class="content flex-middle flex-center">
                    <div class="loginbox box-size flex-middle flex-between">
                        <form @submit.prevent="handleRegist">
                            <ul>
                                <li>
                                    <el-input size="large" v-model="phone" placeholder="请输入手机号">
                                    </el-input>
                                </li>
                                <li>
                                    <el-input size="large" v-model="email" placeholder="请输入邮箱">
                                    </el-input>
                                </li>
                                <li>
                                    <el-input size="large" v-model="qq" placeholder="请输入QQ">
                                    </el-input>
                                </li>
                                <li>
                                    <el-input type="password" size="large" v-model="password"
                                              show-password
                                              placeholder="请输入密码">
                                    </el-input>
                                </li>
                                <li>
                                    <el-input type="password" size="large" v-model="passwordRepeat"
                                              show-password
                                              placeholder="请再次输入密码">
                                    </el-input>
                                </li>
                            </ul>
                            <el-button class="login-btn gradient-btn-style btn-all" native-type="submit">注册</el-button>
                        </form>
                    </div>
                </div>
                <div class="dis-flex"
                     style="margin-top: 40px; justify-content: flex-end; font-size: 13px; color: #939393;">
                    <div class="link-text-btn" @click="handleChangeRegist(false)">账号密码登录</div>
                    <!--<div class="bottom-btn-line"></div>-->
                    <!--<div class="link-text-btn" @click="handleFeedback">意见反馈</div>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import Constants from '@/assets/js/Constants'
    import Utils from '@/assets/js/Utils'
    import Blowfish from 'blowfish'

    export default {
        name: 'LoginDialog',
        props: ['successCallback'],
        data() {
            return {
                dialogVisible: false,
                account: '',
                phone: '',
                email: '',
                qq: '',
                password: '',
                passwordRepeat: '',

                isRegist: false,
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

            // 显示弹出层，如果有data，将回显
            setMaskVisible(val, data) {
                this.dialogVisible = val
                this.isRegist = data && data.isRegist || false
            },

            // blowfish加密
            encryptPsd(key, text) {
                var bf = new Blowfish(key);
                return bf.encrypt(Utils.pkcs7_encode(text, 8));
            },

            // 登录
            submit() {
                // this.$store.dispatch("setToken", "test")
                // this.dialogVisible = false
                // return

                let account = this.account,
                    password = this.password

                if (Utils.isEmpty(account)) {
                    this.$alert("请输入账号！")
                    return;
                }
                if (Utils.isEmpty(password)) {
                    this.$alert("请输入密码！")
                    return;
                }

                let data = {
                    account: account,
                    password: password,
                    // password: this.encryptPsd(account + Constants.STATIC_PARAMETER.ENCRYPT_MAGIC_CODE, password),
                    // role: this.role
                }

                this.$store.dispatch('changeLoadingView', true)
                axios.post(Constants.URL.login, data).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)

                    const token = response.data

                    // 设置全局状态token/userInfo
                    this.$store.dispatch("setToken", token)

                    this.$store.dispatch('changeLoadingView', true)
                    axios.get(Constants.URL.getUserInfo).then((response) => {
                        this.$store.dispatch('changeLoadingView', false)
                        const userInfo = response.data
                        this.$store.dispatch("setUserInfo", JSON.stringify(userInfo))

                        this.dialogVisible = false
                        this.successCallback && this.successCallback(userInfo)

                        // 处理登录成功事件
                        // 判断用户身份
                        switch (userInfo.type) {
                            case Constants.UserType.Donor:
                            case Constants.UserType.OrganizationOperator: {
                                // 资助人
                                // this.$router && this.$router.replace({name: 'PortalHome'})
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
                                break
                            }
                        }

                    }, (error) => {
                        this.$store.dispatch('changeLoadingView', false)
                        this.$alert(error && error.errorMessage || Constants.errorText)
                    })

                }, (error) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert(error && error.errorMessage || Constants.errorText)
                })
            },

            // 忘记密码
            handleForgetPassword() {
                let account = this.account

                if (Utils.isEmpty(account)) {
                    this.$alert("请输入账号！")
                    return;
                }

                let data = {
                    account: account,
                }

                this.$store.dispatch('changeLoadingView', true)
                axios.post(Constants.URL.forgotPassword, data).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)

                    this.$alert(response.data)
                }, (error) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert(error && error.errorMessage || Constants.errorText)
                })
            },

            // 切换注册/登录
            handleChangeRegist(isRegist) {
                this.isRegist = isRegist
                this.account = ''
                this.password = ''
                this.passwordRepeat = ''
                this.qq = ''
                this.phone = ''
                this.email = ''
            },

            // 注册
            handleRegist() {
                let phone = this.phone,
                    email = this.email,
                    qq = this.qq,
                    password = this.password,
                    passwordRepeat = this.passwordRepeat;

                if (Utils.isEmpty(phone) || !Utils.isPhonePattern.test(phone)) {
                    this.$toast('请填写正确的手机号')
                    return
                }
                if (!Utils.isEmpty(email) && !Utils.isEmailPattern.test(email)) {
                    this.$toast('请填写正确的邮箱')
                    return
                }
                if (!Utils.isEmpty(qq) && !Utils.isQQPattern.test(qq)) {
                    this.$toast('请填写正确的QQ号')
                    return
                }
                if (Utils.isEmpty(password)) {
                    this.$toast('请填写密码')
                    return
                }
                if (password != passwordRepeat) {
                    this.$toast('两次输入的密码不一致，请重新输入')
                    return
                }

                let data = {
                    password,
                    // password: this.encryptPsd(account + Constants.STATIC_PARAMETER.ENCRYPT_MAGIC_CODE, password),
                    // role: this.role
                }
                if (!Utils.isEmpty(phone)) {
                    data.phone = phone
                }
                if (!Utils.isEmpty(qq)) {
                    data.qq = qq
                }
                if (!Utils.isEmpty(email)) {
                    data.email = email
                }


                this.$store.dispatch('changeLoadingView', true)
                axios.post(Constants.URL.register, data).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert('注册成功！')
                    this.handleChangeRegist(false)

                }, (error) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert(error && error.errorMessage || Constants.errorText)
                })
            },

            // 一键反馈
            handleFeedback() {

            },

        }
    }
</script>

<style lang="stylus" scoped>
    #login {
        height: 100%
        background-color: #fff
        position: relative
        box-sizing: border-box
        flex-direction: column
        .loginbox {
            width: 371px
            position: relative
            z-index: 100
            form {
                flex: 2
            }
        }
        ul {
            li {
                margin-bottom: 20px
            }
        }
        /deep/ .el-input--prefix .el-input__inner {
             height 53px
             padding-left 70px
             font-size 15px
         }
        /deep/ .el-input__inner {
            height 53px
            font-size 15px
        }
        /deep/ .el-input__inner:focus {
            border 1px solid #b11111
        }
        /deep/ .el-input__prefix {
            top: 1px
            left: 1px
        }
    }

    .login-btn {

    }

        .bottom-btn-line {
            width 1px
            background-color #939393
            margin 0 5px
        }

    /deep/ .el-dialog__title {
        font-size: 22px;
        color: #313131;
    }
</style>
