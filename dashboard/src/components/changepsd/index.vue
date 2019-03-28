<template>
  <div style="width:100%;height: 100vh;background: #7d7e88;">
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
    width: 600px;
    height: 100vh;
    margin: 0 auto;
    padding: 100px 0;
  }
  .modify-wrapper .el-form-item__label {
    color: #ffffff;
  }
</style>
