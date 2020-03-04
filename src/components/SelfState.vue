<template>
  <div class='block' id='self' ref='self'>
    <h2 id='title'>
      <i class='fas fa-user-tag' /><span class='title-h2'>{{ $t('title.self') }}</span>
    </h2>
    <ul id='statement' v-if='this.$store.getters.self.statement'>
      <li v-for='(i, _i) in this.$store.getters.self.statement' :key='_i' v-html='i'></li>
    </ul>
    <div id='hobby'>
      <div><span id='hobbyicon'><i class="fas fa-skiing"/></span> {{ $t('title.hobby') }}: </div>
      <el-tag
       v-for='(j, _j) in this.$store.getters.self.interest'
       :key='_j'
       effect='plain'
       type='info'
       size='small'
      >{{ j }}</el-tag>
    </div>
    <div id='gallery'>
      <el-carousel :intervel='4000' height='400px' arrow='always' type='card'>
        <el-carousel-item v-for='(k, _k) in this.$store.getters.self.gallery' :key='_k' lazy>
          <el-image
           style='height:100%'
           fit='scale-down'
           :src='"/img/" + k'
           :preview-src-list='["/img/" + k]'
          ></el-image>
        </el-carousel-item>
      </el-carousel>
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
  color: $col-text;
  font-size: $bs;
  line-height: $lh-md;
  padding-left: 35px;
  list-style: none
}
#statement li::before {
  content: "\25B8";
  color: $col-info;
  display: inline-block;
  width: 1em;
  margin-left: -1.2em;
  margin-right: 0.2em
}
#hobby {
  line-height: $lh-lg;
  margin: $mar-md $mar-md $mar-md 33px
}
#gallery {
  margin: $mar-sm $mar-md
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
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
h2 {
  color: $col-thm
}
</style>
