<template lang="pug">
div#project-list
  section
    div(v-for="project in projectList")
      h2 {{project.title}}
      p {{project.description}}
      ul(v-for="tag in project.tags")
        li {{tag}}
      a(:href="project.source") View Source
</template>

<script>
export default {
  data() {
    return {
      popup: false,
      projectList: [
        {
          path: 'linebox',
          title: 'Wireframe',
          description: 'Simple wireframe',
          tags: [
            'threejs', 'webGL', 'Mar2019'
          ],
          source: 'https://github.com/'
        }
      ],
    }
  },
  componends: {
    // Ball,
  },
  methods: {
    PopupProject() {
      console.log('Pass');
      this.popup = true;
      console.log(this.popup)
    }
  }
}
</script>

<style lang="stylus" scoped>
div#project-list
  margin 0 auto
  max-width 1000px
  position relative
  z-index 1
  section
    display flex
    flex-direction row
    div
      width 98%
      height 190px
      background rgba(255,255,255,0.1)
      display block
      border 3px solid #111
      padding 20px
      transition 0.5s
      cursor pointer
      margin 15px 1% 15px
      h2
        font-size 20px
        color #000
        transition .8s
      p
        font-size 12px
        color #555
        line-height 12px
        font-family Arial, Helvetica, sans-serif
      ul
        list-style none
        display flex
        flex-wrap wrap
        li 
          font-size 10px
      &:hover
        width 100%
        height 200px
        margin 10px 0
        h2
          font-size 30px
</style>
