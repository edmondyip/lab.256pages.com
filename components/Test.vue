<template lang="pug">
  div#three
</template>

<script>
  export default {
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
        this.scene = new this.$THREE.Scene();
        this.camera = new this.$THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(150, 100, -150);

        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        // this.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById("three").appendChild(this.renderer.domElement);

        this.controls = new this.$controls(this.camera, this.renderer.domElement);
        this.controls.autoRotate = true;

        const backgroundImage = ['img/hdri/px.png', 'img/hdri/nx.png', 'img/hdri/py.png', 'img/hdri/ny.png', 'img/hdri/pz.png', 'img/hdri/nz.png'
        ];
        const backgroundTexture = new this.$THREE.CubeTextureLoader().load(backgroundImage);
        // this.scene.background = backgroundTexture;
        
        const Light = new this.$THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        // Light.position.set(10, 50, 10);
        // Light.castShadow = true;
        // Light.shadow.radius = 50;
        this.scene.add(Light);

        const cubeTexture = new this.$THREE.TextureLoader().load('img/brick.jpg');
        const cubeGeometry = new this.$THREE.BoxBufferGeometry(60, 60, 60, 5, 5,5);
        const cubeMaterial = new this.$THREE.MeshLambertMaterial({
          color: 0xffeeee, 
          map: cubeTexture,
          wireframe: true
        });
        const box = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        box.receiveShadow = true;
        // object.rotation.x = - Math.PI / 2;
        this.scene.add(box);

        this.composer = new this.$postprocessing.EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);

        this.composer.addPass(new this.$postprocessing.RenderPass(this.scene, this.camera));

        const effectPass = new this.$postprocessing.EffectPass(this.camera, new this.$postprocessing.GlitchEffect(0.5));

        effectPass.renderToScreen = true;
        this.composer.addPass(effectPass);

        this.renderScene();
      },
      renderScene() {
        const {
          scene,
          renderer,
          camera,
          composer, 
          controls
        } = this;

        // renderer.render(scene, camera);
        composer.render(0.05);
        controls.update();
        requestAnimationFrame(this.renderScene);
      }
    }
  }
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
  } 
</style>