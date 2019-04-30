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
          camera,
          controls,
          model,
          stats,
          floor,
          lightningStrike
        } = this;
        runTime();
      },
      runTime() {
        this.createScene();
        this.createLights();
        // this.createEffect();
        this.createObject();

        this.controls = new this.$controls(this.camera, this.renderer.domElement);
        // this.controls.target.set(0,1,0);
        this.controls.enableZoom = false;
        // this.controls.autoRotate = true;
        // this.controls.enabled = false;

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 200, 500);
        this.camera = new this.$THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.set(5, 2, 5);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        // this.renderer.setClearColor(0x000000, 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        document.getElementById("three").appendChild(this.renderer.domElement);
      },
      createLights() {
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 1);
        this.scene.add(Light);

        const pointLight = new this.$THREE.PointLight(0xE9F7EF, 2, 50);
        pointLight.position.set(-3, 3, -3);
        pointLight.castShadow = true;
        this.scene.add(pointLight);

        const pointLight2 = new this.$THREE.PointLight(0xFEF9E7, 2, 50);
        pointLight2.position.set(5, 5, 5);
        pointLight2.castShadow = true;
        this.scene.add(pointLight2);
      },
      createObject() {
        const loader = new this.$gltfloader();
        loader.load (
          './model/hammer.gltf', (gltf) => {
            this.model = gltf.scene;
            this.model.position.set(0,-1.2,0);
            this.model.scale.set(0.5,0.5,0.5);
            this.model.rotation.y = 3.8;
            this.model.castShadow = true;
            this.model.receiveShadow = true;
            this.scene.add((this.model));
          }
        );

        // const lightningShape = new this.$THREE.Shape();
        // lightningShape.moveTo(1, 0);
        // lightningShape.lineTo(3, -0);
        // lightningShape.lineTo(2, -2);
        // lightningShape.lineTo(3, -2);
        // lightningShape.lineTo(0, -5);
        // lightningShape.lineTo(1, -3);
        // lightningShape.lineTo(0, -3);
        // lightningShape.lineTo(1, 0);

        // const extrubeSetting = {
        //   amount: 1,
        //   bevelEnabled: false,
        //   bevelSegments: 1,
        //   steps: 1,
        // };

        // const lightningGeometry = new this.$THREE.ExtrudeGeometry(lightningShape, extrubeSetting);
        // const lightning = new this.$THREE.Mesh(lightningGeometry, new this.$THREE.MeshBasicMaterial({color: 0xffee00}));
        // lightning.scale.set(0.5, 0.5, 0.5)
        // this.scene.add(lightning);
      },
      createEffect() {
        this.composer = new this.$postprocessing.EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.addPass(new this.$postprocessing.RenderPass(this.scene, this.camera));
        const bloom = new this.$postprocessing.BloomEffect();
        bloom.kernelSize = 4;
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
        requestAnimationFrame(this.renderScene);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        // this.composer.render();
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