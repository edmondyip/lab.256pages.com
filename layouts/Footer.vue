<template lang="pug">
  footer(:style="{background: bgColor}")
    #copy &copy Edmond Yip
</template>

<script>
export default {
  props: [
    'bgColor'
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
      color #000
      line-height var(--frameWidth)
      padding 0 var(--frameWidth)
      text-transform uppercase
</style>
