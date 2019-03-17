<template lang="pug">
  section.container
    no-ssr
      Test
</template>

<script>
import Projects from '~/layouts/ProjectList.vue'
import Test from '~/components/Test.vue'

export default {
  components: {
    Projects,
    Test,
  },
}
</script>


<style lang="stylus" scoped>
  section.container
    margin 0 auto
    max-width 1000px
    position relative
</style>
