import React, { useState, useEffect } from 'react';
import { ModalLayout, Button, Textarea } from '@strapi/design-system';
import Shortcuts from 'shortcuts'; 
import useQuickTasks from '../utils/quickTasks'; 
import './Styles.scss';

const SpotlightSearchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const tasks = useQuickTasks(); 

  const shortcuts = new Shortcuts({
    capture: true,
    target: document,
    shouldHandleEvent: (event) => true,
  });

  const openSearchbar = () => setIsOpen(true);
  const closeSearchbar = () => setIsOpen(false);

  const onShortcut = () => {
    openSearchbar();  
    return true;
  };  

  useEffect(() => {
    shortcuts.add([
      {
        shortcut: 'Ctrl+Alt+S',
        handler: onShortcut,
      }
    ]);

    shortcuts.start();

    return () => {
      shortcuts.stop();
      shortcuts.reset();
    };
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.attributes.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTaskClick = (task) => {
    console.log(`Executing task: ${task.attributes.task}`);
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
                {filteredTasks.map((task) => (
                  <li key={task.id} className="task-item" onClick={() => handleTaskClick(task)}>
                    <div className="task-name">
                      <span>{task.attributes.task}</span>
                    </div>
                    <div className="task-shortcut">
                      <span className="mac-shortcut">
                        {task.attributes.shortcut.split(' - ')[0]}
                      </span>
                      {task.attributes.shortcut.includes(' - ') && (
                        <span className="windows-shortcut">
                          ({task.attributes.shortcut.split(' - ')[1]})
                        </span>
                      )}
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
