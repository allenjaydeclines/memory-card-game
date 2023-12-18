import { Box, Checkbox, IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import React, { useState} from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors'

export const TodoListItem = ( { id, done, description, updateTask, toggleTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(description);

    const handleOnClick = () => {
        setIsEditing(true);
    }

    const handleOnChange = (event) => {
        setNewDescription(event.target.value);
    }

    const handleOnBlur = () => {
        setIsEditing(false);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            setIsEditing(false);
            updateTask(id, newDescription);
        }
    }

    const handleOnCancel = () => {
        let confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            deleteTask(id);
        }
    }

    const handleOnCheckboxClick = () => {
        toggleTask(id);
    }
    
    return (
        <Box>
            <ListItem sx={ {borderBottom: 1, borderColor: grey[400],  padding: 1 } }>
                <Checkbox checked={done} onClick={handleOnCheckboxClick}/>
                {isEditing ?
                    (
                        <TextField 
                            value={newDescription}
                            onClick={handleOnClick}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            onKeyDown={handleKeyDown}    
                            fullWidth={true}
                            variant="standard"
                            autoFocus={true}
                        />
                    ) : (
                        <ListItemText onClick={handleOnClick}>
                            {description}
                        </ListItemText>
                    )
                }
                <IconButton onClick={handleOnCancel}>
                    <CancelIcon/>
                </IconButton>
            </ListItem>
        </Box>
    )
}