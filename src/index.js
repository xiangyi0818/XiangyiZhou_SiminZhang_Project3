import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App';
import ViewNews from './ViewNews';
import SignUp from './Signup';
import Login from './Login';
import CreateNews from './CreateNews';

ReactDOM.render(
  <React.StrictMode>
  {/* <Provider store={store}>
  <AlertProvider template={AlertTemplate}> */}
  <Router>
          <Switch>
              {/* exact makes sure to render ONLY the given component, since this behaves like a switch case logic */}
              <Route exact path={"/news/:newsId"} component={ViewNews}/>
              <Route exact path={"/signup/"} component={SignUp}/>
              <Route exact path={"/login/"} component={Login}/>
              <Route exact path={"/"} component={App}/>
              {/* <Route exact path={"/createnews/:newsId"} component={CreateNews}/> */}
              <Route exact path={"/createnews"} component={CreateNews}/>
              <Route exact path={"*"} component={App}/>
              
              {/* This last case is essentially the default case.  Good to have
              if someone types in an incorrect URL.  A component can also be passed here*/}
          </Switch>
      </Router>

    {/* <App /> */}
    {/* </AlertProvider>
  </Provider> */}
</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
