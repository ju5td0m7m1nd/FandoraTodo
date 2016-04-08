import React from 'react';
import {render} from 'react-dom';
import TodoInput from './input_dev.jsx';
import TodoBlock from './todoblock.jsx';
const localForage:LocalForage = require("localforage");

let todolist = {}; 
let count = 0;
localForage.iterate(function(value, key, iterationNumber) {
    if ( key != 'taskcount'){
        todolist[key] = value;
    }
    else{
        count = value;
        console.log(count);
    }
}, function(err) {
    if (!err) {
         console.log('Iteration has completed');

        render(
            <TodoInput taskcount={count} todolist={todolist}/>,
            document.getElementById('inputhook')
        );
     }
}); 


