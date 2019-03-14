<template lang="pug">
  div(id='container')
</template>

<script>
/* eslint-disable */

  import * as THREE from 'three';
  import EffectComposer from 'three-dlc/src/postprocessing/EffectComposer';
  import GlitchPass from 'three-dlc/src/postprocessing/GlitchPass';
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
        this.renderer = new THREE.WebGLRenderer({ antialias: true } );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight , 0.01, 500);
        this.camera.position.z = 200;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.update();

        const cubeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0.2, roughness: 0.2});
        const cubeGeometry = new THREE.TorusBufferGeometry(20, 6, 400, 100);
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.scene.add(this.cube);

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

        console.log(Math.random());

        this.renderScene();
      },
      renderScene() {
        const clock = new THREE.Clock();
        const delta = clock.getDelta();
        const {composer, cube, scene, camera, renderer } = this;
        // this.renderer.autoClear = false;
        this.cube.rotation.y += 0.005;
        this.composer.render(64);
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
    height: 100%
  }
</style>