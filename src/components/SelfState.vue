<template>
  <div class='block' id='self' ref='self'>
    <h2 id='title'>
      <i class='fas fa-user-tag' /><span class='title-h2'>{{ $t('title.self') }}</span>
    </h2>
    <div id='statement' v-html='this.$store.getters.self.statement'></div>
    <div id='hobby'>
      <span><span id='hobbyicon'><i class="fas fa-skiing"/></span> {{ $t('title.hobby') }}: </span>
      <el-tag
       v-for='(i, _i) in this.$store.getters.self.interest'
       :key='_i'
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

  }
}
</script>

<style lang='scss' scoped>
#self {
  margin: $mar-md $mar-md $mar-lg $mar-md
}
#statement {
  font-size: $bs;
  margin-left: 33px
}
#hobby {
  margin: $mar-md $mar-md $mar-md 33px
}
#hobby .el-tag {
  margin: 2px
}
#hobbyicon {
  color: $col-info
}
.el-tag:hover {
  color: $col-ok;
  border-color: $col-ok
}
h2 {
  color: $col-thm
}
</style>
