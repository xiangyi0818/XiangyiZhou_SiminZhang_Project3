import {Link, Redirect} from 'react-router-dom';
import React from 'react';
import Axios from 'axios';


export default class NavBar extends React.Component{
    constructor(props){
      super(props);
      this.state={
          username: "",
          redirect:false,
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

    onClickLogout=()=>{
        Axios.post(`/api/user/logout`,{} ,{withCredentials: true})
        .catch(error => console.error(error))  
        // this.setState({redirect:true}) 
        this.setState({username:""})
        window.location.href = '/'
    }

    // trigerReditect=()=>{
    //     if (this.state.redirect){
    //       return  <Redirect to="/"/> 
    //     }
    //   }

    componentDidMount() {
        this.getUserName();
    }

    render(){
        // console.log("navbar")
        if (this.state.username !== ""){
            return (
                <div>
                <button><Link to={'/'}><strong>Home</strong></Link></button>
                <button><strong>{this.state.username}</strong></button>

                <button><Link to={'/createnews/'}><strong>Post News</strong></Link></button>
                <button onClick={() => this.onClickLogout()}>log out</button>
                </div>)
        }
        return(
            <div>
                <button><Link to={'/'}><strong>Home</strong></Link></button>
                <button><Link to={'/signup/'}><strong>Sign up</strong></Link></button>
                <button><Link to={'/login/'}><strong>Log in</strong></Link></button>
            </div>

        )  
    }


}

