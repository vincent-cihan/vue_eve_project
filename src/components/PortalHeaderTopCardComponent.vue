<template>
    <div class="container pointer">
        <transition-group name="el-fade-in-linear">
        <img v-for="(item, index) in carouselLinks" :key="item.id" v-show="activeTab == index" class="img1920_600" :src="item.coverLinkUrl" alt="">
        </transition-group>

        <div v-for="(item, index) in carouselLinks" :key="item.id" class="carouse-item-container"
             @mouseover="carouseHover(index)" @click="handleDetail(item, index)">
            <div class="carouse-item-bg" :style="{'top': activeTab == index ? '0' : '100%'}">

            </div>
            <transition name="el-fade-in-linear">
            <div v-if="index == activeTab" class="carouse-item-container-content">
                <img class="desc-image" :src="item.coverLinkUrl2" alt="">
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['carouselLinks'],
        name: "portal-header-top-card-component",
        computed: {
            currentActiveItem() {
                return this.carouselLinks[this.activeTab] || {}
            },
        },
        data() {
            return {
                activeTab: 0,
            }
        },
        methods: {
            carouseHover(index) {
                this.activeTab = index
            },

            handleDetail(item,index) {
                let targetLinkUrl = this.carouselLinks[index].targetLinkUrl
                if (targetLinkUrl && targetLinkUrl.length) {
                    window.location.href = targetLinkUrl
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .container {
        @extends .dis-flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
    .img1920_600 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -2;
    }
    .carouse-item-container {
        @extends .flex, .flex-middle, .flex-center;
        color white
        position relative
    }
    .carouse-item-container-content {
        @extends .flex-column, .flex-middle, .flex-center;
        word-break break-all;
        padding 10px
        width 100%
        height 100%
    }
    .carouse-item-bg {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;

        background-image: linear-gradient(#d40313, #d40313), linear-gradient(#e60012, #e60012);
        background-blend-mode: normal, normal;
        opacity: 0.6;
        position absolute
        left: 0
        right: 0
        bottom: 0
        top: 100%
        z-index: -1
    }
    .desc-image {
        object-fit contain
        max-width 100%
        max-height 100%;
    }
</style>
