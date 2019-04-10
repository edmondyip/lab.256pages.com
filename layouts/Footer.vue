<template lang="pug">
  footer(:style="{background: bgColor}")
    #copy(:class="{dark: theme}") &copy Edmond Yip
</template>

<script>
export default {
  props: [
    'bgColor', 'theme'
  ]
}
</script>


<style lang="stylus" scoped>
  footer
    transition .5s
    position fixed
    bottom 0
    left 0
    right 0
    height var(--frameWidth)
    text-align right
    #copy
      font-size 10px
      color #111111
      line-height var(--frameWidth)
      padding 0 var(--frameWidth)
      text-transform uppercase
      &.dark
        color #eeeeee
  @media screen and (max-width $maxWidth)
    footer
      height calc(var(--frameWidth) / 2)
      #copy
        line-height calc(var(--frameWidth) / 2)
        text-align center
</style>
