<template lang="pug">
  #three
</template>

<script>
  export default {
    head: {
      title: ''
    },
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
        this.createObject();

        this.controls = new this.$controls(this.camera, this.renderer.domElement);
        // this.controls.enabled = false;

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        this.scene.fog = new this.$THREE.Fog(this.scene.background, 1, 1000);
        this.camera = new this.$THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(150, 150, 150);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

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
        this.scene.add(PointLight);
      },
      createObject() {
        const loader = new this.$THREE.TextureLoader();
        const textureCube = loader.load('img/paper.jpg');
        const backgroundImage = ['img/hdri/px.png', 'img/hdri/nx.png', 'img/hdri/py.png', 'img/hdri/ny.png', 'img/hdri/pz.png', 'img/hdri/nz.png'];
        const backgroundTexture = new this.$THREE.CubeTextureLoader().load(backgroundImage);
        const cubeGeometry = new this.$THREE.SphereBufferGeometry(50, 20, 20);
        const cubeMaterial = new this.$THREE.MeshPhongMaterial({
          color: 0xffeeee,
          envMap: backgroundTexture,
        });
        this.box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.box.castShadow = true;
        this.box.receiveShadow = true;
        this.scene.background = backgroundTexture;
        this.scene.add(this.box);
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
          controls,
          box,
        } = this;

        renderer.render(scene, camera);
        // box.rotation.y += 0.005;
        requestAnimationFrame(this.renderScene);
      }
    }
  }
</script>