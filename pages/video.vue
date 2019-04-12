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
          box,
          stats,
          mouseX,
          mouseY
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

        this.stats = new this.$stats();
        // document.getElementById("three").appendChild(this.stats.dom);
        this.mouseX = 0;
        this.mouseY = 0;
        window.addEventListener('resize', this.windowResize.bind(this), false);
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false);

        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 1, 600);
        this.camera = new this.$THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
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
        const videoTexture = new this.$THREE.VideoTexture(video);

        const cubeGeometry = new this.$THREE.BoxBufferGeometry(200, 120, 2);
        const cubeMaterial = new this.$THREE.MeshStandardMaterial({
          map: videoTexture,
        });
        this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.box.position.set(30, 0, -30);
        this.box.castShadow = true;
        this.box.receiveShadow = true;
        this.scene.add(this.box);
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
        this.stats.update();
        requestAnimationFrame(this.renderScene);
        // this.box.rotation.y += 0.006;
        // this.box.rotation.x += 0.003;
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.5;
        this.camera.position.y += (this.mouseY - this.camera.position.y) * 0.5;
        this.camera.lookAt(this.scene.position);

        console.log('position:' + this.camera.position.x, this.camera.position.y)
        console.log('mouse:' + this.mouseX, this.mouseY)

        this.composer.render();
        // this.renderer.render(this.scene, this.camera);
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
    display block
    height 1px
    // width 1px
    position fixed
    bottom 0
    left 0
</style>
