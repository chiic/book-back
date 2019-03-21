<template>
  <el-menu class="el-menu-vertical-nav"
    background-color="#304156"
    @select="select" :default-active="index">
    <el-menu-item index="0">
      <i class="el-icon-location"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">书籍添加</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-document"></i>
      <span slot="title">书籍列表</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">电影爬虫</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">权限管理</span>
    </el-menu-item>
    <el-menu-item index="5">
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
      index: '0',
      menuPath: [
        '/',
        '/addbook',
        '/booklist',
        '/movie',
        '/auth',
        '/plugin'
      ]
    }
  },
  mounted () {
    const path = this.$route.path
    this.index = (this.menuPath.findIndex((i) => {
      return i === path
    })).toString()
  },
  methods: {
    select (key, keyPath) {
      this.$router.push(this.menuPath[key])
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
  .el-menu-item {
    color: #ffffff;
  }
  .el-menu-item.is-active {
    color: #f16d79;
  }
</style>
