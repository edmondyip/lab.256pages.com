export const state = () => ({
  gui: false,
  projectList: [{
      id: 0,
      path: '/',
      title: 'Build with VueJS & webGL',
      description: 'HomePage',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: 'rgba(255,255,255,.9)',
      theme: 'dark',
    },
    {
      id: 1,
      path: '/box',
      title: 'Box',
      description: 'Simple wireframe box',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: 'rgba(100,100,100,.8)',
      theme: 'light'
    },
    {
      id: 2,
      path: '/sphere',
      title: 'Sphere',
      description: 'Pricatice Texture mapping Environment mapping',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: 'rgba(40,55,71,.9)',
      theme: 'light'
    },
    {
      id: 3,
      path: '/reflection',
      title: 'Gardan',
      description: 'Practice reflection of object',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: 'rgba(244,208,63,.9)',
      theme: 'light'
    },
    {
      id: 4,
      path: '/glitch',
      title: 'Wood Box',
      description: 'Glitch Post Processing fliter',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: 'rgba(244,208,63,.9)',
      theme: 'light'
    },
  ],
});

export const mutations = {
  toggle(state) {
    state.gui = !state.gui;
  }
}