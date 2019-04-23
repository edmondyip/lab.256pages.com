<template lang="pug">
  #container
    transition(name="ease" mode="in-out")
      nuxt
    //- ViewSource(:source="sourceURL" v-show="$route.name !== 'index'")
    First
    Projects(:projectList="projectList")
    PageFooter
    PageHeader(:style="{background: projectID().frameColor}" :projectTitle="projectID().title" :theme="projectID().darkTheme")
</template>

<script>
  import {mapState} from 'vuex';
  import PageHeader from '~/layouts/Header.vue';
  import PageFooter from '~/layouts/Footer.vue';
  import First from '~/components/FirstBlock.vue';
  import Projects from '~/layouts/ProjectList.vue';
  // import ViewSource from '~/components/ViewSource.vue';

  export default {
    head() {
      return {
        title: this.projectID().title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: this.projectID().description,
        }]
      }
    },
    computed: {
      ...mapState (
        {
          projectList: state.projectList
        }
      )
    },
    methods: {
      projectID() {
        let now = this.$route.path;
        const index = {
          path: '/',
          title: 'Build with VueJS & WebGL',
          description: "Edmond Yip's WebGL Experiment. You can find some example for Threejs here. ",
          frameColor: 'rgba(255,255,255,.9)',
          darkTheme: false,
        };
        const about = {
          path: '/about',
          title: 'About',
          description: 'Know more about Edmond and this website.',
          frameColor: 'rgba(0,0,0,.8)',
          darkTheme: true,
        };
        if (now === '/') {
          return index;
        } else if (now === '/about') {
          return about;
        } return this.projectList[this.projectList.findIndex(obj => obj.path === now)];
      },
    },
    components: {
      PageHeader,
      PageFooter,
      Projects,
      First,
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
      transition opacity 3s
      opacity 1
    .ease-enter, .ease-leave-to
      opacity 0
      margin-top -20px
</style>