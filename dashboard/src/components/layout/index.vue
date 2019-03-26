<template>
  <div class="ly-wrapper">
    <div class="left">
      <nav-menu></nav-menu>
    </div>
    <div class="right">
      <el-dropdown trigger="click" class="title-top" @command="handleCommand">
        <span class="el-dropdown-link">
        {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-delete" command="loginout">登出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import NavMenu from '../views/NavMenu.vue'
import { mapGetters } from 'vuex'
import { loginOut } from '@/service/auth'
export default {
  name: 'layout',
  components: {
    NavMenu
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        loginOut().then(
          res => {
            if (res.data && res.data.success) {
              location.reload()
            }
          }
        )
      }
    }
  }
}
</script>
<style>
  .ly-wrapper {
    display: flex;
    overflow: hidden;
  }
  .ly-wrapper .left {
    height: 100vh;
    min-width: 150px;
    display: flex;
    background: #304156;
    align-items: center;
    overflow: hidden;
    color: #ffffff;
    border-right: 1px solid #cccccc;
  }
  .ly-wrapper .right {
    position: relative;
    overflow-x: hidden;
    width: calc(100% - 150px);
    height: 100vh;
    background: #eeeef3;
    overflow-y: auto;
  }
  .ly-wrapper .right .title-top {
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 20px;
    top:0;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
