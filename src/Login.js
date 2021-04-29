import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';


export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username:[],
          password:[],
          user:[],
        }
      }


    onClickLogin=(username,password)=> {
    console.log("login a user")
        const newlogin = {
            username: username,
            password: password,
        };
        // console.log(newlogin)
        
        Axios.post('http://localhost:8000/api/user/authenticate', newlogin,  {withCredentials: true})
        .then(
            // (response) => {console.log(response.data)}
            )
        .catch(error => console.error(error))
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
            <div>
            <button><Link to={'/'}><strong>Home</strong></Link>
            </button>
            <button><Link to={'/signup/'}><strong>Sign Up</strong></Link>
            </button>
            <button><Link to={'/login/'}><strong>Log in</strong></Link>
            </button>
            </div>
            <div>
                username:<input type="text" value={this.state.username} onChange={e => this.setState({username: e.target.value})}></input>
                password:<input type="text" value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
                <button onClick={() => this.onClickLogin(this.state.username,this.state.password)}>Log in</button>
            </div>
            </div>
        )
    }
}