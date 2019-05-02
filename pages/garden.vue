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
          innerSphere,
          // stats,
        } = this;
        runTime();
      },
      runTime() {
        this.createScene();
        this.createLights();
        this.createObject();

        this.controls = new this.$controls(this.camera);
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        this.controls.enabled = false;

        // this.stats = new this.$stats();
        // document.getElementById("three").appendChild(this.stats.dom);

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 200, 500);
        this.camera = new this.$THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.set(150, 100, -150);
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
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
        this.scene.add(Light);
      },
      createObject() {
        const backgroundImage = [          
          require('~/assets/img/garden/px.jpg'),
          require('~/assets/img/garden/nx.jpg'),
          require('~/assets/img/garden/py.jpg'),
          require('~/assets/img/garden/ny.jpg'),
          require('~/assets/img/garden/pz.jpg'),
          require('~/assets/img/garden/nz.jpg')
          ];
        const backgroundTexture = new this.$THREE.CubeTextureLoader().load(backgroundImage);
        const sphereGeometry = new this.$THREE.SphereBufferGeometry(15, 15, 15);
        const torusGeometry = new this.$THREE.TorusBufferGeometry(35, 15, 25, 50);
        const sphereMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.2,
          roughness: 0.1,
          envMap: backgroundTexture
        });
        const innerSphereMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.1,
          envMap: backgroundTexture
        });
        this.sphere = new this.$THREE.Mesh(torusGeometry, sphereMaterial);
        this.sphere.castShadow = true;
        this.sphere.receiveShadow = true;
        this.scene.add(this.sphere);

        this.innerSphere = new this.$THREE.Mesh(sphereGeometry, innerSphereMaterial);
        this.innerSphere.receiveShadow = true;
        this.scene.add(this.innerSphere);

        this.scene.background = backgroundTexture;
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        // this.stats.update();
        requestAnimationFrame(this.renderScene);

        const timer = Date.now() * 0.00025;
        // this.sphere.position.x = Math.sin( timer * 5 ) * 20;
				// this.sphere.position.y = Math.cos( timer * 3 ) * 10 + 20;
        // this.sphere.position.z = Math.cos( timer * 2 ) * 30;
        this.sphere.rotation.x += 0.005;
        this.sphere.rotation.y += 0.005;
        this.sphere.rotation.z += 0.005;

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