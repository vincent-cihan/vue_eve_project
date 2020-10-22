<template>
    <div>
        <el-upload
                :class="{hide:fileList.length >= limit}"
                :action="uploadUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :limit="limit"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"

                :http-request="uploadReferencesRequest"
                :before-remove="beforeRemove"
                multiple
                :file-list="fileList"
                :headers="references_headers">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="imgPreviewDialogVisible">
            <img width="100%" :src="previewDialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "multiple-image-upload",
        props: ['limit', 'fileList'],
        data() {
            return {
                uploadUrl: Constants.URL.upload_url,
                references_headers: {"token": window.localStorage.getItem('token')},

                imgPreviewDialogVisible: false,
                previewDialogImageUrl: null,
            }
        },
        mounted() {
        },
        methods: {
            // 预览
            handlePictureCardPreview(file) {
                this.previewDialogImageUrl = file.url;
                this.imgPreviewDialogVisible = true;
            },
            // 超过限制
            handleExceed(files, fileList) {
                this.$message.warning(`不能超过${this.limit}张图片`);
            },

            // 附件上传相关
            uploadReferencesRequest(param) {
                let fileObj = param.file;
                let formData = new FormData();
                formData.append('file', fileObj);
                axios.post(this.uploadUrl, formData, {
                    onUploadProgress: function (event) {
                        // console.log(event)
                        param.file.percent = event.loaded / event.total * 100;
                        param.onProgress(param.file);
                    }
                })
                    .then(response => {
                        this.handleAddReferencesListSuccess(response, fileObj);

                    }, (error) => {
                        param.onError()
                        this.handleError();
                    })

            },
            handleRemove(file, fileList) {
                // this.fileList = fileList;
                this.$emit('update:fileList',fileList)
            },
            handleAddReferencesListSuccess(response, file) {
                // console.log(response, file)
                let fileList = this.fileList
                let newItem = {
                    name: file.name,
                    url: response && response.data || null
                }
                fileList.push(newItem)
                this.$emit('update:fileList',fileList)

            },
            handleError(res) {   //显示错误
                this.$alert('图片提交失败')
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除该图片？`);
            },
        }
    }
</script>

<style scoped>
    .hide /deep/ .el-upload--picture-card {
        display: none;
    }

    /deep/ .el-icon-plus {
        font-size: 26px;
        color: #000;
    }

    /deep/ .el-upload-list__item {
        transition: none !important;
    }
</style>
