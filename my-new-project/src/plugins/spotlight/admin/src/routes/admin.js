module.exports = [
    {
      method: 'GET',
      path: '/spotlight',
      handler: 'spotlight.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/spotlight',
      handler: 'spotlight.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
  ];