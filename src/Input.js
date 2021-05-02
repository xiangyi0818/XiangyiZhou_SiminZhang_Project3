import Axios from 'axios';
import React from 'react';
import './Input';

export default class Input extends React.Component{
    constructor(props){
      super(props);
      this.state={
        content:[],
      }
    }
    render(){
        return(
            <div>
                <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
                <button id ="input" onClick={() => this.props.onClick(this.state.content)}>{this.props.buttonName}</button>
            </div>
        )
    }
}

