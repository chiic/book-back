<template>
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
              <template slot="header" slot-scope="scope">
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
</template>
<script>
import { bookList } from '@/service/bookService'
import { filterList } from '@/util/filterList'
export default {
  name: 'booklist',
  data () {
    return {
      dataSet: []
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
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style>
  .box-list-wrapper {
    margin-top: 40px;
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
</style>
