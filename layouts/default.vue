<template lang="pug">
  #container
    //- #frame(:style="{borderColor: bgColor}" :class="{'index': $route.name === 'index'}")
    transition(name="ease" mode="in-out")
      nuxt(:class="{'open':showUI}")
    ViewSource(:source="sourceURL" v-show="$route.name !== 'index'")
    First(v-show="!showUI")
    Projects(v-show="!showUI")
    PageFooter(:bgColor="bgColor" :class="{'open':showUI}")
    PageHeader(:bgColor="bgColor" :projectTitle="projectTitle" :class="{'open':showUI}")
</template>

<script>
import {mapState} from 'vuex';
import PageHeader from '~/layouts/Header.vue';
import PageFooter from '~/layouts/Footer.vue';
import First from '~/components/FirstBlock.vue';
import Projects from '~/layouts/ProjectList.vue';
import ViewSource from '~/components/ViewSource.vue';

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
    sourceURL() {
      return this.projectList[this.projectID].source;
    }
  },
  components: {
    PageHeader,
    PageFooter,
    Projects,
    First,
    ViewSource
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
      font-family: $titleFont
      font-weight: 300
</style>


<style lang="stylus" scoped>
  #frame
    pointer-events none
    transition .5s
    position fixed
    border-left solid var(--frameWidth)
    border-right solid var(--frameWidth)
    height 100vh
    width calc(100vw - var(--frameWidthx2))
    top 0
    bottom 0
    left 0
    right 0
    z-index 10
    @media screen and (max-width $maxWidth)
      padding 0
    &.index
      border-width 0px
      width 100vw
</style>

