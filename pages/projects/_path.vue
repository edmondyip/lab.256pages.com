<template lang="pug">
  div.text Path:{{$route.params}} | Title: {{projectList[projectID($route.params.path)].title}}
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    methods: {
      projectID(path) {
        return this.projectList.findIndex(obj => obj.path === this.$route.params.path);
      }
    },
    computed: {
      ...mapState({
        projectList: state => state.projectList
      })
    }
  }
</script>

<style lang="stylus" scoped>
  div.text
    position fixed
    display block
    top 0
    left 0
    padding 10px
</style>
