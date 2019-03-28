<template>
  <el-form ref="form_new_psd" :model="form" label-width="100px">
    <el-form-item label="用户名">
      <div class="login-name">{{useraname}}</div>
    </el-form-item>
    <el-form-item label="输入新密码">
      <el-input v-model="form.newpsd" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="form.renewpsd" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
      <el-button @click="returnHome">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'input-modify',
  data () {
    return {
      form: {
        newpsd: '',
        renewpsd: ''
      }
    }
  },
  mounted () {
  },
  computed: {
    useraname () {
      return this.$store.state.userName
    }
  },
  methods: {
    returnHome () {
      this.$router.push('/')
    },
    onSubmit () {}
  }
}
</script>
<style>
  .login-name {
    color: #ffffff;
    font-size: 16px;
  }
</style>
