<template lang="pug">
  div(@click="hide()") Hide UI
</template>

<script>
  export default {
    methods: {
      hide() {
        this.$store.commit('toggle');
      }
    }
  }
</script>