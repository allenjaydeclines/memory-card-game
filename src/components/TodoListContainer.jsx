import React, { useEffect, useState } from "react"
import { TodoList } from "./TodoList"
import { AddTodo } from "./AddTodo"

export const TodoListContainer = () => {

    const [tasks, setTasks] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad) {
            const localStorageData = localStorage.getItem('task') || '[]';
            setTasks(JSON.parse(localStorageData));
            setFirstLoad(false);
        }
    })

    const updateLocalStorage = (updatedTasks) => {
        setTasks(updatedTasks);
        localStorage.setItem('task', JSON.stringify(updatedTasks));
    }

    const addTask = (description) => {
        const updatedTasks = [
            ...tasks, {
                id: Date.now(),
                done: false,
                description: description
            }
        ]
        updateLocalStorage(updatedTasks);
    }
    const toggleTask = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.done = !task.done;
            }
            return task;
        })
        setTasks(updatedTasks);
    }
    const updateTask = (id, newDescription) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.description = newDescription;
            }
            return task;
        })
        setTasks(updatedTasks);
    }
    const deleteTask = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.isDeleted = true;
            }
            return task;
        })
        setTasks(updatedTasks);
    }

    return (
        <>
        <AddTodo 
            addTask={addTask}
        />
        <TodoList 
            tasks={tasks}
            updateTask={updateTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
        />
        </>
    )
}