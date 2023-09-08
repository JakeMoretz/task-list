import React from 'react';
import './App.css';

export default function App() {
    const [newTask, setNewTask] = React.useState([]);
    const [taskText, setTaskText] = React.useState('');

    function handleAddTask(e) {
        e.preventDefault();
        if (taskText.trim() !== '') {
            const newTaskItem = {
                id: self.crypto.randomUUID(),
                title: taskText,
                checked: false,
            };
            setNewTask((currentState) => [...currentState, newTaskItem]);
            setTaskText('');
        }
    }

    function toggleTask(itemId) {
        setNewTask((currentTask) =>
            currentTask.map((task) =>
                task.id === itemId ? { ...task, checked: !task.checked } : task
            )
        );
    }

    function deleteTask(event, itemId) {
        event.stopPropagation();
        setNewTask((currentTask) =>
            currentTask.filter((item) => item.id !== itemId)
        );
    }

    function resetTaskList() {
        setNewTask([]);
    }

    return (
        <>
            <div className="input-container">
                <h3>Create a Task</h3>
                <label htmlFor="item"></label>
                <input
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    type="text"
                    name="item"
                    id="item"
                    className="task-input"
                />
                <br />
                <button onClick={handleAddTask}>Add Task</button>
                <button onClick={resetTaskList}>Reset List</button>
            </div>

            {newTask.map((item) => {
                return (
                    <div key={item.id} className="task-card">
                        <label htmlFor="checkbox"></label>
                        <input
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            checked={item.checked}
                            onChange={() => toggleTask(item.id)}
                        />

                        <span
                            className={
                                item.checked
                                    ? 'input-box-true'
                                    : 'input-box-false'
                            }
                        >
                            {item.title}
                        </span>

                        <button onClick={(e) => deleteTask(e, item.id)}>
                            Delete
                        </button>
                    </div>
                );
            })}
        </>
    );
}
