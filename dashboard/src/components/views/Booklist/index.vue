<template>
  <div>
    <el-row :gutter="50" class="box-list-wrapper" type="flex" justify="center">
      <el-col :span="10" v-for="(item, index) in dataSet" :key="index">
        <el-card class="box-item">
          <div slot="header" class="clearfix">
            <span>{{item.key}}</span>
          </div>
            <el-table
              :data="item.datas.filter(data => !item.search || data.name.toLowerCase().includes(item.search.toLowerCase()))"
              height="249"
              style="width: 100%">
              <el-table-column prop="key" label="关键词"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column align="right">
                <template slot="header">
                  <el-input v-model="item.search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row, $event)">
                    <i class="el-icon-edit"></i></el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    <i class="el-icon-delete"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="fixed-menu">
      <div class="center" :class="{rotate: clickCenter}" @click="toggleCenterHandle">
        <img class="item-menu left-menu" src="/static/img/add_one.png" @click.stop="clickAdd">
        <img class="item-menu right-menu" src="/static/img/upload.png" @click.stop="uploadAdd">
      </div>
    </div>
    <el-dialog
      title="文件上传"
      :visible.sync="dialogVisible"
      width="30%">
      <span>文件上传格式必须为JSON文件</span>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        accept=".json"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import { bookList } from '@/service/bookService'
import { filterList } from '@/util/filterList'
export default {
  name: 'booklist',
  data () {
    return {
      dataSet: [],
      clickCenter: false,
      dialogVisible: false,
      fileList: []
    }
  },
  mounted () {
    bookList().then(
      res => {
        const filterData = filterList(res.data)
        const keys = Object.keys(filterData)
        const values = Object.values(filterData)
        const arr = []
        for (var i = 0; i < keys.length; i++) {
          arr.push({
            key: keys[i],
            search: '',
            datas: values[i]
          })
        }
        this.dataSet = arr
      }
    )
  },
  methods: {
    handleEdit (index, row, event) {
      this.$router.push(`/editor/${row._id}`)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    toggleCenterHandle () {
      this.clickCenter = !this.clickCenter
    },
    clickAdd () {
      this.$router.push('/addbook')
    },
    uploadAdd () {
      this.dialogVisible = true
    },
    handleChange (file, fileList) {
      console.log(file)
      this.fileList = fileList.slice(-3)
    }
  }
}
</script>
<style>
  .box-list-wrapper {
    margin-top: 40px;
    height: calc(100vh - 40px);
    flex-wrap: wrap;
  }
  .el-table td, .el-table th {
    text-align: center;
  }
  .box-item {
    margin-top: 20px;
  }
  .add-input-el {
    width: 70%;
    outline: 0;
    border: 1px solid #cccccc;
    padding: 4px 10px;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .fixed-menu {
    width: calc(100% - 150px);
    height: 50px;
    box-sizing: border-box;
    border-bottom: 10px solid #F56C6C;
    position: fixed;
    bottom: 0;
    right: 0;
  }
  .fixed-menu .center {
    width: 40px;
    height: 40px;
    margin: 20px auto 0;
    background:#F56C6C url('/static/img/add.png') no-repeat center center;
    border-radius: 20px;
    text-align: center;
    line-height: 20px;
    transition: all 0.5s;
    position: relative;
    cursor: pointer;
  }
  .fixed-menu .center .center-menu {
    position: absolute;
    top: 100%;
  }
  .fixed-menu .center.rotate {
    transform: rotate(180deg);
  }
  .item-menu {
    width: 20px;
    position: absolute;
    cursor: pointer;
    transition: 0.5s;
  }
  .item-menu.left-menu {
    left: -20px;
    top: 40px;
  }
  .item-menu.right-menu {
    right: -20px;
    top: 40px;
  }
  .item-menu:hover {
    transform: scale(1.2)
  }
</style>
