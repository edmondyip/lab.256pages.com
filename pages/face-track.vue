<template lang="pug">
  video#video(width="400" height="300" autoplay loop)
    source(src="~/assets/video/bg.mp4")
</template>

<script>
  export default {
    mounted() {
      this.faceTrack();
    },
    methods: {
      faceTrack() {
        const video = document.getElementById('video');

        const tracker = new $clm.tracker({
          faceDetection: {
            useWebWorkers: false,
          },
        });
        clmtracker.init();
        clmtracker.start(video);
      },
    }
  }
</script>