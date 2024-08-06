import React, { useState, useEffect } from 'react';
import { ModalLayout, ModalBody, ModalHeader, Button, Textarea } from '@strapi/design-system';
import { 
  SearchbarContainer, 
  SearchbarModal, 
  SearchInput, 
  TaskList, 
  TaskItem 
} from './SpotlightSearchBarStyles';

const tasks = [
  { 
    name: 'Create collection type', 
    shortcut: 'cmd+option+c',
    windowsShortcut: 'ctrl+alt+c',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    )
  },
  { 
    name: 'Show settings', 
    shortcut: 'cmd+option+s',
    windowsShortcut: 'ctrl+alt+s',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    )
  },
  { 
    name: 'Show admin user settings', 
    shortcut: 'cmd+option+a',
    windowsShortcut: 'ctrl+alt+a',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    )
  },
  { 
    name: 'Show API token settings', 
    shortcut: 'cmd+option+t',
    windowsShortcut: 'ctrl+alt+t',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>
    )
  },
  { 
    name: 'Open collection type builder', 
    shortcut: 'cmd+option+b',
    windowsShortcut: 'ctrl+alt+b',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    )
  },
  { 
    name: 'Open content editor', 
    shortcut: 'cmd+option+e',
    windowsShortcut: 'ctrl+alt+e',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
      </svg>
    )
  },
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
    closeSearchbar();
  };

  return (
    <>
      <Button onClick={openSearchbar}>Open Spotlight Search</Button>
      {isOpen && (
        <SearchbarContainer>
          <SearchbarModal onClose={closeSearchbar}>
            <ModalHeader>Spotlight Search</ModalHeader>
            <ModalBody>
              <SearchInput
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <TaskList>
                {filteredTasks.map((task, index) => (
                  <TaskItem key={index} onClick={() => handleTaskClick(task)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {task.icon && <span>{task.icon}</span>}
                      <span style={{ fontWeight: 'bold' }}>{task.name}</span>
                    </div>
                    <span style={{ marginLeft: '28px', marginTop: '10px', fontSize: '12px', wordSpacing: '4px' }}>
                      {task.shortcut} {task.windowsShortcut && `(${task.windowsShortcut})`}
                    </span>
                  </TaskItem>
                ))}
              </TaskList>
            </ModalBody>
          </SearchbarModal>
        </SearchbarContainer>
      )}
    </>
  );
};

export default SpotlightSearchbar;
