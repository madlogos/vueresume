<template>
  <div class='block' id='self' ref='self'>
    <h2 id='title'>
      <i class='fas fa-user-tag' />&nbsp;{{ $t('title.self') }}
    </h2>
    <div id='statement' v-html='data.self.statement'></div>
    <div id='hobby'>
      <span><span id='hobbyicon'><i class="fas fa-skiing"/></span> {{ $t('title.hobby') }}: </span>
      <el-tag
       v-for='(i, index) in data.self.interest'
       :key='index'
       effect='plain'
       type='info'
       size='small'
      >
        {{ i }}
      </el-tag>
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
#self {
  margin: 20px 20px 40px 20px
}
#statement {
  margin-left: 33px
}
#hobby {
  margin: 20px 20px 20px 33px
}
#hobby .el-tag {
  margin: 2px
}
#hobbyicon {
  color: #999
}
.el-tag:hover {
  font-size: 14px;
  color: #67C23A;
  border-color: #67C23A
}
h2 {
  color: #00A78E
}
</style>
