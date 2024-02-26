<template>
  <div v-if='this.$store.getters.cert' class='block' id='cert' ref='cert'>
    <h2 id='title'>
      <i class='fas fa-certificate' /><span class='title-h2'>{{ $t('title.cert') }}</span>
    </h2>
    <div id='certs'>
      <table id='item-table'>
        <tr v-for='(i, _i) in this.$store.getters.cert' :key='_i'>
          <td class='col-summ'>
            <span class='cert-quote-icon'><i :class='i.fa' /></span>
            <span class='cert-quote'>{{ i.time }}</span>
          </td>
          <td class='col-detl'>
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
                  <p v-if='i.sn' class='pop-quote'><i class='fas fa-hashtag' /><span class='icon-txt'>{{ i.sn }}</span>
                  </p>
                </div>
                <div>
                  <p v-if='i.time'>
                    <span class='pop-quote'><i class='fas fa-calendar-alt' /><span class='icon-txt'>{{ i.time
                    }}</span></span>
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
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
#cert {
  margin: $mar-lg $mar-md
}

h2,
p,
li {
  color: $col-main-alt
}

.el-card__header h2 {
  color: $col-main
}

.el-card__body p,
.el-card__body li {
  color: $col-text
}

.el-card__body ol {
  padding-left: 24px
}

#certs .el-tag {
  margin: 2.5px 5px;
  font-size: $bs;
  border-style: none
}

#certs .el-tag:hover {
  font-size: $bs;
  font-weight: bold
}

#item-table {
  font-size: $bs;
  color: $col-main-alt;
  border-spacing: 10px 4px;
  line-height: 1.4em;
  margin-left: -2px
}

#item-table tr {
  vertical-align: top
}

.col-summ {
  width: 66px
}

.cert-main:hover {
  color: $col-ok
}

.cert-quote {
  font-size: small;
  color: $col-text-alt;
  margin: 0
}

.cert-quote-icon {
  font-size: $sm;
  color: $col-text-alt;
  font-family: monospace;
  margin-right: 4px
}

.pop-quote {
  color: $col-info
}

.pop-p,
.pop-li {
  text-align: left;
  line-height: $lh-md;
  word-break: normal;
  overflow-wrap: break-word
}

.pop-li {
  font-size: $sm
}

.box-card {
  margin: -6px;
  width: $wdt-card
}

.el-popover {
  padding: 0
}</style>
