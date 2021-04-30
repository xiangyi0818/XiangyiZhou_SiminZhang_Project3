import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';


export default class CreateNews extends React.Component{
    constructor(props){
      super(props);
      this.state={
        title:"",
        url:"",
        content:"",
        username:"",
        newsList:[],
        redirect:false,
      }
    }
    onClickCreate=()=> {
        // this.setState({redirect: true})
        
        if (this.state.url !== "" && this.state.content !== ""){
            alert("Please fill only one!")
        }
        else{
        const newNews = {
            username:this.state.username,
            title: this.state.title,
            url: this.state.url,
            content: this.state.content,
        };
        Axios.post('http://localhost:8000/api/news', newNews, {withCredentials: true})
            .then()
            .catch(error => console.error(error))
        window.location.href = '/'
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

   

    render(){
        // if (this.onClickCreate() === true){
        //     this.state.redirect = true;
        // }
    
        // if (this.state.redirect === true){
        //     window.location.href = '/'
        //     this.state.redirect = false;
        // }
        return(
            <div>
                <div>
                <NavBar/>
                </div>
                Title:<input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})}></input>
                Url:<input type="text" value={this.state.url} onChange={e => this.setState({url: e.target.value})}></input>
                Body:<input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
                <button onClick={() => this.onClickCreate()}>Submit</button>
            </div>
        )
    }
}