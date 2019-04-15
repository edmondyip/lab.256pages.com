<template lang="pug">
  nav
    ul
      li
        NuxtLink(to="/") /Home
      li
        NuxtLink(to="/about") / About
      li
        a(href="https://256pages.com") / 256pages
      li
        a(href="https://blog.256pages.com" target="_blank") / Blog
      li
        a(href="https://github.com/edmondyip" target="_blank") / Github
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
      @media screen and (max-width $maxWidth)
        display flex
        justify-content space-between
</style>
