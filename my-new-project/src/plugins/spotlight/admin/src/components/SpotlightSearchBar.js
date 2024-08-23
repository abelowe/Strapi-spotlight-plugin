import React, { useState, useEffect } from "react";
import { ModalLayout, Button, Textarea } from "@strapi/design-system";
import Shortcuts from "shortcuts";
import "./Styles.scss";
import useQuickTasks from "../utils/quickTasks";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SpotlightSearchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { tasks, isLoading, error } = useQuickTasks();

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
        shortcut: "Ctrl+Alt+S",
        handler: onShortcut,
      },
      {
        shortcut: "Cmd+Option+S",
        handler: onShortcut,
      },
    ]);

    shortcuts.start();

    return () => {
      shortcuts.stop();
      shortcuts.reset();
    };
  }, []);

  const filteredTasks = tasks?.filter((task) =>
    task.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTaskClick = (task) => {
    console.log(`Executing task: ${task.name}`);
    closeSearchbar();
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    console.error("Error fetching tasks:", error);
    return <div>Error loading tasks. Check the console for details.</div>;
  }

  return (
    <>
      <Button onClick={openSearchbar}>Open Spotlight Search</Button>
      {isOpen && (
        <div className="searchbar-container">
          <ModalLayout
            className="searchbar-modal"
            onClose={closeSearchbar}
            labelledBy="spotlight-search-title"
          >
            <div className="modal-header" id="spotlight-search-bar-div">
              <div className="search-input-container">
                <Textarea
                  className="search-input form-control"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="close-button" onClick={closeSearchbar}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="task-div">
                <div className="quick-tasks-h1">Quick tasks</div>
                <ul className="task-list">
                  {filteredTasks?.map((task) => (
                    <li
                      key={task.id}
                      className="task-item"
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="task-icon">
                        {task.icon && (
                          <img src={task.icon.url} alt={task.icon.name} />
                        )}
                      </div>
                      <div className="task-content">
                        <div className="task-name">{task.name}</div>
                        <div className="task-shortcut">
                          <span className="mac-shortcut">
                            {task.shortcut?.split(" - ")[0]}
                          </span>
                          {task.shortcut?.includes(" - ") && (
                            <span className="windows-shortcut">
                              {task.shortcut?.split(" - ")[1]}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ModalLayout>
        </div>
      )}
    </>
  );
};

export default SpotlightSearchbar;