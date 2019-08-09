<template lang="pug">
  footer
    FooterNav
    #copy &copy Edmond Yip
</template>

<script>
import FooterNav from '~/components/FooterNav';
export default {
  props: [
    'bgColor', 'theme'
  ],
  components: {
    FooterNav
  }
}
</script>


<style lang="stylus" scoped>
  footer
    transition .5s
    position relative
    background rgba(0,0,0,0.5)
    padding 10px
    #copy
      position absolute
      right 10px
      top 0
      padding 10px
      font-size 10px
      color #ffffff
      text-transform uppercase
      &.dark
        color #eeeeee
  @media screen and (max-width $maxWidth)
    footer
      // height calc(var(--frameWidth) / 2)
      width calc(100vw - 20px)
      #copy
        padding 30px 0 10px
        position relative
        text-align center
</style>
