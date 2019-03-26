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
          runTime
        } = this;
        runTime();
      },
      runTime() {
        const height = window.innerHeight;
        const width = window.innerWidth;

        this.createScene();
        this.createLights();
        this.createBox();
        // this.createPlane();
        this.createEffect();

        this.controls = new this.$controls(this.camera, this.renderer.domElement);
        this.controls.enabled = false;

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        this.scene.fog = new this.$THREE.Fog(this.scene.background, 1, 600);
        this.camera = new this.$THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(150, 150, 150);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById("three").appendChild(this.renderer.domElement);
      },
      createLights() {
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
        this.scene.add(Light);

        const PointLight = new this.$THREE.PointLight(0xffffff, 1, 400);
        PointLight.position.set(150, 0, 50);
        PointLight.castShadow = true;
        // this.scene.add(PointLight);

        // const PointLightHelper = new this.$THREE.PointLightHelper(PointLight, 400);
        // this.scene.add(PointLightHelper);
      },
      createBox() {
        const cubeGeometry = new this.$THREE.BoxBufferGeometry(100, 100, 100, 5, 5,5);
        const cubeMaterial = new this.$THREE.MeshLambertMaterial({
          color: 0xffeeee,
          wireframe: true,
        });
        this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.box.position.set(30, 0, -50);
        this.box.castShadow = true;
        this.box.receiveShadow = true;
        this.scene.add(this.box);
      },
      createPlane() {
        const planeGeometry = new this.$THREE.PlaneBufferGeometry(600, 600, 10, 10);
        const planeMaterial = new this.$THREE.MeshLambertMaterial({
          color: 0xcccccc,
          // side: this.$THREE.DoubleSide,
          wireframe: true,
        });
        const land = new this.$THREE.Mesh(planeGeometry, planeMaterial);
        land.receiveShadow = true;
        land.rotation.x = Math.PI / 2;
        land.position.y = -40;
        // this.scene.add(land);
      },
      createEffect() {
        this.composer = new this.$postprocessing.EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.addPass(new this.$postprocessing.RenderPass(this.scene, this.camera));

        const effectPass = new this.$postprocessing.EffectPass(this.camera, new this.$postprocessing.GlitchEffect(0.5));
        effectPass.renderToScreen = true;
        this.composer.addPass(effectPass);
      },
      windowResize() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        const {
          scene,
          renderer,
          camera,
          composer,
          controls,
          box,
        } = this;

        renderer.render(scene, camera);
        box.rotation.y += 0.005;
        requestAnimationFrame(this.renderScene);
      }
    }
  }
</script>