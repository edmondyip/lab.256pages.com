<template lang="pug">
  div 
    NuxtLink(to="/")
     img(src="~/assets/img/close.svg")
</template>

<style lang="stylus" scoped>
  div
    width 12px
    height 12px
    right frameWidth + 10px
    top (frameWidth * 2) + 10px
    position fixed
</style>
