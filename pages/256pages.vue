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
        // this.controls.autoRotate = true;
        // this.controls.enabled = false;

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 200, 500);
        this.camera = new this.$THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
        this.camera.position.set(15, 7, 15);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // this.renderer.setClearColor(0x000000, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        document.getElementById("three").appendChild(this.renderer.domElement);
      },
      createLights() {
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 1);
        this.scene.add(Light);

        // const spotLight = new this.$THREE.SpotLight(0xEBF5FB, 2);
        // spotLight.position.set(8, 8, 0);
        // spotLight.castShadow = true;
        // spotLight.shadowMapWidth = 4000;
        // spotLight.shadowMapHeight = 4000;
        // spotLight.shadowCameraNear = 1;
        // spotLight.shadowCameraFar = 150;
        // spotLight.shadowCameraFov = 10;
        // spotLight.shadow.radius = 5;
        // this.scene.add(spotLight);

        const pointLight2 = new this.$THREE.PointLight(0xffeeee, 1.8, 20);
        pointLight2.position.set(3, 3, 3);
        pointLight2.castShadow = true;
        this.scene.add(pointLight2);

        // const pointLighthelper1 = new this.$THREE.SpotLightHelper(spotLight, 0x000000);
        // this.scene.add(pointLighthelper1);

        // const pointLighthelper2 = new this.$THREE.PointLightHelper(pointLight2, 0x000000);
        // this.scene.add(pointLighthelper2);
      },
      createObject() {
        const wallGeometry = new this.$THREE.BoxBufferGeometry(5,5,0.2, 10, 10, 2);
        const rightMaterial = new this.$THREE.MeshStandardMaterial({
          color: 0xD4EFDF,
        });
        const leftWall = new this.$THREE.Mesh(wallGeometry, rightMaterial);
        leftWall.receiveShadow = true;
        // leftWall.castShadow = true;
        leftWall.position.set(1.25,0,-1.25);
        this.scene.add(leftWall);

        const rightWall = new this.$THREE.Mesh(wallGeometry, rightMaterial);
        rightWall.receiveShadow = true;
        // rightWall.castShadow = true;
        rightWall.rotation.y = Math.PI/2;
        rightWall.position.set(-1.25,0,1.25);
        this.scene.add(rightWall);

        const floor = new this.$THREE.Mesh(wallGeometry, rightMaterial);
        floor.receiveShadow = true;
        floor.rotation.x = Math.PI / 2;
        floor.position.set(1.25, -2.4, 1.25);
        this.scene.add(floor);

        // const boxGeometry = new this.$THREE.BoxBufferGeometry(1, 1, 1);
        // this.box = new this.$THREE.Mesh(boxGeometry, rightMaterial);
        // this.box.castShadow = true;
        // this.box.position.set(2, 0, 0);
        // this.scene.add(this.box);

        const textMaterial = new this.$THREE.MeshStandardMaterial({
          color : 0x138D75,
          metalness: 0.4,
        })

        const loader = new this.$THREE.FontLoader();
        loader.load('./fonts/oswald-regular.json', font => {

          const pagesGeometry = new this.$THREE.TextBufferGeometry('256pages', {
            font: font,
            size: 1,
            height: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
          });
           const pages = new this.$THREE.Mesh(pagesGeometry, textMaterial);
           pages.rotation.y = Math.PI / 4;
           pages.position.set(-1,0,3);
           pages.castShadow = true;
           this.scene.add(pages);

          const webglGeometry = new this.$THREE.TextBufferGeometry('webgl', {
            font: font,
            size: 1.1,
            height: 0.2,
            curveSegments: 10,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
          });
           const webgl = new this.$THREE.Mesh(webglGeometry, textMaterial);
           webgl.position.set(2,0,-1.5);
           webgl.rotation.y = Math.PI;
           webgl.castShadow = true;
           this.scene.add(webgl);
        });
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        requestAnimationFrame(this.renderScene);
        this.controls.update();
        // this.box.rotation.y += 0.01;
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
  };
</script>