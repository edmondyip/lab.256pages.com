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
  import BokehPass from 'three-dlc/src/postprocessing/BokehPass';
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
        this.raycaster = new THREE.Raycaster();
        this.renderer = new THREE.WebGLRenderer({ antialias: true } );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.sortObjects = false;
        document.getElementById("container").appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight , 0.01, 500);
        this.camera.position.z = 200;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.update();

        const video = document.getElementById('video');
        this.videoTexture = new THREE.VideoTexture(video);

        for (let i = 0; i < 1; i++) {
          const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: this.videoTexture});
          const cubeGeometry = new THREE.BoxBufferGeometry(20, 20, 20);
          this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          // this.cube.position.x = Math.random() * 60 - 20;
          // this.cube.position.y = Math.random() * 60 - 20;
          // this.cube.position.z = Math.random() * 60 - 20;

          this.cube.rotation.x = Math.random() * 2 * Math.PI;
          this.cube.rotation.y = Math.random() * 2 * Math.PI;
          this.cube.rotation.z = Math.random() * 2 * Math.PI;

          this.scene.add(this.cube);
        };

        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('mousedown', this.onMouseClick, false);
        
        const light = new THREE.DirectionalLight( 0xffffff, 1, 100);
        light.position.set( 10, 20, 50); 
        light.castShadow = true;
        this.scene.add(light);

        this.composer = new EffectComposer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);

        this.composer.addPass(new RenderPass(this.scene, this.camera));

        const effectPass = new BokehPass(this.scene, this.camera, {
          focus: 300, aperture: 0.025, maxblur: 0.05,
        });

        effectPass.renderToScreen = true;
        this.composer.addPass(effectPass);

        const glitchPass = new GlitchPass(64);
        glitchPass.renderToScreen = true;
        this.composer.addPass(glitchPass);
        
        this.renderScene();
      },
      onMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX);
        this.mouseY = (event.clientY - this.windowHalfY);
      },
      onMouseClick(event) {
        const clock = new THREE.Clock();
        const delta = clock.getDelta();
        let mouse = new THREE.Vector2(), INTERSECTED;
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
            INTERSECTED.rotation.y += 1;
          }
        } else {
          if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
          INTERSECTED = null;
        }
      },
      renderScene() {

        const {composer, cube, scene, camera, renderer, videoTexture, raycaster, mouse, mouseX, mouseY, windowHalfX, windowHalfY } = this;
        // this.renderer.autoClear = false;

        this.camera.position.x += (mouseX - camera.position.x) * 0.5;
        this.camera.position.y += (mouseY - camera.position.y) * 0.5;
        this.camera.lookAt(this.scene.position);

        // console.log(this.mouseX);
        this.cube.rotation.y += 0.005;
        this.cube.rotation.x += 0.005;
        this.composer.render();
        this.videoTexture.needsUpdate = true;
        // this.renderer.render(scene, camera);

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
    height: 100%;
  }
  #video {
    display: block;
    height: 1px;
    position: fixed;
    top: 0;
  }
</style>