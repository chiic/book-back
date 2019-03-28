<template>
  <el-form ref="form_new_psd" :model="form" label-width="100px" :rules="rules">
    <el-form-item label="用户名">
      <div class="login-name">{{useraname}}</div>
    </el-form-item>
    <el-form-item label="输入新密码" prop="newpsd">
      <el-input v-model="form.newpsd" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="renewpsd">
      <el-input v-model="form.renewpsd" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
      <el-button @click="returnHome">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { changePsd, loginOut } from '@/service/auth'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'input-modify',
  data () {
    var repsdfn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newpsd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        newpsd: '',
        renewpsd: ''
      },
      rules: {
        newpsd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        renewpsd: [
          { required: true, validator: repsdfn, trigger: 'blur' }
        ]
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
    onSubmit () {
      this.$refs['form_new_psd'].validate(valid => {
        if (valid) {
          let data = cloneDeep(this.form)
          delete data.renewpsd
          changePsd(data).then(
            res => {
              if (res.data && res.data.update === 'success') {
                this.$message('修改成功,请重新登录')
                this.$refs['form_new_psd'].resetFields()
                loginOut().then(
                  res => {
                    this.$store.dispatch('dispatchStep', {num: 2}).then(
                      setTimeout(() => {
                        location.reload()
                      }, 2000)
                    )
                  }
                )
              }
            }
          )
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
  .login-name {
    color: #ffffff;
    font-size: 16px;
  }
</style>
