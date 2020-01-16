<template>
<div v-loading='loading' class='wrapper'>
  <el-backtop slot='reference' target=".wrapper" id='backtop' :right='20' />
  <el-row :gutter="16" id='el-row-lang'>
    <el-col :span="8" id="el-col-sidebar" class="hidden-xs-only">
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" id="el-col-main">
      <div id='lang-cont'>
        <el-switch
         id='lang-switch'
         v-model='lang'
         active-text='En'
         active-value='en'
         inactive-text='中'
         inactive-value='zh'
         :active-color='this.themeColor'
         @change='changeLang($event)'
        >
        </el-switch>
        <el-button round @click='openTip' class='tipbtn' size='mini' icon='el-icon-s-opportunity'>
          {{ this.$t('title.tip') }}
        </el-button>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="16" id='el-row-main' type='flex'>
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" id="side-bar">
      <portrait/>
      <contact/>
      <skill/>
      <cert/>
      <template>
        <h3>
          <a :href='this.$store.getters.misc.attachment'>
            <i class='fas fa-download'/><span class='title-h3'>{{ $t('title.download') }}</span>
          </a>
        </h3>
      </template>
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" id="main">
      <job/>
      <edu/>
      <self-state/>
    </el-col>
  </el-row>
  <el-row :gutter="16" id='el-row-foot'>
    <el-col :span="8" id="el-foot-sidebar" class="hidden-xs-only">
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" id="el-foot-main">
      <template>
        <div class="footer">
          <span>
            <i class='fas fa-copyright'/>{{ this.parseYear(this.$store.getters.misc.copyright.from) }}-{{ this.parseYear(this.$store.getters.misc.copyright.thru) }}
          </span>
          <span v-html='this.$store.getters.misc.copyright.content'></span>
          <span v-html='this.$store.getters.misc.footnote'></span>
        </div>
      </template>
    </el-col>
  </el-row>
</div>
</template>

<script>
import sty from '@/styles/_color.scss'

// async load components
const Portrait = () => import('@/components/Portrait')
const Contact = () => import('@/components/Contact')
const Job = () => import('@/components/Job')
const Skill = () => import('@/components/Skill')
const Cert = () => import('@/components/Cert')
const Edu = () => import('@/components/Edu')
const SelfState = () => import('@/components/SelfState')

export default {
  components: {
    Portrait,
    Contact,
    Skill,
    Cert,
    Job,
    Edu,
    SelfState
  },
  data: function () {
    return {
      lang: this.$i18n.locale,
      loading: true,
      themeColor: sty.themeColor
    }
  },
  computed: {

  },
  created: function () {
    this.loading = true
    this.$store.commit('fetchData')
  },
  mounted: function () {
    document.title = this.$i18n.locale === 'zh' ? '汪轶颖的简历' : 'Wang Yiying\'s Résumé'
    this.loading = !localStorage.getItem('myCv')
  },
  methods: {
    changeLang (val) {
      // localStorage.setItem('lang', val)
      this.$i18n.locale = val
      this.$store.commit('changeLang', val)
      document.title = val === 'zh' ? '汪轶颖的简历' : 'Wang Yiying\'s Résumé'
    },
    openTip () {
      this.$notify({
        title: this.$store.getters.misc.tip.title,
        message: this.$store.getters.misc.tip.msg,
        dangerouslyUseHTMLString: true,
        duration: 4500
      })
    },
    parseYear (yr) {
      let rslt = isNaN(new Date(parseInt(yr))) ? new Date() : new Date(yr)
      return rslt.getUTCFullYear()
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto
}
#backtop {
  color: $col-thm
}
#side-bar {
  background-color: $col-thm
}
#side-bar a:link {
  color: $col-bg
}
#side-bar a:visited {
  color: $col-text
}
#side-bar a:hover {
  color: $col-ok
}
#el-col-sidebar {
  min-height: $mar-lg;
  background-color: $col-thm
}
#el-foot-sidebar {
  background-color: $col-thm
}
#side-bar h3, #side-bar h4 {
  margin: $mar-md;
  color: $col-main-alt
}
#el-foot-main {
  margin-bottom: 5px
}
#el-row-lang {
  background: $col-container
}
#el-row-foot {
  display: flex
}
#lang-cont{
  float: right;
  margin: 2px 0px 2px 0px
}
.el-row {
  flex-wrap: wrap;
  margin: 0
}
.el-col {
  padding: 0px 12px
}
#tip {
  margin-left: $mar-md
}
.tipbtn:hover {
  color: $col-ok;
}
.tipbtn {
  margin: 5px 20px 5px 10px;
  padding: 5px 10px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: small
}
.el-notification {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.footer {
  margin: 0;
  padding: $mar-sm $mar-md;
  color: $col-info;
  font-size: small;
  line-height: $lh-lg
}
</style>
