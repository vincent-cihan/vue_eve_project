<!--修改个人信息-->
<template>
    <div class="dialog">
        <el-dialog
                title="修改个人信息"
                width="800px"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                append-to-body>
            <div class="dis-flex flex-around dialog-content">

                <!--信息Form-->
                <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left">
                    <el-form-item label="头像" prop="avatarLink">
                        <div class="flex-middle flex-center upload-img" @click="handleUploadUserIcon">
                            <span v-if="!form.avatarLink" class="iconfont iconmorentupian"
                                  style="font-size: 20px;"></span>
                            <img v-else :src="form.avatarLink" alt="" style="width: 100%; height: 100%;">
                        </div>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input class="input-style bottom10" v-model="form.name" placeholder="请填写姓名"/>
                    </el-form-item>
                    <!--<el-form-item label="登录账号" prop="username">-->
                    <!--<el-input class="input-style bottom10" v-model="form.username" placeholder="请填写登录账号"/>-->
                    <!--</el-form-item>-->
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="form.gender" placeholder="请选择性别">
                            <el-option
                                    v-for="item in genderOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="手机号码" prop="phone">
                        <el-input class="input-style bottom10" v-model="form.phone" placeholder="请填写手机号码"/>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input class="input-style bottom10" v-model="form.email" placeholder="请填写电子邮箱"/>
                    </el-form-item>

                    <!--老师信息-->
                    <div v-if="userInfo.type == 2">
                        <el-form-item label="身份证号" prop="nationalNo">
                            <el-input class="input-style bottom10" v-model="form.nationalNo" placeholder="请填写身份证号"/>
                        </el-form-item>
                        <el-form-item label="工作单位" prop="workPlace">
                            <el-input class="input-style bottom10" v-model="form.workPlace" placeholder="请填写工作单位"/>
                        </el-form-item>
                        <el-form-item label="学历" prop="qualification">
                            <el-input class="input-style bottom10" v-model="form.qualification" placeholder="请填写学历"/>
                        </el-form-item>
                        <el-form-item label="教师简介" prop="introduce">
                            <el-input class="input-style bottom10"
                                      type="textarea"
                                      :rows="2"
                                      v-model="form.introduce" placeholder="请填写教师简介"/>
                        </el-form-item>
                    </div>

                    <!--学生信息-->
                    <div v-if="userInfo.type == 1">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker
                                    v-model="form.birthday"
                                    type="date"
                                    :editable="false"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择出生日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="工作单位" prop="workPlace">
                            <el-input class="input-style bottom10" v-model="form.workPlace" placeholder="请填写工作单位"/>
                        </el-form-item>
                        <el-form-item label="学历" prop="qualificationInfo">
                            <el-input class="input-style bottom10" v-model="form.qualificationInfo" placeholder="请填写学历"/>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <!--<el-button @click="() => {-->
                <!--this.form = {...this.tempForm, id: this.id};-->
                <!--this.$forceUpdate()-->
                <!--}">使用预置数据测试（测试完毕删除）</el-button>-->
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button class="btn-style" @click="handleSaveInfo">确 定</el-button>
            </span>
        </el-dialog>

        <UploadFile ref="UploadFile" :cropper="true" :cropOptions="cropOptions"
                    :successCallback="updateFile"></UploadFile>

    </div>
</template>

<script type="text/javascript">
    import Constants from '@/assets/js/Constants'
    import UploadFile from '@/components/UploadFile'
    import Utils from '@/assets/js/Utils'

    export default {
        name: 'EditSelfInfoDialog',
        props: ['successCallback'],
        components: {
            UploadFile
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo && JSON.parse(this.$store.state.userInfo) || {}
            },
        },
        data() {
            return {
                id: null,
                dialogVisible: false,
                cropOptions: {
                    autoCrop: true,//是否默认生成截图框
                    autoCropWidth: 400, //默认生成截图框宽度
                    autoCropHeight: 400,  //默认生成截图框高度
                    fixed: true, // 开启宽度和高度比例
                    fixedNumber: [1, 1] //截图框的宽高比例
                },

                genderOptions: Constants.SelectOptionsManager.GetOptionsFunction(Constants.SelectOptionsManager.GenderType),
                teacherTypeOptions: Constants.SelectOptionsManager.GetOptionsFunction(Constants.SelectOptionsManager.TeacherType),

                form: {
                    avatarLink: null
                },

                rules: {
                    name: [
                        {required: true, message: '请填写姓名', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请填写登录账号', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    birthday: [
                        {required: true, message: '请选择生日', trigger: 'change'}
                    ],
                    phone: [
                        { required: true, message: '请输入正确的手机号码', trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', required: true, message: '请填写正确的邮箱', trigger: 'blur'}
                    ],

                    //老师
                    // nationalNo: [
                    //     {pattern: Utils.isNationalNoPattern, required: true, message: '请填写身份证号', trigger: 'blur'}
                    // ],
                    qualification: [
                        {required: true, message: '请填写学历', trigger: 'blur'}
                    ],
                    workPlace: [
                        {required: true, message: '请填写工作单位', trigger: 'blur'}
                    ],

                    // qualificationInfo: [
                    //     {required: true, message: '请填写学历', trigger: 'blur'}
                    // ],
                }
            }
        },
        methods: {

            // 显示弹出层，如果有data，将回显
            setMaskVisible(val, data) {
                this.dialogVisible = val
                if (data) {
                    this.form = {
                        ...this.$options.data().form,
                        ...data
                    }
                    if (data.id) {
                        this.id = data.id
                        console.log("data.id", data.id)
                    } else {
                        this.id = null
                    }

                } else {
                    this.form = {
                        ...this.$options.data().form,
                    }
                    this.id = null
                }
                this.$forceUpdate();

                if (this.userInfo.type == Constants.UserType.Teacher) {
                    this.fetchTeacherInfo()
                } else if (this.userInfo.type == Constants.UserType.Student) {
                    this.fetchStudentInfo()
                }
            },

            fetchTeacherInfo() {
                this.$store.dispatch('changeLoadingView', true)
                axios.get(Constants.URL.t_teacher_get_url).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)
                    let userInfo = response.data
                    this.form = {
                        ...userInfo
                    }
                }, (error) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert(Constants.errorText)
                })
            },

            fetchStudentInfo() {
                this.$store.dispatch('changeLoadingView', true)
                axios.get(Constants.URL.s_student_get_url).then((response) => {
                    this.$store.dispatch('changeLoadingView', false)
                    let userInfo = response.data
                    this.form = {
                        ...userInfo
                    }
                }, (error) => {
                    this.$store.dispatch('changeLoadingView', false)
                    this.$alert(Constants.errorText)
                })
            },

            // 点击上传头像
            handleUploadUserIcon() {
                this.$refs.UploadFile.handleUserIcon(0)
            },

            // 文件上传完毕回调
            updateFile(type, url) {
                this.form.avatarLink = url
            },

            // 保存
            handleSaveInfo() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        let userInfo = {
                            ...this.userInfo
                        }

                        let data = {
                            ...this.form,
                        }

                        if (data.enable == null) {
                            data.enable = 1
                        }

                        let url = Constants.URL.user_info_url

                        if (userInfo.type == Constants.UserType.Admin) {
                            url = Constants.URL.user_info_url
                        } else if (userInfo.type == Constants.UserType.Teacher) {
                            url = Constants.URL.t_teacher_update_url
                        } else if (userInfo.type == Constants.UserType.Student) {
                            url = Constants.URL.s_student_update_url

                            axios.post(Constants.URL.s_student_update_avatar_url + '?link=' + data.avatarLink).then((response) => {
                            }, (error) => {
                            })
                        }

                        this.$store.dispatch('changeLoadingView', true)
                        axios.post(url, data).then((response) => {
                            this.$store.dispatch('changeLoadingView', false)
                            this.$toast('保存成功')

                            // 修改成功，更新userInfo
                            Object.assign(userInfo, data)
                            this.$store.dispatch("setUserInfo", JSON.stringify(userInfo))

                            this.dialogVisible = false
                            this.successCallback && this.successCallback(data)
                        }, (error) => {
                            this.$store.dispatch('changeLoadingView', false)
                            this.$alert((error && error.errorMessage) || Constants.errorText)
                        })
                    } else {
                        return false;
                    }
                });
            },

        }
    }
</script>

<style scoped>
    .upload-img {
        overflow: hidden;
        margin: 0 auto;
        background-color: #d3d3d3;
        border-radius: 40px;
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    .el-select {
        width: 100%;
        /*min-width: 250px;*/
    }
</style>
