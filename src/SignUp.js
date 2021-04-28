import Axios from 'axios';
import React from 'react';
import Input from './Input';
import {Link} from 'react-router-dom';


export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username:[],
          password:[],
          userList:[],
        }
      }

onClickSignUp=(username,password)=> {
    console.log("sign up user")
        const newSignUp = {
            username: username,
            password: password,
        };
      
        Axios.post('http://localhost:8000/api/user/', newSignUp)
        .then(this.getUser())
        .catch(error => console.error(error))
      }

getUser=()=>{
Axios.get(`http://localhost:8000/api/user`)
    .then((response) => {
        console.log(response)
        this.setState({
            userList: response.data,
})}) 
.catch(error => console.error(error))   
}

componentDidMount() {
    this.getUser();
}
render(){   
const renderUser= [];

for(let i = 0; i < this.state.userList.length; i++ ){
    const user = this.state.userList[i];
    console.log(user)
    if(user.username != undefined){
    renderUser.push(
        <div className="user">
            {user.username}:
            {user.password}
        </div>
    )
  }
}
        return(
            <div>
            <div>
               <button><Link to={'/'}><strong>Home</strong></Link>
               </button>
                <button><Link to={'/signup/'}><strong>Sign Up</strong></Link>
                </button>
                <button><Link to={'/login/'}><strong>Log in</strong></Link>
                </button>
                <div>
                {/* {renderUser} */}
                username:<input type="text" value={this.state.username} onChange={e => this.setState({username: e.target.value})}></input>
                password:<input type="text" value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
                <button onClick={() => this.onClickSignUp(this.state.username,this.state.password)}>Sign Up</button>            </div>
                </div>
                </div>
        )
    }
}
