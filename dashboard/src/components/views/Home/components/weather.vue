<template>
  <div class="weather-wp">
    <div class="is-at-city">您当前所在城市为：{{currentCity}}</div>
    <div class="weather-chart" ref="weather"></div>
  </div>
</template>
<script>
import AMap from 'AMap'
import weatherData from '../datas/weather'
export default {
  name: 'weather-wp',
  mounted () {
    const _this = this
    AMap.plugin('AMap.CitySearch', function () {
      const citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          _this.currentCity = result.city
          AMap.plugin('AMap.Weather', function () {
            const weather = new AMap.Weather()
            weather.getForecast(result.city, function (err, data) {
              if (!err) {
                _this.forecasts = data.forecasts
              }
            })
          })
        }
      })
    })
  },
  data () {
    return {
      currentCity: '',
      forecasts: [],
      charts: null
    }
  },
  methods: {
    initWeather (options) {
      this.charts = this.$echarts.init(this.$refs.weather)
      this.charts.setOption(options)
    }
  },
  watch: {
    forecasts (val) {
      for (let i = 0; i < val.length; i++) {
        weatherData.series[0].data[i] = val[i].dayTemp
        weatherData.series[1].data[i] = val[i].nightTemp
      }
      this.initWeather(weatherData)
    }
  }
}
</script>
<style>
  .weather-wp {
    width: 100%;
    height: 400px;
    box-shadow: 0 2px 2px 2px #cccccc;
    padding: 10px;
    box-sizing: border-box;
  }
  .weather-wp .is-at-city {
    font-size: 12px;
  }
  .weather-wp .weather-chart {
    width: 100%;
    height: 350px;
  }

</style>
