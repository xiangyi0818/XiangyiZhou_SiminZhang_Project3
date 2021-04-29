import React from 'react';
import Axios from 'axios';


export default class Comment extends React.Component {
    constructor(props){
      super(props);
      this.state={
        content:[],
      }
    }



    render(){

        return(
            <div>
            <div>
            creator: {this.props.username},
            creationTime: {this.props.creationTime}
            </div>
            <div>
            content: {this.props.content},
            </div>
            <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
            <button onClick={() => this.props.onClickEdit(this.props.commentId, this.state.content)}>edit</button>
            </div>
        )
    }
    }