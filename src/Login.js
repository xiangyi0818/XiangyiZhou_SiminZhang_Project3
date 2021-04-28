import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';


export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
          content:[],
        }
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
                username:<input type="text"></input>
                password:<input type="text"></input>
                <button>Log in</button>
            </div>
            </div>
        )
    }
}