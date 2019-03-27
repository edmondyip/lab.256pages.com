<template lang="pug">
  #container
    PageHeader(:bgColor="bgColor" :projectTitle="projectTitle")
    First
    Projects
    #frame(:style="{background: bgColor}")
    <transition name="background" mode="in-out">
      nuxt
    </transition>
    PageFooter(:bgColor="bgColor")
</template>

<script>
import PageHeader from '~/layouts/Header.vue';
import PageFooter from '~/layouts/Footer.vue';
import First from '~/components/FirstBlock.vue';
import Projects from '~/layouts/ProjectList.vue';
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState({
      projectList: state => state.projectList,
    }),
    projectID() {
      return this.projectList.findIndex(obj => obj.path === this.$route.path);
    },
    projectTitle() {
      return this.projectList[this.projectID].title;
    },
    bgColor() {
      return this.projectList[this.projectID].frameColor;
    },
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
    .background-enter-active, .background-leave-active
      transition opacity 3s
    .background-enter, .background-leave-to
      opacity 0
    #three
      background #fff
      position fixed
      top 0
      bottom 0
      left 20px
      right 20px
      z-index 0
      overflow hidden
      canvas
        width 100%
        height 100%
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
      transition .5s
      padding 0 20px
      position fixed
      height 100vh
      width 100%
      top 0
      bottom 0
      left 0
      right 0
      z-index -1
      @media screen and (max-width 1020px)
        padding 0 2px
</style>

