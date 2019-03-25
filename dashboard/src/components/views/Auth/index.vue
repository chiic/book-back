<template>
  <div class="auth-wrapper">
    <div class="auth-add">
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="roleName | changeEn"
          label="角色">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="角色分配" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="formChange" ref="form" :rules="rules" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formChange.username" autocomplete="off" class="username-dialog"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleName">
            <el-select v-model="formChange.roleName" placeholder="请选择角色类型">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="普通用户" value="user"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('form')">取 消</el-button>
          <el-button type="primary" @click="changeRole('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoles, changeRole } from '@/service/role'
export default {
  name: 'auth-com',
  data () {
    return {
      tableData: [],
      formChange: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请选择角色类型', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
    }
  },
  methods: {
    handleEdit (index) {
      this.formChange = Object.assign({}, this.tableData.slice(index, index + 1)[0])
      this.dialogFormVisible = true
    },
    handleDelete (index) {},
    closeDialog () {
      this.$refs['form'].resetFields()
      this.dialogFormVisible = false
    },
    changeRole () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          changeRole(this.formChange).then(
            res => {
              if (res.data && res.data.success) {
                this.dialogFormVisible = false
                this.$message('修改成功')
                this.initRoles()
              }
            }
          )
        } else {
          return false
        }
      })
    },
    initRoles () {
      getRoles().then(res => {
        if (res.data) {
          this.tableData = res.data
        }
      })
    }
  },
  mounted () {
    this.initRoles()
  },
  filters: {
    changeEn (value) {
      switch (value) {
        case 'admin':
          return '管理员'
        case 'user':
          return '普通用户'
      }
    }
  }
}
</script>
<style>
  .auth-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    background: #ffffff;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .auth-wrapper .auth-add {
    width: 600px;
  }
  .el-select {
    width: 100%;
  }
  .add-role {
    margin-bottom: 20px;
  }
</style>
