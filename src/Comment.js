import React from 'react';
import Axios from 'axios';
import "./Comment.css";


export default class Comment extends React.Component {
    constructor(props){
      super(props);
      this.state={
        editContent:"",
        input:false,
        username:"",
        
        // show:false,
      }
    }
    
    getOptionalInput =()=>{
        if (this.state.input){
            return <input type="text" value={this.state.editContent} onChange={e => this.setState({editContent: e.target.value})}></input>
        }
    }
    getUserName =()=>{
        Axios.post(`/api/user/username`,{} ,{withCredentials: true})
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

    onClickEdit=()=> {
        if(!this.state.input){
            this.setState({input:true});
            this.setState({editContent:this.props.content})
        }
        else{
            const newComment = {
                content: this.state.editContent,
            };
            // console.log("editcomment: ", this.state.editContent)
            // setInput(true);
            Axios.put(`/api/comment/${this.props.commentId}`, newComment, {withCredentials: true})
            .then(response => {
                this.props.updateRequest();
                this.setState({input:false});
              })
            .catch(error => console.error(error))
        }
      }

    compareUsername=()=>{
        const username1=this.state.username;
        const username2=this.props.username;
        // console.log(username1,username2)
        const renderButton = []
        if (username1 === username2){
            renderButton.push(
            <div>
                <button onClick={() => {this.onClickEdit()}}>edit</button>
                <button onClick={() => {this.props.onClickDeleteComment(this.props.commentId)}}>delete</button>
            </div>)  
            return renderButton
        }
        
    }
    render(){

        return(
            <div className="container">

                <div>
                    {/* <span id="comment-creator">    */}
                    <div>
                    creator: {this.props.username},
                    {/* </span> */}
                    </div>
                    <div>
                    {/* <span id="comment-creationTime"> */}
                    creationTime: {this.props.creationTime}
                    {/* </span> */}
                    </div>
                

                <div>
                content: {this.props.content}
                </div>
            </div>
                {/* <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input> */}
                {this.getOptionalInput()}
                {/* <button onClick={() => {this.setState({input:true});this.props.onClickEdit(this.props.commentId, this.state.content)}}>edit</button> */}
                {this.compareUsername()}
                
            </div>
        )
    }
    }