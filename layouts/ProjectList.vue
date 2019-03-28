<template lang="pug">
#project-list.container
  section(v-for="project in homelessList")
    span {{projectID(project.id)}}
    div  
      NuxtLink(:to="project.path")
        h2 // {{project.title}}
        p {{project.description}}
        ul
          li(v-for="tag in project.tags") {{tag}}
        //- a(:href="project.source") View Source
      video
         source(src="~/assets/video/01.mp4" type="video/mp4")
</template>

<script>
import {mapState} from 'vuex'
import Left from 'left-pad'

export default {
  computed: {
    ...mapState({
      projectList: state => state.projectList
    }),
    homelessList() {
      return this.projectList.slice(1);
    }, 
  },
  methods: {
    projectID(id) {
      return Left(id, 2, '0');
    }
  }
}
</script>

<style lang="stylus" scoped>
  #project-list
    padding 30px
    section
      position relative
      width 500px
      background rgba(255,255,255,.5)
      display block
      border 1px solid #eeeeee
      margin 15px 50px 100px
      span
        position absolute
        transition .5s
        left -20px
        top 0
        font-family titleFont
        font-size 8rem
        color rgba(0,0,0,.2)
      div
        position relative
        overflow hidden 
        transition 0.5s
        cursor pointer
        video
          position absolute
          top 0
          right 0
          width 100%
          z-index -2
        h2
          color #000
          transition .8s
        p
          font-size 12px
          color #333
          line-height 12px
        ul
          list-style none
          display flex
          flex-wrap wrap
          padding 5px 0
          li
            font-size .8rem
            padding 2px 5px
            border 1px solid #666
            margin 5px
            color #333333
            text-direction none
        a
          text-decoration none
          height 100%
          padding 20px 20px 20px 80px
          display block
      &:hover
        h2
          font-size 1.8rem
        span
          left -80px
          top -100px
          font-size 12rem
  @media screen and (max-width: 1020px)
    div#project-list
      section
        div
          width 100%
          margin 15px 0 100px
          &:hover
            width 100%
</style>
