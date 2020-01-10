<template>
  <div class='block' id='job' ref='job'>
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
       v-for='(i, _i) in this.$store.getters.job'
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
                <span class="jobtitle">
                  <i class='fas fa-id-badge' /><span class='icon-txt'>{{ i.title }}</span>
                </span>
                <span class="jobemp" v-if='i.wiki.link'>
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
                v-for='(j, _j) in i.keyword'
                :key='_j'
                effect='plain'
                type='info'
                size='mini'
              >{{ j }}</el-tag>
            </div>
            <div v-if='i.description'>
              <p class='jobdes' v-for='(k, _k) in i.description' :key='_k' v-html='k'></p>
            </div>
            <div v-if='i.project'>
              <el-card v-for='(m, _m) in i.project' :key='_m' shadow='hover' :body-style='{padding:"10px"}'>
                <p class='jobproj'>
                  <i class='fas fa-project-diagram'/>
                  <span class='icon-txt'><strong>{{ m.title}}</strong></span>
                  <span class='icon-note'>({{ m.from }} - {{ m.thru }})</span>
                </p>
                <p class='projnote'>{{ m.work }}</p>
              </el-card>
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

  },
  mounted: function () {
    // return array of array
    const jobCnt = this.$store.getters.job.length
    for (var i = 0; i < jobCnt; i++) {
      this.foldValue.push([])
    }
    if (this.$store.getters.job[jobCnt - 1].icon === 'loading') {
      this.foldValue[jobCnt - 1] = [(jobCnt - 1).toString()]
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
#foldToggle:hover {
  color: #00A78E;
  border-color: #00A78E88;
  background-color: #00A78E11;
}
.el-timeline {
  padding-left: 5px
}
a:link {
  color: #909399
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
.jobtitle {
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px
}
.jobemp {
  font-size: 14px;
  color: #909399;
  font-weight: normal
}
.jobtag {
  margin-bottom: 10px
}
.jobdes {
  line-height: 1em;
  margin: 10px 0
}
.jobproj {
  color: #606266
}
.projnote {
  padding-left: 18px;
  color: #606266
}
.jobdes ul {
  line-height: 1.5em
}
.el-card {
  margin-right: 20px
}
.el-card__body p {
  margin: 6px 0
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
