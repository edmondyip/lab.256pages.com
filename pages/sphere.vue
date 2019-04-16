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
          sphere,
          pointLight,
          pointLight2,
          stats,
        } = this;
        runTime();
      },
      runTime() {
        this.createScene();
        this.createLights();
        this.createObject();

        this.controls = new this.$controls(this.camera);
        this.controls.enabled = false;
        this.controls.enableZoom = false;
        this.controls.minPolarAngle = Math.PI/4;
        this.controls.maxPolarAngle = Math.PI/4;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1;

        this.stats = new this.$stats();
        // document.getElementById("three").appendChild(this.stats.dom);

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 200, 400);
        this.camera = new this.$THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.set(0, 150, -100);
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

        this.pointLight = new this.$THREE.PointLight(0xffffff, 1, 600);
        this.pointLight.position.set(0, 100, 0);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.radius = 10;
        this.scene.add(this.pointLight);
      },
      createObject() {
        const backgroundImage = [
          require('~/assets/img/sphere/px.jpg'),
          require('~/assets/img/sphere/nx.jpg'),
          require('~/assets/img/sphere/py.jpg'),
          require('~/assets/img/sphere/ny.jpg'),
          require('~/assets/img/sphere/pz.jpg'),
          require('~/assets/img/sphere/nz.jpg')];
        const backgroundTexture = new this.$THREE.CubeTextureLoader().load(backgroundImage);
        const cubeGeometry = new this.$THREE.SphereBufferGeometry(5, 20, 20);
        const cubeMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.2,
          envMap: backgroundTexture
        });
        this.sphere = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.sphere.castShadow = true;
        this.sphere.receiveShadow = true;
        this.sphere.position.y = 8;
        this.scene.add(this.sphere);

        const planeTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/brick.jpg'));
        planeTexture.wrapS = this.$THREE.RepeatWrapping;
        planeTexture.wrapT = this.$THREE.RepeatWrapping;
        planeTexture.repeat.x = 6;
        planeTexture.repeat.y = 6;

        const PlaneGeometry = new this.$THREE.PlaneBufferGeometry(280, 280);
        const PlaneMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xffeeee,
          map: planeTexture,
          bumpMap: planeTexture,
          metalness: 0.1,
        });
        this.floor = new this.$THREE.Mesh(PlaneGeometry, PlaneMaterial);
        this.floor.rotation.x = -Math.PI / 2;
        this.floor.position.y = -10;
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        this.stats.update();
        this.controls.update();
        requestAnimationFrame(this.renderScene);

        const timer = Date.now() * 0.00020;
        // this.pointLight.position.x = Math.sin( timer * 3 ) * 10;
        // this.pointLight.position.z = Math.cos( timer * 1 ) * 10;
        this.sphere.position.x = Math.sin( timer * 5 ) * 10;
				this.sphere.position.y = Math.cos( timer * 3 ) * 10 + 20;
        this.sphere.position.z = Math.cos( timer * 2 ) * 10;

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