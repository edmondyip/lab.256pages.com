import Vue from 'vue'
import * as THREE from 'three'
// import OrbitControls from 'three-dlc/src/controls/OrbitControls'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$THREE = THREE
    // Vue.prototype.$OrbitControls = OrbitControls
  }
})