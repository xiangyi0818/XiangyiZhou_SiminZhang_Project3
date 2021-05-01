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
  const [newsTitle, setNewsTitle] = useState("");
  const [comment, setComment] = useState([]);
  // const [input, setInput] = useState(false);
  const [username, setUsername] = useState("");
  const [editNewsContent, setEditNewsContent] = useState("");
  const [editNewsUrl, setEditNewsUrl] = useState("");
  const [editNewsTitle, setEditNewsTitle] = useState("");
  const [showInput,setShowInput] = useState(false);
  const [currentUsername,setCurrentUsername] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [notlogin,setNotLogin] = useState(false);
  const [showButton,setShowButton] = useState(false);
  const [numRequest, setNumRequest] = useState(0);

  const GetSpecificNews= (newsId)=>{  
    const new_from_response = Axios.get(`/api/news/${newsId}`)
        .then((response) => 
            {
              if (response.data === ""){
                setRedirect(true)
              }
              // console.log("response",response.data)
              setNewsContent(response.data.content);
              setNewsCreationTime(response.data.creationTime)
              setNewsURL(response.data.url); 
              setUsername(response.data.username);
              setNewsTitle(response.data.title)   
              // setNewsId(response.data._id);                       
            }
          )
        .catch(error => console.error(error))
    // console.log("new_from_response")
    // console.log(new_from_response)
    return new_from_response;
  }

  const GetCommentList=(newsId)=>{  
    Axios.get(`/api/comment/?newsId=${newsId}`)
        .then((response) => {
          // console.log("map",response)
            setComment(response.data)
          })
        .catch(error => console.error(error))
  }

  const onClickDeleteNews=(newsId)=>{
    Axios.delete(`/api/news/${newsId}`, {withCredentials: true})
    .then()
    .catch(error => console.error(error))

    Axios.delete(`/api/comment/?newsId=${newsId}`, {withCredentials: true})
    .then()
    .catch(error => console.error(error))
    setRedirect(true)
  }

  const onClickDeleteComment=(commentId)=>{
    Axios.delete(`/api/comment/${commentId}`, {withCredentials: true})
    .then(setNumRequest(numRequest+1))
    .catch(error => console.error(error))
  }

  const onClickComment=(content)=> {
    const newComment = {
        content: content,
        newsId: newsId,  
    };
    Axios.post(`/api/comment/`, newComment, {withCredentials: true})
        .then(setNumRequest(numRequest+1))
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
    Axios.post(`/api/user/username`,{} ,{withCredentials: true})
        .then((response) => {
            // console.log(response.data)
            setCurrentUsername(                  
              response.data,
              )
          if (username === response.data && username !== "" && response.data !== ""){
            // console.log(username,currentUsername)
            setShowButton(true)
          }
          // else{
          //   // console.log(username,currentUsername)
          //   setShowButton(false)
          // }
          })
        .catch(error => console.error(error))

}


  const onClickEditNews=(newsId)=> {
    if(editNewsContent === ""){
      setShowInput(true);
      setEditNewsContent(newsContent);
      setEditNewsUrl(newsURL);
      setEditNewsTitle(newsTitle)
    }
    else{
      const newNews = {
        content: editNewsContent,
        url: editNewsUrl,
        title: editNewsTitle,
      };
      Axios.put(`/api/news/${newsId}`, newNews, {withCredentials: true})
      .then(()=>{setNumRequest(numRequest+1);setEditNewsContent("");setShowInput(false);})
      // .then(GetCommentList(newsId))
      .catch(error => console.error(error))
    }
  }

  const getOptionalInput =()=>{
    let renderInput = []
    if (showInput){
      renderInput.push(
        <div>
        <div>
        Title: <input type="text" value={editNewsTitle} onChange={e => setEditNewsTitle(e.target.value)}></input>
        </div>
        <div>
        Url: <input type="text" value={editNewsUrl} onChange={e => setEditNewsUrl(e.target.value)}></input>
        </div>
        <div>
        Body:<input type="text" value={editNewsContent} onChange={e => setEditNewsContent(e.target.value)}></input>
        </div>
        </div>
      )
      return renderInput
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
    // console.log(username,currentUsername,showButton)
    if (showButton){
      renderButton.push(
        <div>        
        <button onClick={()=> onClickEditNews(newsId)}>edit</button>
        <button onClick={() => onClickDeleteNews(newsId)}>delete</button>
        </div>
      )
      return renderButton  }
  }

  useEffect(()=>{
    GetSpecificNews(newsId);
    GetCommentList(newsId);
    getUserName();
    }, [currentUsername, username, numRequest]
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
         {newsTitle}
         <div>
        <strong>News Creator: </strong>
        {username},
        <strong>News URL: </strong>
        {newsURL},
        <strong>newsCreationTime:</strong>
        {newsCreationTime}
        </div>
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
        creationTime={value.creationTime} key={index} GetCommentList={GetCommentList} updateRequest={()=>setNumRequest(numRequest+1)}
        onClickDeleteComment={onClickDeleteComment}/>)}
        </div>
        </div>
        {trigerReditect()}
    </div>
  );
};

export default ViewNews;