export const state = () => ({
  projectID: 0,
  projectList: [
    {
      id: 0,
      path: '/',
      title: 'Build with Vuejs, Nuxtjs, webGL, Threejs',
      description: 'HomePage',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: '#ffffff',
    },
    {
      id: 1,
      path: '/ball',
      title: 'Metal Sphere',
      description: 'Simple wireframe',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: '#ffee00',
    },
    {
      id: 2,
      path: '/wire',
      title: 'Wireframe',
      description: 'Simple wireframe',
      tags: [
        'threejs', 'webGL', 'Mar2019'
      ],
      source: 'https://github.com/',
      frameColor: '#000000',
    },
  ],
});