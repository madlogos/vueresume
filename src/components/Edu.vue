<template>
  <div v-if='edu' class='block' id='edu' ref='edu'>
    <h2 id='title'>
      <i class='fas fa-user-graduate' /><span class='title-h2'>{{ this.$t('title.edu') }}</span>
      <el-button circle id='foldToggle' v-model='foldAll' :icon='foldIcon' @click='toggleFolding'>
      </el-button>
    </h2>
    <el-timeline id='tl' ref='tl' :reverse=true>
      <el-timeline-item v-for='(i, _i) in edu' :key='_i'
        :timestamp='i.from + " - " + i.till + " · " + calcTimeDif(i.from, i.till)' :icon='"el-icon-" + i.icon'
        :color='colorTimelineNode(i.active)' size='large' placement='top'>
        <el-collapse ref='coll' v-model='foldValue[_i]' @change='handleChange'>
          <el-collapse-item :name='_i.toString()'>
            <template slot='title'>
              <div class='collhead'>
                <span class='cred'>
                  <i class='fas fa-graduation-cap' /><span class='icon-txt'>{{ i.cred }}</span>
                </span>
                <span v-if='isSmallScreen'><br /></span>
                <template>
                  <el-popover placement='top-start' :title='i.school' trigger='hover' width=240>
                    <div>
                      <i :class='i.wiki.fa' />
                      <a v-if='i.wiki.link' :href='i.wiki.link' target='_blank'>
                        <span class='icon-txt'>{{ i.wiki.title }}</span>
                      </a>
                      <span v-else class='icon-txt'>{{ i.wiki.title }}</span>
                    </div>
                    <div v-if='i.link'>
                      <i class='fas fa-link' />
                      <a :href='i.link' target='_blank'>
                        <span class='icon-txt'>{{ $t('title.website') }}</span>
                      </a>
                    </div>
                    <br />
                    <div>
                      <el-tag v-for='(tag, _tag) in i.wiki.tag' :key='_tag' type='info' size='mini'>{{ tag }}</el-tag>
                    </div>
                    <span class='univ' slot='reference'>
                      <i class='fas fa-university' />
                      <span class='icon-txt'>{{ i.school }}</span>
                    </span>
                  </el-popover>
                </template>
              </div>
            </template>
            <div class='major'>
              <span class='major-head'><i class='fas fa-school' /><span class='icon-txt'>{{ i.major }}</span></span>
              <span v-if='isSmallScreen'><br /></span>
              <span class='major-head'><i class='fas fa-trophy' /><span class='icon-txt'>{{ i.rank }}</span></span>
            </div>
            <template v-for='(j, _j) of i.lesson'>
              <div class='edudes' v-html='j' :key='_j'></div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { parseTimeDif, formatTimeDif2, countEmptyArrInArr, detectDevice } from '@/utils/util'
export default {
  data() {
    return {
      isSmallScreen: false,
      foldAll: null,
      foldIcon: 'el-icon-arrow-down',
      foldValue: []
    }
  },
  computed: {
    edu: function () {
      return this.$store.getters.edu
    }
  },
  watch: {
    edu(val) {
      this.foldValue = this.initFoldVal(val)
    },
    foldValue(val) {
      this.foldAll = !countEmptyArrInArr(this.foldValue) === this.foldValue.length
    }
  },
  mounted: function () {
    let that = this
    // revise foldValue & foldAll
    this.initFolding()
    if (this.edu) {
      this.foldValue = this.initFoldVal(this.edu)
    }
    // monitor window resize
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  methods: {
    calcTimeDif(t0, t1) {
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
    getCollName(i) {
      return this.foldValue[parseInt(i)]
    },
    initFolding() {
      if (countEmptyArrInArr(this.foldValue) === 0) {
        this.foldAll = true
        this.foldIcon = 'el-icon-arrow-down'
      } else {
        this.foldAll = false
        this.foldIcon = 'el-icon-arrow-right'
      }
    },
    toggleFolding() {
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
    handleChange() {
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
    colorTimelineNode(active) {
      return active ? this.themeColor : null
    },
    initFoldVal(val = this.$store.getters.edu) {
      let ret = []
      for (let i = 0; i < val.length; i++) {
        ret.push([])
        if (val[i].active) {
          ret[i] = [(i).toString()]
        }
      }
      return ret
    },
    checkScreenSize(thres = 640) {
      let devAttr = detectDevice()
      this.isSmallScreen = (devAttr['isMobile'] && !devAttr['isTablet'])
        || ((devAttr['isTablet'] || !devAttr['isMobile']) && document.body.clientWidth < thres)
    }
  }
}
</script>

<style lang='scss' scoped>
#edu {
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

.cred {
  font-size: $md;
  font-weight: bold;
  margin-right: $mar-md
}

.univ {
  font-size: $rg;
  color: $col-info;
  font-weight: normal;
  margin-right: $mar-md
}

.major {
  color: $col-info;
  font-weight: normal;
  margin: 0 $mar-md $mar-sm 0
}

.major-head {
  margin-right: $mar-md
}

.edudes {
  color: $col-text;
  line-height: $lh-md;
  margin: $mar-sm $mar-md $mar-sm $mar-sm
}

.edudes ul {
  padding-left: 20px;
  list-style: none
}

.edudes li::before {
  content: "\25B8";
  color: $col-info;
  display: inline-block;
  width: 1em;
  margin-left: -1.2em;
  margin-right: 0.2em
}

.el-collapse {
  border-top: none
}

.el-collapse-item__wrap {
  border-bottom: none
}

.el-collapse-item__header {
  line-height: $lh-xl;
  border-bottom: none
}

.collhead {
  line-height: $lh-xl
}</style>
