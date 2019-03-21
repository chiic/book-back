<template>
  <div class="third-chart-wp">
    <div class="title">资源分布</div>
    <div ref="documents" class="document-chart"></div>
  </div>
</template>
<script>
export default {
  name: 'document',
  mounted () {
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
</style>
