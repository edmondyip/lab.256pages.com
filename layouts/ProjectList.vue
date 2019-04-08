<template lang="pug">
#project-list
  section(v-for="project in homelessList")
    NuxtLink(:to="project.path")
      span {{projectID(project.id)}}
      h2 // {{project.title}}
      p {{project.description}}
      //- ul
      //-   li(v-for="tag in project.tags") {{tag}}
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
      return (this.projectList.slice(1)).reverse();
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
    margin 0 auto 50px
    section
      position relative
      width auto
      margin 50px 30px
      > a
        width auto
        display inline-block
        text-decoration none
        padding 20px
        &.nuxt-link-active
          h2
            color rgba(200,200,200,.5)
          span
            color rgba(200,200,200,.5)
          p
            color rgba(200,200,200,.5)
        span
          position absolute
          top 0px
          left -45px
          font-family $titleFont
          font-size 4rem
          color rgba(20,20,20,.2)
          transition 1s ease
        h2
          font-size: 2.5rem
          color #111
          transition 2s
          margin 0 20px
        p
          color #333
          line-height 12px
          margin 0 20px
          transition 2s ease
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
            color #eee
          span
            color #eee
            top -20px
            font-size 5rem
          p
            color #eee

  @media screen and (max-width $maxWidth)
    div#project-list
      padding 10px
      width 100%
      section
        width 100%
        margin 0
        div
          width 100%
          a
            h2
              font-size 3rem
          &:hover
            width 100%
</style>
