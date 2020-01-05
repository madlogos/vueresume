<template>
  <div class='block' id='skill' ref='skill'>
    <h2 id='title'>
      <i class='fas fa-briefcase' />&nbsp;{{ $t('title.talent') }}
    </h2>
    <div id='canvas1' ref='canvas1'>
      <!-- <chart id='chart1' ref='chart1' :options='chartOptsBar' :auto-resize='true' /> // vue-echarts -->
      <div id='chart1' ref='chart1' style='width:100%;height:100%'></div>
    </div>
    <div id='skills'>
      <div v-for='(i, _i) in data.skill' :key='_i'>
        <el-popover v-for='(j, _j) in i' :key='_j' trigger='hover' placement='top-start'>
          <el-card class='box-card' shadow='hover'>
            <div slot='header'><h3><i :class='j.fa'/> {{ j.name }}</h3></div>
            <div>
              <h4>{{ $t('skill.proficiency') }}</h4>
              <span class='appyear'>{{ calcTimeDif(j.from, j.thru) }}</span>
              <el-rate
                v-model="j.prof"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
              <h4>{{ $t('skill.description') }}</h4>
              <div v-if='j.p'>
                <p v-for='(k, _k) in j.p' :key='_k' v-html='k'></p>
              </div>
              <div v-if='j.ul'>
                <ul><li v-for='(m, _m) in j.ul' :key='_m' v-html='m'></li></ul>
              </div>
            </div>
          </el-card>
          <el-tag
            effect='dark'
            type='info'
            :hit=false
            :size='j.size'
            :color='"rgba(0, 0, 0, " + j.alpha + ")"'
            slot='reference'
          >{{ j.name }}</el-tag>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTimeDif, formatTimeDif2 } from '@/utils/util'
import * as echarts from 'echarts/lib/echarts' // basic template
import 'echarts/lib/chart/bar' // chart components
import 'echarts/lib/component/tooltip' // other components
export default {
  data () {
    return {
      barColor: '#eee'
    }
  },
  mounted () {
    const chartObj = echarts.init(document.getElementById('chart1'))
    chartObj.setOption(this.chartOptsBar, this.resizeCanvas())
    window.onresize = () => {
      return (() => {
        const newSize = this.resizeCanvas()
        chartObj.resize(newSize)
        this.$refs.canvas1.height = newSize.height
      })()
    }
  },
  computed: {
    data: function () {
      let ret = JSON.parse(localStorage.getItem('myCv'))
      return ret[this.$i18n.locale]
    },
    chartOptsBar: function () {
      const dat = this.data.talent
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
        barWidth: '75%',
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
  },
  methods: {
    resizeCanvas () {
      // resize Echarts canvas
      const maxHgt = 150
      let wdt = this.$refs.skill.clientWidth - 20 || 200
      let hgt = wdt / 2 > maxHgt ? maxHgt : wdt / 2
      return {'width': wdt, 'height': hgt}
    },
    calcTimeDif (t0, t1) {
      const d = parseTimeDif(t0, t1)
      const f = {
        'y': this.$tc('timespan.nyear', d['y']),
        'm': this.$tc('timespan.nmonth', d['m']),
        'd': this.$tc('timespan.nday', d['d']),
        'h': this.$tc('timespan.nhour', d['h']),
        'n': this.$tc('timespan.nminute', d['n']),
        's': this.$tc('timespan.nsecond', d['s'])
      }
      const sep = this.$t('timespan.sep')
      return formatTimeDif2(d, f, sep)
    }
  }
}
</script>

<style scoped>
#skill {
  margin: 40px 20px
}
h2 {
  color: #eee
}
.el-card {
  text-align: left;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal
}
.el-card__header h2 {
  color: #303133
}
.el-card ul {
  font-size: 12px;
  line-height: 1.5em;
  padding: 0 18px
}
#chart1 {
  margin-left: 10px
}
#canvas1 {
  height: 150px;
}
#skills {
  padding: 10px 0
}
#skills .el-tag {
  margin: 2.5px 5px;
  font-size: 14px;
  border-style: none
}
#skills .el-tag:hover {
  font-size: 16px;
  font-weight: bold
}
.box-card {
  margin: -6px;
  width: 320px
}
.el-popover {
  padding: 0
}
.appyear {
  font-size: 14px;
  font-weight: normal;
  float: right;
  color: #666
}
</style>
