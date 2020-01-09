<template>
  <div class='block' id='portrait'>
    <el-avatar :size='100' @error='errorHandler'>
      <img src='@/assets/logo.png' />
    </el-avatar>
    <h1>{{ dec(data.name) }}</h1>
    <p id='baseInfo'>
      <span class="gender-info"><i :class='data.gender.fa' /><span class='info-left'>{{ data.gender.value }}</span></span>
      <span class="dob-info"><i :class='data.dob.fa' /><span class='info-left'>{{ calcAge(dec(data.dob.value)) }}</span></span>
      <span class="home-info"><i :class='data.home.fa' /><span class='info-right'>{{ data.home.value }}</span></span>
    </p>
    <p>
      <pre id='motto'><i class='fas fa-quote-left'/>{{ data.motto }}<i class='fas fa-quote-right'/></pre>
    </p>
  </div>
</template>

<script>
import { parseTimeDif, dec } from '@/utils/util'
export default {
  computed: {
    data: function () {
      let ret = JSON.parse(localStorage.getItem('myCv'))
      return ret[this.$i18n.locale]
    }
  },
  methods: {
    errorHandler () {
      return true
    },
    calcAge (t0, t1 = 'now') {
      const d = parseTimeDif(t0, t1)
      return d['y']
    },
    dec (s) {
      return dec(s)
    }
  }
}
</script>

<style scoped>
#portrait {
  text-align: center;
  margin: 20px
}
h1, h2, h3, h4, h5, h6, p {
  color: #fff
}
h1 {
  font-size: x-large;
  font-weight: thin
}
pre {
  color: #ccc
}
#baseInfo i.fas {
  color: #eee;
  font-size: small
}
.info-left {
  margin-left: 4px;
  margin-right: 20px
}
.info-right {
  margin-left: 4px
}
.gender-info:hover, .dob-info:hover, .home-info:hover {
  color: #67C23A
}
#motto {
  color: #ccc
}
#motto .fa-quote-left {
  margin-top: -3px;
  margin-right: 8px;
  vertical-align: text-top
}
#motto .fa-quote-right {
  margin-bottom: -1px;
  margin-left: 8px;
  vertical-align: text-bottom
}
</style>
