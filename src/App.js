import React, { Component, browserHistory, IndexRoute } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from './components/LoginForm.js'
import RegistrationForm from './components/RegistrationForm.js'
import Home from './components/Home';
import AuthService from './components/AuthService'
import Protected from './components/Protected';
import NavBar from './components/NavBar';


const isAuthenticated = true


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated 
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends Component {

  state = {
    user: []
    // isAuthenticated: false
  }

// isAuthenticated = true


// PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated 
//       ? <Component {...props} />
//       : <Redirect to='/' />
//   )} />
// )

  addLogin = (user) => {
    this.setState({ user: user })
    console.log('User qui vient de Add Login', user)
    console.log('Le state de app.js', this.state.user)
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div className="App">
          
          {/* <h1>Exercice de connection deconnexion</h1> */}
          <Route path='/AuthService' exact component={AuthService} />
          <Route path='/' exact render={(props) => <LoginForm {...props} addLogin={this.addLogin}/>} />
          {/* <Route path='/' exact component={LoginForm} addLogin={this.addLogin} /> */}
          <Route path='/' exact component={RegistrationForm} />
          {/* <PrivateRoute path={'/home/:id'} component={Home} user={this.state.user} /> */}
          <PrivateRoute path={'/home/:id'}  component={NavBar}/>
          <PrivateRoute path={'/home/:id'} component={Home} />
          {/* <PrivateRoute path={'/home/:id'} component={() => <Home state={this.state.user}/>} /> */}
          {/* <PrivateRoute path='/home/:id' render={( props ) => <Home {...props}/>} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
