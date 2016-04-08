import React from 'react';
import {render} from 'react-dom';
import TodoInput from './input_dev.jsx';
import TodoBlock from './todoblock.jsx';
const localForage:LocalForage = require("localforage");

let todolist = {} 
localForage.iterate(function(value, key, iterationNumber) {
    todolist[key] = value;
}, function(err) {
    if (!err) {
         console.log('Iteration has completed');

        render(
            <TodoInput todolist={todolist}/>,
            document.getElementById('inputhook')
        );
     }
}); 


