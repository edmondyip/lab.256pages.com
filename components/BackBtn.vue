<template lang="pug">
  div 
    NuxtLink(to="/")
     img(src="~/assets/img/close.svg")
</template>

<style lang="stylus" scoped>
  div
    width 30px
    height 30px
    right calc(var(--frameWidth) + 10px)
    top calc(var(--frameWidthx2) + 10px)
    position fixed
</style>
