<template>
  <div class="chart-main-wp">
    <el-row :gutter="20">
      <el-col :xs="10" :sm="10" :md="10" :lg="7">
        <div class="grid-content bg-purple">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="10" :sm="10" :md="10" :lg="7">
        <div class="grid-content bg-purple-light">
          <status-chart></status-chart>
        </div>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="10">
        <div class="grid-content bg-purple">
          <document-chart></document-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="12">
        <weather-wp></weather-wp>
      </el-col>
      <el-col :span="12">
        <book-over></book-over>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// chart 数据
import pieChart from './components/pieChart'
import statusChart from './components/statusChart'
import documentChart from './components/document'
import weatherWp from './components/weather'
import bookOver from './components/bookOver'
export default {
  name: 'home-chart',
  components: {
    pieChart,
    statusChart,
    documentChart,
    weatherWp,
    bookOver
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style>
  .chart-main-wp {
    padding: 40px 60px;
  }
  .chart-main-wp .chart-wrapper {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 2px 2px #cccccc;
    height: 300px;
    margin: 20px 0;
  }
  .grid-content {
    height: 300px;
    position: relative;
    text-align: center;
    background: #ffffff;
    font-family: 'Times New Roman', Times, serif;
    box-shadow: 0 1px 1px 1px #cccccc;
  }
  .grid-content a {
    display: block;
    text-decoration: none;
    height: 100%;
    width: 100%;
  }
  .grid-content img {
    position: absolute;
    top: 26px;
    left: 20px;
    -webkit-filter: grayscale(50%);
    filter: grayscale(50%);
    transition: all 0.5s;
  }
  .grid-content:hover {
    box-shadow: 0 1px 1px 1px #cccccc;
  }
  .grid-content:hover img {
    -webkit-filter: grayscale(0%);
    filter: grayscale(0%);
  }
</style>
