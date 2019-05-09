<template lang="pug">
  section
    h1 // About Me
    p Hi, I am Edmond Yip.
    p A Web Designer & Developer from Hong Kong.
    p This website for my WebGL coding practice.
    // p I will keep update this website and public source code with tutorial later.
    p If you have any question or freelance please 
      a(href="mailto:neta.edmond@gmail.com")  contact me.
    h2 // About This Website
    p This page built by WebGL, Threejs, Vuejs, Nuxtjs.
    p Server using Nodejs with Docker.
    h2 // Update History
    p v1.3 Add Hammer
    p v1.2 Add Tree
    p v1.1 Add Video
    p v1.0 Public website
    #three
</template>

<style lang="stylus" scoped>
  section
    position fixed
    pointer-events auto
    width 50%
    // height 100vh
    margin 0 auto
    text-align right
    background rgba(0,0,0,0.8)
    padding 20px
    color #ffffff
    h1
      font-size 2.5rem
    h2
      font-size 1.5rem
    p
      > a
        color #ffffff
    @media screen and (max-width $maxWidth)
      width calc(100vw - 40px)
</style>
