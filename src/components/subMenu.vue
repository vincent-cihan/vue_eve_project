<template>
  <el-submenu :index="item.href" v-if="item.children && item.children.length>0" class="el-menu-sub">
    <template slot="title"><i :class="item.icon" style="margin-right: 5px;display: flex; align-items: center;"></i>{{item.name}}<div v-if="item.showBadge" style="background-color: red; font-size: 10px; margin-left: 5px; width: 10px; height: 10px; border-radius: 50%;"></div></template>
    <template v-for="child in item.children">
      <sub-menu v-if="child.children && child.children.length>0" :param="child"></sub-menu>
      <el-menu-item :index="child.href" v-else><i :class="child.icon" style="margin-right: 5px;"></i>{{child.name}}</el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item :index="item.href" v-else class="el-menu-each" style="display: flex; align-items: center;"><i :class="item.icon" style="margin-right: 5px;"></i>{{item.name}}<div v-if="item.showBadge" style="background-color: red; font-size: 10px; margin-left: 5px; width: 10px; height: 10px; border-radius: 50%;"></div></el-menu-item>
</template>
<script>
  import subMenu from "./subMenu.vue"

  export default {
    name: 'subMenu',
    props: ['param'],
    data: function () {
      return {item: this.param}
    },
    components: {
      subMenu
    }
  }
</script>
<style lang="stylus" scoped>
  .el-menu .fa {
    margin-right: 10px;
  }
</style>
