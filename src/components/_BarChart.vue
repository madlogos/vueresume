<template>
  <div :id='this.chartId' class='echart' style='width:95%;height:100%'></div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts' // basic template
import 'echarts/lib/chart/bar' // chart components
import 'echarts/lib/component/tooltip' // other components
export default {
  name: 'BarChart',
  data () {
    return {
      barColor: '#eee',
      chartId: 'bar-chart',
      chartObj: {}
    }
  },
  created: function () {
    this.chartId += '-' + Number(new Date())
  },
  mounted () {
    this.chartObj = echarts.init(document.getElementById(this.chartId))
    this.chartObj.setOption(this.chartOptsBar)
    window.onresize = () => {
      return (() => {
        this.chartObj.resize()
      })()
    }
  },
  watch: {
    data: function (newVal, oldVal) {
      this.chartObj.setOption(this.chartOptsBar)
    }
  },
  computed: {
    data: function () {
      return this.$store.getters.talent
    },
    chartOptsBar: function () {
      const dat = this.data
      var y = []
      var ys = []
      var x = []
      var yc = []
      for (var i = 0; i < dat.length; i++) {
        x.push(dat[i].name)
        y.push(dat[i].value)
        ys.push(Array(dat.length))
        ys[i][i] = dat[i].value
        yc.push(100)
      }
      const serTmpl = {
        type: 'bar',
        label: {
          show: true,
          position: 'insideLeft',
          color: '#00A78E',
          formatter: '{b}',
          fontSize: 14,
          fontWeight: 'normal'
        },
        itemStyle: {
          color: this.barColor,
          barBorderRadius: [0, 25, 25, 0]
        },
        emphasis: {
          label: {
            show: true,
            position: 'insideLeft',
            formatter: '{b}: {c}',
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {color: '#67C23A'}
        },
        tooltip: {
          formatter: '{a}'
        },
        barWidth: '80%',
        barGap: '-100%',
        barCategoryWidth: '20%',
        anamation: true
      }
      var opt = {
        grid: {
          top: 0,
          bottom: '10%',
          left: 0,
          right: 0
        },
        xAxis: {
          type: 'value',
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: false},
          splitLine: {show: false}
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: x,
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: false}
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        series: [
          {
            type: 'bar',
            data: yc,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.1)',
                barBorderRadius: [0, 25, 25, 0]
              }
            },
            tooltip: {
              show: false
            },
            barGap: '-100%',
            barWidth: '75%',
            barCategoryWidth: '20%'
          }
        ]
      }
      for (i = 0; i < dat.length; i++) {
        let tmp = serTmpl
        tmp.name = dat[i].tip
        tmp.data = ys[i]
        // not familiar with closure, so use this
        opt.series.push(JSON.parse(JSON.stringify(tmp)))
      }
      return opt
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echart {
  margin-left: 10px
}
</style>
