import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';
import { ModalLayout, ModalBody, ModalHeader, Button, Textarea } from '@strapi/design-system';
import Shortcuts from 'shortcuts'; 
import './Styles.scss';

const SpotlightSearchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const { get } = useFetchClient();

  // Initialize Shortcuts manager instance
  const shortcuts = new Shortcuts({
    capture: true, // Handle events during the capturing phase
    target: document, // Listening for events on the document object
    shouldHandleEvent: (event) => true, // Handle all possible events
  });

  // Handler to open the search bar
  const openSearchbar = () => setIsOpen(true);
  const closeSearchbar = () => setIsOpen(false);

  // Define the shortcut handler
  const onShortcut = () => {
    openSearchbar();  
    return true; // Prevent other handlers for the same shortcut from being called
  };

  // Register the shortcuts
  useEffect(() => {
    shortcuts.add([
      {
        shortcut: 'Ctrl+Alt+S',  // Define the shortcut you want
        handler: onShortcut,
      }
    ]);

    shortcuts.start();

    // Clean up shortcuts on component unmount
    return () => {
      shortcuts.stop();
      shortcuts.reset();
    };
  }, []);

  // Fetch tasks from Strapi API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [get]);

  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleTaskClick = (task) => {
    console.log(`Executing task: ${task.name}`);
    closeSearchbar();
  };

  return (
    <>
      <Button onClick={openSearchbar}>Open Spotlight Search</Button>
      {isOpen && (
        <div className="searchbar-container">
          <ModalLayout className="searchbar-modal" onClose={closeSearchbar} labelledBy="spotlight-search-title">
            <div className="modal-header" id="spotlight-search-title">Spotlight Search</div>
            <div className="modal-body">
              <Textarea
                className="search-input"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="task-list">
                {filteredTasks.map((task, index) => (
                  <li key={index} className="task-item" onClick={() => handleTaskClick(task)}>
                    <div className="task-name">
                      {task.icon && <span className="task-icon">{task.icon}</span>}
                      <span>{task.name}</span>
                    </div>
                    <div className="task-shortcut">
                      <span className="mac-shortcut">{task.shortcut}</span>
                      {task.windowsShortcut && <span className="windows-shortcut">({task.windowsShortcut})</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ModalLayout>
        </div>
      )}
    </>
  );
};

export default SpotlightSearchbar;
