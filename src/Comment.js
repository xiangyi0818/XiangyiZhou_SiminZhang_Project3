import React from 'react';
import Axios from 'axios';


export default class Comment extends React.Component {
    constructor(props){
      super(props);
      this.state={
        content:[],
        input:false,
        username:"",
        // show:false,
      }
    }
    
    getOptionalInput =()=>{
        if (this.state.input){
            return <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
        }
    }
    getUserName =()=>{
        Axios.post(`http://localhost:8000/api/user/username`,{} ,{withCredentials: true})
            .then((response) => {
                // console.log(response.data)
                this.setState({                   
                  username: response.data,
                })})
            .catch(error => console.error(error))
    }
    componentDidMount() {
        this.getUserName();
    }


    compareUsername=()=>{
        const username1=this.state.username;
        const username2=this.props.username;
        // console.log(username1,username2)
        const renderButton = []
        if (username1 === username2){
            renderButton.push(
            <div>
                <button onClick={() => {this.setState({input:true});this.props.onClickEdit(this.props.commentId, this.state.content)}}>edit</button>
                <button onClick={() => {this.props.onClickDeleteComment(this.props.commentId)}}>delete</button>
            </div>)  
            return renderButton
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
            {/* <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input> */}
            {this.getOptionalInput()}
            {/* <button onClick={() => {this.setState({input:true});this.props.onClickEdit(this.props.commentId, this.state.content)}}>edit</button> */}
            {this.compareUsername()}
            </div>
        )
    }
    }