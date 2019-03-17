<template lang="pug">
  div#three
</template>

<script>
/* eslint-disable */
  import * as THREE from 'three';
  import OrbitControls from 'three-dlc/src/controls/OrbitControls';

  export default {
    created() {
      this.$nextTick(() => {
        this.init();
      })
    },
    methods: {
      init() {
        const {runtime} = this;
        runtime();
      },
      runtime() {

        this.height = window.innerHeight;
        this.width = window.innerWidth;

        // Create Scene, Camera, Renderer
        this.createScene();

        // Controls
        const controls = new OrbitControls( this.camera, this.renderer.domElement );

        // Create Lights
        this.createLights();

        // Create Plane
        this.createPlane();

        // Create Ball
        this.createBall();

        // Run
        this.renderScene();
      },
      createScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color().setHSL(0.6, 0, 1); // Background
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 1000);

        // Camera
        this.camera = new THREE.PerspectiveCamera(25, this.width / this.height , 1, 1000);
        this.camera.position.set(150, 100, -150);
        this.scene.add( this.camera );

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.shadowMap.enabled = true; // Renderer Cast Shadow
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.width, this.height); // Renderer Size
        document.getElementById("three").appendChild(this.renderer.domElement); // Add Canvas to Container
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);

      },
      createMouseEvent() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        function onMouseMove (event) {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
        };
      },
      createLights() {
        // Sky Light
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

        // Light1
        this.pointLight = new THREE.PointLight( 0xffffff, 1, 100);
        this.pointLight.position.set( 0, 50, 0);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.radius = 20;
        this.scene.add(this.pointLight);

        // Light2
        this.pointLight2 = new THREE.PointLight( 0xffffff, 1, 100);
        this.pointLight2.copy(this.pointLight);
        this.scene.add(this.pointLight2);
      },
      createPlane() {
        // Texture
        const planeTexture = new THREE.TextureLoader().load('img/brick.jpg');
        planeTexture.wrapS = THREE.RepeatWrapping;
        planeTexture.wrapT = THREE.RepeatWrapping;
        planeTexture.repeat.x = 6;
        planeTexture.repeat.y = 6;
        const planeBumpTexture = new THREE.TextureLoader().load('img/brick.jpg');
        planeBumpTexture.wrapS = THREE.RepeatWrapping;
        planeBumpTexture.wrapT = THREE.RepeatWrapping;
        planeBumpTexture.repeat.x = 6;
        planeBumpTexture.repeat.y = 6;
        // Plane
        const PlaneGeometry = new THREE.PlaneBufferGeometry(600, 600 );
        const PlaneMaterial = new THREE.MeshStandardMaterial({color: 0xffeeee, side: THREE.DoubleSide, map: planeTexture, bumpMap: planeTexture});
        this.floor = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
				this.floor.rotation.x = - Math.PI / 2;
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
      },
      createBall() {
        // Texture
        const backgroundImage = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'];
        const backgroundTexture = new THREE.CubeTextureLoader().setPath( 'img/hdri/' ).load(backgroundImage);
        const cubeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0.8, roughness: 0.3, envMap: backgroundTexture});
        const pointMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 3,});
        // Ball
        const ballGeometry = new THREE.SphereGeometry(5, 50, 50);
        this.cube2 = new THREE.Mesh(ballGeometry, cubeMaterial);
        this.cube2.castShadow = true;
        this.cube2.position.y = 10;
        this.scene.add(this.cube2);
      },
      handleWindowResize() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
      },
      renderScene() {
        const timer = Date.now() * 0.00025;
        const {cube2, scene, camera, renderer, pointLight, pointLight2,} = this;

        pointLight.position.x = Math.sin( timer * 3 ) * 20;
        pointLight.position.z = Math.cos( timer * 1 ) * 30;
        pointLight2.position.x = Math.sin( timer * 2 ) * 30;
        pointLight2.position.z = Math.cos( timer * 4 ) * 20;

        cube2.position.x = Math.sin( timer * 5 ) * 20;
				cube2.position.y = Math.cos( timer * 3 ) * 10 + 20;
        cube2.position.z = Math.cos( timer * 2 ) * 30;
        
        // OrbitControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(this.renderScene);
      }, 
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