import Vue from 'vue';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import * as postprocessing from 'postprocessing';
import stats from 'stats-js';

Vue.use({
  install(Vue) {
    Vue.prototype.$THREE = THREE;
    Vue.prototype.$controls = OrbitControls;
    Vue.prototype.$postprocessing = postprocessing;
    Vue.prototype.$stats = stats;
  }
});