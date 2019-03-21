<template>
  <el-row :gutter="20">
    <el-col :span="8" v-for="item in itemArr" :key="item.url">
      <div class="grid-content bg-purple">
        <img :src="'/static/img/' + item.url" width="48" height="48" alt="">
        <span>{{item.title}}</span>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'title-com',
  data () {
    return {
      itemArr: [
        {title: '天气', url: 'sunny.png'},
        {title: '团队', url: 'team.png'},
        {title: '设置', url: 'setting.png'}
      ]
    }
  }
}
</script>
<style>
  .grid-content {
    height: 100px;
    position: relative;
    line-height: 100px;
    border-radius: 4px;
    text-align: center;
    font-size: 25px;
    font-family: 'Times New Roman', Times, serif;
    box-shadow: 0 1px 1px 1px #cccccc;
    cursor: pointer;
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
