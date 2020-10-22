<!--账户捐助-->
<template>
    <div class="dialog">
        <el-dialog
                width="679px"
                title="账户捐助"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                center
                :show-close="false"
                append-to-body>
            <div class="dialog-content">
                <div v-if="!tradeNo">
                    <el-form label-position="top">
                        <el-form-item label="请选择捐助方式">
                            <el-radio-group v-model="form.payType" style="display: flex;">
                                <el-radio :label="PayTypes.Alipay" border
                                          style="height: 60px; display: flex; align-items: center;">
                                    <img src="../../static/img/alipay.png" style="height: 40px" alt="支付宝支付   ">
                                </el-radio>
                                <el-radio :label="PayTypes.WechatPay" border
                                          style="height: 60px; display: flex; align-items: center;">
                                    <img src="../../static/img/wechat_pay.png" style="height: 40px" alt="支付宝支付   ">
                                </el-radio>
                                <el-radio :label="PayTypes.UnionPay" border
                                style="height: 60px; display: flex; align-items: center;">
                                <img src="../../static/img/union_pay.png" style="height: 40px" alt="银联支付   ">
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="请输入捐助金额(元)">
                            <el-input-number style="width: 300px;" v-model="form.amount" placeholder="请输入捐助金额(元)"
                                             :min="0.01" :precision="2" :step="1"></el-input-number>
                        </el-form-item>
                    </el-form>

                    <div class="flex-middle flex-around">
                        <el-button @click="handleCancel">取消捐助</el-button>
                        <el-button type="primary" @click="handleBeginPay">确认捐助</el-button>
                    </div>
                </div>

                <div v-else class="flex-column flex-middle">
                    <div class="b20">
                        等待捐助完成
                    </div>

                    <div id="qrcode-container" class="b20" v-if="form.payType == PayTypes.WechatPay">
                        <div class="flex-middle flex-column">
                            <div class="b10">请扫描二维码支付</div>
                            <div id="qrcode"></div>
                        </div>
                    </div>

                    <div class="flex-middle flex-around">
                        <el-button @click="handleCancel">取消捐助</el-button>
                        <el-button @click="handleSelectOtherPayType">选择其他捐助方式</el-button>
                        <el-button type="primary" @click="handleGetOrderStatus(true)">捐助完成</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import Constants from '@/assets/js/Constants'
    import Utils from '@/assets/js/Utils'
    import QRCode from 'qrcodejs2'

    const PayTypes = {
        Alipay: 1,
        WechatPay: 2,
        UnionPay: 3,
    }

    export default {
        name: 'DonatePayDialog',
        props: ['successCallback'],
        data() {
            return {
                dialogVisible: false,
                form: {
                    payType: null,
                    amount: 1,
                },

                tradeNo: null,
                PayTypes: PayTypes,
            }
        },
        watch: {
            dialogVisible(newVal, oldVal) {
                if (newVal == false) {
                    Object.assign(this.$data, this.$options.data())
                    this.clearStatusTimeInterval()
                }
            }
        },
        methods: {

            // 显示弹出层，如果有data，将回显
            setMaskVisible(val, data) {
                this.dialogVisible = val
            },

            // 取消捐助
            handleCancel() {
                this.dialogVisible = false
            },
            // 选择其他捐助方式
            handleSelectOtherPayType() {
                this.clearStatusTimeInterval()
                this.tradeNo = null;
            },

            // 开始捐助
            handleBeginPay() {
                if (!this.form.payType) {
                    this.$toast('请选择捐助方式')
                    return
                }
                if (!this.form.amount) {
                    this.$toast('请输入捐助金额')
                    return
                }


                // 解决被拦截
                var newWindow = null
                if (this.form.payType != PayTypes.WechatPay) {
                    newWindow = window.open();
                }
                let params = {
                    amount: Utils.accMul(this.form.amount, 100),
                    returnUrl: window.location.href,
                    subject: '光大基金会捐助',
                    body: `捐助${this.form.amount}元`
                }
                let url = ''
                switch (this.form.payType) {
                    case PayTypes.Alipay: {
                        url = Constants.URL.OrderAlipay
                        break
                    }
                    case PayTypes.WechatPay: {
                        url = Constants.URL.OrderWXpay
                        break
                    }
                    case PayTypes.UnionPay: {
                        url = Constants.URL.OrderUnionpay
                        break
                    }
                }

                this.$store.dispatch('changeLoadingView', true)
                axios.post(url, params).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.handleOrderStatusInterval()

                    this.tradeNo = response.data.tradeNo

                    if (this.form.payType == PayTypes.WechatPay) {
                        setTimeout(() => {

                            this.handleCreateQrcode(response.data.detail)
                        }, 500)
                    } else {
                        if (!newWindow) return
                        newWindow.document.open("text/html");
                        newWindow.document.write(response.data.detail);
                        newWindow.document.close();
                    }

                }, (error) => {
                    newWindow && newWindow.close()
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert((error && error.errorMessage) || Constants.errorText)
                })
            },

            // 轮训查询结果
            handleOrderStatusInterval() {
                this.statusTimeInterval = setInterval(() => {
                    this.handleGetOrderStatus()
                }, 2000)
            },
            // 结束轮训
            clearStatusTimeInterval() {
                this.statusTimeInterval && clearInterval(this.statusTimeInterval)
            },


            // 查询捐助结果
            handleGetOrderStatus(showTip = false) {
                if (!this.tradeNo) return
                axios.get(Constants.URL.OrderStatus.format(this.tradeNo)).then((response) => {
                    if (response.data == 2) {
                        this.tradeNo = null
                        this.clearStatusTimeInterval()
                        this.successCallback && this.successCallback()
                        this.$alert('捐助成功')
                        this.dialogVisible = false
                    } else if (response.data == 1) {
                        if (showTip) {
                            this.$toast('未获取到捐助结果，请等待捐助完成或稍后再试')
                        }
                    } else {
                        if (showTip) {
                            this.$toast('捐助失败，请重试')
                            this.clearStatusTimeInterval()
                        }
                    }
                }, (error) => {
                    this.$alert(error && error.errorMessage || Constants.errorText)
                })
            },

            // 清空当前二维码
            clearQrcode() {
                this.qrcode && this.qrcode.clear()
            },

            // 生成二维码
            handleCreateQrcode(codeString) {
                var qrElement = document.getElementById('qrcode-container')
                //学生生成二维码
                // if (!this.qrcode) {
                this.clearQrcode()
                this.qrcode = new QRCode('qrcode', {
                    width: 200,
                    height: 200, // 高度
                    text: codeString, // 二维码内容
                    correctLevel: QRCode.CorrectLevel.L
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
                // } else {
                //     this.qrcode.clear()
                //     this.qrcode.makeCode(codeString)
                // }
            },

        }
    }
</script>

<style lang="stylus" scoped>

</style>
