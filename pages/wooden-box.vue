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
          canvasWidth,
          scene,
          renderer,
          camera,
          pointLight,
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
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 1);
        this.scene.add(Light);

        this.pointLight = new this.$THREE.PointLight(0xffffff, 1, 1000);
        this.pointLight.position.set(200, 100, 200);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.radius = 20;
        this.scene.add(this.pointLight);
      },
      createBox() {
        const cubeTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/wood.jpg'));
        const cubeBumpTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/wood_bump.jpg'));
        const cubeGeometry = new this.$THREE.BoxBufferGeometry(80, 80, 80);
        const cubeMaterial = new this.$THREE.MeshStandardMaterial({
          map: cubeTexture,
          bumpMap: cubeBumpTexture,
          metalness: 0.1,
        });
        this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.box.position.set(30, 0, -30);
        this.box.castShadow = true;
        this.box.receiveShadow = true;
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
        this.box.rotation.x += 0.005;
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
    width 100%
    height 100%
    background #ffffff
</style>
