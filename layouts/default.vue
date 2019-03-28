<template lang="pug">
  #container
    PageHeader(:bgColor="bgColor" :projectTitle="projectTitle" :class="{'open':showUI}")
    First(v-show="!showUI")
    Projects(v-show="!showUI")
    #frame(:style="{background: bgColor}")
    <transition name="background" mode="in-out">
      nuxt(:class="{'open':showUI}")
    </transition>
    PageFooter(:bgColor="bgColor" :class="{'open':showUI}")
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
      showUI: state => state.gui,
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
    h1, h2
      font-family: titleFont
      font-weight: 300
</style>


<style lang="stylus" scoped>
  #container
    padding 10px
    width 1000px
    margin 0 auto
    position relative
    z-index 1
    @media screen and (max-width 1020px)
      width calc(100% - (frameWidth * 2))
    #frame
      transition .5s
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

