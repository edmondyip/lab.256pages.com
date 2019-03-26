<template lang="pug">
#project-list.container
  section
    div(v-for="project in homelessList")
      NuxtLink(:to="project.path")
        h2 {{project.title}}
      p {{project.description}}
      ul
        li(v-for="tag in project.tags") {{tag}}
      //- a(:href="project.source") View Source
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      projectList: state => state.projectList
    }),
    homelessList() {
      return this.projectList.slice(1);
    }
  },
}
</script>

<style lang="stylus" scoped>
  div#project-list
    section
      position relative
      div
        width calc(98% - 40px)
        height 190px
        background rgba(0,0,0,0.1)
        display block
        // border 1px solid #fff
        padding 20px
        transition 0.5s
        cursor pointer
        margin 15px 1% 100px
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
          padding 5px
          l
            font-size .8rem
            padding 2px 5px
            border 1px solid #ccc
            margin 5px
        a
          text-decoration none
        //   display inline
        //   padding 5px 10px
        //   background rgba(0,0,0,0.5)
        //   color #fff
        //   font-size 10px
        &:hover
          width calc(100% - 40px)
          // height 200px
          margin 15px 0 100px
          h2
            font-size 30px
  @media screen and (max-width: 1020px)
    div#project-list
      section
        div
          width calc(100% - 40px)
          margin 15px 0
          &:hover
            width 70%
</style>
