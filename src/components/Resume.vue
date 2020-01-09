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
         active-color='#00A78E'
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
        <h3><i class='fas fa-download'/><span class='title-h3'>{{ $t('title.download') }}</span></h3>
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
          <span v-html='this.$t("footer.copyright")'></span>
          <span v-html='this.$t("footer.footnote")'></span>
        </div>
      </template>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Portrait from '@/components/Portrait'
import Contact from '@/components/Contact'
import Skill from '@/components/Skill'
import Cert from '@/components/Cert'
import Job from '@/components/Job'
import Edu from '@/components/Edu'
import SelfState from '@/components/SelfState'

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
      loading: true
    }
  },
  created: function () {
    this.loading = true
    const now = new Date()
    var myCvExpired = false
    const validMinutes = process.env.NODE_ENV === 'development' ? 0 : 3600
    // fetch data from localStorage
    if (validMinutes > 0 && localStorage.getItem('myCvTime')) {
      const myCvTime = new Date(localStorage.getItem('myCvTime'))
      if (parseInt(now - myCvTime) > validMinutes * 1000) {
        // myCvTime expired
        myCvExpired = true
      }
    } else {
      myCvExpired = true
    }
    if (myCvExpired) {
      let json = require('@/assets/cv.json')
      localStorage.setItem('myCvTime', now)
      localStorage.setItem('myCv', JSON.stringify(json))
    }
  },
  mounted: function () {
    document.title = this.$i18n.locale === 'zh' ? '汪轶颖的简历' : 'Wang Yiying\'s Résumé'
    this.loading = !localStorage.getItem('myCv')
  },
  methods: {
    changeLang (val) {
      // localStorage.setItem('lang', val)
      this.$i18n.locale = val
      document.title = val === 'zh' ? '汪轶颖的简历' : 'Wang Yiying\'s Résumé'
    },
    openTip () {
      this.$notify({
        title: this.$t('tip.init.title'),
        message: this.$t('tip.init.msg'),
        dangerouslyUseHTMLString: true,
        duration: 4500
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto
}
#backtop {
  color: #00A78E
}
#side-bar {
  background-color: #00A78E
}
#el-col-sidebar {
  min-height: 34px;
  background-color: #00A78E
}
#el-foot-sidebar {
  background-color: #00A78E
}
#side-bar h3, #side-bar h4 {
  margin: 20px 20px;
  color: #eee
}
#el-foot-main {
  margin-bottom: 5px
}
#el-row-lang {
  background: #efefef
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
  margin-left: 20px
}
.tipbtn:hover {
  color: #67C23A;
}
.tipbtn {
  margin: 2px 20px 2px 10px;
  padding: 5px 10px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: small
}
.el-notification {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.footer {
  margin: 0;
  padding: 10px 20px;
  color: #999;
  font-size: small;
  line-height: 1.75em
}
</style>

<style>
.title-h2 {
  margin-left: 8px
}
.title-h3 {
  margin-left: 8px
}
.icon-txt {
  margin-left: 4px
}
.el-switch__label.is-active {
  color: #00A78E
}
.el-notification__content {
  text-align: left
}
</style>
