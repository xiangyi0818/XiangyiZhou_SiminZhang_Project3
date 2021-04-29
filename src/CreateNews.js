import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';


export default class CreateNews extends React.Component{
    constructor(props){
      super(props);
      this.state={
        title:"",
        url:"",
        content:"",
        newsList:[],
      }
    }
    onClickCreate=()=> {

    
        if (this.state.url !== "" && this.state.content !== ""){
            alert("Please fill only one!")
        }
        else{
        const newNews = {
            title: this.state.title,
            url: this.state.url,
            content: this.state.content,
        };
        Axios.post('http://localhost:8000/api/news', newNews, {withCredentials: true})
            .then(this.getNewsList())
            .catch(error => console.error(error))
        }
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
    }


    render(){
        return(
            <div>
                <div>
                <button><Link to={'/'}><strong>Home</strong></Link>
               </button>
                <button><Link to={'/signup/'}><strong>Sign Up</strong></Link>
                </button>
                <button><Link to={'/login/'}><strong>Log in</strong></Link>
                </button>
                </div>
                Title:<input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})}></input>
                Url:<input type="text" value={this.state.url} onChange={e => this.setState({url: e.target.value})}></input>
                Body:<input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
                <button onClick={() => this.onClickCreate()}>Submit</button>
            </div>
        )
    }
}