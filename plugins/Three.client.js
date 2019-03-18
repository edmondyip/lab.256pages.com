import Vue from 'vue';
import * as THREE from 'three';
// import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js'
import OrbitControls from 'three-dlc/src/controls/OrbitControls';

Vue.use({
  install(Vue, options) {
    Vue.prototype.$THREE = THREE;
    Vue.prototype.$controls = OrbitControls;
  }
});