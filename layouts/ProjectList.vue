<template lang="pug">
  section
    div(v-on:click="PopupProject()")
      h2 Project title
      p Details description for this project
      //- Ball(v-if="!popup")
</template>

<script>
// import Ball from '~/components/Ball.vue'

export default {
  data() {
    return {
      popup: false,
    }
  },
  componends: {
    // Ball,
  },
  methods: {
    PopupProject() {
      console.log('Pass');
      this.popup = true;
      console.log(this.popup)
    }
  }
}
</script>


<style lang="stylus" scoped>
  section
    display flex
    flex-direction row
    div
      // background url("img/paper.jpg") center center
      width 100%
      height 200px
      background #fff
      display block
      border 3px solid #111
      border-radius 10px
      padding 20px
      box-shadow 0px 50px 50px -30px rgba(0,0,0,0.2)
      transition 0.5s
      cursor pointer
      margin 10px 0
      h2
        font-size 20px
        color #000
        transition .8s
      p
        font-size 12px
        color #555
        line-height 12px
        font-family Arial, Helvetica, sans-serif
      &:hover
        width 98%
        height 190px
        margin 15px 1% 15px
        h2
          font-size 30px
</style>
