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
                this.camera = new this.$THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
                // this.camera.poistion.set(150, 100, -150);
                this.scene.add(this.camera);

                this.renderer = new this.$THREE.WebGLRenderer();
                this.renderer.setPixelRatio(window.devicePixelRatio);
                document.getElementById("three").appendChild(this.renderer.domElement);

                const backgroundImage = ['img/hdri/nx.png', 'img/hdri/ny.png', 'img/hdri/nz.png', 'img/hdri/px.png', 'img/hdri/py.png', 'img/hdri/pz.png'];
                const backgroundTexture = new this.$THREE.CubeTextureLoader().load(backgroundImage);
                this.scene.background = backgroundTexture;

                const cubeTexture = new this.$THREE.TextureLoader().load('img/brick.jpg')
                const cubeGeometry = new this.$THREE.PlaneBufferGeometry(600, 600)
                const cubeMaterial = new this.$THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    map: cubeTexture
                });
                const object = new this.$THREE.Mesh(cubeGeometry, cubeMaterial);
                object.rotation.x = - Math.PI / 2;
                this.scene.add(object)

                this.renderScene();
            },
            renderScene() {
                const {
                    scene,
                    renderer,
                    camera
                } = this
                renderer.render(scene, camera)
                requestAnimationFrame(this.renderScene)
            }
        }
    }
</script>