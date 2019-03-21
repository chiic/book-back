const option = {
  title: {
    text: '书籍收藏概览',
    textStyle: {
      fontSize: 12
    },
    padding: [5, 20]
  },
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['java', 'c/c++', 'javascript', 'python', 'go', '其他'],
    axisTick: {
      alignWithLabel: true
    }
  }],
  yAxis: [{
    type: 'value'
  }],
  series: [{
    name: '直接访问',
    type: 'bar',
    barWidth: '60%',
    data: [100, 52, 200, 334, 20, 30]
  }]
}

export default option
