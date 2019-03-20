<template>
  <div class="lg-wrapper">
    <el-form
      :model="Form"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <embed class="icon-input user" src="/static/img/user.svg" />
        <el-input v-model="Form.username"></el-input>
      </el-form-item>
      <el-form-item prop="psd">
        <embed class="icon-input user" src="/static/img/password.svg" />
        <el-input v-model="Form.psd" type="password"></el-input>
      </el-form-item>
      <el-form-item class="form-btn-el">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      Form: {
        username: '',
        psd: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        psd: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:3001/api/back/login', this.Form)
            .then(res => {
              if (res.data.login === 'islogin') {
                this.$router.push('/')
              }
            })
            .catch(err => {
              if (err.response && err.response.status === 403) {
                this.$message({
                  showClose: true,
                  message: '请输入正确的用户名和密码！',
                  type: 'error'
                })
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scope>
.lg-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  background: #323a4d;
  justify-content: center;
  align-items: center;
}
.lg-wrapper .el-form-item {
  border: 1px solid #eeeeee;
  border-radius: 4px;
  width: 350px;
  height: 40px;
}
.lg-wrapper .icon-input {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 12px;
  left: 5%;
}
.lg-wrapper .el-input {
  width: 80%;
  background: transparent;
  margin: auto 10%;
}
.lg-wrapper .el-input input {
  background: transparent;
  border: 0;
  color: #ffffff;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
.lg-wrapper .form-btn-el {
  border: 0;
}
.lg-wrapper .form-btn-el button {
  width: 100%;
}
</style>
