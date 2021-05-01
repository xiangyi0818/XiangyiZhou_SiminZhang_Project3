import Axios from 'axios';
import React from 'react';
import {Link, matchPath} from 'react-router-dom';
import NavBar from './NavBar';
import "./CreateNews.css";


export default class CreateNews extends React.Component{
    constructor(props){
      super(props);
      this.state={
        title:"",
        url:"",
        content:"",
        username:"",
        redirect:false,
        warning1:false,
        warning2:false,
        newsId:"",
      }
    }
    onClickCreate=()=> {
        // this.setState({redirect: true})
        if (this.state.title === ""){
            // console.log("warning1",this.state.warning)
            this.setState({warning2:true})
            // this.showWarning()
            // return 
        }
        else if (this.state.url !== "" && this.state.content !== ""){
            console.log("warning1",this.state.warning)
            this.setState({warning1:true})
            // this.showWarning()
            // return 
        }
        else{
        const newNews = {
            username:this.state.username,
            title: this.state.title,
            url: this.state.url,
            content: this.state.content,
        };
        Axios.post('/api/news', newNews, {withCredentials: true})
            .then((response)=>{ window.location.href = `/news/${response.data._id}` })
            .catch(error => console.error(error))
            
            
        }
      }
    
    // getNewsId=()=>{
    // }

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
        // console.log(window.location.pathname);
        const matchResult = matchPath(window.location.pathname, {
            path: "/createnews/:newsId",
            exact: true,
            strict: true
          });
        if (matchResult !== null){
            const newsId = matchResult.params.newsId;
            this.GetSpecificNews(newsId)

        }
    }

    GetSpecificNews=(newsId)=>{  
        const new_from_response = Axios.get(`/api/news/${newsId}`)
            .then((response) => 
                {
                    // console.log("response",response.data)
                    this.setState({content: response.data.content});
                    this.setState({title: response.data.title});
                    this.setState({url: response.data.url});
                }
                )
            .catch(error => console.error(error))
        // console.log("new_from_response")
        // console.log(new_from_response)
        return new_from_response;
    }

    showWarning(){
        // console.log("showwarning", this.state.warning)
        if (this.state.warning1 === true){
            return <div><strong>Please fill either url or content.Please do not fill them both.</strong></div>
        }
        else if  (this.state.warning2 === true){
            return <div><strong>Please fill the title!</strong></div>
        }
    }

   

    render(){
        // if (this.onClickCreate() === true){
        //     this.state.redirect = true;
        // }
    
        // if (this.state.redirect === true){
        //     window.location.href = '/'
        //     this.state.redirect = false;
        // }
        return(
            <div className="container">
                <div className="main-nav">
                    <NavBar/>
                </div>


                <div className="main-content">
                <div className="title">
                    Title:<input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})}></input>
                </div>

                <div className="url">
                    Url:<input type="text" value={this.state.url} onChange={e => this.setState({url: e.target.value})}></input>
                </div>

                <div className="body">
                    Body:<input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
                </div>

                <div>
                    <button onClick={() => this.onClickCreate()}>Submit</button>
                </div>
                {this.showWarning()}
                </div>
            </div>
        )
    }
}