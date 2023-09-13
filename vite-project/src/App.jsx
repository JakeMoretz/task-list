import React from 'react';
import Task from './components/Task';
import TaskInput from './components/TaskInput';
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    getDocs,
    collection,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import { taskCollection, database } from '../firebase';
import './App.css';

export default function App() {
    const [newTask, setNewTask] = React.useState([]);

    const [taskText, setTaskText] = React.useState('');

    React.useEffect(() => {
        const unsubscribe = onSnapshot(taskCollection, (snapshot) => {
            const taskArr = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setNewTask(taskArr);
        });
        return unsubscribe;
    }, []);

    async function handleAddTask(e) {
        e.preventDefault();
        if (taskText.trim() !== '') {
            const newTaskItem = {
                title: taskText,
                checked: false,
            };

            await addDoc(taskCollection, newTaskItem);
            setTaskText('');
        }
    }

    async function toggleTask(itemId) {
        try {
            const docRef = doc(database, 'newTask', itemId);
            const taskDoc = await getDoc(docRef);

            if (taskDoc.exists()) {
                const updatedTask = {
                    ...taskDoc.data(),
                    checked: !taskDoc.data().checked,
                };
                await updateDoc(docRef, updatedTask);
            }
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    }

    async function deleteTask(itemId) {
        const docRef = doc(database, 'newTask', itemId);
        await deleteDoc(docRef);
    }

    async function resetTaskList() {
        try {
            const querySnapshot = await getDocs(
                collection(database, 'newTask')
            );

            const deletePromises = querySnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
            });

            await Promise.all(deletePromises);

            setNewTask([]);
        } catch (error) {
            console.error('Error deleting tasks:', error);
        }
    }

    return (
        <main className="app">
            <section className="input-section">
                <TaskInput
                    value={taskText}
                    setText={setTaskText}
                    handleAddTask={handleAddTask}
                    handleResetTaskList={resetTaskList}
                />
            </section>

            {newTask.length > 0 ? (
                <section className="task-section">
                    <img className="task-img-1" src="./task.png" alt="" />
                    <img className="task-img-2" src="./task.png" alt="" />
                    <h1 className="current-task">Current Tasks</h1>
                    <hr />
                    <Task
                        tasks={newTask}
                        handleToggleTask={toggleTask}
                        handleDeleteTask={deleteTask}
                    />
                </section>
            ) : (
                <div className="task-section">
                    <img className="task-img-1" src="./task.png" alt="" />
                    <img className="task-img-2" src="./task.png" alt="" />
                    <h1 className="current-task">Current Tasks</h1>
                    <hr />
                    <h1 className="no-task">You have no current tasks</h1>
                </div>
            )}
        </main>
    );
}
