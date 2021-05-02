import Axios from 'axios';
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import NavBar from './NavBar';
import "./Login.css";



export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username1:"",
          password1:"",
          user:[],
          username2:[],
          password2:[],
          redirect:false,
          misMatch:false,
          blankInput:false,
          notFindUser:false,
        }
      }


    onClickLogin=(username,password)=> {
        if (username === "" || password === ""){
            this.setState({blankInput:true})
            this.setState({misMatch: false})
            return
        }
        else{
            this.setState({blankInput:false})
        }

    // console.log("login a user")
        const newlogin = {
            username: username,
            password: password,
        };
        // console.log(newlogin)
        
        Axios.post('/api/user/authenticate', newlogin,  {withCredentials: true})
        // (console.log("login response",response))
        .then(
            (response) => { 
                this.setState({
                    redirect:true
                })
            }
            )
        .catch((error) => {
            if (error.response.data === "The username does not exist"){
                this.setState({notFindUser:true})
            }
            else
            {this.setState({misMatch: true})}})
        // window.location.href = '/'

    }


    getRedirect=()=>{
        if (this.state.redirect){
           return  <Redirect to="/"/> 
        } 

    }

    showWarning=()=>{
        const warningMessage = []
        if (this.state.misMatch){
            warningMessage.push(
                <div>
                <strong>username or password does not match!</strong>
               </div>
            ) 
        }
        else if (this.state.blankInput){
            warningMessage.push(
                <div>
                <strong>username and password must be filled!</strong>
               </div>
            ) 
        }
        else if (this.state.notFindUser){
            warningMessage.push(
                <div>
                <strong>username does not exist!</strong>
               </div>
            ) 
        }
        // console.log(this.state.blankInput)
        return warningMessage
    }

    getUser=()=>{
        Axios.get(`/api/user`)
            .then((response) => {
                console.log(response)
                this.setState({
                    user: response.data,
        })}) 
        .catch(error => console.error(error))   
    }
        
    componentDidMount() {
            this.getUser();
    }

    render(){
        return(

            <div className="container">
                <div className="main-nav">
                    <NavBar/>
                <div>


                <h3>Login</h3>

                <div className="username">
                    username:<input type="text" value={this.state.username1} onChange={e => this.setState({username1: e.target.value})}></input>
                </div>

                <div className="password">
                    password:<input type="password" value={this.state.password1} onChange={e => this.setState({password1: e.target.value})}></input>
                </div>
                    
                <button id="input" onClick={() => this.onClickLogin(this.state.username1,this.state.password1)}>Log in</button>
  

                    <div>
                    {this.showWarning()}
                    {this.getRedirect()}
                    </div>

                </div>
                <div>
                    {/* {renderUser} */}
                    {/* username:<input type="text" value={this.state.username2} onChange={e => this.setState({username2: e.target.value})}></input>
                    password:<input type="text" value={this.state.password2} onChange={e => this.setState({password2: e.target.value})}></input>
                    <button onClick={() => this.onClickSignUp(this.state.username2,this.state.password2)}>Sign Up</button>            
                    {this.getRedirect()} */}
                    </div>
                </div>
            </div>
        )
    }
}