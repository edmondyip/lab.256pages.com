<template lang="pug">
  div(id='container')
</template>

<script>
/* eslint-disable */
  import * as THREE from 'three';
  import OrbitControls from 'three-dlc/src/controls/OrbitControls';

  export default {
    data: () => ({
      controls: {
        scene: null,
        camera: null,
        renderer: null,
        cube: null,
        cube2: null,
        rotationSpeed: 0.01,
        particleLight: null,
      }
    }),
    created() {
      this.$nextTick(() => {
        this.init();
      })
    },
    methods: {
      init() {
        const {initMesh, controls} = this;
        initMesh();
      },
      initMesh() {

        // Scene
        this.scene = new THREE.Scene();
        this.scene.position.set(5, 0, 0);

        // Camera
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight , 0.01, 500);
        this.camera.position.z = 200;
        this.scene.add( this.camera );



        // Render
        this.renderer = new THREE.WebGLRenderer({ antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(this.renderer.domElement);

        // Controls
        const orbitControls = new OrbitControls( this.camera, this.renderer.domElement);

        // Lights
        // const light = new THREE.DirectionalLight( 0xffffff, 1, 100);
        // light.position.set( 10, 20, 50); 
        // light.castShadow = true;
        // this.scene.add(light);

        // const AmbientLight = new THREE.AmbientLight( 0x404040);
        // this.scene.add(AmbientLight);

        this.particleLight = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
				this.scene.add( this.particleLight );
        
        const pointLight = new THREE.PointLight( 0x58c9eb, 2, 800 );
				this.particleLight.add( pointLight );

        // Texture
        const loader = new THREE.TextureLoader();
        const backgroundImage = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'];
        const backgroundTexture = new THREE.CubeTextureLoader().setPath( 'img/hdri/' ).load(backgroundImage);
        const cubeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, envMap: backgroundTexture, metalness: 0.2, roughness: 0.2});

        // Object
        const cubeGeometry = new THREE.TorusBufferGeometry(20, 6, 400, 100);
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.shadowSide  = THREE.FrontSide;
        // this.cube.position.set(30, 0, 0);
        this.scene.add(this.cube);

        const ballGeometry = new THREE.SphereGeometry(10, 50, 50);
        this.cube2 = new THREE.Mesh(ballGeometry, cubeMaterial);
        this.cube.shadowSide  = THREE.FrontSide;
        // this.cube2.position.set(-30, 0, 0);
        this.scene.add(this.cube2);

        //Background
        // this.scene.background = new THREE.Color().setHSL(0.6, 0, 1);
        this.scene.background = backgroundTexture;
        // this.scene.fog = new THREE.Fog(this.scene.background, 1, 400);

        this.renderScene();
      },
      renderScene() {
        const timer = Date.now() * 0.00025;
        const {controls, cube, scene, camera, renderer, particleLight} = this
        // this.cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        this.cube2.rotation.x += 0.005;
        this.particleLight.position.x = Math.sin( timer * 7 ) * 30;
				this.particleLight.position.y = Math.cos( timer * 5 ) * 40;
				this.particleLight.position.z = Math.cos( timer * 3 ) * 30;
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