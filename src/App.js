import Axios from 'axios';
import React from 'react';
import Input from './Input';
import {Link} from 'react-router-dom';
import ViewNews from './ViewNews';
import NavBar from './NavBar';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      newsList:[],
      comment:[],
      content:[],
    }
  }

  getComment=()=>{
    Axios.get(`http://localhost:8000/api/comment`)
        .then((response) => {
            this.setState({
              comment: response.data,
    })}) 
    .catch(error => console.error(error))   
  }

  getNewsList=()=>{
    Axios.get('http://localhost:8000/api/news')
        .then((response) => {
            this.setState({
              newsList: response.data,
        })})
        .catch(error => console.error(error))
  }
  componentDidMount() {
    // Axios.get('http://localhost:8000/api/news')
    //     .then((response) => {
    //         this.setState({
    //           news: response.data,
    //     })})
    //     .catch(error => console.error(error));
    this.getNewsList();
    this.getComment();
}

// onClickNews=(content)=> {
//   const newNews = {
//       // title:title,
//       content: content,
//   };

//   Axios.post('http://localhost:8000/api/news', newNews, {withCredentials: true})
//       .then(this.getNewsList())
//       .catch(error => console.error(error))
// }


// onClickComment=(content)=> {
//   const newComment = {
//       content: content,
//   };

//   Axios.post('http://localhost:8000/api/comment/', newComment)
//       .catch(error => console.error(error))
// }

// onClickLogout=()=>{
//   Axios.post(`http://localhost:8000/api/user/logout`,{} ,{withCredentials: true})
//   .catch(error => console.error(error))   
// }

// onClickDelete=(newsId)=>{
//   Axios.delete(`http://localhost:8000/api/news/${newsId}`, {withCredentials: true})
//   .catch(error => console.error(error))   
// }

onClickEdit=(newsId, content)=> {
  const newNews= {
      content: content,
  };
  // setInput(true);
  Axios.put(`http://localhost:8000/api/news/${newsId}`, newNews, {withCredentials: true})
  .then(response => {
      // console.log(response);
    })
  .then(this.getNewsList())
  .catch(error => console.error(error))
}
  render(){
    const renderNews = [];

    for(let i = 0; i < this.state.newsList.length; i++ ){
        const news = this.state.newsList[i];
        if(news.content !== undefined){
          renderNews.push(
              <div className="news">
                <form>
                  <div>
                  {news.title}
                  </div>

                  <div>
                    {/* <button onClick={() => this.onClickDelete(news._id)}>delete</button> */}
                    {/* <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input> */}
                    {/* <button onClick={() => this.onClickEdit(news._id)}>edit</button> */}
                  </div>
                </form>
                  <button>
                    <Link to={{pathname:`/news/${news._id}`}}><p>View News</p></Link></button>
                    {/* <Link to={"/news"}><p>Comments</p></Link></button> */}
              </div>
          )
        }
    }  
    
    // const renderComment= [];

    // for(let i = 0; i < this.state.comment.length; i++ ){
    //     const comment = this.state.comment[i];
    //     if(comment.content !== undefined){
    //     renderComment.push(
    //         <div className="news">
    //             {/* userId:0,
    //             creationTime:0,
    //             newsId: {comment.newsId},
    //             commentid: {comment.commentId}, */}
    //             content: {comment.content}
    //         </div>
    //     )
    //   }
    // }
    return(
      <div>
        <NavBar/>
        <h1>Hacky News</h1>
        <h2>{renderNews.splice(0,29)}</h2>
        {/* <h2>{renderComment}</h2> */}
        {/* { <Input onClick= {this.onClickNews} buttonName="post news" />} */}
      </div>
    )
  }
}
export default App