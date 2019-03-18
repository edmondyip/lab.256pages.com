import Vue from 'vue';
import * as THREE from 'three';
import Controls from 'three-dlc/src/controls/';

// import EffectComposer from 'three-dlc/src/postprocessing/EffectComposer';
// import GlitchPass from '~plugins/GlitchPass';


Vue.use({
  install(Vue, options) {
    Vue.prototype.$THREE = THREE;
    Vue.prototype.$controls = Controls;
  }
});