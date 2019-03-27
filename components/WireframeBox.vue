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
          box,
        } = this;
        runTime();
      },
      runTime() {
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
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
        this.scene.add(Light);

        const PointLight = new this.$THREE.PointLight(0xffffff, 1, 400);
        PointLight.position.set(150, 0, 50);
        PointLight.castShadow = true;
      },
      createBox() {
        this.cubeGeometry = new this.$THREE.BoxBufferGeometry(100, 100, 100, 5, 5, 5);
        this.cubeMaterial = new this.$THREE.MeshLambertMaterial({
          color: 0xffeeee,
          wireframe: true,
        });
        this.box = new this.$THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
        this.box.position.set(30, 0, -50);
        this.box.castShadow = true;
        this.box.receiveShadow = true;
        this.scene.add(this.box);
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        this.renderer.render(this.scene, this.camera);
        this.box.rotation.y += 0.005;
        requestAnimationFrame(this.renderScene);
      }
    },
    beforeDestroy() {
      this.scene = null;
      // this.renderer.dispose();
      window.removeEventListener('resize', this.windowResize.bind(this), false);
      window.removeEventListener('resize', this.windowResize.bind(this), true);
    }
  }
</script>