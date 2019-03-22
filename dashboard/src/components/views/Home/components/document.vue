<template>
  <div class="third-chart-wp">
    <div class="title">书籍推荐</div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="name"
        width="250"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="catalog"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="rotate"
        label="评分">
      </el-table-column>
    </el-table>
    <el-button
      @click="goToList"
      type="text" style="position: absolute;right: 20px;">查看更多</el-button>
  </div>
</template>
<script>
export default {
  name: 'document',
  mounted () {
  },
  data () {
    return {
      tableData: [{
        name: 'Javascript高级程序设计',
        catalog: 'Javascript',
        rotate: 9.3
      }, {
        name: 'Spring揭秘',
        catalog: 'Java',
        rotate: 9.1
      }, {
        name: 'Go程序设计语言',
        catalog: 'go',
        rotate: 9.1
      }, {
        name: '像计算机科学家一样思考python',
        catalog: 'python',
        rotate: 8.6
      }]
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    goToList () {
      this.$router.push('/booklist')
    }
  }
}
</script>
<style>
  .third-chart-wp {
    width: 100%;
    height: 100%;
  }
  .third-chart-wp .title {
    height: 20px;
    text-align: left;
    font-size: 12px;
    font-weight: bold;
    padding: 5px 20px;
  }
  .document-chart {
    width: 100%;
    height: 250px;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .cell {
    white-space: nowrap;
  }
  .el-table td, .el-table th {
    text-align: center;
  }
</style>
