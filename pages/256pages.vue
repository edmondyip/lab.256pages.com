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
        } = this;
        runTime();
      },
      runTime() {
        this.createScene();
        this.createLights();
        this.createObject();

        this.controls = new this.$controls(this.camera, this.renderer.domElement);
        // this.controls.target.set(0,1,0);
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        // this.controls.enabled = false;

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 200, 500);
        this.camera = new this.$THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.set(5, 5, 5);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
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

        const spotLight = new this.$THREE.SpotLight(0xffeeee, 1, 0, 0.5, 1);
        spotLight.position.set(25, 25, 10);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        // const pointLight2 = new this.$THREE.PointLight(0xffeeee, 1, 100);
        // pointLight2.position.set(0, -8, 15);
        // pointLight2.castShadow = true;
        // this.scene.add(pointLight2);

        // const pointLighthelper1 = new this.$THREE.SpotLightHelper(spotLight, 0x000000);
        // this.scene.add(pointLighthelper1);
      },
      createObject() {
        const boxGeometry = new this.$THREE.BoxBufferGeometry(10,5,0.2);
        const boxMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xffffff,
        });
        const leftWall = new this.$THREE.Mesh(boxGeometry, boxMaterial);
        leftWall.position.set(5,0,0);
        this.scene.add(leftWall);
        const rightWall = new this.$THREE.Mesh(boxGeometry, boxMaterial);
        rightWall.rotation.y = Math.PI/2;
        rightWall.position.set(5,0,0);
        this.scene.add(rightWall);
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