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
          warning:false,
        }
      }


    // onClickLogin=(username,password)=> {
    // // console.log("login a user")
    //     const newlogin = {
    //         username: username,
    //         password: password,
    //     };
    //     // console.log(newlogin)
        
    //     Axios.post('http://localhost:8000/api/user/authenticate', newlogin,  {withCredentials: true})
    //     .then(
    //         (response) => {        
    //         this.setState({
    //             redirect:true
    //         })}
    //         )
    //     .catch(error => console.error(error))
    //     // window.location.href = '/'

    // }

    onClickSignUp=(username,password)=> {
        // let history = useHistory();
        // console.log("sign up user")
            const newSignUp = {
                username: username,
                password: password,
            };
          
            Axios.post('http://localhost:8000/api/user/', newSignUp,  {withCredentials: true})
            .then((response)=>{
                // console.log("signup response", response)
                // if (response.status === 403){
                //     this.setState(warning:true)
                // }
                this.getUser();
                this.setState({
                redirect:true
            })})
            .catch((error) => {this.setState({warning: true})})
    
            // history.push("/");
            // window.location.href = '/'


        }

    getRedirect=()=>{
        if (this.state.redirect){
           return  <Redirect to="/"/> 
        } 

    }

    showWarning=()=>{
        if (this.state.warning){
            return <div>
                        <strong>username already exist! Please choose another username!</strong>
                    </div>
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
                {/* {renderUser} */}
                username:<input type="text" value={this.state.username2} onChange={e => this.setState({username2: e.target.value})}></input>
                password:<input type="text" value={this.state.password2} onChange={e => this.setState({password2: e.target.value})}></input>
                <button onClick={() => this.onClickSignUp(this.state.username2,this.state.password2)}>Sign Up</button>   
                {this.showWarning()}         
                {this.getRedirect()}
                </div>
            </div>
        )
    }
}