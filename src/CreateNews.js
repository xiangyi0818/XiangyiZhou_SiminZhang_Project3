import Axios from 'axios';
import React from 'react';

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
                Title:<input type="text"></input>
                Url:<input type="text"></input>
                Body:<input type="text"></input>
                <button>Submit</button>
            </div>
        )
    }
}