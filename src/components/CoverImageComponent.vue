<template>
    <div class="flex-middle flex-center upload-img" :style="{'width': width || '240px', 'height': height || '135px'}" @click="coverUploadIcon">
        <div v-if="!cover" class="flex-column flex-middle">
            <i class="el-icon-picture" style="font-size: 30px;"></i>
            <span class="m10" style="color: #000;">{{placeholder || '点击上传图片'}}</span>
        </div>
        <img v-else :src="cover" alt="" style="width: 100%; height: 100%;">

        <upload-image ref="UploadFile" :cropper="cropper" :cropOptions="uploadCropOptions"
                      :successCallback="updateFile"/>
    </div>
</template>

<script>
    import UploadImage from "./UploadFile";

    export default {
        components: {UploadImage},
        name: "cover-image-component",
        props: ['cover', 'type', 'handleUpload', 'placeholder', 'width', 'height', 'cropper', 'cropOptions'],
        computed: {
            uploadCropOptions() {
                return this.cropOptions || {
                    autoCrop: false, //是否默认生成截图框
                    autoCropWidth: 800, //默认生成截图框宽度
                    autoCropHeight: 450, //默认生成截图框高度
                    fixed: true, // 开启宽度和高度比例
                    fixedNumber: [16, 9] //截图框的宽高比例
                }
            }
        },
        methods: {
            coverUploadIcon() {
                this.$refs.UploadFile.handleUserIcon(0); //原来的
            },

            updateFile(type, url) {
                this.handleUpload && this.handleUpload(url, this.type)
            },
        }
    }
</script>

<style scoped lang="stylus">
    .upload-img {
        overflow: hidden;
        /*margin: auto;*/
        background-color: #d3d3d3;
        width: 240px;
        height: 135px;
        cursor: pointer;
        img {
            object-fit: contain

        }
    }
</style>
