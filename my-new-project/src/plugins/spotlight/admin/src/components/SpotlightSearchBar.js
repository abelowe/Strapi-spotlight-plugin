import React, { useState, useEffect } from 'react';
import { ModalLayout, ModalBody, ModalHeader, Button, TextInput } from '@strapi/design-system';

const tasks = [
  { name: 'Create collection type', shortcut: 'cmd+option+c' },
  { name: 'Show settings', shortcut: 'cmd+option+s' },
  { name: 'Show user settings', shortcut: 'cmd+option+u' },
  { name: 'Show admin user settings', shortcut: 'cmd+option+a' },
  { name: 'Show API token settings', shortcut: 'cmd+option+t' },
  { name: 'Open collection type builder', shortcut: 'cmd+option+b' },
  { name: 'Open content editor', shortcut: 'cmd+option+e' },
];

const SpotlightSearchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const openSearchbar = () => setIsOpen(true);
  const closeSearchbar = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey && event.altKey && event.key === 's') || (event.metaKey && event.altKey && event.key === 's')) {
        openSearchbar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleTaskClick = (task) => {
    console.log(`Executing task: ${task.name}`);
    // Add logic to execute the task here
    closeSearchbar();
  };

  return (
    <>
      <Button onClick={openSearchbar}>Open Spotlight</Button>
      {isOpen && (
        <ModalLayout onClose={closeSearchbar} labelledBy="title">
          <ModalHeader>
            <h2 id="title">Spotlight Search</h2>
          </ModalHeader>
          <ModalBody>
            <TextInput
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
              {filteredTasks.map((task, index) => (
                <li key={index} onClick={() => handleTaskClick(task)}>
                  {task.name}
                </li>
              ))}
            </ul>
          </ModalBody>
        </ModalLayout>
      )}
    </>
  );
};

export default SpotlightSearchbar;