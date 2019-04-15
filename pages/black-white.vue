<template lang="pug">
  #three
</template>

<script>
  export default {
    data() {
      return {
        radius: 100,
        theta: 0,
      }
    },
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
        this.scene.fog = new this.$THREE.Fog(this.scene.background, 1, 500);
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
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 1);
        this.scene.add(Light);

        this.pointLight = new this.$THREE.PointLight(0xffffff, 1, 2000);
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
        const glitch = new this.$postprocessing.GlitchEffect();
        const effectPass = new this.$postprocessing.EffectPass(this.camera, dotScreen, colorAverage, glitch);
        effectPass.renderToScreen = true;
        this.composer.addPass(effectPass);
      },
      createBox() {
        const cubeTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/wood.jpg'));
        const cubeBumpTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/wood_bump.jpg'));

        for (let i = 0; i < 20; i++) {
          const cubeGeometry = new this.$THREE.BoxBufferGeometry(15, 15, 15);
          const cubeMaterial = new this.$THREE.MeshStandardMaterial({
            map: cubeTexture,
            bumpMap: cubeBumpTexture,
            bumpScale: 0.8,
            metalness: 0,
          });
          this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
          this.box.position.x = Math.random() * 220 - 100;
          this.box.position.y = Math.random() * 220 - 100;
          this.box.position.z = Math.random() * 220 - 100;
          this.box.scale.x = this.box.scale.y = this.box.scale.z = Math.random() * 2 + 1;
          this.box.castShadow = true;
          this.box.receiveShadow = true;
          this.scene.add(this.box);
        }
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        this.stats.update();
        requestAnimationFrame(this.renderScene);
        this.theta += 0.1;
        this.camera.position.x = this.radius * Math.sin(this.$THREE.Math.degToRad(this.theta));
        this.camera.position.y = this.radius * Math.sin(this.$THREE.Math.degToRad(this.theta));
        this.camera.position.z = this.radius * Math.cos(this.$THREE.Math.degToRad(this.theta));
        this.camera.lookAt(this.scene.position);
        this.composer.render(0.02);
      },
    },
    beforeDestroy() {
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
      this.renderer.forceContextLoss();
      this.composer.dispose();
      window.removeEventListener('resize', this.windowResize.bind(this), false);
      window.removeEventListener('resize', this.windowResize.bind(this), true);
    }
  }
</script>