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
        this.camera.poistion = (0,0,400);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById("three").appendChild(this.renderer.domElement);

        const controls = new this.$controls(this.camera, this.renderer.domElement);

        const backgroundImage = ['img/hdri/px.png', 'img/hdri/nx.png', 'img/hdri/py.png', 'img/hdri/ny.png', 'img/hdri/pz.png', 'img/hdri/nz.png'
        ];
        const backgroundTexture = new this.$THREE.CubeTextureLoader().load(backgroundImage);
        this.scene.background = backgroundTexture;
        
        const Light = new this.$THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(Light);

        const cubeTexture = new this.$THREE.TextureLoader().load('img/brick.jpg')
        const cubeGeometry = new this.$THREE.PlaneBufferGeometry(600, 600)
        const cubeMaterial = new this.$THREE.MeshLambertMaterial({
          color: 0xffffff,
          map: cubeTexture
        });
        const object = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
        object.rotation.x = - Math.PI / 2;
        this.scene.add(object);

        this.renderScene();
      },
      renderScene() {
        const {
          scene,
          renderer,
          camera
        } = this
        renderer.render(scene, camera)

        this.camera.position.x += 0.005;
        requestAnimationFrame(this.renderScene)
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