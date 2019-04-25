<template lang="pug">
  #first.container
    section
      h1 Real time 3D Web Experiment
      p By Edmond Yip
      span Designer & Developer from Hong Kong
      span Use Computer for better experience
</template>

<style lang="stylus" scoped>
  #first
    position relative
    height 100vh
    display flex
    align-items center
    color $titleColor
    section
      padding 0 20px
      h1
        font-size 2.5rem
        text-transform uppercase
        margin 10px 0
      span
        font-size .8rem
        color $contentColor
        display block
      p
        font-size 1rem
        margin 0
</style>
