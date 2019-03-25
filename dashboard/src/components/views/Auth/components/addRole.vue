<template>
  <div class="auth-add-wrapper">
    <el-form :model="formAdd" ref="form_add" :rules="rules" label-width="80px" class="form-auth-add">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formAdd.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psd">
        <el-input v-model="formAdd.psd" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repsd">
        <el-input v-model="formAdd.repsd" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleName">
        <el-select v-model="formAdd.roleName" placeholder="请选择角色类型">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="普通用户" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btn-wrapper">
        <el-button type="primary" @click="onSubmit" class="add-auth" plain>添加</el-button>
        <el-button type="primary" @click="onClose" class="add-auth" plain>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'add-role',
  data () {
    var repsdfn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.rules.psd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formAdd: {
        username: '',
        roleName: '',
        psd: '',
        repsd: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请选择角色类型', trigger: 'blur' }
        ],
        psd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        repsd: [
          { required: true, validator: repsdfn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeDialog () {
      this.$refs['form_add'].resetFields()
      this.$emit('FormVisible')
    },
    onSubmit () {
      this.$refs['form_add'].validate(valid => {
        if (valid) {
          // this.emit('changeRole', this.form)
        } else {
          return false
        }
      })
    },
    onClose () {
      this.$refs['form_add'].resetFields()
    }
  }
}
</script>
<style>
  .auth-add-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .el-button.add-auth {
    width: 40%;
    box-sizing: border-box;
  }
  .auth-add-wrapper .back {
    width: 100%;
    margin-bottom: 40px;
    padding-left: 30%;
    /* position: fixed;
    top: 20px;
    left: 300px; */
  }
  .auth-add-wrapper .btn-wrapper {
    text-align: center;
  }
  .form-auth-add {
    width: 40%;
  }
</style>
