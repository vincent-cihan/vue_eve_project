<template>
    <div class="manage-nav-title">
        <div v-if="showBack" class="mr10 back-btn" @click="handleBack">
            <i class="el-icon-back">返回</i>
        </div>
        <div>{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "manage-nav-title",
        props: ['title', 'showBack', 'backClick'],
        methods: {
            handleBack() {
                if (this.backClick) {
                    this.backClick()
                } else {
                    this.$router.back(-1)
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .manage-nav-title {
        @extends .flex-middle
        border-bottom  1px solid $borderColor
        padding 10px 10px
        font-size: 16px; font-weight: 700;

    }

    .back-btn {
        border-right 1px solid $borderColor
        padding-right 10px
        cursor pointer
    }
</style>
