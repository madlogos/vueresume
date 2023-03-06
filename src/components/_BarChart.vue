<template>
  <div :id='this.chartId' class='echart' style='width:95%;height:100%'></div>
</template>

<script>
import styCol from '@/styles/_color.scss'
import stySiz from '@/styles/_size.scss'
import echarts from 'echarts'
// import * as echarts from 'echarts/lib/echarts' // basic template
// import 'echarts/lib/chart/bar' // chart components
// import 'echarts/lib/component/tooltip' // other components
export default {
  name: 'BarChart',
  data () {
    return {
      barColor: styCol.mainColorAlt,
      themeColor: styCol.themeColor,
      hoverColor: styCol.hoverColor,
      baseSize: stySiz.baseSize,
      regularSize: stySiz.regularSize,
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
  destroyed () {
    window.onresize = null
  },
  watch: {
    data: function () {
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
          color: this.themeColor,
          formatter: '{b}',
          fontSize: parseInt(this.baseSize),
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
            fontSize: parseInt(this.regularSize),
            fontWeight: 'bold'
          },
          itemStyle: {color: this.hoverColor}
        },
        tooltip: {
          formatter: '{a}',
          textStyle: {fontSize: parseInt(this.baseSize)}
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
          trigger: 'item',
          extraCssText: 'width:300px; white-space:pre-wrap',
          position: ['0%', 125]
        },
        series: [
          {
            type: 'bar',
            data: yc,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.1)',
                barBorderRadius: [0, 20, 20, 0]
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
<style lang='scss' scoped>
.echart {
  margin-left: $mar-sm
}
</style>
