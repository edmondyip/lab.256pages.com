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
          controls,
          box,
          waterMaterial
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
        // this.controls.enabled = false;

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
        Light.castShadow = true;
        this.scene.add(Light);

        const pointLight = new this.$THREE.PointLight(0xffffff, 1, 2000);
        pointLight.position.set(200, 100, 200);
        pointLight.castShadow = true;
        pointLight.shadow.radius = 20;
        this.scene.add(pointLight);
      },
      createBox() {
        const waterGeometry = new this.$THREE.PlaneBufferGeometry(20, 20, 100, 100);
        const waterMaterial = new this.$THREE.MeshLambertMaterial({
          color: 0x2288ff,
          side: this.$THREE.DoubleSide
        });

      waterMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.time = {value: 0}
        shader.vertexShader = `
          uniform float time;
        ` + shader.vertexShader

        const token = `include <begin_vertex>`
        const customTransform = `
          vec3 transformed = vec3(position);
          float freq = 3.0;
          float amp = 0.5;
          float angle = (time + position.x)*freq;
          transformed.z += sin(angle)*amp;
        `
        shader.vertexShader = shader.vertexShader.replace(token, customTransform)
        const waterShader = shader;
      }

      const water = new this.$THREE.Mesh(waterGeometry, waterMaterial);
      water.castShadow = true;
      water.receiveShadow = true;
      this.scene.add(water);

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
        // this.box.rotation.y += 0.005;
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