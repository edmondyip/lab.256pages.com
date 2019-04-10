<template lang="pug">
  nav
    ul
      li
        a(href="https://256pages.com") / Home
      li
        a(href="https://blog.256pages.com") / Blog
      li
        a(href="https://github.com/edmondyip") / Github
</template>

<style lang="stylus" scoped>
  nav
    position relative
    ul
      padding 0
      margin 0
      list-style none
      display flex
      li
        padding 0 10px
        a
          color #ffffff
          text-decoration none
          &:hover
            text-decoration underline
</style>
