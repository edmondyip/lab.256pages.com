<template lang="pug">
  div 
    NuxtLink(to="/")
     img(src="~/assets/img/close.svg")
</template>

<style lang="stylus" scoped>
  div
    width 30px
    height 30px
    right 20px
    top 20px
    position fixed
    @media screen and (max-width $maxWidth)
      width 20px
      height 20px
      right 10px
      top 10px
</style>
