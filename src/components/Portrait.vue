<template>
  <div v-if='this.$store.getters.basic' class='block' id='portrait'>
    <el-avatar :size='100' @error='errorHandler'>
      <img src='@/assets/logo.png' />
    </el-avatar>
    <h1>{{ dec(this.$store.getters.basic.name) }}</h1>
    <p id='baseInfo'>
      <span class="dmg-info"><i :class='this.$store.getters.basic.gender.fa' /><span class='info-left'>{{ this.$store.getters.basic.gender.value }}</span></span>
      <span class="dmg-info"><i :class='this.$store.getters.basic.dob.fa' /><span class='info-left'>{{ calcAge(dec(this.$store.getters.basic.dob.value)) }}</span></span>
      <span class="dmg-info"><i :class='this.$store.getters.basic.marriage.fa' /><span class='info-left'>{{ this.$store.getters.basic.marriage.value }}</span></span>
      <span class="dmg-info">
        <i :class='this.$store.getters.basic.home.fa' />
        <a :href='this.$store.getters.basic.home.link' target='_blank'><span class='info-right'>{{ this.$store.getters.basic.home.value }}</span></a>
      </span>
    </p>
    <p>
      <pre id='motto'><i class='fas fa-quote-left'/>{{ this.$store.getters.basic.motto }}<i class='fas fa-quote-right'/></pre>
    </p>
  </div>
</template>

<script>
import { parseTimeDif, dec } from '@/utils/util'
export default {
  computed: {

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

<style lang='scss' scoped>
#portrait {
  text-align: center;
  margin: $mar-md
}
h1, h2, h3, h4, h5, h6, p {
  color: $col-bg
}
h1 {
  font-size: x-large;
  font-weight: thin
}
pre {
  color: $col-text-alt
}
#baseInfo i.fas {
  color: $col-main-alt;
  font-size: small
}
#baseInfo a:link {
  color: $col-bg
}
#baseInfo a:visited {
  color: $col-text
}
#baseInfo a:hover {
  color: $col-ok
}
.info-left {
  margin-left: 4px;
  margin-right: $mar-md
}
.info-right {
  margin-left: 4px
}
.dmg-info:hover {
  color: $col-ok
}
#motto {
  color: $col-text-alt;
  white-space: pre-wrap
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
