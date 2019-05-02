<template lang="pug">
  div
    video#video(autoplay loop muted playsinline)
      source(src="~/assets/video/bg.mp4" type="video/mp4")
    #three
</template>

<script>
  export default {
    mounted() {
      this.init();
    },
    methods: {
      init() {
        const {
          runTime,
          scene,
          renderer,
          composer,
          camera,
          pointLight,
          controls,
          boxes,
          // stats,
          mouseX,
          mouseY,
          videogroup
        } = this;
        runTime();
      },
      runTime() {

        this.createScene();
        this.createLights();
        this.createEffect();
        this.createBox();

        this.controls = new this.$controls(this.camera);
        this.controls.enabled = false;

        // this.stats = new this.$stats();
        // document.getElementById("three").appendChild(this.stats.dom);
        this.mouseX = 0;
        this.mouseY = 0;
        window.addEventListener('resize', this.windowResize.bind(this), false);
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false);

        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        this.scene.fog = new this.$THREE.Fog(this.scene.background, 800, 2000);
        this.camera = new this.$THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1800);
        // this.camera.position.set(150, 150, 150);
        this.camera.position.z = 500;

        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({
          alpha: true,
          antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        document.getElementById("three").appendChild(this.renderer.domElement);
      },
      createLights() {
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 1);
        this.scene.add(Light);

        this.pointLight = new this.$THREE.PointLight(0xffffff, 2, 1000);
        this.pointLight.position.set(200, 100, 200);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.radius = 20;
        this.scene.add(this.pointLight);
      },
      createEffect() {
        this.composer = new this.$postprocessing.EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.addPass(new this.$postprocessing.RenderPass(this.scene, this.camera));

        const dotScreen = new this.$postprocessing.DotScreenEffect({
          blendFunction: this.$postprocessing.BlendFunction.OVERLAY,
          scale: 1.0,
          angle: Math.PI * 0.58
        });
        const colorAverage = new this.$postprocessing.ColorAverageEffect();
        const glitch = new this.$postprocessing.GridEffect();
        const effectPass = new this.$postprocessing.EffectPass(this.camera, dotScreen, glitch);
        effectPass.renderToScreen = true;
        this.composer.addPass(effectPass);
      },
      createBox() {
        const video = document.getElementById('video');
        video.play();

        const displayX = 30;
        const displayY = 30;
        this.boxes = [];

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {

            const videoTexture = new this.$THREE.VideoTexture(video);
            videoTexture.minFilter = videoTexture.magFilter = this.$THREE.LinearFilter;

            videoTexture.repeat.x = 100 / 640;
            videoTexture.offset.x = displayX / 100 * i;
            videoTexture.repeat.y = 100 / 360;
            videoTexture.offset.y = displayY / 100 * j;

            const cubeGeometry = new this.$THREE.BoxBufferGeometry(displayX, displayY, 1);
            const cubeMaterial = new this.$THREE.MeshStandardMaterial({
              map: videoTexture,
            });
            const box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
            box.position.x = i * (displayX + 4) - 30;
            box.position.y = j * (displayY + 4) - 30;

            this.scene.add(box);
            this.boxes.push(box);
          };
        };         
      },
      onMouseMove(event) {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        this.mouseX = (event.clientX - windowHalfX);
        this.mouseY = (event.clientY - windowHalfY);
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        // this.stats.update();
        const timer = 0.0001 * Date.now();
        requestAnimationFrame(this.renderScene);
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.5;
        this.camera.position.y += (this.mouseY - this.camera.position.y) * 0.5;
        this.camera.lookAt(this.scene.position);
        
        for (let i = 0, il = this.boxes.length; i < il; i++) {
          const box = this.boxes[i];
          box.rotation.x += Math.random(i)/50;
          box.rotation.y += Math.random(i)/50;
        }

        this.composer.render();
      },
    },
    beforeDestroy() {
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
      this.renderer.forceContextLoss();
      window.removeEventListener('resize', this.windowResize.bind(this), false);
      window.removeEventListener('resize', this.windowResize.bind(this), true);
    }
  }
</script>

<style lang="stylus" scoped>
  #video
    display none
</style>