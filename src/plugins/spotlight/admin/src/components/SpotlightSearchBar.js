import React, { useState } from 'react';
import { ModalLayout, ModalBody, ModalHeader } from '@strapi/design-system/ModalLayout';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SpotlightSearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  const { data: tasks } = useQuery('quickTasks', async () => {
    const response = await axios.get('/your-api-endpoint');
    return response.data;
  });

  return (
    isOpen && (
      <ModalLayout onClose={onClose}>
        <ModalHeader>
          <TextInput placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
        </ModalHeader>
        <ModalBody>
        </ModalBody>
      </ModalLayout>
    )
  );
};

export default SpotlightSearchBar;
