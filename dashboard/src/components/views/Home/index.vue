<template>
  <el-row class="chart-main-wp" :gutter="20">
    <el-col :xs="24" :sm="24" :lg="24">
      <title-component></title-component>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12">
      <div ref="charts1" class="chart-wrapper"></div>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12">
      <div ref="charts2" class="chart-wrapper"></div>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="24">
      <div ref="charts3" class="chart-wrapper"></div>
    </el-col>
  </el-row>
</template>
<script>
// chart 数据
import dataOption1 from './data1'
import dataOption2 from './data2'
import dataOption3 from './data3'
import TitleComponent from './components/title.vue'
export default {
  name: 'home-chart',
  components: {
    TitleComponent
  },
  data () {
    return {
      charts1: null,
      charts2: null,
      charts3: null
    }
  },
  mounted () {
    const _this = this
    _this.initChart()
    window.onresize = function () {
      _this.resertChart()
    }
  },
  methods: {
    initChart () {
      this.charts1 = this.$echarts.init(this.$refs.charts1)
      this.charts2 = this.$echarts.init(this.$refs.charts2)
      this.charts3 = this.$echarts.init(this.$refs.charts3)
      this.charts1.setOption(dataOption1)
      this.charts2.setOption(dataOption2)
      this.charts3.setOption(dataOption3)
    },
    resertChart () {
      this.charts1.resize()
      this.charts2.resize()
      this.charts3.resize()
    }
  }
}
</script>
<style>
  .chart-main-wp {
    padding: 20px;
  }
  .chart-main-wp .chart-wrapper {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 2px 2px #cccccc;
    height: 300px;
    margin: 20px 0;
  }
</style>
