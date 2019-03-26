<template>
  <el-menu class="el-menu-vertical-nav"
    background-color="#304156"
    @select="select" :default-active="$route.path">
    <template v-for="item in getRoutesmapChildren">
      <template v-if="item.children && item.children.length > 0">
        <el-submenu :index="`/${item.path}`" :key="item.menuname">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{item.menuname}}</span>
          </template>
          <el-menu-item v-for="i in item.children"
            :index="`/${item.path}/${i.path}`"
            :key="i.menuname">{{i.menuname}}</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="`/${item.path}`" :key="item.menu">
          <i class="el-icon-document"></i>
          <span slot="title">{{item.menuname}}</span>
        </el-menu-item>
      </template>
    </template>
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
  computed: {
    getRoutesmapChildren () {
      return this.$store.getters.getRoutesmap[0].children
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
