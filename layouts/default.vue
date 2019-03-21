<template lang="pug">
  #container
    PageHeader
    First
    Projects
    <transition name="background" mode="out-in">
      nuxt
    </transition>
    PageFooter
</template>

<script>
import PageHeader from '~/layouts/Header.vue'
import PageFooter from '~/layouts/Footer.vue'
import First from '~/components/FirstBlock.vue'
import Projects from '~/layouts/ProjectList.vue'

export default {
  components: {
    PageHeader,
    PageFooter,
    Projects,
    First
  }
}
</script>

<style lang="stylus">
  body
    padding 0px
    margin 0px
  #container
    background #fff
</style>
