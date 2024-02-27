<template>
  <div class='block' id='contact'>
    <h2 id='title'>
      <i class='fas fa-address-card' /><span class='title-h2'>{{ this.$t('title.contact') }}</span>
    </h2>
    <table v-if='this.$store.getters.contact' id='item-table'>
      <tr v-for="i in this.$store.getters.contact" :key="i.name">
        <el-tooltip effect='light' placement="top-start" :content="i.name">
          <td class="socio-icon"><i :class='i.fa' /><span class='icon-txt'>{{ i.name }}</span></td>
        </el-tooltip>
        <td><a v-if='i.link' :href='dec(i.link)' target='_blank'>{{ dec(i.value) }}</a>
          <span v-else>{{ dec(i.value) }}</span>
        </td>
      </tr>
    </table>
    <div v-if='this.$store.getters.socio' id="socio">
      <template v-for="i in this.$store.getters.socio">
        <el-popover :key="i.name" placement="top-start" :title="i.name" trigger="hover" width="100">
          <div class="el-popover__body">
            <span v-if='i.link'>
              <i class='fas fa-arrow-circle-right' />
              <a :href='i.link' target='_blank'>{{ i.value }}</a>
            </span>
            <span v-else><i class='fas fa-plus-circle' /><span class='icon-txt'>{{ i.value }}</span></span>
          </div>
          <span class='socio-icon' slot='reference'><i :class='i.fa' /></span>
        </el-popover>
      </template>
    </div>
  </div>
</template>

<script>
import { dec } from '@/utils/util'
export default {
  computed: {

  },
  methods: {
    dec(s) {
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
  margin-right: $mar-xs
}

#contact ul {
  margin-left: 0;
  padding-left: 10px
}

#item-table {
  font-size: $bs;
  color: $col-main-alt;
  border-spacing: 10px 4px;
  margin-left: -2px
}

#item-table tr {
  vertical-align: middle
}

#socio {
  padding: 10px 5px 10px 5px;
  color: $col-main-alt;
  font-size: $xl
}

.socio-icon {
  margin-right: 10px
}

.socio-icon:hover {
  color: $col-ok
}</style>
