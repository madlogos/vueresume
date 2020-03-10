<template>
  <div v-if='job' class='block' id='job' ref='job'>
    <h2 id='title'>
      <i class='fas fa-user-tie' /><span class='title-h2'>{{ this.$t('title.job') }}</span>
      <el-button
       circle
       id='foldToggle'
       v-model='foldAll'
       :icon='foldIcon'
       @click='toggleFolding'>
      </el-button>
    </h2>
    <el-timeline id='tl' ref='tl' :reverse=true>
      <el-timeline-item
       v-for='(i, _i) in job'
       :key='_i'
       :timestamp='i.from + " - " + i.till + " · " + calcTimeDif(i.from, i.till)'
       :icon='"el-icon-" + i.icon'
       :color='colorTimelineNode(i.active)'
       size='large'
       placement='top'
      >
        <el-collapse ref='coll' v-model='foldValue[_i]' @change='handleChange'>
          <el-collapse-item :name='_i.toString()'>
            <template slot='title'>
              <div class='collhead'>
                <span class="jobtitle">
                  <i class='fas fa-id-badge' /><span class='icon-txt'>{{ i.title }}</span>
                </span>
                <span v-if='isSmallScreen'><br /></span>
                <template v-if='i.wiki.link'>
                  <el-popover placement='top-start' :title='i.wiki.title' trigger='hover' width=240>
                    <div>
                      <i :class='i.wiki.fa' />
                      <a :href='i.wiki.link' target='_blank'><span class='icon-txt'>{{ i.wiki.value }}</span></a>
                    </div>
                    <br />
                    <div>
                      <el-tag
                        v-for='(tag, _tag) in i.wiki.tag'
                        :key='"tag" + _tag'
                        type='info'
                        size='mini'
                      >{{ tag }}</el-tag>
                    </div>
                    <span class="jobemp" slot='reference'>
                      <i class='fas fa-building' />
                      <span class='icon-txt'>
                        <a v-if='i.link' :href='i.link' target='_blank'>{{ i.emp }}</a>
                        <span v-else>{{ i.emp }}</span>
                      </span>
                    </span>
                  </el-popover>
                </template>
                <template v-else>
                  <span class="jobemp">
                    <i class='fas fa-building' />
                    <a v-if='i.link' :href='i.link' target='_blank'>{{ i.emp }}</a>
                    <span v-else>{{ i.emp }}</span>
                  </span>
                </template>
              </div>
            </template>
            <div class='jobtag'>
              <el-tag
                v-for='(j, _j) in i.keyword'
                :key='"kw" + _j'
                effect='plain'
                type='info'
                size='mini'
              >{{ j }}</el-tag>
            </div>
            <template v-if='i.description'>
              <div class='jobdes' v-for='(k, _k) in i.description' :key='"des" + _k'>
                <div v-if='k.p'>
                  <p v-for='(k1, _k1) in k.p' :key='"p" + _k1' v-html='k1'></p>
                </div>
                <ul v-if='k.ul'>
                  <li v-for='(k2, _k2) in k.ul' :key='"li" + _k2' v-html='k2'></li>
                </ul>
              </div>
            </template>
            <template v-if='i.project'>
              <el-card v-for='(m, _m) in i.project' :key='"proj" + _m' shadow='hover' :body-style='{padding:"8px 10px"}'>
                <p class='jobproj'>
                  <i class='fas fa-project-diagram'/>
                  <span class='icon-header'><strong>{{ m.title }}</strong></span>
                  <br />
                  <span class='icon-note'>{{ m.from }} - {{ m.thru }}</span>
                </p>
                <div v-if='m.work'>
                  <p class='projnote' v-for='(m1, _m1) in m.work' :key='"work" + _m1'>{{ m1 }}</p>
                </div>
              </el-card>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import sty from '@/styles/_color.scss'
import { parseTimeDif, formatTimeDif2, countEmptyArrInArr, detectDevice } from '@/utils/util'
export default {
  data () {
    return {
      isSmallScreen: false,
      foldAll: null,
      foldIcon: 'el-icon-arrow-down',
      foldValue: [],
      themeColor: sty.themeColor,
      jobTreeProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    job () {
      return this.$store.getters.job
    }
  },
  watch: {
    job (val) {
      this.foldValue = this.initFoldVal(val)
    },
    foldValue (val) {
      this.foldAll = !countEmptyArrInArr(this.foldValue) === this.foldValue.length
    }
  },
  mounted: function () {
    let that = this
    // revise foldValue & foldAll
    this.initFolding()
    if (this.job) {
      this.foldValue = this.initFoldVal(this.job)
    }
    // monitor window resize
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
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
    },
    getCollName (i) {
      // get current collapse item name
      return this.foldValue[parseInt(i)]
    },
    toggleFolding () {
      var i
      if (this.foldAll) {
        this.foldAll = false
        this.foldIcon = 'el-icon-arrow-right'
        for (i = 0; i < this.foldValue.length; i++) {
          this.foldValue[i] = []
        }
      } else {
        this.foldAll = true
        this.foldIcon = 'el-icon-arrow-down'
        for (i = 0; i < this.foldValue.length; i++) {
          this.foldValue[i] = [i.toString()]
        }
      }
    },
    initFolding () {
      if (countEmptyArrInArr(this.foldValue) === 0) {
        this.foldAll = true
        this.foldIcon = 'el-icon-arrow-down'
      } else {
        this.foldAll = false
        this.foldIcon = 'el-icon-arrow-right'
      }
    },
    handleChange () {
      // val is an array binding to this el-collapse-item
      if (countEmptyArrInArr(this.foldValue) === this.foldValue.length) {
        // all null
        this.foldAll = false
        this.foldIcon = 'el-icon-arrow-right'
      } else if (countEmptyArrInArr(this.foldValue) === 0) {
        // all not null
        this.foldAll = true
        this.foldIcon = 'el-icon-arrow-down'
      }
    },
    colorTimelineNode (active) {
      return active ? this.themeColor : null
    },
    initFoldVal (val = this.$store.getters.job) {
      let ret = []
      for (let i = 0; i < val.length; i++) {
        ret.push([])
        if (val[i].active) {
          ret[i] = [(i).toString()]
        }
      }
      return ret
    },
    buildJobTree (data) {
      // data: job description
      // ret: el-tree structure
      let ret = []
      for (let i = 0; i < data.length; i++) {
        ret.push({'id': i, 'label': data[i].p.join(''), 'children': []})
        for (let j = 0; j < data[i].ul.length; j++) {
          ret[i].children.push({'id': data.length + j, 'label': data[i].ul[j]})
        }
      }
      return ret
    },
    checkScreenSize (thres = 640) {
      let devAttr = detectDevice()
      this.isSmallScreen = (devAttr['isMobile'] && !devAttr['isTablet'])
        || ((devAttr['isTablet'] || !devAttr['isMobile']) && document.body.clientWidth < thres)
    }
  }
}
</script>

<style lang='scss' scoped>
#job {
  margin: $mar-md $mar-md $mar-lg $mar-md
}
h2 {
  color: $col-thm
}
#foldToggle {
  float: right;
  margin-right: 0;
  padding: 5px
}
#foldToggle:hover {
  color: $col-thm;
  border-color: $col-thm-opaque;
  background-color: $col-thm-opaquer
}
.el-timeline {
  padding-left: 5px
}
a:link {
  color: $col-info
}
a:visited {
  color: $col-text-alt
}
a:hover {
  color: $col-ok
}
.el-tag {
  margin: 2px
}
.el-tag:hover {
  color: $col-ok;
  border-color: $col-ok;
  background-color: $col-bg
}
.jobtitle {
  font-size: $md;
  font-weight: bold;
  margin-right: $mar-md
}
.jobemp {
  font-size: $rg;
  color: $col-info;
  font-weight: normal
}
.jobtag {
  margin: 0 $mar-md $mar-sm 0
}
.jobdes {
  color: $col-text;
  line-height: $lh-md;
  margin: $mar-sm $mar-md $mar-sm $mar-sm
}
.jobdes p {
  font-size: $rg;
  margin: $mar-md 0 $mar-sm 0
}
.jobdes ul {
  padding-left: 32px;
  list-style: none;
  line-height: $lh-md
}
.jobdes li::before {
  content: "\25B8";
  color: $col-info;
  display: inline-block;
  width: 1em;
  margin-left: -1.2em;
  margin-right: 0.2em
}
.jobproj {
  color: $col-text;
  text-indent: -10px;
  padding-left: 24px
}
.projnote {
  padding-left: 24px;
  color: $col-text
}
.icon-note {
  margin-left: 0
}
.el-card {
  margin: $mar-md $mar-md $mar-md $mar-sm;
  background-color: $col-block;
  line-height: $lh-md
}
.el-card__body p {
  margin: $mar-sm 0 $mar-sm 0
}
.el-collapse {
  border-top: none
}
.el-collapse-item__wrap {
  border-bottom: none
}
.el-collapse-item__header {
  line-height: $lh-md;
  border-bottom: none
}
.collhead {
  line-height: $lh-md
}
</style>
