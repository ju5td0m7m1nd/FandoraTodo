import React from 'react';
import TodoBlock from './todoblock.jsx';
import FilterButton from './filterbtn.jsx';
const TodoInput = React.createClass({
    
    getInitialState(){
        return {
            value:"",
            todolist : {},
            taskcount:0,
            filter:true,
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
        if (this.state.value == ''){
            return ;
        }
        let newTodoList = this.state.todolist;
        newTodoList[this.state.taskcount] = 
                {   
                    task :this.state.value,
                    checked : false,
                }    
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
        this.setState({
            todolist: newTodoList,
        });
    },
    updateChecked(task){
        let newTodoList = this.state.todolist;
        newTodoList[task]['checked'] = !newTodoList[task]['checked'];
        this.setState({ todolist: newTodoList });
    },
    handleFilterOn(){
        this.setState({ filter : false});
    },
    handleFilterOff(){
        this.setState({ filter : true});
    },

    render(){
        let block = [];
        for (var i in this.state.todolist) {
            if (this.state.filter || this.state.todolist[i]['checked']){
                block.push(<TodoBlock taskid={i} 
                                      deleteEvent={this.handleDelete} 
                                      todotask={this.state.todolist[i]['task']} 
                                      key={i}
                                      setChecked={this.updateChecked}/>);
            }
        }
        return  <div>
                    <input type='text' style={{display:'block'}} onKeyDown={this.handleKeyDown} value={this.state.value} onChange={this.handleChange}/>
                    <FilterButton text="已完成" handleFilterOn = {this.handleFilterOn}/> 
                    <FilterButton text="全部" handleFilterOn = {this.handleFilterOff}/>
                {block}
                </div>
    }
});

module.exports = TodoInput
