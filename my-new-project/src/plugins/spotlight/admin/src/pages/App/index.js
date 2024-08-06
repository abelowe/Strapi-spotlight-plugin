import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import SpotlightSearchBar from '../../components/SpotlightSearchBar';
import GlobalStyle from '../../components/SpotlightSearchBarStyles';

const App = () => {
  return (
    <div>
      <GlobalStyle /> {/* Include the GlobalStyle component */}
      <SpotlightSearchBar />
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
};

export default App;