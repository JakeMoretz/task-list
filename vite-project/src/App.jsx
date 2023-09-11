import React from 'react';
import Task from './components/Task';
import TaskInput from './components/TaskInput';


import './App.css';


export default function App() {
    const [newTask, setNewTask] = React.useState(
        JSON.parse(localStorage.getItem("newTask")) || []
    );
    const [taskText, setTaskText] = React.useState('');

    React.useEffect(() => {
        localStorage.setItem("newTask", JSON.stringify(newTask))
    }, [newTask])


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
       
    
        <main className= "app">
            <section className="input-section">             
                <TaskInput
                    value={taskText}
                    setText={setTaskText}
                    handleAddTask={handleAddTask}
                    handleResetTaskList={resetTaskList}
                />
                
            </section>
            <section className="task-section">
                <Task
                    tasks={newTask}
                    handleToggleTask={toggleTask}
                    handleDeleteTask={deleteTask}
                />
            </section>
        </main>
        
       
    );
}
