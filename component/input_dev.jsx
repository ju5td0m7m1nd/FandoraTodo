import React from 'react';
import TodoBlock from './todoblock.jsx';
import FilterButton from './filterbtn.jsx';
const localForage:LocalForage = require("localforage");

const styles = {
    input:{
        border :'1px solid #000',
        boxShadow :'0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        padding:'5px',
        display:'block',
    },
};

const TodoInput = React.createClass({
    
    getInitialState(){
        return {
            value:"",
            todolist : this.props.todolist,
            taskcount:this.props.taskcount,
            filter:true,
            readdata:false,
        };
    },

    handleKeyDown(ev){
        if ( ev.keyCode == 13){
            this.getUserInput();
        }
    },

    getUserInput(){
        if (this.state.value == ''){
            return ;
        }
        let newTodoList = this.state.todolist;
        let taskPair = { task:this.state.value, checked:false};
        newTodoList[this.state.taskcount] = taskPair
        /* use for local storage */
        localForage.setItem( this.state.taskcount,taskPair);
        localForage.setItem( 'taskcount',this.state.taskcount+1);

        this.setState({
            todolist: newTodoList,
            taskcount : this.state.taskcount+1,
            value : '',
        });
    },

    handleChange(evt){
        this.setState({
            value: evt.target.value
        });

    },

    handleDelete(task){
        let newTodoList = {};
        for (var i in this.state.todolist){
            if ( i == task){}
            else{
                newTodoList[i] = this.state.todolist[i];
            }
        }
        // Remove From local
        localForage.removeItem(task);

        this.setState({
            todolist: newTodoList,
        });
    },
    updateChecked(task){
        let newTodoList = this.state.todolist;
        newTodoList[task]['checked'] = !newTodoList[task]['checked'];
        
        // Update in local
        let taskPair = newTodoList[task];
        localForage.setItem(task, taskPair);

        this.setState({ todolist: newTodoList });
    },
    handleFilterOn(){
        this.setState({ filter : false});
    },
    handleFilterOff(){
        this.setState({ filter : true});
    },

    render(){
        console.log(this.state.todolist);
        let block = [];
        for (var i in this.state.todolist) {
            if (this.state.filter || this.state.todolist[i]['checked']){
                block.push(<TodoBlock taskid={i} 
                                      deleteEvent={this.handleDelete} 
                                      todotask={this.state.todolist[i]} 
                                      key={i}
                                      setChecked={this.updateChecked}/>);
            }
        }
        return  <div>
                    <input type='text' style={styles.input} onKeyDown={this.handleKeyDown} value={this.state.value} onChange={this.handleChange}/>
                    <FilterButton text="已完成" handleFilterOn = {this.handleFilterOn}/> 
                    <FilterButton text="全部" handleFilterOn = {this.handleFilterOff}/>
                {block}
                </div>
    }
});

module.exports = TodoInput
