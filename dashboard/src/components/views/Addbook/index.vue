<template>
  <div class="add-book-wrapper">
    <el-form :label-position="labelPosition"
      class="form-add"
      ref="bookForm"
      :rules="rules"
      label-width="80px"
      :model="formLabelAlign">
      <el-form-item label="图片地址" placeholder="图片地址" prop="img">
        <el-input v-model="formLabelAlign.img"></el-input>
      </el-form-item>
      <el-form-item label="名称" placeholder="名称" prop="name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="下载地址" placeholder="下载地址" prop="url">
        <el-input v-model="formLabelAlign.url"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="key">
        <el-select v-model="formLabelAlign.key" placeholder="关键词">
          <el-option label="c/c++" value="c/c++"></el-option>
          <el-option label="java" value="java"></el-option>
          <el-option label="javascript" value="js"></el-option>
          <el-option label="python" value="python"></el-option>
          <el-option label="go" value="go"></el-option>
          <el-option label="其他" value="other"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btn-wrapper">
        <el-button type="primary" @click="onSubmit('bookForm')" plain class="add">添加</el-button>
        <el-button type="warning" @click="resetForm('bookForm')" plain class="add">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { addBook, getbook, changeBook } from '@/service/bookService.js'
export default {
  data () {
    return {
      labelPosition: 'top',
      iseditor: false,
      formLabelAlign: {
        img: '',
        name: '',
        url: '',
        key: ''
      },
      rules: {
        img: [
          { required: true, message: '请输入图片地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入下载地址', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请选择关键词', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (bookForm) {
      this.$refs[bookForm].validate(valid => {
        if (valid) {
          if (!this.iseditor) {
            addBook(this.formLabelAlign).then(
              res => {
                if (res.data && res.data.success) {
                  this.$message('添加成功')
                  this.resetForm(bookForm)
                  this.$router.push('/booklist')
                }
              }
            )
          } else {
            changeBook(this.formLabelAlign).then(
              res => {
                if (res.data && res.data.success) {
                  this.$message('更新成功')
                  this.resetForm(bookForm)
                  this.$router.push('/booklist')
                }
              }
            )
          }
        } else {
          return false
        }
      })
    },
    resetForm (bookForm) {
      this.$refs[bookForm].resetFields()
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.id) {
      this.iseditor = true
      getbook(this.$route.params.id).then(
        res => {
          this.formLabelAlign = res.data
        }
      )
    }
  }
}
</script>
<style>
  .add-book-wrapper {
    width: 400px;
    height: 100vh;
    display: flex;
    align-items: center;
    margin: 40px auto 0;
  }
  .add-book-wrapper .form-add {
    width: 100%;
  }
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .el-select {
    width: 100%;
  }
  .el-button.add {
    width: 40%;
  }
  .el-button+.el-button {
    margin-left: 0;
  }
  .btn-wrapper {
    text-align: center;
  }
</style>
