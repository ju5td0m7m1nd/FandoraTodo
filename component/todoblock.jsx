import React from 'react';

const styles = {
    todoblock:{
        position:'relative',
        padding:'5px',
        display:'inline-block',
        fontWeight:'bold',
        boxShadow:'inset 0 0 0 0 #0A5',
        transition: 'all 0.5s ease-in-out',
        marginTop:'15px',
    },
    checked:{
        boxShadow:'inset 100px 0 0 0 #0A5',
        color:'#FFF',
    },
    cancel:{
        color:'#A00',
        display:'inline-block',
    },
}

const TodoBlock = React.createClass({

    getInitialState(){
        return {
            checked : false,
        };
    },
    
    handleCheck(){
        this.props.setChecked(this.props.taskid);
        this.setState({ checked : !this.state.checked});
    },
    handleDelete(){
        this.props.deleteEvent(this.props.taskid);
    },
    render (){
        //console.log(this.props.deleteEvent); 
        let blockStyle = this.state.checked ? Object.assign({},styles.todoblock,styles.checked) : Object.assign({},styles.todoblock,{});
        return <div>
               <div className="todoblock" style={blockStyle}>
                    <input type='checkbox' onChange={this.handleCheck}/>
                    {this.props.todotask}
                                    </div>
               <label style={styles.cancel}>
                        <input type='checkbox' onChange={this.handleDelete}/>
                    刪除
               </label>
               </div>

    }

});

module.exports = TodoBlock;
