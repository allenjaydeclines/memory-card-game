import React, { useState } from "react";
import { TextInput } from "@sahilkhosla/react-components";

export const AddTodo = ( {addTask} ) => {
    
    const[value, setValue] = useState('');
    
    const handleOnChange = (event) => {
        setValue(event.target.value);
        console.log("called handleOnChange");
    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        addTask(value);
        console.log(value);
        setValue('');;
    }
    
    return (
        <TextInput 
        placeholder="Enter a new task"
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        value={value}
        />
    )
}