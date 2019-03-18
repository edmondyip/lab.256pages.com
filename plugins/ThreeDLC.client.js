import Vue from 'vue';
import EffectComposer from 'three-dlc/src/postprocessing/EffectComposer'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$effect = EffectComposer;
  }
});