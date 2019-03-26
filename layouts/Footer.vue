<template lang="pug">
  section(:style="{background: bgColor}")
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
  section
    position fixed
    bottom 0px
    left 20px
    right 20px
    height 20px
    text-align right
    #copy
      font-size 10px
      color #000
      line-height 20px
      text-transform uppercase
</style>
