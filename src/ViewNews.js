import React, {useEffect} from 'react';
import { useLocation, Link, Redirect } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';
import Input from './Input';
import Comment from './Comment';
import NavBar from './NavBar';


const ViewNews = ({ match, location }) => {
  const { params: { newsId } } = match;
  const [newsContent, setNewsContent] = useState("");
  const [newsCreationTime, setNewsCreationTime] = useState("");
  const [newsURL, setNewsURL] = useState("");
  const [comment, setComment] = useState([]);
  // const [input, setInput] = useState(false);
  const [username, setUsername] = useState("");
  const [editNewsContent, setEditNewsContent] = useState("");
  const [showInput,setShowInput] = useState(false);
  const [currentUsername,setCurrentUsername] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [notlogin,setNotLogin] = useState(false);

  const GetSpecificNews= (newsId)=>{  
    const new_from_response = Axios.get(`http://localhost:8000/api/news/${newsId}`)
        .then((response) => 
            {
              console.log(response.data)
              setNewsContent(response.data.content);
              setNewsCreationTime(response.data.creationTime)
              setNewsURL(response.data.url); 
              setUsername(response.data.username);   
              // setNewsId(response.data._id);                       
            }
          )
        .catch(error => console.error(error))
    // console.log("new_from_response")
    // console.log(new_from_response)
    return new_from_response;
  }

  const GetCommentList=(newsId)=>{  
    Axios.get(`http://localhost:8000/api/comment/?newsId=${newsId}`)
        .then((response) => {
          // console.log("map",response)
            setComment(response.data)
          })
        .catch(error => console.error(error))
  }

  const onClickEdit=(commentId, content)=> {
    const newComment = {
        content: content,
    };
    // setInput(true);
    Axios.put(`http://localhost:8000/api/comment/${commentId}`, newComment, {withCredentials: true})
    .then(response => {
        // console.log(response);
      })
    .then(GetCommentList(newsId))
    .catch(error => console.error(error))

  }

  const onClickDeleteNews=(newsId)=>{
    Axios.delete(`http://localhost:8000/api/news/${newsId}`, {withCredentials: true})
    .then()
    .catch(error => console.error(error))

    Axios.delete(`http://localhost:8000/api/comment/?newsId=${newsId}`, {withCredentials: true})
    .then()
    .catch(error => console.error(error))
    setRedirect(true)
  }

  const onClickDeleteComment=(commentId)=>{
    Axios.delete(`http://localhost:8000/api/comment/${commentId}`, {withCredentials: true})
    .then(GetCommentList(newsId))
    .catch(error => console.error(error))
  }

  const onClickComment=(content)=> {
    const newComment = {
        content: content,
        newsId: newsId,  
    };
    Axios.post(`http://localhost:8000/api/comment/`, newComment, {withCredentials: true})
        .then(GetCommentList(newsId))
        .catch((error) => {setNotLogin(true)})
  }

  const mustLogin=()=>{
    if (notlogin){
      return <div>
        <strong>Please sign up or login to post comments!</strong>
      </div>
      
    }
  }

  const getUserName =()=>{
    Axios.post(`http://localhost:8000/api/user/username`,{} ,{withCredentials: true})
        .then((response) => {
            // console.log(response.data)
            setCurrentUsername(                  
              response.data,
            )})
        .catch(error => console.error(error))

}


  const onClickEditNews=(newsId)=> {
    if(editNewsContent === ""){
      setShowInput(true);
    }
    else{
      const newNews = {
        content: editNewsContent,
      };
      Axios.put(`http://localhost:8000/api/news/${newsId}`, newNews, {withCredentials: true})
      .then(()=>{GetSpecificNews(newsId);setEditNewsContent("");setShowInput(false);})
      // .then(GetCommentList(newsId))
      .catch(error => console.error(error))
    }
  }

  const getOptionalInput =()=>{
    if (showInput){
        return <input type="text" value={editNewsContent} onChange={e => setEditNewsContent(e.target.value)}></input>
    }
}
  const trigerReditect=()=>{
    if (redirect){
      return  <Redirect to="/"/> 
    }
  }

  const conditionalButton=()=>{
    // console.log(username1,username2)
    const renderButton = []
    if (username === currentUsername){
      renderButton.push(
        <div>        
        <button onClick={()=> onClickEditNews(newsId)}>edit</button>
        <button onClick={() => onClickDeleteNews(newsId)}>delete</button>
        </div>
      )
      return renderButton

    }
  }

  useEffect(()=>{
    GetSpecificNews(newsId);
    GetCommentList(newsId);
    getUserName();
    }, []
  );

  

  // const renderComment= [];
 
  // console.log(comment)
  // for(let i = 0; i < comment.length; i++ ){
  //     const comment = comment[i];
  //     if(comment.commentContent != undefined){
  //     renderComment.push(
  //         <div className="comment">
  //             {comment.commentId}:
  //             {comment.commentContent}
  //         </div>
  //     )
  //   }
  // }
  
  return (
    <div>
      <div>
      
       <NavBar/>
        </div>
        <div>
        {/* <strong>News ID: </strong>
        {newsId} */}
        <strong>News Creator: </strong>
        {username}
        <strong>News URL: </strong>
        {newsURL}
        <strong>newsCreationTime:</strong>
        {newsCreationTime}
        <div>
        <div>
        <strong>News Content: </strong>
        {newsContent}
        </div>
        <div>
        {getOptionalInput()}
        {conditionalButton()}
        </div>
        
        {/* {console.log("comment", comment)} */}
        { <Input onClick= {onClickComment} buttonName="post comments" />}
        {mustLogin()}
        {comment.map((value, index)=> <Comment commentId={value._id} content={value.content} username={value.username} newsId={value.newsId} 
        creationTime={value.creationTime} key={index} onClickEdit={onClickEdit} 
        onClickDeleteComment={onClickDeleteComment}/>)}
        </div>
        </div>
        {trigerReditect()}
    </div>
  );
};

export default ViewNews;