<template lang="pug">
  header(:style="{background: bgColor}")
    //- nav-btn
    h1 // {{projectTitle}}
    BackBtn(v-show="$route.name !== 'index'")
    
</template>

<script>
import NavBtn from '~/components/NavBtn.vue';
import BackBtn from '~/components/BackBtn.vue'

export default {
  props: ['bgColor', 'projectTitle'],
  components: {
    NavBtn,
    BackBtn
  }
}
</script>

<style lang="stylus" scoped>
  header
    transition .5s
    position fixed
    top 0px
    left 20px
    right 20px
    height 30px
    z-index 2
    h1
      transition .5s
      padding 0
      margin 0
      color #000
      line-height 30px
      font-weight 300
      font-family 'Oswald', sans-serif
</style>

