<template lang="pug">
  header(:style="{background: bgColor}")
    //- nav-btn
    h1 // {{projectTitle}}
    BackBtn(v-show="$route.name !== 'index'")
    button(@click="hide()") Hide UI
</template>

<script>
import NavBtn from '~/components/NavBtn.vue';
import BackBtn from '~/components/BackBtn.vue';

export default {
  props: ['bgColor', 'projectTitle'],
  components: {
    NavBtn,
    BackBtn
  },
  methods:{
    hide() {
      this.$store.commit('toggle');
    }
  }
}
</script>

<style lang="stylus" scoped>
  header
    transition .5s
    position fixed
    top 0px
    left frameWidth
    right frameWidth
    height frameWidth * 2
    z-index 2
    h1
      font-size 2rem
      transition .5s
      padding 0
      margin 0
      color #000
      line-height frameWidth * 2
    &.open
      left 0
      right 0
      padding 0 frameWidth
      top -(frameWidth * 2)
      opacity 0
</style>

