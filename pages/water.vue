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
          waterShader,
          time,
          mouseX,
          mouseY,
          stats
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
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        this.controls.enabled = false;

        this.stats = new this.$stats();
        document.getElementById("three").appendChild(this.stats.dom);

        window.addEventListener('resize', this.windowResize.bind(this), false);
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false);

        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 1, 600);
        this.camera = new this.$THREE.PerspectiveCamera(25, this.canvasWidth / this.canvasHeight, 1, 1000);
        this.camera.position.set(30, 30, 0);
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
        // const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 1);
        // Light.castShadow = true;
        // this.scene.add(Light);

        const pointLight = new this.$THREE.PointLight(0xffffff, 2, 100);
        pointLight.position.set(0, 30, 20);
        pointLight.castShadow = true;
        pointLight.shadow.radius = 20;
        this.scene.add(pointLight);
      },
      createBox() {
        const waterGeometry = new this.$THREE.PlaneBufferGeometry(20, 20, 200, 200);
        const waterMaterial = new this.$THREE.MeshPhongMaterial({
          color: 0x2288ff,
          // side: this.$THREE.DoubleSide,
          // shininess: 100,
          // wireframe: true,
        });

        waterMaterial.onBeforeCompile = (shader) => {
          shader.uniforms.time = {value: 0}
          shader.vertexShader = 'uniform float time;\n'+shader.vertexShader;
          shader.vertexShader = shader.vertexShader.replace(
              '#include <begin_vertex>',
              'vec3 transformed = vec3(position);\
               float dx = position.x;\
               float dy = position.y;\
               float freq = sqrt(dx*dx + dy*dy);\
               float amp = 0.1;\
               float angle = -time*3.0+freq*3.0;\
               transformed.z += sin(angle)*amp;\
               objectNormal = normalize(vec3(0.0,-amp * freq * cos(angle),1.0));\
               vNormal = normalMatrix * objectNormal;'
            );
          this.waterShader = shader
        };

        const water = new this.$THREE.Mesh(waterGeometry, waterMaterial);
        water.castShadow = true;
        water.receiveShadow = true;
        water.rotation.x = -Math.PI / 2;
        this.scene.add(water);
      },
      onMouseMove(event) {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        this.mouseX = (event.clientX - windowHalfX);
        this.mouseY = (event.clientY - windowHalfY);
      },
      windowResize() {
        this.canvasHeight = document.getElementById("three").offsetHeight;
        this.canvasWidth = document.getElementById("three").offsetWidth;

        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.camera.aspect = this.canvasWidth / this.canvasHeight;
        this.camera.updateProjectionMatrix();
      },
      renderScene(time) {
        this.stats.update();
        this.controls.update();
        requestAnimationFrame(this.renderScene);
        if (this.waterShader) this.waterShader.uniforms.time.value = time/2000;
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