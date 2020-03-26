<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
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
  color: $col-code;
  background-color: $col-code-bg;
  padding: 1px 4px
}
.el-popover__title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.el-popover__title p {
  font-size: $bs
}
.el-popover {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.el-tooltip__popper {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
}
.el-tooltip__popper.is-light {
  border: 1px solid $col-info
}
.el-popover p {
  font-size: $sm
}
.el-popover a:link {
  color: $col-ph
}
.el-popover a:visited {
  color: $col-text-alt
}
.el-popover a:hover {
  color: $col-ok
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
.el-notification__content {
  text-align: left
}
.el-switch__label.is-active {
  color: $col-thm
}
.title-h2 {
  margin-left: 8px
}
.title-h3 {
  margin-left: 8px
}
.icon-txt {
  margin-left: 4px
}
.icon-header {
  margin-left: 4px;
  color: $col-main
}
.icon-word {
  margin-left: 4px;
  color: $col-text
}
.icon-note {
  margin-left: 4px;
  color: $col-info
}
.link:link {
  color: $col-text
}
.link:visited {
  color: $col-text-alt
}
.link:hover {
  color: $col-ok
}
</style>
