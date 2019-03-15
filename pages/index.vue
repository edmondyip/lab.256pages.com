<template lang="pug">
  section.container
    Projects
</template>

<script>
import Projects from '~/layouts/ProjectList.vue'
// import Ball from '~/components/Ball.vue'

export default {
  components: {
    Projects,
    // Ball
  }
}
</script>


<style lang="stylus" scoped>
  section.container
    margin 0 auto
    max-width 1000px
    position relative
</style>
