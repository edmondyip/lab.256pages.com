<template lang="pug">
  header(:style="{background: bgColor}")
    transition(name="ease" mode="in-out" tag="div")
      h1(:class="{dark: theme}") // {{projectTitle}}
    Close(v-show="$route.name !== 'index'" :class="{dark: theme}")
</template>

<script>
import NavBtn from '~/components/NavBtn.vue';
import Close from '~/components/CloseBtn.vue';

export default {
  props: ['bgColor', 'projectTitle', 'source', 'theme'],
  components: {
    NavBtn,
    Close,
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
      color #111111
      line-height var(--frameWidthx2)
      &.dark
        color #eeeeee

  @media screen and (max-width $maxWidth)
    header
      height 0
      overflow hidden
      h1
        font-size 1.8rem
        padding 0 var(--frameWidth)
        line-height var(--frameWidth)
</style>

