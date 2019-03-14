<template lang="pug">
  div#container
    video#video(autoplay loop muted playsinline)
      source(src="@/assets/bg.mp4", type="video/mp4")
</template>

<script>
/* eslint-disable */
  import * as THREE from 'three';
  import EffectComposer from 'three-dlc/src/postprocessing/EffectComposer';
  import GlitchPass from '@/plugins/GlitchPass';
  import RenderPass from 'three-dlc/src/postprocessing/RenderPass';
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
        // const controls = new OrbitControls( this.camera, this.renderer.domElement );
        // controls.target.set( 0, 40, 0 );

        // Create Lights
        this.createLights();

        // Create Plane
        this.createPlane();

        // Create Ball
        // this.createBall();

        // MouseMove
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        window.addEventListener('mousemove', this.onMouseMove, false);

        // Create Effect
        this.createEffect();

        // Run
        this.renderScene();
      },
      createScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color().setHSL(0.6, 0, 1); // Background
        // this.scene.fog = new THREE.Fog(this.scene.background, 1, 4000);

        // Camera
        this.camera = new THREE.PerspectiveCamera(25, this.width / this.height , 1, 4000);
        this.camera.position.set(0, 0, 200);
        this.scene.add( this.camera );

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.shadowMap.enabled = true; // Renderer Cast Shadow
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.width, this.height); // Renderer Size
        document.getElementById("container").appendChild(this.renderer.domElement); // Add Canvas to Container
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);

      },
      onMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX);
        this.mouseY = (event.clientY - this.windowHalfY);
      },
      createLights() {
        // Sky Light
        this.hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(this.hemisphereLight);

        // Light1
        this.pointLight = new THREE.PointLight( 0xffffff, 1, 100);
        this.pointLight.position.set( 10, 50, 10);
        this.pointLight.castShadow = true;
        this.pointLight.shadow.radius = 50;
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
        planeTexture.repeat.x = 2;
        planeTexture.repeat.y = 2;
        const planeBumpTexture = new THREE.TextureLoader().load('img/brick.jpg');
        planeBumpTexture.wrapS = THREE.RepeatWrapping;
        planeBumpTexture.wrapT = THREE.RepeatWrapping;
        planeBumpTexture.repeat.x = 2;
        planeBumpTexture.repeat.y = 2;

        const video = document.getElementById('video');
        this.videoTexture = new THREE.VideoTexture(video);

        // Plane
        const PlaneGeo = new THREE.PlaneBufferGeometry( 100, 60, );
        const PlaneMaterial = new THREE.MeshStandardMaterial({color: 0xffeeee, side: THREE.DoubleSide, map: this.videoTexture,});
        const BoxGeo = new THREE.BoxBufferGeometry( 100, 60, 5, 32, 32, 32 );

        BoxGeo.morphAttributes.position = [];

        this.cube = new THREE.Mesh(BoxGeo, PlaneMaterial);
        // this.cube.rotation.x = Math.PI / 2;
        // this.cube.position.y = 20;
        // this.cube.position.z = - 20;
        // this.cube.rotateY( Math.PI );
        this.cube.receiveShadow = true;
        this.scene.add(this.cube);
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
      createEffect() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        // effectPass.renderToScreen = true;
        // this.composer.addPass(effectPass);

        const glitchPass = new GlitchPass(64);
        glitchPass.renderToScreen = true;
        this.composer.addPass(glitchPass);
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
        const {composer, cube, scene, camera, renderer, videoTexture, pointLight, pointLight2, mouseX, mouseY, windowHalfX, windowHalfY } = this;

        // pointLight.position.x = Math.sin( timer * 3 ) * 20;
        // pointLight.position.z = Math.cos( timer * 1 ) * 30;
        // pointLight2.position.x = Math.sin( timer * 2 ) * 30;
        // pointLight2.position.z = Math.cos( timer * 4 ) * 20;

        this.camera.position.x += ((mouseX / 4) - camera.position.x) / 200;
        this.camera.position.y += ((mouseY / 4) - camera.position.y) / 200;

        this.camera.lookAt(this.scene.position);

        // this.cube.rotation.x += 0.005;
        // this.cube.rotation.y += 0.005;
        // this.cube.rotation.z += 0.005;

        // renderer.render(scene, camera);
        this.composer.render();

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
  #video {
    display: block;
    height: 1px;
    position: fixed;
    top: 0;
  }
</style>