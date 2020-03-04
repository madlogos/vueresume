<template>
  <h3 id='attach'>
    <a :href='this.$store.getters.misc.attachment' target='_blank'>
      <i class='fas fa-download'/><span class='title-h3'>{{ $t('title.download') }}</span>
    </a>
  </h3>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#attach a:link {
  color: $col-bg
}
#attach a:visited {
  color: $col-text
}
#attach a:hover {
  color: $col-ok
}
</style>
