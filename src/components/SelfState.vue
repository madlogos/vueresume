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
  font-size: 12px;
  color: #67C23A;
  border-color: #67C23A
}
h2 {
  color: #00A78E
}
</style>
