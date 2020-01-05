<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0px
}
body {
  margin: 0;
  padding: 0
}
code {
  color: #8932AF;
  background-color: #eeeeee99;
  padding: 1px 4px
}
.el-popover__title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.el-popover__title p {
  font-size: 14px
}
.el-popover {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.el-tooltip__popper {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.el-popover p {
  font-size: 12px
}
.el-popover a:link {
  color: #888
}
.el-popover a:visited {
  color: #ccc
}
.el-popover a:hover {
  color: #67C23A
}
.el-popover .el-card__header {
  margin: 0;
  padding: 8px 20px 0px 20px
}
.el-popover .el-card__body {
  margin: 0;
  padding: 0px 20px 8px 20px
}
.el-notification {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
</style>
