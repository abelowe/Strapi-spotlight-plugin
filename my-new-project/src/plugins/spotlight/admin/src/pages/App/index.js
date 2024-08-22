import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import SpotlightSearchBar from '../../components/SpotlightSearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <SpotlightSearchBar />
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={AnErrorOccurred} />
        </Switch>
      </div>
    </QueryClientProvider>
  );
};

export default App;