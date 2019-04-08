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
          pointLight,
          controls,
          box,
          stats,
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

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 1, 600);
        this.camera = new this.$THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(150, 150, 150);
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
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 0.7);
        this.scene.add(Light);

        this.pointLight = new this.$THREE.PointLight(0xffffff, 5, 200);
        this.pointLight.position.set(50, 80, 80);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.radius = 20;
        this.scene.add(this.pointLight);
      },
      createEffect() {
        this.composer = new this.$postprocessing.EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.addPass(new this.$postprocessing.RenderPass(this.scene, this.camera));

        const effectPass = new this.$postprocessing.EffectPass(this.camera, new this.$postprocessing.GlitchEffect(64));
        effectPass.renderToScreen = true;
        this.composer.addPass(effectPass);
        },
      createBox() {
        const cubeTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/wood.jpg'));

          const cubeGeometry = new this.$THREE.BoxBufferGeometry(70, 70, 70);
          const cubeMaterial = new this.$THREE.MeshStandardMaterial({
            // color: 0xffeeee,
            map: cubeTexture,
            bumpMap: cubeTexture,
          });
          this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
          this.box.position.set(30, 0, -50);

          // this.box.rotation.x = Math.random() * 10 * Math.PI;
          // this.box.rotation.y = Math.random() * 10 * Math.PI;
          // this.box.rotation.z = Math.random() * 10 * Math.PI;

          this.scene.add(this.box);
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        this.stats.update();
        requestAnimationFrame(this.renderScene);
        this.box.rotation.y += 0.005;
        this.box.rotation.x += 0.005;
        // this.renderer.render(this.scene, this.camera);
        this.composer.render(0.03);
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