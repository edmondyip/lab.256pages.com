<template lang="pug">
#project-list.container
  section
    div(v-for="project in homelessList")
      span {{projectID(project.id)}}
      NuxtLink(:to="project.path")
        h2 {{project.title}}
        p {{project.description}}
        ul
          li(v-for="tag in project.tags") {{tag}}
        //- a(:href="project.source") View Source
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
  div#project-list
    section
      position relative
      div
        width 400px
        height 190px
        background rgba(255,255,255,.5)
        display block
        border-right 1px solid #cccccc
        border-bottom 1px solid #cccccc
        transition 0.5s
        cursor pointer
        margin 15px 1% 100px
        h2
          font-family 'Oswald', sans-serif
          font-size 1.6rem
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
        span
          position absolute
          left -40px
          top -100px
          font-family 'Oswald', sans-serif
          font-size 8rem
          color rgba(0,0,0,.2)
        a
          text-decoration none
          width calc(100%-40px)
          height calc(100%-40px)
          padding 20px
          display block
        &:hover
          width calc(100% - 40px)
          background rgba(255,255,255,.8)
          margin 15px 0 100px
          h2
            font-size 2rem
  @media screen and (max-width: 1020px)
    div#project-list
      section
        div
          width 100%
          margin 15px 0 100px
          &:hover
            width 100%
</style>
