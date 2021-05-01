import Axios from 'axios';
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import NavBar from './NavBar';



export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username:"",
          password:"",
          redirect:false,
          warning:false,
          blank:false,
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

    onClickSignUp=()=> {
        // let history = useHistory();
        // console.log("sign up user")
            const newSignUp = {
                username: this.state.username,
                password: this.state.password,
            };
          
            if (this.state.username === "" || this.state.password === ""){
                this.setState({blank:true})
                return 
            }
            Axios.post('/api/user/', newSignUp,  {withCredentials: true})
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
        else if(this.state.blank){
            return <div>
                        <strong>Please fill both username and password!</strong>
                    </div>
        }
    }

    getUser=()=>{
        Axios.get(`/api/user`)
            .then((response) => {
                // console.log(response)
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
                username:<input type="text" value={this.state.username} onChange={e => this.setState({username: e.target.value})}></input>
                password:<input type="text" value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
                <button onClick={() => this.onClickSignUp()}>Sign Up</button>   
                {this.showWarning()}         
                {this.getRedirect()}
                </div>
            </div>
        )
    }
}