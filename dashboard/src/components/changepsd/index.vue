<template>
  <div style="width:100%;height: 100vh;">
    <div class="change-title-wp">
      <div class="title-change">
        <img src="/static/img/lock.png" alt="">
        <span style="font-size: 12px;color: #ffffff;">密码中心</span>
      </div>
    </div>
    <div class="modify-wrapper">
      <el-steps :active="getStepNum" finish-status="success" align-center>
        <el-step title="人机验证"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="设置完成"></el-step>
      </el-steps>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'modify-com',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'getStepNum'
    ])
  }
}
</script>
<style>
  .modify-wrapper {
    width: 1000px;
    margin: 0 auto;
    background: #f9f9f9;
    margin-top: 60px;
    padding: 20px 50px;
  }
  /* .modify-wrapper .el-form-item__label {
    color: #ffffff;
  } */
  .change-title-wp {
    height: 60px;
    line-height: 60px;
    width: 100%;
    background: #363636;
  }
  .change-title-wp .title-change {
    width: 1000px;
    margin: auto;
  }
  .change-title-wp .title-change img {
    vertical-align: middle;
  }
</style>
