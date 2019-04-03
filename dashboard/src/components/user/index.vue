<template>
  <div class="user-wrapper-application">
    <div class="title-wrapper">
      <div class="title-user">
        <div class="title-left">
          <img src="/static/img/shild.png" alt="">
          安全中心
        </div>
        <div class="title-right">
          <div v-if="userName">
            {{userName}}
            <!-- <el-button type="text" @click="loginOut">登出</el-button> -->
            <el-dropdown trigger="click" class="title-top" @command="handleCommand">
              <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-delete" command="loginout">登出</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit-outline" command="back">返回首页</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <!-- <el-button type="text" @click="loginIn">登录</el-button> -->
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { loginOut } from '@/service/auth'
export default {
  name: 'user-application',
  data () {
    return {
      imgData: ''
    }
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  },
  methods: {
    loginOut () {
      loginOut().then(
        res => {
          this.$message('登出成功')
          setTimeout(() => {
            location.reload()
          }, 1000)
        }
      )
    },
    handleCommand (command) {
      if (command === 'loginout') {
        this.loginOut()
      }
      if (command === 'back') {
        this.$router.push('/')
      }
    }
  }
}
</script>
<style>
  .user-wrapper-application {
    width: 100%;
  }
  .user-wrapper-application .title-wrapper {
    width: 100%;
    background: #363636;
  }
  .user-wrapper-application .title-user {
    width: 1000px;
    height: 60px;
    line-height: 60px;
    margin: auto;
    color: #ffffff;
  }
  .title-left img {
    vertical-align: middle;
  }
  .title-left {
    float: left;
    top: 0;
  }
  .title-right {
    float: right;
    top: 0;
  }
  .title-right .el-button--text {
    color: #ffffff;
  }
  .title-right .el-icon-arrow-down:before {
    color: #ffffff;
  }
</style>
