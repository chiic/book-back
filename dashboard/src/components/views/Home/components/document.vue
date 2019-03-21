<template>
  <div class="third-chart-wp">
    <div class="title">资源分布</div>
    <div ref="documents" class="document-chart"></div>
  </div>
</template>
<script>
import documentData from '../datas/document.js'
export default {
  name: 'document',
  mounted () {
    this.charts = this.$echarts.init(this.$refs.documents)
    this.charts.setOption(documentData)
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
    padding: 5px 20px;
  }
  .document-chart {
    width: 100%;
    height: 250px;
  }
</style>
