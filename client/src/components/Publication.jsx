import React, { Component } from "react";
import equal from 'fast-deep-equal'

export class PublicationMenu extends Component{

    state = {
        values: []
    };

    componentDidMount(){
        //console.log("props",this.props)
        this.setState({
            values: this.props.list,
            
        })
        
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.list, prevProps.list)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
          this.setState({ 
            values: this.props.list,
            
          });
        }
      } 

    render() {
      
        
        var channeltest = this.props.channelprop
        var labelName = this.props.labelName

        return (
            <div>
                <label>{labelName}</label>
            <select onChange={(e) => channeltest(e.target.value)}>
                {this.state.values.map((value) => <option key={value}>{value}</option>)}
                
            </select>
            </div>
            
            );
    }
}