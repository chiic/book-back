<template>
  <el-menu class="el-menu-vertical-nav"
    background-color="#304156"
    @select="select" :default-active="$route.path">
    <el-menu-item index="/">
      <i class="el-icon-location"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/addbook">
      <i class="el-icon-menu"></i>
      <span slot="title">书籍添加</span>
    </el-menu-item>
    <el-menu-item index="/booklist">
      <i class="el-icon-document"></i>
      <span slot="title">书籍列表</span>
    </el-menu-item>
    <el-menu-item index="/movie">
      <i class="el-icon-document"></i>
      <span slot="title">电影爬虫</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/auth">管理首页</el-menu-item>
      <el-menu-item index="/auth/add">添加用户</el-menu-item>
    </el-submenu>
    <el-menu-item index="/plugin">
      <i class="el-icon-star-on"></i>
      <span slot="title">插件</span>
    </el-menu-item>
</el-menu>
</template>
<script>
export default {
  name: 'home',
  props: ['isCollapse'],
  data () {
    return {
    }
  },
  methods: {
    select (key, keyPath) {
      this.$router.push(key)
    }
  }
}
</script>
<style>
  .el-menu-vertical-nav {
    width: 150px;
  }
  .el-menu {
    border-right: 0;
  }
  .el-menu-item, .el-submenu__title {
    color: #ffffff !important;
  }
  .el-menu-item.is-active {
    color: #d1969b !important;
  }

</style>
