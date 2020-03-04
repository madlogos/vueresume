<template>
  <div class='block' id='skill' ref='skill'>
    <h2 id='title'>
      <i class='fas fa-briefcase' /><span class='title-h2'>{{ $t('title.talent') }}</span>
    </h2>
    <div id='canvas1' ref='canvas1'>
      <!-- <chart id='chart1' ref='chart1' :options='chartOptsBar' :auto-resize='true' /> // vue-echarts -->
      <!-- <div id='chart1' ref='chart1' style='width:100%;height:100%'></div> -->
      <BarChart></BarChart>
    </div>
    <div id='skills'>
      <span class='skill-tag-block' v-for='(i, _i) in this.$store.getters.skill' :key='_i'>
        <el-popover v-for='(j, _j) in i' :key='_j' trigger='hover' placement='top-start'>
          <el-card class='box-card' shadow='hover'>
            <div slot='header'><h3><i :class='j.fa'/><span class='title-h3'>{{ j.name }}</span></h3></div>
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
              <template v-if='j.p'>
                <p v-for='(k, _k) in j.p' :key='_k' v-html='k'></p>
              </template>
              <template v-if='j.ul'>
                <ul><li v-for='(m, _m) in j.ul' :key='_m' v-html='m'></li></ul>
              </template>
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
      </span>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/_BarChart'
import { parseTimeDif, formatTimeDif2 } from '@/utils/util'
export default {
  components: {
    BarChart
  },
  mounted () {
    // window.onresize = () => {
    //   return (() => {
    //     const newSize = this.resizeCanvas()
    //     this.$refs.canvas1.height = newSize.height
    //     this.$refs.canvas1.width = this.$refs.skill.clientWidth
    //   })()
    // }
  },
  computed: {
  },
  methods: {
    // resizeCanvas () {
    //   // resize Echarts canvas
    //   const maxHgt = 150
    //   let wdt = this.$refs.skill.clientWidth - 20 || 200
    //   let hgt = wdt / 2 > maxHgt ? maxHgt : wdt / 2
    //   return {'width': wdt, 'height': hgt}
    // },
    calcTimeDif (t0, t1) {
      /* calc time difference of t0 and t1
        return two parts with i18n */
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

<style lang='scss' scoped>
#skill {
  margin: $mar-lg $mar-sm $mar-lg $mar-md
}
h2 {
  color: $col-main-alt
}
.skill-tag-block {
  margin-right: $mar-md
}
#canvas1 {
  height: 140px
}
.el-card {
  text-align: left;
  word-break: normal;
  overflow-wrap: break-word;
  white-space: normal
}
.el-card__header h2 {
  color: $col-main
}
.el-card ul {
  font-size: $sm;
  line-height: $lh-md;
  padding: 0px 18px;
  list-style: none
}
.el-card li::before {
  content: "\2713";
  color: $col-info;
  display: inline-block;
  width: 1em;
  margin-left: -1.25em;
  margin-right: 0.25em
}
#skills {
  padding: 10px 0
}
#skills .el-tag {
  margin: 2px 3px;
  padding: 0 9px;
  font-size: $bs;
  border-style: none
}
#skills .el-tag:hover {
  color: $col-ok;
  background-color: $col-bg
}
.box-card {
  margin: -6px;
  width: $wdt-card
}
.el-popover {
  padding: 0
}
.appyear {
  font-size: $bs;
  font-weight: normal;
  float: right;
  color: $col-text
}
</style>
