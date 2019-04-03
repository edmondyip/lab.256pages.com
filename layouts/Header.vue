<template lang="pug">
  header(:style="{background: bgColor}")
    transition(name="ease" mode="in-out" tag="div")
      h1 // {{projectTitle}}
    Close(v-show="$route.name !== 'index'")
</template>

<script>
import NavBtn from '~/components/NavBtn.vue';
import Close from '~/components/CloseBtn.vue';
import HideUI from '~/components/HideUI.vue';

export default {
  props: ['bgColor', 'projectTitle', 'source'],
  components: {
    NavBtn,
    Close,
    HideUI,
  },
}
</script>

<style lang="stylus" scoped>
  header
    transition .5s
    position fixed
    top 0
    left 0
    right 0
    height var(--frameWidthx2)
    h1
      font-size 2rem
      transition .5s
      padding 0 var(--frameWidthx2)
      margin 0
      color #000
      line-height var(--frameWidthx2)
    &.open
      height var(--frameWidth)
      h1
        line-height var(--frameWidth)

  @media screen and (max-width $maxWidth)
    header
      height var(--frameWidth)
      h1
        font-size 1.8rem
        padding 0 var(--frameWidth)
        line-height var(--frameWidth)
</style>

