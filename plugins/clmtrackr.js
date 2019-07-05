import Vue from 'vue';
import clm from 'clmtrackr';

Vue.use({
  install(Vue) {
    Vue.prototype.$clm = clm;
  }
})