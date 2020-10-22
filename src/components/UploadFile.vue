<!--七牛上传控件(type: 0图片，1其他，cropper：是否开启裁剪，cropOptions：裁剪属性，successCallback：上传回调)-->
<template>
    <div class="thumbile">

        <!--选择文件-->
        <input ref="updateInput" class="update-input" name="file" type="file" accept="image/*;capture=camera"
               @change="handleChosenFile"/>

        <!--图片裁剪-->
        <el-dialog
                title="提示"
                width="640px"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                append-to-body>
            <div class="cropper">
                <VueCropper
                        class="mask"
                        ref="cropper"
                        outputType="jpg"
                        :img="options.url"
                        :autoCrop="cropOptions && cropOptions.autoCrop"
                        :autoCropWidth="cropOptions && cropOptions.autoCropWidth"
                        :autoCropHeight="cropOptions && cropOptions.autoCropHeight"
                        :fixed="cropOptions && cropOptions.fixed"
                        :fixedNumber="cropOptions && cropOptions.fixedNumber"/>
            </div>
            <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleSubmitPic">确 定</el-button>
		  </span>
        </el-dialog>

    </div>
</template>

<script type="text/javascript">
    import Constants from '@/assets/js/Constants'
    import VueCropper from 'vue-cropper'

    export default {
        name: 'UploadImage',
        /*
        cropOptions: {
              autoCrop: true,//是否默认生成截图框
              autoCropWidth: 450, //默认生成截图框宽度
              autoCropHeight: 120,  //默认生成截图框高度
              fixed: true, // 开启宽度和高度比例
              fixedNumber: [45, 12] //截图框的宽高比例
            }
         */
        props: ['cropper', 'cropOptions', 'successCallback'], // cropper: 是否开启裁剪功能, cropOptions: 裁剪参数
        components: {
            VueCropper
        },
        data() {
            return {
                dialogVisible: false,
                type: 0,  // 0 图片，1其他
                options: {
                    url: '',
                    name: '',
                }
            }
        },
        watch: {
            cropper(news, old) {
                this.cropper = news
            }
        },
        methods: {

            // 绑定更换图片事件
            handleUserIcon(type) {
                this.$refs.updateInput.value = '' // 重置上传控件
                this.type = type
                this.$refs.updateInput.click()
            },

            // 选择图片
            handleChosenFile(e) {

                // 设置文件名称
                let file = e.target.files[0];
                let fileName = file.name.substring(0, file.name.lastIndexOf('.'))
                //'gx-material-'
                this.options.name = fileName + '-' + new Date().getTime() + file.name.substring(file.name.lastIndexOf('.'))

                // 格式不正确
                if (!this.uploadImg(e)) return

                if (this.cropper) {
                    this.dialogVisible = true
                }
            },

            //上传图片
            uploadImg(e) {
                var file = e.target.files[0]

                // 图片
                if (this.type == 0) {
                    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|JPEG|BMP)$/.test(e.target.value)) {
                        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                        return false
                    }
                }

                // 非图片
                if (this.type == 1) {
                    if (/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|JPEG|BMP)$/.test(e.target.value)) {
                        alert('上传文件格式不正确，请选择非图片类文件！')
                        return false
                    }
                }

                var reader = new FileReader()

                // 读取成功后触发
                reader.onload = (e) => {
                    let data
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    this.options.url = data
                }

                // 转化为blob
                reader.readAsArrayBuffer(file) // 读取结果是一个 ArrayBuffer 对象

                // 读取完成后触发，不管是否成功。触发顺序排在 onload 或 onerror 后面
                if (this.cropper) {
                    reader.onloadend = () => {
                        this.$refs.cropper.startCrop()  // 开始截图
                    }
                } else {
                    this.updateUserIcon(e)
                }
                return true
            },

            // 输出截取图片data
            handleSubmitPic() {
                this.$refs.cropper.getCropBlob((data) => {
                    this.updateUserIcon(data)
                })
            },

            // 上传控件准备
            updateUserIcon(data) {
                let file = data;
                let d = new Date();
                let type = data.type;
                if (!this.cropper) {
                    file = data.target.files[0]
                    type = file.name.split('.')
                }

                //创建form对象
                let param = new FormData(); //创建form对象
                param.append('file', file, this.name)

                // 设置文件key
                param.append('key', this.options.name)

                let config = {
                    // headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress: progressEvent => {
                        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                        console.log(complete)
                        this.$store.dispatch('changeLoadingText', '上传中 ' + complete)
                    }
                };
                // //先从自己的服务端拿到token
                this.$store.dispatch('changeLoadingView', true)
                // axios.get(Constants.URL.uptoken_url).then(response => {
                //     param.append('token', response.detail);
                this.uploading(param, config, file.name);//然后将参数上传
                // return;
                // })
            },

            // 上传图片
            uploading(param, config, pathName) {
                axios.post(Constants.URL.upload_url, param, config)
                    .then(response => {
                        if (response && response.success) {
                            this.$store.dispatch('changeLoadingView', false)
                            this.dialogVisible = false
                            // const url = Constants.STATIC_PARAMETER.FILE_DOMAIN + response.key
                            const url = response.data
                            this.successCallback && this.successCallback(this.type, url, pathName)
                        } else {
                            this.$message.warning("上传失败，请稍后再试！")
                        }
                    }, (error) => {
                        this.$message.warning("上传失败，请稍后再试！")
                        this.$store.dispatch('changeLoadingView', false)
                    })
            },

        }
    }
</script>

<style lang="stylus" scoped>
    .thumbile {
        position: absolute
        top: -2000px

    }

    .cropper {
        width: 600px
        height: 450px
        position: relative
        img {
            max-width: 100%;
            max-height: 100%;
        }
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
