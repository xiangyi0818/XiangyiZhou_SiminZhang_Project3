import {Link, Redirect} from 'react-router-dom';
import React from 'react';
import Axios from 'axios';
import "./NavBar.css";
// import {Button} from 'react-bootstrap';


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
                <div className="navbar">
                    <p>Hacky News</p>

                    <button className="nav-button"><Link className="link" to={'/'}><strong>Home</strong></Link></button>


                    <button className="nav-button"><Link className="link" to={'/createnews/'}><strong>Post News</strong></Link></button>

                    <button className="nav-button"><strong>{this.state.username}</strong></button>
                    <button className="nav-button" onClick={() => this.onClickLogout()}>log out</button>
                    {/* <Button>More</Button> */}
                </div>)
        }
        return(
            <div className="navbar">

                <h3>Hacker News</h3>
                
                <button className="nav-button"><Link className="link" to={'/'}><strong>Home</strong></Link></button>
                
                <button className="nav-button" id="right"><Link className="link" to={'/signup/'}><strong>Sign up</strong></Link></button>
                
                <button className="nav-button" id="right2"><Link className="link" to={'/login/'}><strong>Log in</strong></Link></button>
                {/* <button className="nav-button">More</button> */}
            </div>

        )  
    }


}

