<template lang="pug">
  #container
    PageHeader
    First
    Projects
    div#frame
    <transition name="background" mode="out-in">
      nuxt
    </transition>
    PageFooter
</template>

<script>
import PageHeader from '~/layouts/Header.vue'
import PageFooter from '~/layouts/Footer.vue'
import First from '~/components/FirstBlock.vue'
import Projects from '~/layouts/ProjectList.vue'
import {mapState} from 'vuex'

export default {
  methods: {
    projectID(id) {
      return this.projectList.findIndex(obj => obj.id === this.$route.params.path);
    }
  },
  computed: {
    ...mapState({
      projectList: state => state.projectList
    })
  },
  components: {
    PageHeader,
    PageFooter,
    Projects,
    First
  }
}
</script>

<style lang="stylus">
  body
    padding 0px
    margin 0px
    font-family Arial, Helvetica, sans-serif
    font-size 12px
    text-rendering optimizeLegibility
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    .container
      padding 10px
      width 1000px
      margin 0 auto
      position relative
      z-index 1
      @media screen and (max-width 1020px)
        width calc(100% - 20px)
        margin 0
</style>

<style lang="stylus" scoped>
  #container
    padding 10px
    width 1000px
    margin 0 auto
    position relative
    z-index 1
    @media screen and (max-width 1020px)
      width calc(100% - 40px)
    #frame
      background none
      position fixed
      border-left 10px solid #ffee00
      border-right 10px solid #ffee00
      height 100vh
      width calc(100% - 20px)
      top 0
      bottom 0
      left 0
      right 0
      z-index 0
</style>

