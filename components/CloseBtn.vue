<template lang="pug">
  div 
    NuxtLink(to="/")
      svg(id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40")
        rect(x="19" y="-7" width="2" height="55" transform="translate(-8.28 20) rotate(-45)")
        rect(x="-7" y="19" width="55" height="2" transform="translate(-8.28 20) rotate(-45)")
</template>

<style lang="stylus" scoped>
  div
    width 24px
    height 24px
    right 18px
    top 18px
    position fixed
    svg
    &:hover
      transition .5s
      transform rotate(180deg)

  &.dark
    a
      svg
        fill #eeeeee
</style>
