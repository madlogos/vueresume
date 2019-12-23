<template>
  <div class='block' id='contact'>
    <h2 id='title'>
      <i class='fas fa-address-card' />&nbsp;{{ this.$t('title.contact') }}
    </h2>
    <ul id='items'>
      <li v-for="i in data.contact" :key="i.name">
        <el-tooltip placement="top-start" :content="i.name">
          <span class='socio-icon'>
            <i :class='i.fa' />&nbsp;
            <a v-if='i.link' :href='dec(i.link)' target='_blank'>{{ dec(i.value) }}</a>
            <span v-else>{{ dec(i.value) }}</span>
          </span>
        </el-tooltip>
      </li>
    </ul>
    <div id="socio">
      <span v-for="i in data.socio" :key="i.name">
        <el-popover placement="top-start" :title="i.name" trigger="hover" width="100">
          <div class="el-popover__body">
            <span v-if='i.link'>
              <i class='fas fa-arrow-circle-right' />
              <a :href='i.link' target='_blank'>{{ i.value }}</a>
            </span>
            <span v-else><i class='fas fa-plus-circle' />&nbsp;{{ i.value }}</span>
          </div>
          <span class='socio-icon' slot='reference'><i :class='i.fa'/></span>
        </el-popover>&nbsp;
      </span>
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

<style scoped>
#contact {
  margin: 20px 20px 40px 20px
}
h2 {
  color: #eee
}
a:link {
  color: #fff
}
.el-popover a:link {
  color: #00A78E
}
a:visited {
  color: #666
}
.el-popover a:visited {
  color: #666
}
a:hover {
  color: #67C23A
}
.el-popover a:hover {
  color: #67C23A
}
#contact ul {
  margin-left: 0;
  padding-left: 10px
}
#items li {
  list-style-type: none;
  color: #eee;
  line-height: 150%
}
#socio {
  padding: 5px;
  color: #eee;
  font-size: 20px
}
.socio-icon {
  margin-right: 5px
}
.socio-icon:hover {
  color: #67C23A
}
</style>
