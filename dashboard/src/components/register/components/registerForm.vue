<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="register-form"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="psd">
      <el-input type="password" v-model="ruleForm.psd" autocomplete="new-password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPsd">
      <el-input type="password" v-model="ruleForm.checkPsd" autocomplete="new-password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
import { register } from '@/service/role'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPsd !== '') {
          this.$refs.ruleForm.validateField('checkPsd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.psd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        psd: '',
        checkPsd: '',
        email: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        psd: [{ validator: validatePass, trigger: 'blur' }],
        checkPsd: [{ validator: validatePass2, trigger: 'blur' }],
        email: [
          {type: 'email', trigger: 'blur', message: '请输入正确邮箱'},
          {required: true, message: '请输入邮箱'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { username, psd, email } = this.ruleForm
          register({username, psd, email}).then(
            res => {
              if (res.data && res.data.register === 'success') {
                this.$message('请查收邮箱进行验证')
                this.resetForm('ruleForm')
              }
            }
          )
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
  .register-form {
    width: 50%;
  }
  .register-form .el-button.el-button--primary {
    width: 100%;
  }
</style>
