import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

//function App() {
// return (
//    <div >
//
//    </div>
//  );
//}

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const onNewTaskChange = useCallback((event) => {
    setNewTask(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if (!newTask.trim()) return;
    setTasks([
      {
        id: tasks.length ? tasks[0].id +1 : 1,
        content: newTask,
        inProgress: false,
        done: false,
      },
      ...tasks,
    ]);
    setNewTask('');
  }, [newTask, tasks]);

  useEffect(() => {
    console.log('tasks',tasks);
  }, [tasks]);

  const addTask = useCallback((task, index) => (event) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1, {
      ...task,
      done: !task.done
    });
    setTasks(newTasks);
  }, [tasks]);

  const removeTask = useCallback((task) => (event) => {
    setTasks(tasks.filter(otherTask => otherTask !== task));
  }, [tasks]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTask">Enter Task:</label>
        <input
          id="newTask"
          name="newTask" 
          value={newTask}
          onChange={onNewTaskChange}
        />
        <button>Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              checked = {task.done}
              type="checkbox"
              onChange={addTask(task, index)} 
            />
            <span className={task.done ? 'done' : ''}>{task.content}</span>
            <button onClick={removeTask(task)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
