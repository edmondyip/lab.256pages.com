<template lang="pug">
  div
    h1 {{data.title}}
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        path: this.$route.path,
      }
    },
    computed: {
      ...mapState({
        projectList: state => state.projectList,
      }),
      projectID() {
        return this.projectList.findIndex(obj => obj.path === this.$route.params.path);
      },
      data() {
        return this.projectList[this.projectID]; 
      }
    },
  }
</script>