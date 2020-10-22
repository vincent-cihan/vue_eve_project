<template>
    <quill-editor
            class="editor"
            :style="{'height': height || '400px'}"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
    ></quill-editor>
</template>

<script>
    import Constants from '@/assets/js/Constants'
    import {quillEditor, Quill} from "vue-quill-editor";
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    //quill图片可拖拽改变大小
    import ImageResize from 'quill-image-resize-module'
    Quill.register('modules/imageResize', ImageResize)
    Quill.register('modules/ImageExtend', ImageExtend)
    var fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','sans-serif'];
    var Font = Quill.import('formats/font');
    Font.whitelist = fonts; //将字体加入到白名单
    Quill.register(Font, true);

    const sizeStyle = Quill.import('attributors/style/size')
    sizeStyle.whitelist = ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2rem', '2.25rem']
    Quill.register(sizeStyle, true)

    export default {
        name: 'QuillEditComponent',
        props: {
            text: {
                type: String
            },
            height: {
                type: Number
            }
        },
        data() {
            return {
                content: null,
                editorOption: {
                    modules: {
                        imageResize: {},
                        ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
                            action: Constants.URL.upload_url,  // 必填参数 图片上传地址
                            // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                            // 你必须把返回的数据中所包含的图片地址 return 回去
                            response: (response) => {
                                return response.data
                            },
                            name: 'file',  // 图片上传参数名
                            headers: (xhr) => {
                                xhr.setRequestHeader('token',window.localStorage.getItem('token'));
                            },
                            start: () => {
                                this.$store.dispatch('changeLoadingView', true)
                            },
                            end: () => {
                                this.$store.dispatch('changeLoadingView', false)
                            },
                            success: () => {
                            },
                            error: () => {
                                this.$alert('图片上传失败，请重试')
                            }
                        },
                        toolbar: {  // 如果不上传图片到服务器，此处不必配置
                            container: [
                                ['bold', 'italic', 'underline', 'strike'],
                                ['blockquote', 'code-block'],
                                [{'header': 1}, {'header': 2}],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                // [{'script': 'sub'}, {'script': 'super'}],
                                [{'indent': '-1'}, {'indent': '+1'}],
                                [{'direction': 'rtl'}],
                                [{'size': [false, '0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2rem', '2.25rem'] }],
                                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                                [{'color': []}, {'background': []}],
                                [{'font': fonts}],
                                [{'align': []}],
                                ['clean'],
                                ['image']
                            ],  // container为工具栏，此次引入了全部工具栏，也可自行配置
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    }
                }
            };
        },
        watch: {
            text: {
                deep: true,
                immediate: true,
                handler(newVal, oldVal) {
                    this.content = newVal;
                }
            },
            content(newVal, oldVal) {
                this.handleText()
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorBlur() {
            },
            onEditorFocus() {
                //获得焦点事件
            },
            onEditorChange() {
                //内容改变事件
            },
            handleText() {
                this.$emit("content", this.content);
            }
        }
    };
</script>
<style>
    .editor {
        margin-bottom: 100px;
    }
    .ql-editor.ql-blank::before {
        content: '请输入内容' !important;
    }
    .ql-snow .ql-tooltip[data-mode=link]::before {
        content: "请输入链接地址:";
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
        content: "请输入视频地址:";
    }

    .ql-container {
        font-size:16px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '默认大小';
    }
    /*'0.75em', '0.875em', '1em', '1.125em', '1.25em', '1.5em', '1.875em', '2em', '2.25em'*/
    .ql-picker-item[data-value='0.75rem']::before, .ql-picker-label[data-value='0.75rem']::before {
        content: '12px' !important;
    }

    .ql-picker-item[data-value='0.875rem']::before, .ql-picker-label[data-value='0.875rem']::before {
        content: '14px' !important;
    }

    .ql-picker-item[data-value='1rem']::before, .ql-picker-label[data-value='1rem']::before {
        content: '16px' !important;
    }

    .ql-picker-item[data-value='1.125rem']::before, .ql-picker-label[data-value='1.125rem']::before {
        content: '18px' !important;
    }

    .ql-picker-item[data-value='1.25rem']::before, .ql-picker-label[data-value='1.25rem']::before {
        content: '20px' !important;
    }

    .ql-picker-item[data-value='1.5rem']::before, .ql-picker-label[data-value='1.5rem']::before {
        content: '24px' !important;
    }

    .ql-picker-item[data-value='1.875rem']::before, .ql-picker-label[data-value='1.875rem']::before {
        content: '30px' !important;
    }

    .ql-picker-item[data-value='2rem']::before, .ql-picker-label[data-value='2rem']::before {
        content: '32px' !important;
    }

    .ql-picker-item[data-value='2.25rem']::before, .ql-picker-label[data-value='2.25rem']::before {
        content: '36px' !important;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: '文本';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: '标题5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: '标题6';
    }


    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
        content: "宋体";
        font-family: "SimSun";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
        content: "黑体";
        font-family: "SimHei";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
        content: "微软雅黑";
        font-family: "Microsoft YaHei";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
        content: "楷体";
        font-family: "KaiTi";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
        content: "仿宋";
        font-family: "FangSong";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
        content: "Arial";
        font-family: "Arial";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
        content: "Times New Roman";
        font-family: "Times New Roman";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
        content: "sans-serif";
        font-family: "sans-serif";
    }

    .ql-font-SimSun {
        font-family: "SimSun";
    }
    .ql-font-SimHei {
        font-family: "SimHei";
    }
    .ql-font-Microsoft-YaHei {
        font-family: "Microsoft YaHei";
    }
    .ql-font-KaiTi {
        font-family: "KaiTi";
    }
    .ql-font-FangSong {
        font-family: "FangSong";
    }
    .ql-font-Arial {
        font-family: "Arial";
    }
    .ql-font-Times-New-Roman {
        font-family: "Times New Roman";
    }
    .ql-font-sans-serif {
        font-family: "sans-serif";
    }
</style>
