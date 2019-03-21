const option = {
  backgroundColor: '#ffffff',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [{
      value: 335,
      name: '健康'
    },
    {
      value: 310,
      name: '亚健康'
    },
    {
      value: 100,
      name: '不健康'
    }].sort(function (a, b) { return a.value - b.value }),
    roseType: 'radius',
    label: {
      normal: {
        textStyle: {
          color: 'rgba(25, 20, 15, 0.7)'
        }
      }
    },
    labelLine: {
      normal: {
        lineStyle: {
          color: 'rgba(25, 20, 15, 0.7)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      }
    },
    itemStyle: {
      normal: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return Math.random() * 200
    }
  }]
}

export default option
