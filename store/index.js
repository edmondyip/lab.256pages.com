export const state = () => ({
  fullScreen: false,
  projectList: [
    {
      id: 0,
      path: '/',
      title: 'Build with VueJS & webGL',
      description: 'HomePage',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: '#ffffff',
      theme: 'dark',
    },
    {
      id: 1,
      path: '/sphere',
      title: 'Metal Sphere',
      description: 'Simple wireframe',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: '#999999',
      theme: 'light'
    },
  ],
});

export const mutations = {
  toggle(state) {
    state.fullScreen = !state.fullScreen;
  }
}