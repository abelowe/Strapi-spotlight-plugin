
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/tasks',
    handler: 'task.find',
    config: {
      policies: [],
      auth: false,
    },
  },
];