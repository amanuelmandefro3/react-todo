import React, { useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';
import Modal from './component/Modal';

type Type = {
  id: string;
  task: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Type[]>(null);
  const [currentTask, setCurrentTask] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddTask = (task: string) => {
    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? { ...t, task } : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      const newTask: Type = {
        id: crypto.randomUUID(),
        task,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setCurrentTask('');
  };

  const handleEditTask = (id: string) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      setCurrentTask(tasks[index].task);
      setEditIndex(index);
      setShowModal(true);
    }
  };

  const handleDeleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          Activities
        </div>
        <div>
          <div className="btn">
            <button onClick={() => {
              setShowModal(true);
              setCurrentTask('');
              setEditIndex(null);
            }}>+Add Task</button>
          </div>
          {tasks.length === 0 ? (
            <div className="no-task">No task available</div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-check">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={task.completed ? "strike" : ""}>{task.task}</span>
                </div>
                <div className="actions">
                  <FaPen
                    className='pen'
                    size={20}
                    color="blue"
                    onClick={() => handleEditTask(task.id)}
                  />
                  <FaTrash
                    size={20}
                    color="red"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleAddTask={handleAddTask}
          currentTask={currentTask}
        />
      )}
    </>
  );
};

export default App;
