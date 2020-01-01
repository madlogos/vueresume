<template>
  <div class='block' id='cert' ref='cert'>
    <h2 id='title'>
      <i class='fas fa-certificate' />&nbsp;{{ $t('title.cert') }}
    </h2>
    <div id='certs'>
      <ul class='cert-ul'>
        <li class='cert-li' v-for='(i, idxi) in data.cert' :key='idxi'>
          <span class='cert-quote'>{{ i.time }}</span>
          <span class='cert-quote-icon'><i :class='i.fa' /></span>
          <el-popover trigger='hover' placement='top-start'>
            <el-card class='box-card' shadow='hover'>
              <div slot='header'>
                <h3>{{ i.name }}</h3>
                <p v-if='i.provider' class='pop-quote'>
                  <i class='fas fa-chalkboard-teacher' />&emsp;
                  <a :href='i.provider.link' target='_blank'>{{ i.provider.name }}</a>
                </p>
                <p v-if='i.institute'>
                  <span class='pop-quote'>
                    <i class='fas fa-university' />&emsp;
                    <a :href='i.institute.link' target='_blank'>{{ i.institute.name }}</a>
                  </span>
                </p>
                <p v-if='i.sn' class='pop-quote'><i class='fas fa-hashtag' />&emsp;{{ i.sn }}</p>
              </div>
              <div>
                <p v-if='i.time'>
                  <span class='pop-quote'><i class='fas fa-calendar-alt' />&emsp;{{ i.time }}</span>
                </p>
                <div v-if='i.p'>
                  <p class='pop-p' v-for='(j, idxj) in i.p' :key='idxj' v-html='j'></p>
                </div>
                <ol v-if='i.ol'>
                  <li class='pop-li' v-for='(k, idxk) in i.ol' :key='idxk' v-html='k'></li>
                </ol>
              </div>
            </el-card>
            <span slot='reference' class='cert-main'>{{ i.caption }}</span>
          </el-popover>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data: function () {
      let ret = JSON.parse(localStorage.getItem('myCv'))
      return ret[this.$i18n.locale]
    }
  }
}
</script>

<style scoped>
#cert {
  margin: 40px 20px
}
h2, p, li {
  color: #eee
}
.el-card__header h2 {
  color: #000
}
.el-card__body p, .el-card__body li {
  color: #606266
}
.el-card__body ol {
  padding-left: 24px
}
#certs .el-tag {
  margin: 2.5px 5px;
  font-size: 14px;
  border-style: none
}
#certs .el-tag:hover {
  font-size: 16px;
  font-weight: bold
}
.cert-ul {
  padding: 0
}
.cert-li {
  font-size: 14px;
  list-style-type: none;
  line-height: 175%;
  padding-left: 75px;
  text-indent: -75px
}
.cert-main:hover {
  color: #67C23A
}
.cert-quote {
  font-size: 12px;
  color: #ccc;
  margin-right: 10px
}
.cert-quote-icon {
  font-size: 12px;
  color: #ccc;
  font-family: monospace;
  margin-right: 2px
}
.pop-quote {
  color: #888
}
.pop-quote a:link {
  color: #888
}
.pop-quote a:visited {
  color: #666
}
.pop-quote a:hover {
  color: #67C23A
}
.pop-p, .pop-li {
  font-size: 14px;
  text-align: left;
  word-break: keep-all;
  overflow-wrap: break-word
}
.box-card {
  margin: -6px;
  width: 320px
}
.el-popover {
  padding: 0
}
</style>
