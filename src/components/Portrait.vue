<template>
  <div class='block' id='portrait'>
    <el-avatar :size='100' @error='errorHandler'>
      <img src='@/assets/logo.png' />
    </el-avatar>
    <h1>{{ dec(data.name) }}</h1>
    <p id='baseInfo'>
      <span class="genderInfo"><i :class='data.gender.fa' />&nbsp;{{ data.gender.value }}</span>&emsp;
      <span class="dobInfo"><i :class='data.dob.fa' />&nbsp;{{ calcAge(dec(data.dob.value)) }}</span>&emsp;
      <span class="homeInfo"><i :class='data.home.fa' />&nbsp;{{ data.home.value }}</span>
    </p>
    <pre id='motto'>
      <i class='fas fa-quote-left'/> {{ data.motto }} <i class='fas fa-quote-right'/>
    </pre>
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
.genderInfo:hover, .dobInfo:hover, .homeInfo:hover {
  color: #67C23A
}
#motto i.fas {
  color: #ccc;
  font-size: x-small
}
#motto .fa-quote-left {
  vertical-align: text-top
}
#motto .fa-quote-right {
  vertical-align: text-bottom
}
</style>
