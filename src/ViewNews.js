import React, {useEffect} from 'react';
import { useLocation, Link } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';
import Input from './Input';
import Comment from './Comment';


// const ViewNews  = () => {
//     const { state } = useLocation();
//     console.log("visit"+state.news.id)
  
//     return (
//       <div>
//           <strong>Id:</strong> {state.news.id}{" "}
//           <p>aaa</p>
//       </div>
//     );
//   };
  
//   export default ViewNews;
// const GetSpecificNews=(_id)=>{

//   const [news, setNews] = useState(0);

//   Axios.get(`http://localhost:8000/api/news/${_id}`)
//       .then((response) => {
//          console.log("bbbb")
//           setNews(news)})
//       .catch(error => console.error(error))
// }

// const GetCommentList=(_id)=>{

//   const [comment, setComment] = useState(0);

//   Axios.get(`http://localhost:8000/api/news/comment/?_id=${_id}`)
//       .then((response) => {
//          console.log("bbbb")
//           setComment(comment)})
//       .catch(error => console.error(error))
// }

// const onClickComment=(content)=> {
//   const newComment = {
//       commentContent: content,
//   };
//   Axios.post('http://localhost:8000/api/comment/', newComment)
//       // .then(GetCommentList())
//       .catch(error => console.error(error))
// }

const ViewNews = ({ match, location }) => {
  const { params: { newsId } } = match;
  const [newsContent, setNewsContent] = useState("");
  const [newsCreationTime, setNewsCreationTime] = useState("");
  const [newsURL, setNewsURL] = useState("");
  const [comment, setComment] = useState([]);
  

  const GetSpecificNews= (newsId)=>{  
    const new_from_response = Axios.get(`http://localhost:8000/api/news/${newsId}`)
        .then((response) => 
            {
              setNewsContent(response.data.content);
              setNewsCreationTime(response.data.creationTime)
              setNewsURL(response.data.url);       
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
          console.log("map",response)
            setComment(response.data)
          })
        .catch(error => console.error(error))
  }

  const onClickEdit=(commentId, content)=> {
    const newComment = {
        content: content,
    };

    Axios.put(`http://localhost:8000/api/comment/${commentId}`, newComment, {withCredentials: true})
    .then(response => {
        console.log(response);
      })
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
        .catch(error => console.error(error))
  }
  useEffect(()=>{
    GetSpecificNews(newsId)
    GetCommentList(newsId);
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
  // let news = GetSpecificNews(newsId);
  // console.log("log before return");
  // console.log(GetSpecificNews(newsId))
  return (
    <div>
      <div>
      <button><Link to={'/'}><strong>Home</strong></Link>
        </button>
      <button><Link to={'/signup/'}><strong>Sign Up</strong></Link>
        </button>
        <button><Link to={'/login/'}><strong>Log in</strong></Link>
        </button>
        </div>
        <div>
        {/* <strong>News ID: </strong>
        {newsId} */}
        <strong>News Content: </strong>
        {newsContent}
        <strong>News URL: </strong>
        {newsURL}
        <div>
        {console.log("comment", comment)}
        {comment.map((value, index)=> <Comment commentId={value._id} content={value.content} username={value.username} newsId={value.newsId} creationTime={value.creationTime} key={index} onClickEdit={onClickEdit}/>)}
        { <Input onClick= {onClickComment} buttonName="post comments" />}
        </div>
        </div>
    </div>
  );
};

export default ViewNews;