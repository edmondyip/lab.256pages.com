<template lang="pug">
  div#three
</template>

<script>
/* eslint-disable */
  import * as THREE from 'three';
  import OrbitControls from 'three-dlc/src/controls/OrbitControls';

  export default {
    mounted() {
      this.init();
    },
    methods: {
      init() {
        const {initMesh} = this;
        initMesh();
      },
      initMesh() {
        // Scene
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color().setHSL(0.6, 0, 1);

        // Camera
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight , 0.01, 200);
        this.camera.position.z = 100;
        this.scene.add( this.camera );

        // Render
        this.renderer = new THREE.WebGLRenderer({ antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("three").appendChild(this.renderer.domElement);

        // Controls
        // const orbitControls = new OrbitControls( this.camera, this.renderer.domElement);

        // Lights
        const light = new THREE.DirectionalLight( 0xffffff, 1, 100);
        light.position.set( 10, 20, 50); 
        light.castShadow = true;
        this.scene.add(light);

        // const AmbientLight = new THREE.AmbientLight( 0x404040);
        // this.scene.add(AmbientLight);

        // Texture
        const loader = new THREE.TextureLoader();
        const textureCube = loader.load('img/paper.jpg');
        const backgroundImage = ['img/hdri/nx.png', 'img/hdri/ny.png', 'img/hdri/nz.png', 'img/hdri/px.png', 'img/hdri/py.png', 'img/hdri/pz.png'];
        const backgroundTexture = new THREE.CubeTextureLoader().load(backgroundImage);
        const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xb6f8ff,});

        // Object
        const cubeGeometry = new THREE.SphereGeometry(10, 25, 25);
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.castShadow = true;
        this.scene.add(this.cube);

        this.scene.background = backgroundTexture;
        this.renderScene();
      },
      renderScene() {
        const {controls, cube, scene, camera, renderer} = this
        this.cube.rotation.x += 0.005;
        this.cube.rotation.y += 0.01;
        this.renderer.autoClear = false;
        this.renderer.render(scene, camera);
        requestAnimationFrame(this.renderScene);
      }
    }
  };
</script>

<style>
/* eslint-disable */
  body {
    margin: 0;
  }

  canvas {
    width: 100%;
    height: 100%
  }
</style>