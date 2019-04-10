<template lang="pug">
  header(:style="{background: bgColor}")
    transition(name="ease" mode="in-out" tag="div")
      h1(:class="{dark: theme}") // {{projectTitle}}
    Close(v-show="$route.name !== 'index'" :class="{dark: theme}")
</template>

<script>
import Close from '~/components/CloseBtn.vue';

export default {
  props: ['bgColor', 'projectTitle', 'source', 'theme'],
  components: {
    Close,
  },
}
</script>

<style lang="stylus" scoped>
  header
    transition .5s
    position fixed
    top 0
    right 0
    bottom 0
    width  60px
    padding 60px 0 0
    h1
      font-size 2rem
      white-space nowrap
      transition .5s
      transform rotate(90deg)
      color #111111
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

