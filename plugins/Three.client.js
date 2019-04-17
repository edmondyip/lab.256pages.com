import Vue from 'vue';
import * as THREE from 'three';
import GLTFLoader from 'three-dlc/src/loaders/GLTFLoader';
import OrbitControls from 'three-dlc/src/controls/OrbitControls';
import * as postprocessing from 'postprocessing';
import stats from 'stats-js';

Vue.use({
  install(Vue) {
    Vue.prototype.$THREE = THREE;
    Vue.prototype.$controls = OrbitControls;
    Vue.prototype.$postprocessing = postprocessing;
    Vue.prototype.$stats = stats;
    Vue.prototype.$gltfloader = GLTFLoader;
  }
});