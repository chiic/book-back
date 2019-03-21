const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['硬盘', '网卡', '虚拟', '端口']
  },
  calculable: true,
  series: [
    {
      name: '半径模式',
      type: 'pie',
      radius: [20, 80],
      center: ['50%', '50%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        { value: 10, name: '硬盘' },
        { value: 5, name: '网卡' },
        { value: 15, name: '虚拟' },
        { value: 25, name: '端口' }
      ]
    }
  ]
}

export default option
