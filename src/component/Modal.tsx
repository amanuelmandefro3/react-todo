import React, { useState, ChangeEvent, useEffect } from 'react';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddTask: (task: string) => void;
  currentTask: string;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, handleAddTask, currentTask }) => {
  const [task, setTask] = useState<string>('');

  useEffect(() => {
    if (show) {
      setTask(currentTask);
    }
  }, [show, currentTask]);

  if (!show) {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{currentTask ? 'Edit Task' : 'Add Task'}</h2>
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter task"
          className="modal-input"
        />
        <div className="modal-actions">
          <button className="modal-btn btn-primary" onClick={() => handleAddTask(task)}>
            {currentTask ? 'Save Changes' : 'Add Task'}
          </button>
          <button className="modal-btn btn-secondary" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
