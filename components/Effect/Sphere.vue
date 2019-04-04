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

        this.stats = new this.$stats();
        // document.getElementById("three").appendChild(this.stats.dom);

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        this.scene.fog = new this.$THREE.Fog(this.scene.background, 200, 500);
        this.camera = new this.$THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(100, 100, -150);
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

        this.pointLight = new this.$THREE.PointLight(0xffffff, 1, 100);
        this.pointLight.position.set(0, 50, 0);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.radius = 20;
        this.scene.add(this.pointLight);

        this.pointLight2 = new this.$THREE.PointLight(0xffffff, 1, 100);
        this.pointLight2.copy(this.pointLight);
        this.scene.add(this.pointLight2);
      },
      createObject() {
        const backgroundImage = [
          require('~/assets/img/hdri/px.png'),
          require('~/assets/img/hdri/nx.png'),
          require('~/assets/img/hdri/py.png'),
          require('~/assets/img/hdri/ny.png'),
          require('~/assets/img/hdri/pz.png'),
          require('~/assets/img/hdri/nz.png')];
        const backgroundTexture = new this.$THREE.CubeTextureLoader().load(backgroundImage);
        const cubeGeometry = new this.$THREE.SphereBufferGeometry(8, 50, 50);
        const cubeMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.7,
          roughness: 0.3,
          envMap: backgroundTexture
        });
        this.sphere = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        this.sphere.castShadow = true;
        this.sphere.receiveShadow = true;
        this.sphere.position.y = 10;

        this.scene.add(this.sphere);

        const planeTexture = new this.$THREE.TextureLoader().load(require('~/assets/img/brick.jpg'));
        planeTexture.wrapS = this.$THREE.RepeatWrapping;
        planeTexture.wrapT = this.$THREE.RepeatWrapping;
        planeTexture.repeat.x = 6;
        planeTexture.repeat.y = 6;

        const PlaneGeometry = new this.$THREE.PlaneBufferGeometry(800, 800);
        const PlaneMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xffeeee,
          map: planeTexture,
          bumpMap: planeTexture
        });
        this.floor = new this.$THREE.Mesh(PlaneGeometry, PlaneMaterial);
        this.floor.rotation.x = -Math.PI / 2;
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
        requestAnimationFrame(this.renderScene);

        const timer = Date.now() * 0.00025;
        this.pointLight.position.x = Math.sin( timer * 3 ) * 20;
        this.pointLight.position.z = Math.cos( timer * 1 ) * 30;
        this.pointLight2.position.x = Math.sin( timer * 2 ) * 30;
        this.pointLight2.position.z = Math.cos( timer * 4 ) * 20;
        this.sphere.position.x = Math.sin( timer * 5 ) * 20;
				this.sphere.position.y = Math.cos( timer * 3 ) * 10 + 20;
        this.sphere.position.z = Math.cos( timer * 2 ) * 30;

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