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
          sphere,
          innerSphere,
          isUserInteracting,
          lon, lat, phi, theta, distance, onPointerDownPointerX,
          onPointerDownPointerY, onPointerDownLon, onPointerDownLat
          // stats,
        } = this;
        runTime();
      },
      runTime() {
        this.createScene();
        this.createLights();
        this.createObject();
        
        this.isUserInteracting = false
        this.lon = 0
        this.lat = 0
        this.phi = 0
        this.theta = 0
				this.distance = 50
				this.onPointerDownPointerX = 0
				this.onPointerDownPointerY = 0
				this.onPointerDownLon = 0
				this.onPointerDownLat = 0

        // this.controls = new this.$controls(this.camera);
        // this.controls.enableZoom = false;
        // this.controls.autoRotate = true;
        // this.controls.enabled = false;

        // this.stats = new this.$stats();
        // document.getElementById("three").appendChild(this.stats.dom);

        document.addEventListener( 'mousedown', this.onDocumentMouseDown.bind(this), false );
				document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false );
				document.addEventListener( 'mouseup', this.onDocumentMouseUp.bind(this), false );
				document.addEventListener( 'wheel', this.onDocumentMouseWheel.bind(this), false );

        window.addEventListener('resize', this.windowResize.bind(this), false);
        this.renderScene();
      },
      createScene() {
        this.scene = new this.$THREE.Scene();
        // this.scene.fog = new this.$THREE.Fog(this.scene.background, 200, 500);
        this.camera = new this.$THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        // this.camera.position.set(150, 100, -150);
        this.camera.target = new this.$THREE.Vector3(0,0,0);
        this.scene.add(this.camera);

        this.renderer = new this.$THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$THREE.PCFSoftShadowMap;

        document.getElementById("three").appendChild(this.renderer.domElement);
      },
      createLights() {
        const Light = new this.$THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
        this.scene.add(Light);
      },
      createObject() {
				const video = document.createElement( 'video' );
				video.crossOrigin = 'anonymous';
				video.width = 640;
				video.height = 360;
				video.loop = true;
				video.muted = true;
				video.src = 'shark.webm';
				video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
        video.play();
        
        const videoTexture = new this.$THREE.VideoTexture(video);
        videoTexture.minFilter = videoTexture.magFilter = this.$THREE.LinearFilter;

        const sphereGeometry = new this.$THREE.SphereBufferGeometry(500, 60, 40);
        sphereGeometry.scale(-1, 1, 1);
        const torusGeometry = new this.$THREE.TorusBufferGeometry(35, 15, 25, 50);
        const sphereMaterial = new this.$THREE.MeshBasicMaterial({
          color: 0xffffff,
          // metalness: 0.2,
          // roughness: 0.1,
          map: videoTexture,
        });
        // const innerSphereMaterial = new this.$THREE.MeshStandardMaterial({
        //   color: 0xffffff,
        //   metalness: 0.8,
        //   roughness: 0.1,
        // });
        this.sphere = new this.$THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.castShadow = true;
        this.sphere.receiveShadow = true;
        this.scene.add(this.sphere);

        // this.innerSphere = new this.$THREE.Mesh(sphereGeometry, innerSphereMaterial);
        // this.innerSphere.receiveShadow = true;
        // this.scene.add(this.innerSphere);

        // this.scene.background = videoTexture;
      },
      windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      onDocumentMouseDown( event ) {
				event.preventDefault();
				this.isUserInteracting = true;
				this.onPointerDownPointerX = event.clientX;
				this.onPointerDownPointerY = event.clientY;
				this.onPointerDownLon = this.lon;
        this.onPointerDownLat = this.lat;
        console.log('mouse down ' + this.onPointerDownPointerX + ',' + this.onPointerDownPointerY);
			},
			onDocumentMouseMove( event ) {
				if ( this.isUserInteracting === true ) {
					this.lon = ( this.onPointerDownPointerX - event.clientX ) * 0.1 + this.onPointerDownLon;
					this.lat = ( event.clientY - this.onPointerDownPointerY ) * 0.1 + this.onPointerDownLat;
        }
        console.log('mouse move');
			},
			onDocumentMouseUp() {
        this.isUserInteracting = false;
        console.log('mouse up ' + this.isUserInteracting);
			},
			onDocumentMouseWheel( event ) {
				this.distance += event.deltaY * 0.05;
				this.distance = this.$THREE.Math.clamp( this.distance, 1, 50 );
			},
      renderScene() {
        // this.stats.update();
        this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
				this.phi = this.$THREE.Math.degToRad( 90 - this.lat );
				this.theta = this.$THREE.Math.degToRad( this.lon );

        requestAnimationFrame(this.renderScene);

        const timer = Date.now() * 0.00025;
        // this.sphere.position.x = Math.sin( timer * 5 ) * 20;
				// this.sphere.position.y = Math.cos( timer * 3 ) * 10 + 20;
        // this.sphere.position.z = Math.cos( timer * 2 ) * 30;
        // this.sphere.rotation.x += 0.005;
        // this.sphere.rotation.y += 0.005;
        // this.sphere.rotation.z += 0.005;

        // this.controls.update();

				this.camera.position.x = this.distance * Math.sin( this.phi ) * Math.cos( this.theta );
				this.camera.position.y = this.distance * Math.cos( this.phi );
				this.camera.position.z = this.distance * Math.sin( this.phi ) * Math.sin( this.theta );
        this.camera.lookAt( this.camera.target );
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