<template>
  <div class='block' id='cert' ref='cert'>
    <h2 id='title'>
      <i class='fas fa-certificate' /><span class='title-h2'>{{ $t('title.cert') }}</span>
    </h2>
    <div id='certs'>
      <ul class='cert-ul'>
        <li class='cert-li' v-for='(i, _i) in this.$store.getters.cert' :key='_i'>
          <span class='cert-quote'>{{ i.time }}</span>
          <span class='cert-quote-icon'><i :class='i.fa' /></span>
          <el-popover trigger='hover' placement='top-start'>
            <el-card class='box-card' shadow='hover'>
              <div slot='header'>
                <h3>{{ i.name }}</h3>
                <p v-if='i.provider' class='pop-quote'>
                  <i class='fas fa-chalkboard-teacher' />
                  <a :href='i.provider.link' target='_blank'><span class='icon-txt'>{{ i.provider.name }}</span></a>
                </p>
                <template v-if='i.institute'>
                  <p class='pop-quote'>
                    <i class='fas fa-university' />
                    <a :href='i.institute.link' target='_blank'><span class='icon-txt'>{{ i.institute.name }}</span></a>
                  </p>
                </template>
                <p v-if='i.sn' class='pop-quote'><i class='fas fa-hashtag'/><span class='icon-txt'>{{ i.sn }}</span></p>
              </div>
              <div>
                <p v-if='i.time'>
                  <span class='pop-quote'><i class='fas fa-calendar-alt'/><span class='icon-txt'>{{ i.time }}</span></span>
                </p>
                <template v-if='i.p'>
                  <p class='pop-p' v-for='(j, _j) in i.p' :key='_j' v-html='j'></p>
                </template>
                <ol v-if='i.ol'>
                  <li class='pop-li' v-for='(k, _k) in i.ol' :key='_k' v-html='k'></li>
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
  color: #303133
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
  line-height: 1.75em;
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
  color: #909399
}
.pop-p, .pop-li {
  text-align: left;
  line-height: 1.5em;
  word-break: keep-all;
  overflow-wrap: break-word
}
.pop-li {
  font-size: 12px
}
.box-card {
  margin: -6px;
  width: 320px
}
.el-popover {
  padding: 0
}
</style>
