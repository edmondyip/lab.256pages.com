<template lang="pug">
  #container
    transition(name="ease" mode="out-in")
      nuxt
    //- ViewSource(:source="sourceURL" v-show="$route.name !== 'index'")
    First
    Projects
    PageFooter(:bgColor="bgColor" :theme="theme")
    PageHeader(:bgColor="bgColor" :projectTitle="projectTitle" :theme="theme")
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
    theme() {
      return this.projectList[this.projectID].darkTheme;
    },
    sourceURL() {
      return this.projectList[this.projectID].source;
    },
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
    font-family 'Lato', sans-serif
    font-size 12px
    text-rendering optimizeLegibility
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    h1, h2
      font-family: $titleFont
      font-weight: 300
    .ease-enter-active, .ease-leave-active
      transition opacity 5s
    .ease-enter, .ease-leave-to
      opacity 0
      margin-top -20px
</style>