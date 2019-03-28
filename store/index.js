export const state = () => ({
  gui: false,
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
      frameColor: 'rgba(255,255,255,1)',
      theme: 'dark',
    },
    {
      id: 1,
      path: '/sphere',
      title: 'Practice 1',
      description: 'Practice using texture mapping',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: '#999999',
      theme: 'light'
    },
    {
      id: 2,
      path: '/reflection',
      title: 'Practice 2',
      description: 'Practice using texture mapping',
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
    state.gui = !state.gui;
  }
}