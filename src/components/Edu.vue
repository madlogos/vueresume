<template>
  <div class='block' id='edu' ref='edu'>
    <h2 id='title'>
      <i class='fas fa-user-graduate' /><span class='title-h2'>{{ this.$t('title.edu') }}</span>
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
       v-for='(i, _i) in data.edu'
       :key='_i'
       :timestamp='i.from + " - " + i.till + "  (" + calcTimeDif(i.from, i.till) + ")"'
       :icon='"el-icon-" + i.icon'
       :color='i.color'
       size='large'
       placement='top'
      >
        <el-collapse ref='coll' v-model='foldValue[_i]' @change='handleChange'>
          <el-collapse-item :name='_i.toString()'>
            <template slot='title'>
              <div class='collhead'>
                <span class='cred'>
                  <i class='fas fa-graduation-cap' /><span class='icon-txt'>{{ i.cred }}</span>
                </span>
                <span class='univ' v-if='i.wiki.link'>
                  <el-popover placement='top-start' :title='i.wiki.title' trigger='hover' width=240>
                    <div>
                      <i :class='i.wiki.fa' />
                      <a :href='i.wiki.link' target='_blank'><span class='icon-txt'>{{ i.wiki.value }}</span></a>
                    </div>
                    <br />
                    <div>
                      <el-tag
                        v-for='(tag, _tag) in i.wiki.tag'
                        :key='_tag'
                        type='info'
                        size='mini'
                      >{{ tag }}</el-tag>
                    </div>
                    <span slot='reference'>
                      <i class='fas fa-university' />
                      <a v-if='i.link' :href='i.link' target='_blank'>{{ i.school }}</a>
                      <span v-else>{{ i.school }}</span>
                    </span>
                  </el-popover>
                </span>
                <span class="univ" v-else>
                  <span>
                    <i class='fas fa-university' />
                    <a v-if='i.link' :href='i.link' target='_blank'>{{ i.univ }}</a>
                    <span v-else>{{ i.univ }}</span>
                  </span>
                </span>
              </div>
            </template>
            <div class='major'>
              <span class='major-head'><i class='fas fa-school' /><span class='icon-txt'>{{ i.major }}</span></span>
              <span class='major-head'><i class='fas fa-trophy' /><span class='icon-txt'>{{ i.rank }}</span></span>
            </div>
            <div v-for='(j, _j) in i.lesson' :key='_j'>
              <div v-html='j'></div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { parseTimeDif, formatTimeDif2 } from '@/utils/util'
export default {
  data () {
    return {
      foldAll: null,
      foldIcon: 'el-icon-arrow-down',
      foldValue: []
    }
  },
  computed: {
    data: function () {
      let ret = JSON.parse(localStorage.getItem('myCv'))
      return ret[this.$i18n.locale]
    }
  },
  mounted: function () {
    // return array of array
    const eduCnt = this.data.edu.length
    for (var i = 0; i < eduCnt; i++) {
      this.foldValue.push([])
    }
    if (this.data.edu[eduCnt - 1].icon === 'loading') {
      this.foldValue[eduCnt - 1] = [(eduCnt - 1).toString()]
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
    },
    getCollName (i) {
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
    handleChange (val) {
      // val is an array
      if (this.countEmptyArrInArr(this.foldValue) === this.foldValue.length) {
        // all null
        this.foldAll = false
        this.foldIcon = 'el-icon-arrow-right'
      } else if (this.countEmptyArrInArr(this.foldValue) === 0) {
        // all not null
        this.foldAll = true
        this.foldIcon = 'el-icon-arrow-down'
      }
    },
    countEmptyArrInArr (arr) {
      // used in array within array
      var n = 0
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && arr[i].length === 0) {
          n++
        }
      }
      return n
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
#foldToggle {
  float: right;
  margin-right: 0;
  padding: 5px
}
#foldToggle:hover {
  color: #00A78E;
  border-color: #00A78E88;
  background-color: #00A78E11;
}
.el-timeline {
  padding-left: 5px
}
a:link {
  color: #888
}
a:visited {
  color: #ccc
}
a:hover {
  color: #67C23A
}
.el-tag {
  margin: 2px
}
.el-tag:hover {
  color: #67C23A;
  border-color: #67C23A;
  background-color: #fff
}
.cred {
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px
}
.univ {
  font-size: 14px;
  color: #888;
  font-weight: normal;
  margin-right: 20px
}
.major {
  color: #888;
  font-weight: normal;
  margin-bottom: 10px
}
.major-head {
  margin-right: 20px
}
.el-collapse {
  border-top: none
}
.el-collapse-item__wrap {
  border-bottom: none
}
.el-collapse-item__header {
  line-height: 1.5em;
  border-bottom: none
}
.collhead {
  line-height: 1.5em
}
</style>
