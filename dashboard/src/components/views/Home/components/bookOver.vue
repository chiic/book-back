<template>
  <div class="book-wp">
    <div ref="books" class="books-chart"></div>
  </div>
</template>
<script>
import documentData from '../datas/document.js'
export default {
  name: 'book-wp',
  mounted () {
    this.charts = this.$echarts.init(this.$refs.books)
    this.charts.setOption(documentData)
  }
}
</script>
<style>
  .book-wp {
    width: 100%;
    height: 400px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 2px #cccccc;
  }
  .books-chart {
    width: 100%;
    height: 100%;
  }
</style>
