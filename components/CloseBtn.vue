<template lang="pug">
  div 
    NuxtLink(to="/")
      svg(id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40")
        rect(x="19" y="-7.26" width="2" height="54.51" transform="translate(-8.28 20) rotate(-45)")
        rect(x="-7.26" y="19" width="54.51" height="2" transform="translate(-8.28 20) rotate(-45)")
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
    &.dark
      a
        svg
          fill #eeeeee
</style>
