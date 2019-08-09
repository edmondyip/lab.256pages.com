<template lang="pug">
  #project-list
    section(v-for="project in homelessList" :key="project.id")
      NuxtLink(:to="project.path")
        span {{projectID(project.id)}}
        h2 // {{project.title}}
        p {{project.description}}
        //- ul
        //-   li(v-for="tag in project.tags") {{tag}}
</template>

<script>
import Left from 'left-pad';

export default {
  props: [
    'projectList'
  ],
  computed: {
    homelessList() {
      let array = this.projectList.reverse();
      array.sort((a, b) => {
        let objectA = a.id;
        let objectB = b.id;
        if (objectA > objectB) {
          return -1;
        };
        if (objectA < objectB) {
          return 1;
        }
      });
      return array;
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
    pointer-events none
    section
      position relative
      width auto
      margin 50px 30px
      > a
        pointer-events auto
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
          ul
            li
              color rbga(200,200,200,.5)
        span
          position absolute
          top 0px
          left -45px
          font-family $titleFont
          font-size 4rem
          color rgba(200,200,200,.2)
          transition 1s ease
        h2
          font-size: 2.5rem
          color $titleColor
          transition 2s
          margin 0 20px
          white-space nowrap
        p
          color $contentColor
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
            color $contentColor
        &:hover
          h2
            color $hoverColor
            background rgba(255,255,255,.5)
          span
            color $hoverColor
            top -20px
            font-size 5rem
          p
            color $hoverColor

  @media screen and (max-width $maxWidth)
    div#project-list
      padding 10px 20px
      width calc(100vw - 40px)
      section
        width 100%
        margin 0
        a
          padding 20px 20px 20px 40px
        span
          left -10px
</style>
