import React from 'react'

const styles = {
    filterBtn:{
        marginTop:'5px',
        marginLeft:'5px',
        display:'inline-block',
        fontWeight:'block',
    },
    filterAfter:{
        height:'3px',
        width:'12px',
        margin:'auto',
        display:'block',
        background:'#211',
        transition:'all 0.3s ease-in',
    },
    filterAfterHover:{
        width:'100%',
    },

};

const FilterButton = React.createClass({
    getInitialState(){
        return{
            hover:false,
        };
    },
    handleMouseOver(){
        this.setState({ hover : true });
    },
    handleMouseOut(){
        this.setState({ hover :false});
    },
    render(){
        let filterStyle = this.state.hover ? 
                    Object.assign({}, styles.filterAfter, styles.filterAfterHover) :
                    Object.assign({}, styles.filterAfter,{}); 
        return   <div onClick={this.props.handleFilterOn} 
                      style={styles.filterBtn}
                      onMouseOver={this.handleMouseOver}
                      onMouseOut = {this.handleMouseOut}
                        >
                        {this.props.text}
                        <div style={filterStyle}/> 
                 </div> 

    }
});

module.exports = FilterButton;
