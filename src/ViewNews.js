import React, {useEffect} from 'react';
import { useLocation, Link } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';
import Input from './Input';


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
  const [news, setNews] = useState(({newsId:"", newsContent:""}));
  const [comment, setComment] = useState([]);

  const GetSpecificNews=(newsId)=>{  
    Axios.get(`http://localhost:8000/api/news/${newsId}`)
        .then((response) => {
          console.log(response.data)
            setNews(response.data)
          })
        .catch(error => console.error(error))
  }

  const GetCommentList=(commentId)=>{  
    Axios.get(`http://localhost:8000/api/comment/?newId=${commentId}`)
        .then((response) => {
          console.log(response.data)
            setComment(response.data)})
        .catch(error => console.error(error))
  }

  const onClickComment=(content)=> {
    const newComment = {
        userId:0,
        newsId: 0,
        commentContent: content,
    };
    Axios.post('http://localhost:8000/api/comment/', newComment)
        .then(GetCommentList(newComment.newsId))
        .catch(error => console.error(error))
  }
  useEffect(()=>{
    GetSpecificNews(newsId);
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
        <strong>News ID: </strong>
        {newsId}
        <strong>News Content: </strong>
        {news}
        <div>
        {comment.map((value, index)=> <p>commentId: {value.commentId}, commentContent: {value.commentContent}</p> )}
        { <Input onClick= {onClickComment} buttonName="post comments" />}
        </div>
        </div>
    </div>
  );
};

export default ViewNews;