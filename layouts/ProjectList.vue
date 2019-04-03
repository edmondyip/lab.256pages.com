<template lang="pug">
#project-list
  section(v-for="project in homelessList")
    span {{projectID(project.id)}}
    div  
      NuxtLink(:to="project.path")
        h2 // {{project.title}}
        p {{project.description}}
        ul
          li(v-for="tag in project.tags") {{tag}}
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
    position relative
    margin 0 auto
    section
      position relative
      max-width 400px
      background rgba(255,255,255,.2)
      display block
      border 1px solid #eeeeee
      margin 15px 50px 200px
      span
        position absolute
        transition .5s
        left -40px
        top 0
        font-family $titleFont
        font-size 8rem
        color rgba(0,0,0,.2)
      div
        position relative
        overflow hidden 
        transition .5s
        cursor pointer
        a
          text-decoration none
          height 100%
          padding 20px 20px 20px 80px
          display block
          h2
            font-size: 1.4rem
            color #000
            transition .5s
          a
           padding 0
           color #333333
          p
            color #333
            line-height 12px
          ul
            list-style none
            display flex
            flex-wrap wrap
            padding 5px 0
            li
              font-size .6rem
              padding 2px 5px
              border 1px solid #666
              margin 5px
              color #333333
        &:hover
          h2
            font-size 1.8rem
        span
          left -80px
          top -50px
          font-size 12rem
  @media screen and (max-width $maxWidth)
    div#project-list
      padding 10px
      width 80%
      section
        width 100%
        margin 15px 0 200px
        div
          width 100%
          &:hover
            width 100%
</style>
