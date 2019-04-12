<template lang="pug">
  #container
    transition(name="ease" mode="out-in")
      nuxt
    //- ViewSource(:source="sourceURL" v-show="$route.name !== 'index'")
    First
    Projects(:projectList="projectList")
    PageFooter
    PageHeader(:style="{background: projectID().frameColor}" :projectTitle="projectID().title" :theme="projectID().darkTheme")
</template>

<script>
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
    data() {
      return {
        projectList: [{
            id: 0,
            path: '/',
            title: 'Build with VueJS & webGL',
            description: 'HomePage',
            tags: [
              'threejs', 'webGL', 'Mar2019'
            ],
            source: 'https://github.com/',
            frameColor: 'rgba(255,255,255,.9)',
            darkTheme: false,
          },
          {
            id: 1,
            path: '/wireframe',
            title: 'Wireframe',
            description: 'Wireframe Box Geometry',
            tags: [
              'threejs', 'webGL', 'Mar2019'
            ],
            source: 'https://github.com/',
            frameColor: 'rgba(100,100,100,0.8)',
            darkTheme: true,
          },
          {
            id: 4,
            path: '/sphere',
            title: 'Sphere',
            description: 'Texture and Environment mapping',
            tags: [
              'threejs', 'webGL', 'Mar2019'
            ],
            source: 'https://github.com/',
            frameColor: 'rgba(40,55,71,0.9)',
            darkTheme: true,
          },
          {
            id: 3,
            path: '/garden',
            title: 'Gardan',
            description: 'Environment Reflection',
            tags: [
              'threejs', 'webGL', 'Mar2019'
            ],
            source: 'https://github.com/',
            frameColor: 'rgba(244,208,63,0.9)',
            darkTheme: true,
          },
          {
            id: 2,
            path: '/wooden-box',
            title: 'Wooden Box',
            description: 'Texture Mapping',
            tags: [
              'threejs', 'webGL', 'Mar2019'
            ],
            source: 'https://github.com/',
            frameColor: 'rgba(146,43,33,0.8)',
            darkTheme: true,
          },
          {
            id: 6,
            path: '/black-white',
            title: 'Black & White',
            description: 'Dot Screen, Color Average and Glitch Filter',
            tags: [
              'threejs', 'webGL', 'Mar2019'
            ],
            source: 'https://github.com/',
            frameColor: 'rgba(50,50,50,0.8)',
            darkTheme: true,
          },
          {
            id: 5,
            path: '/dark-room',
            title: 'Dark Room',
            description: 'Dynamic Light',
            tags: [
              'threejs', 'webGL', 'Mar2019'
            ],
            source: 'https://github.com/',
            frameColor: 'rgba(0,0,0,0.9)',
            darkTheme: true,
          },
        ],
      }
    },
    methods: {
      projectID() {
        return this.projectList[this.projectList.findIndex(obj => obj.path === this.$route.path)]
      },
      // title() {
      //   return this.projectList[this.projectList.findIndex(obj => obj.path === this.$route.path)].title;
      // },
      // frameColor() {
      //   return this.projectList[this.projectList.findIndex(obj => obj.path === this.$route.path)].frameColor;
      // },
      // darkTheme() {
      //   return this.projectList[this.projectList.findIndex(obj => obj.path === this.$route.path)].darkTheme;
      // },
      // description() {
      //   return this.projectList[this.projectList.findIndex(obj => obj.path === this.$route.path)].description;
      // }
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
      transition opacity 5s
    .ease-enter, .ease-leave-to
      opacity 0
      margin-top -20px
</style>