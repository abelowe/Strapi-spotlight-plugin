import SpotlightSearchBar from './components/SpotlightSearchBar';

export default {
  async register(app) {
    app.addMenuLink({
      to: '/plugins/spotlight',
      icon: 'search',
      intlLabel: {
        id: 'spotlight.plugin.name',
        defaultMessage: 'Spotlight',
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "spotlight" */ './pages/App'
        );

        return component;
      },
    });
  },

  bootstrap(app) {
    console.log(app);
  },
};
