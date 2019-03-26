<template lang="pug">
  div
    nuxt-link(to="/")
      span.line
      span.line
      span.line
</template>

<script>
export default {
  data() {
    return {
      n: 0,
    }
  }
}
</script>

<style lang="stylus" scoped>
  div
    // position fixed
    top 20px
    right 20px
    width 20px
    height 16px
    padding 14px
    display block
    cursor pointer
    transition .5s
    z-index 4
    &:hover
      background rgba(255,255,255,.1)
    .line
      width 20px
      height 3px
      display block
      background rgba(0,0,0,.1)
      margin-bottom 3px
      &:last-child
        margin 0
</style>
