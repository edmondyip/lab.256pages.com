<template lang="pug">
  #container
    //- PageHeader
    nuxt
    //- PageFooter
</template>

<script>
import PageHeader from '~/layouts/Header.vue'
import PageFooter from '~/layouts/Footer.vue'

export default {
  components: {
    PageHeader,
    PageFooter
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
