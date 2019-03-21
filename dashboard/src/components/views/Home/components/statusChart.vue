<template>
  <div class="second-chart-wp">
    <div class="title">健康状态</div>
    <div class="btn-tile"></div>
    <div class="pip-wp-second" ref="pie-second">
    </div>
  </div>
</template>
<script>
import pieData from '../datas/pie2'
export default {
  name: 'pip-chart',
  mounted () {
    this.charts = this.$echarts.init(this.$refs['pie-second'])
    this.charts.setOption(pieData)
  },
  data () {
    return {
      charts: null
    }
  }
}
</script>
<style>
  .second-chart-wp {
    width: 100%;
    height: 100%;
  }
  .second-chart-wp .title {
    height: 20px;
    text-align: left;
    padding: 5px 20px;
  }
  .pip-wp-second {
    width: 100%;
    height: 250px;
  }
</style>
