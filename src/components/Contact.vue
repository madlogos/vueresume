<template>
  <div class='block' id='contact'>
    <h2 id='title'>
      <i class='fas fa-address-card' /><span class='title-h2'>{{ this.$t('title.contact') }}</span>
    </h2>
    <table id='items'>
      <tr v-for="i in data.contact" :key="i.name">
        <el-tooltip effect='light' placement="top-start" :content="i.name">
          <td class="socio-icon"><i :class='i.fa' /><span class='icon-txt'>{{ i.name }}</span></td>
        </el-tooltip>
        <td><a v-if='i.link' :href='dec(i.link)' target='_blank'>{{ dec(i.value) }}</a>
          <span v-else>{{ dec(i.value) }}</span></td>
      </tr>
    </table>
    <div id="socio">
      <template v-for="i in data.socio">
        <el-popover :key="i.name" placement="top-start" :title="i.name" trigger="hover" width="100">
          <div class="el-popover__body">
            <span v-if='i.link'>
              <i class='fas fa-arrow-circle-right' />
              <a :href='i.link' target='_blank'>{{ i.value }}</a>
            </span>
            <span v-else><i class='fas fa-plus-circle' /><span class='icon-txt'>{{ i.value }}</span></span>
          </div>
          <span class='socio-icon' slot='reference'><i :class='i.fa'/></span>
        </el-popover>
      </template>
    </div>
  </div>
</template>

<script>
import { dec } from '@/utils/util'
export default {
  computed: {
    data: function () {
      let ret = JSON.parse(localStorage.getItem('myCv'))
      return ret[this.$i18n.locale]
    }
  },
  methods: {
    dec (s) {
      return dec(s)
    }
  }
}
</script>

<style lang='scss' scoped>
#contact {
  margin: $mar-lg $mar-sm $mar-lg $mar-md
}
h2 {
  color: $col-main-alt
}
a:link {
  color: $col-bg
}
.el-popover a:link {
  color: $col-thm
}
a:visited {
  color: $col-text
}
.el-popover a:visited {
  color: $col-text
}
a:hover {
  color: $col-ok
}
.el-popover a:hover {
  color: $col-ok
}
.el-popover__body i {
  margin-right: 15px
}
#contact ul {
  margin-left: 0;
  padding-left: 10px
}
#items {
  font-size: $bs;
  color: $col-main-alt;
  border-spacing: 10px 4px;
  margin-left: -2px
}
#items tr {
  vertical-align: middle
}
#socio {
  padding: 10px 5px 10px 5px;
  color: $col-main-alt;
  font-size: $xlg
}
.socio-icon {
  margin-right: 15px
}
.socio-icon:hover {
  color: $col-ok
}
</style>
