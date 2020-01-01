<template>
  <div class='block' id='skill' ref='skill'>
    <h2 id='title'>
      <i class='fas fa-briefcase' />&nbsp;{{ $t('title.talent') }}
    </h2>
    <div ref='canvas1'>
      <chart id='chart1' ref='chart1' :options='chartOptsBar' :auto-resize='true' />
    </div>
    <div id='skills'>
      <div v-for='(i, idxi) in data.skill' :key='idxi'>
        <el-popover v-for='(j, idxj) in i' :key='idxj' trigger='hover' placement='top-start'>
          <el-card class='box-card' shadow='hover'>
            <div slot='header'><h3><i :class='j.fa'/> {{ j.name }}</h3></div>
            <div>
              <h4>{{ $t('skill.proficiency') }}</h4>
              <span class='appyear'>{{ $tc('timespan.nyear', j.year) }}</span>
              <el-rate
                v-model="j.prof"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
              <h4>{{ $t('skill.description') }}</h4>
              <div v-if='j.p'>
                <p v-for='(k, idxk) in j.p' :key='idxk' v-html='k'></p>
              </div>
              <ul v-if='j.ul'>
                <li v-for='(m, idxm) in j.ul' :key='idxm' v-html='m'></li>
              </ul>
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
export default {
  data () {
    return {
      barColor: '#eee'
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        const maxHgt = 150
        let wdt = that.$refs.skill.clientWidth - 20 || 200
        let hgt = wdt / 2 > maxHgt ? maxHgt : wdt / 2
        that.$refs.chart1.resize({width: wdt, height: hgt})
        that.$refs.canvas1.height = hgt
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
.el-card__header h2 {
  color: #000
}
#chart1 {
  margin-left: 10px
}
.echarts {
  width: 100%;
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
