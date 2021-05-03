import {Link, Redirect} from 'react-router-dom';
import React from 'react';
import Axios from 'axios';
import "./NavBar.css";
import {Navbar} from 'react-bootstrap';


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
                // <div className="navbar">
                //     <p>Hacky News</p>

                //     <button className="nav-button"><Link className="link" to={'/'}><strong>Home</strong></Link></button>


                //     <button className="nav-button"><Link className="link" to={'/createnews/'}><strong>Post News</strong></Link></button>

                //     <button className="nav-button"><strong>{this.state.username}</strong></button>
                //     <button className="nav-button" onClick={() => this.onClickLogout()}>log out</button>
                //     <Button>More</Button>
                // </div>
                <div>
                <nav class="navbar navbar-light navbar-custom">
                <span class="navbar-brand mb-0 h1">Hacky News</span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href={"/"}>Home <span class="sr-only">(current)</span></a>
                        </li>
                        {/* <li class="nav-item">
                            <a class="nav-link" href={'/createnews/'}>Create a post</a>
                        </li> */}
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.username}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item post down" href={'/createnews/'}>Create a post</a>
                        <a class="dropdown-item post down point" onClick={() => this.onClickLogout()}>Logout</a>
                        </div>
                        
                    </li>

                        </ul>
                    </div>
                    </nav>
            </div>
                )
        }
        return(
            // <div className="navbar">

            //     <p>Hacker News</p>
                
            //     <button className="nav-button"><Link className="link" to={'/'}><strong>Home</strong></Link></button>
                
            //     <button className="nav-button" id="right"><Link className="link" to={'/signup/'}><strong>Sign up</strong></Link></button>
                
            //     <button className="nav-button" id="right2"><Link className="link" to={'/login/'}><strong>Log in</strong></Link></button>
            //     <button className="nav-button">More</button>
            // </div>
            <div>
                <nav class="navbar navbar-light navbar-custom">
                <span class="navbar-brand mb-0 h1">Hacky News</span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href={"/"}>Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href={'/signup/'}>Signup</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href={'/login/'}>Login</a>
                    </li>
                    </ul>
                </div>
                </nav>
            </div>

        )  
    }


}

