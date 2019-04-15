<template lang="pug">
  section
    h1 // EDMOND YIP
    p I am a Web Designer & Developer from Hong Kong SAR.
    p This website for my WebGL coding practice.
    p This page built by WebGL, Threejs, Vuejs, Nuxtjs.
    // p I will keep update this website and public source code with tutorial later.
    p If you have any question or freelance please 
      a(href="mailto:neta.edmond@gmail.com")  contact me.
    #three
</template>

<style lang="stylus" scoped>
  section
    position fixed
    pointer-events auto
    width 50%
    height 100vh
    margin 0 auto
    text-align right
    background rgba(0,0,0,0.8)
    padding 20px
    color #ffffff
    h1
      font-size 2.5rem
    p
      > a
        color #ffffff
    @media screen and (max-width $maxWidth)
      width calc(100vw - 40px)
</style>
