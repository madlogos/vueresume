<template>
  <div class='block' id='edu' ref='edu'>
    <h2 id='title'>
      <i class='fas fa-user-graduate' />&nbsp;{{ this.$t('title.edu') }}
    </h2>
    <el-timeline id='tl' ref='tl' :reverse=true>
      <el-timeline-item
       v-for='(i, index) in data.edu'
       :key='index'
       :timestamp='i.from + " - " + i.till + " (" + calcTimeDif(i.from, i.till) + ")"'
       :icon='"el-icon-" + i.icon'
       :color='i.color'
       size='large'
       placement='top'
      >
        <div>
          <p class="title">
            <span class='cred'><i class='fas fa-graduation-cap' />&nbsp;<strong>{{ i.cred }}</strong>&emsp;</span>
            <span class='univ'><i class='fas fa-university' />&nbsp;{{ i.school }}&emsp;</span>
            <span class='major'><i class='fas fa-school' />&nbsp;{{ i.major }}</span>
          </p>
          <div class="body">
            <p class='rank'><i class='fas fa-trophy' />&nbsp;{{ i.rank }}</p>
            <p class='lesson'><i class='fas fa-book-open' />&nbsp;{{ i.lesson }}</p>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { parseTimeDif, formatTimeDif2 } from '@/utils/util'
export default {
  computed: {
    data: function () {
      let ret = JSON.parse(localStorage.getItem('myCv'))
      return ret[this.$i18n.locale]
    }
  },
  methods: {
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
#edu {
  margin: 20px 20px 40px 20px
}
h2 {
  color: #00A78E
}
#tl .el-card {
  padding: 10px
}
#tl .el-card__body {
  margin: 0;
  padding: 10px
}
.major, .univ, .rank {
  color: #888
}
.el-timeline {
  padding-left: 5px
}
</style>
