<template lang="pug">
  div.btn
    a(:href="source" target="_blank") View Source
</template>

<script>
  export default {
    props: [
      'source'
    ]
  }
</script>

<style lang="stylus" scoped>
  a
    width 100px
    height 36px
    bottom 50px
    right 10px
    line-height 36px
    text-align center
    text-decoration none
    display block
    position fixed
    background rgba(0,0,0,.5)
    color #ffffff
</style>
