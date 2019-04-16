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
          scene,
          renderer,
          composer,
          camera,
          controls,
          sphere,
          particleLight,
          stats,
        } = this;
        runTime();
      },
      runTime() {
        this.createScene();
        this.createLights();
        this.createEffect();
        this.createObject();

        this.controls = new this.$controls(this.camera);
        this.controls.enabled = false;

        this.stats = new this.$stats();
        // document.getElementById("three").appendChild(this.stats.dom);

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        this.scene.fog = new this.$THREE.Fog(0x000000, 200, 400);
        this.camera = new this.$THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(100, 100, 150);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({
          alpha: true,
          antialias: true
        });
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        document.getElementById("three").appendChild(this.renderer.domElement);
      },
      createLights() {
        this.particleLight = new this.$THREE.Mesh(new this.$THREE.SphereBufferGeometry(1, 8, 8), new this.$THREE
          .MeshBasicMaterial({
            color: 0xffffff
          }));
        this.particleLight.position.y = 60;
        this.scene.add(this.particleLight);

        const pointLight = new this.$THREE.PointLight(0xffeeee, 1, 800);
        pointLight.castShadow = true;
        pointLight.shadow.radius = 5;

        this.particleLight.add(pointLight);
      },
      createObject() {
        const cubeTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/wood.jpg'));
        const cubeGeometry = new this.$THREE.BoxBufferGeometry(40, 40, 40);
        const cubeMaterial = new this.$THREE.MeshStandardMaterial({
          map: cubeTexture,
          bumpMap: cubeTexture,
          metalness: 0.1,
        });
        this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.box.castShadow = true;
        this.box.receiveShadow = true;
        this.scene.add(this.box);

        const planeTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/brick.jpg'));
        planeTexture.wrapS = this.$THREE.RepeatWrapping;
        planeTexture.wrapT = this.$THREE.RepeatWrapping;
        planeTexture.repeat.x = 6;
        planeTexture.repeat.y = 6;

        const PlaneGeometry = new this.$THREE.PlaneBufferGeometry(600, 600);
        const PlaneMaterial = new this.$THREE.MeshStandardMaterial({
          map: planeTexture,
          bumpMap: planeTexture,
          metalness: 0.1,
        });
        this.floor = new this.$THREE.Mesh(PlaneGeometry, PlaneMaterial);
        this.floor.rotation.x = -Math.PI / 2;
        this.floor.position.y = -20;
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
      },
      createEffect() {
        this.composer = new this.$postprocessing.EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.addPass(new this.$postprocessing.RenderPass(this.scene, this.camera));
        const bloom = new this.$postprocessing.BloomEffect();
        bloom.kernelSize = 3;
        bloom.setResolutionScale = 1;
        const effectPass = new this.$postprocessing.EffectPass(this.camera, bloom);
        effectPass.renderToScreen = true;
        this.composer.addPass(effectPass);
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        this.stats.update();
        requestAnimationFrame(this.renderScene);
        const timer = Date.now() * 0.00006;
        this.particleLight.position.x = Math.sin(timer * 7) * 60;
        this.particleLight.position.z = Math.cos(timer * 3) * 60;
        // this.renderer.render(this.scene, this.camera);
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
  #three 
    background #000000
</style>