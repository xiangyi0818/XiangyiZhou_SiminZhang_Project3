import Axios from 'axios';
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import NavBar from './NavBar';



export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username1:[],
          password1:[],
          user:[],
          username2:[],
          password2:[],
          redirect:false,
        }
      }


    onClickLogin=(username,password)=> {
    // console.log("login a user")
        const newlogin = {
            username: username,
            password: password,
        };
        // console.log(newlogin)
        
        Axios.post('http://localhost:8000/api/user/authenticate', newlogin,  {withCredentials: true})
        .then(
            (response) => {        
            this.setState({
                redirect:true
            })}
            )
        .catch(error => console.error(error))
        // window.location.href = '/'

    }

    onClickSignUp=(username,password)=> {
        // let history = useHistory();
        // console.log("sign up user")
            const newSignUp = {
                username: username,
                password: password,
            };
          
            Axios.post('http://localhost:8000/api/user/', newSignUp,  {withCredentials: true})
            .then(()=>{this.getUser();
            this.setState({
                redirect:true
            })})
            .catch(error => console.error(error))
    
            // history.push("/");
            // window.location.href = '/'


        }

    getRedirect=()=>{
        if (this.state.redirect){
           return  <Redirect to="/"/> 
        } 

    }

    getUser=()=>{
        Axios.get(`http://localhost:8000/api/user`)
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
            <div>
           <NavBar/>
            <div>
                username:<input type="text" value={this.state.username1} onChange={e => this.setState({username1: e.target.value})}></input>
                password:<input type="text" value={this.state.password1} onChange={e => this.setState({password1: e.target.value})}></input>
                <button onClick={() => this.onClickLogin(this.state.username1,this.state.password1)}>Log in</button>
                {this.getRedirect()}
            </div>
            <div>
                {/* {renderUser} */}
                username:<input type="text" value={this.state.username2} onChange={e => this.setState({username2: e.target.value})}></input>
                password:<input type="text" value={this.state.password2} onChange={e => this.setState({password2: e.target.value})}></input>
                <button onClick={() => this.onClickSignUp(this.state.username2,this.state.password2)}>Sign Up</button>            
                {this.getRedirect()}
                </div>
            </div>
        )
    }
}