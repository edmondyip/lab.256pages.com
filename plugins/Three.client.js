import Vue from 'vue';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import * as postprocessing from 'postprocessing';

Vue.use({
  install(Vue, options) {
    Vue.prototype.$THREE = THREE;
    Vue.prototype.$controls = OrbitControls;
    Vue.prototype.$postprocessing = postprocessing;
  }
});