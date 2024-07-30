import React, { useState } from 'react';
import SpotlightSearchBar from '../components/SpotlightSearchBar';
import { Button } from '@strapi/design-system/Button';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Spotlight</Button>
      <SpotlightSearchBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default App;
