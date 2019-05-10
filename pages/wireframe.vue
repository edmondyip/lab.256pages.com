<template lang="pug">
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
          canvasHeight,
          camvasWidth,
          scene,
          renderer,
          camera,
          controls,
          box,
        } = this;
        runTime();
      },
      runTime() {
        this.canvasHeight = document.getElementById("three").offsetHeight;
        this.canvasWidth = document.getElementById("three").offsetWidth;

        this.createScene();
        this.createLights();
        this.createBox();

        this.controls = new this.$controls(this.camera);
        this.controls.enabled = false;

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        this.scene.fog = new this.$THREE.Fog(this.scene.background, 1, 600);
        this.camera = new this.$THREE.PerspectiveCamera(45, this.canvasWidth / this.canvasHeight, 1, 1000);
        this.camera.position.set(150, 150, 150);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({
          alpha: true,
          antialias: true
        });

        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        document.getElementById("three").appendChild(this.renderer.domElement);
      },
      createLights() {
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
        this.scene.add(Light);
      },
      createBox() {
        const cubeGeometry = new this.$THREE.BoxBufferGeometry(100, 100, 100, 5, 5, 5);
        const cubeMaterial = new this.$THREE.MeshLambertMaterial({
          color: 0xffeeee,
          wireframe: true,
        });
        this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.box.position.set(60, 0, -50);
        this.scene.add(this.box);
      },
      windowResize() {
        this.canvasHeight = document.getElementById("three").offsetHeight;
        this.canvasWidth = document.getElementById("three").offsetWidth;

        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.camera.aspect = this.canvasWidth / this.canvasHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        requestAnimationFrame(this.renderScene);
        this.box.rotation.y += 0.005;
        this.renderer.render(this.scene, this.camera);
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
  #three
    width 1000px
    height 500px
    background #ffffff
</style>
