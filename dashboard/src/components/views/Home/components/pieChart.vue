<template>
  <div class="first-chart-wp">
    <div class="title">安全概况</div>
    <div class="pip-wp">
      <div class="pie">
        <div class="inner-pie">90%</div>
      </div>
      <div class="level-safe">健康</div>
    </div>
    <table style="width: 100%" class="first-chart-table">
      <thead>
        <th style="width:50%">项目名称</th>
        <th>危险值</th>
      </thead>
      <tbody>
        <tr>
          <td>物理磁盘</td>
          <td>20G</td>
        </tr>
        <tr>
          <td>文件数量</td>
          <td>200</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// import pieData from '../datas/pie'
export default {
  name: 'pip-chart',
  mounted () {
  },
  data () {
    return {
      chart: null
    }
  }
}
</script>
<style>
  .first-chart-wp {
    width: 100%;
    height: 100%;
  }
  .first-chart-wp .title {
    height: 20px;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    padding: 5px 20px;
  }
  .pip-wp {
    display: flex;
    padding: 10px;
    justify-content: space-around;
    align-items: center;
    font-family: 'Times New Roman', Times, serif;
    color: #ffffff;
    font-weight: bold;
  }
  .pip-wp .pie {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    line-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(204, 145, 79);
    cursor: pointer;
    transition: all 0.5s;
  }
  .pip-wp .pie:hover {
    transform: scale(1.1)
  }
  .pip-wp .pie .inner-pie {
    width: 90px;
    height: 90px;
    border-radius: 45px;
    line-height: 90px;
    text-align: center;
    font-size: 30px;

    background: rgb(129, 54, 31);
  }
  .level-safe {
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: rgb(204, 145, 79);
  }
  .first-chart-table {
    width: 100%;
    color: #2c2b2b;
    font-size: 12px;
  }
  .first-chart-table th {
    border-bottom: 1px solid #888888;
    height: 40px;
  }
  .first-chart-table td {
    padding: 5px 0;
  }
</style>
