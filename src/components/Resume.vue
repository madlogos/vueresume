<template>
<div>
  <el-row :gutter="10" id='el-row-lang'>
    <el-col :span="8" id=“el-col-sidebar” class="hidden-xs-only" style="padding: 0px">
      <div id='sidebar-top'></div>
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
  <el-row :gutter="10" id='el-row-main' type='flex'>
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" id="side-bar">
      <portrait/>
      <contact/>
      <skill/>
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" id="main">
      <job/>
      <edu/>
      <self-state/>
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
import Job from '@/components/Job'
import Edu from '@/components/Edu'
import SelfState from '@/components/SelfState'
var json = require('../assets/cv.json')

export default {
  components: {
    Portrait,
    Contact,
    Skill,
    Job,
    Edu,
    SelfState
  },
  data: function () {
    return {
      lang: this.$i18n.locale
    }
  },
  mounted: function () {
    localStorage.setItem('myCv', JSON.stringify(json))
    document.title = this.$i18n.locale === 'zh' ? '汪轶颖的简历' : 'Wang Yiying\'s CV'
  },
  methods: {
    changeLang (val) {
      localStorage.setItem('lang', val)
      this.$i18n.locale = val
      document.title = val === 'zh' ? '汪轶颖的简历' : 'Wang Yiying\'s CV'
    },
    openTip () {
      this.$notify({
        title: this.$t('tip.init.title'),
        message: this.$t('tip.init.msg'),
        dangerouslyUseHTMLString: true,
        duration: 0
      })
    }
  }
}
</script>

<style scoped>
#side-bar {
  background-color: #00A78E
}
#el-col-sidebar {
  background-color: #00A78E
}
#sidebar-top {
  min-height: 32px;
  margin: 0;
  padding: 0;
  background-color: #00A78E
}
#el-row-lang {
  background: #f3f3f3
}
#lang-cont{
  float: right;
  margin-right: 0;
  margin-bottom: 2px
}
.el-row {
  flex-wrap: wrap
}
#tip {
  margin-left: 20px
}
.tipbtn:hover {
  color: #67C23A;
}
.tipbtn {
  margin-left: 20px;
  padding: 5px 10px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: small
}
.el-notification {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.footer {
  margin: 20px 0px 0px 0px;
  padding: 10px 20px;
  color: #999;
  font-size: small;
  line-height: 1.75em
}
</style>
