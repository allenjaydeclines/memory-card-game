import React, { useState } from "react";
import { TodoListItem } from "./TodoListItem";
import { List, Paper, Stack, Box, Button } from "@mui/material";

export const TodoList = ( { tasks, updateTask, toggleTask, deleteTask} ) => {

    const [filter, setFilter] = useState('active');
    
    const handleFilterType = (filter) => () => {
        setFilter(filter);
    }

    const getFilteredTasks = () => {
        return tasks.filter(task => {
            return (
                !task.isDeleted && (
                    (filter === 'active' && !task.done)
                    || (filter === 'completed' && task.done)
                    || (filter === 'all')
                )
            )
        })
    }

    return (
        <Paper 
            square={true}
            sx={ { marginTop: 2} }
        >
            <List>
                {  
                    
                    getFilteredTasks().map((task) => {
                            return (
                                <TodoListItem 
                                    key={task.id}
                                    id={task.id}
                                    done={task.done}
                                    description={task.description}
                                    updateTask={updateTask}
                                    toggleTask={toggleTask}
                                    deleteTask={deleteTask}
                                />
                            )
                        })
                }
            </List>
            <Box sx={{padding: 1} }>
                <Stack direction="row" justifyContent="center">
                    <Button 
                        onClick={handleFilterType('all')}
                        variant={filter === 'all' ? 'outlined' : 'text'}
                    >
                        ALL
                    </Button>
                    <Button
                        onClick={handleFilterType('active')}
                        variant={filter === 'active' ? 'outlined' : 'text'}
                    >
                        ACTIVE
                    </Button>
                    <Button 
                        onClick={handleFilterType('completed')}
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                    >
                        COMPLETED
                    </Button>
                </Stack>
            </Box>
        </Paper>
    )
}