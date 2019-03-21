const option = {
  legend: {
    data: ['白天温度', '夜晚温度']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['今天', '明天', '后天', '大后天']
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 'dataMin'
    }
  ],
  series: [
    {
      name: '白天温度',
      type: 'line',
      areaStyle: {
        color: '#aed4c2'
      },
      data: [0, 0, 0, 0]
    },
    {
      name: '夜晚温度',
      type: 'line',
      areaStyle: {
        color: '#dda38f'
      },
      data: [0, 0, 0, 0, 0]
    }
  ]
}

export default option
