<template>
  <div class="chart-main-wp">
    <div ref="charts1" class="chart-wrapper"></div>
    <div ref="charts2" class="chart-wrapper"></div>
  </div>
</template>
<script>
import dataOption1 from './data1'
import dataOption2 from './data2'
export default {
  name: 'home-chart',
  mounted () {
    const charts1 = this.$echarts.init(this.$refs.charts1)
    const charts2 = this.$echarts.init(this.$refs.charts2)
    charts1.setOption(dataOption1)
    charts2.setOption(dataOption2)
  }
}
</script>
<style>
.chart-main-wp {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
@media screen and (min-width: 1025px) {
  .chart-wrapper {
    width: 800px;
    height: 400px;
  }
}

@media screen and (max-width: 1024px) {
  .chart-wrapper {
    width: 600px;
    height: 400px;
  }
}

</style>
