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
    position fixed
    width 20px
    height 16px
    padding 14px
    display block
    cursor pointer
    transition .5s
    border-bottom-right-radius 20px
    z-index 3
    .line
      width 20px
      height 3px
      display block
      background rgba(0,0,0,0.5)
      margin-bottom 3px
      &:last-child
        margin 0
    &:hover
      background #ccc
</style>
