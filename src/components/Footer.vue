<template>
  <div class="footer">
    <span>
      <i class='fas fa-copyright'/>
      <span class='icon-txt'>
        {{ this.parseYear(this.$store.getters.misc.copyright.from) }}-{{ this.parseYear(this.$store.getters.misc.copyright.thru) }}
      </span>
    </span>
    <span v-html='this.$store.getters.misc.copyright.content'></span>
    <span v-html='this.$store.getters.misc.footnote'></span>
</div>
</template>

<script>
export default {
  methods: {
    parseYear (yr) {
      let rslt = isNaN(new Date(parseInt(yr))) ? new Date() : new Date(yr)
      return rslt.getUTCFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  margin: 0;
  padding: $mar-sm $mar-md;
  color: $col-info;
  font-size: small;
  line-height: $lh-lg
}
</style>
