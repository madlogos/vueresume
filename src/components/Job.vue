<template>
  <div class='block' id='job' ref='job'>
    <h2 id='title'>
      <i class='fas fa-user-tie' />&nbsp;{{ this.$t('title.job') }}
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
       v-for='(i, index) in data.job'
       :key='index'
       :timestamp='i.from + " - " + i.till + " (" + calcTimeDif(i.from, i.till) + ")"'
       :icon='"el-icon-" + i.icon'
       :color='i.color'
       size='large'
       placement='top'
      >
        <el-collapse ref='coll' v-model='foldValue[index]' @change='handleChange'>
          <el-collapse-item :name='index.toString()'>
            <template slot='title'>
              <div class='collhead'>
                <span class="jobtitle">
                  <i class='fas fa-id-badge' />&nbsp;{{ i.title }}&emsp;
                </span>
                <span class="jobemp" v-if='i.wiki.link'>
                  <el-popover placement='top-start' :title='i.wiki.title' trigger='hover' width=200>
                    <div>
                      <i :class='i.wiki.fa' />&nbsp;
                      <a :href='i.wiki.link' target='_blank'>{{ i.wiki.value }}</a>
                    </div>
                    <br />
                    <div>
                      <el-tag
                        v-for='(tag, itag) in i.wiki.tag'
                        :key='itag'
                        type='info'
                        size='mini'
                      >{{ tag }}</el-tag>
                    </div>
                    <span slot='reference'>
                      <i class='fas fa-building' />
                      <a v-if='i.link' :href='i.link' target='_blank'>{{ i.emp }}</a>
                      <span v-else>{{ i.emp }}</span>
                    </span>
                  </el-popover>
                </span>
                <span class="jobemp" v-else>
                  <span>
                    <i class='fas fa-building' />
                    <a v-if='i.link' :href='i.link' target='_blank'>{{ i.emp }}</a>
                    <span v-else>{{ i.emp }}</span>
                  </span>
                </span>
              </div>
            </template>
            <div class='jobtag'>
              <el-tag
              v-for='(j, idxj) in i.keyword'
              :key='idxj'
              effect='plain'
              type='info'
              size='mini'
              >{{ j }}</el-tag>
            </div>
            <div v-for='(k, idxk) in i.description' :key='idxk'>
              <div v-html='k'></div>
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
    for (var i = 0; i < this.data.job.length - 1; i++) {
      this.foldValue.push([])
    }
    this.foldValue.push([(this.data.job.length - 1).toString()])
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
#job {
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
.el-timeline {
  padding-left: 5px
}
.jobemp a:link {
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
.jobtitle {
  font-size: 14px;
  font-weight: bold
}
.jobemp {
  font-size: 14px;
  color: #888;
  font-weight: normal
}
.jobtag {
  margin-bottom: 10px
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
