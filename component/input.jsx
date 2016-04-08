import React from 'react';
import TodoBlock from './todoblock.jsx';


const TodoInput = React.createClass({
    
    getInitialState(){
        return {
            value:"",
            todolist : {},
        };
    },
    componentDidMount(){
    
    },

    handleKeyDown(ev){
        if ( ev.keyCode == 13){
            this.getUserInput();
        }
    },

    getUserInput(){
        this.setState({
            todolist: this.state.todolist.concat(this.state.value),
            value : '',
        });
    },

    handleChange(evt){
        this.setState({
            value: evt.target.value
        });

    },

    handleDelete(task){
        console.log(task);
        this.setState({
            todolist : this.state.todolist.splice(task,1),
        });
    },

    render(){
        let block = [];
        for (var i = 0; i < this.state.todolist.length; i++) {
            block.push(<TodoBlock taskid={i} deleteEvent={this.handleDelete} todotask={this.state.todolist[i]} key={i}/>);
        }

        return  <div>
                <input type='text' onKeyDown={this.handleKeyDown} value={this.state.value} onChange={this.handleChange}/>
                {block} 
                </div>
    }
});

module.exports = TodoInput
