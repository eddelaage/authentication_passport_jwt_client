import React from 'react'
import {Form} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {ControlLabel} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {Checkbox} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

class LoginForm extends React.Component {
    state= {
      user: [],
      id: '',
      username: '',
      password:'',
      flash: '',
      token: '',
      isLogin: false
    }

    //ROUTE LOGIN
    handelSubmit = (event) => {
      event.preventDefault();
      const token = this.state.token
      fetch("http://localhost:3249/auth/login", {
        method: 'POST',
        headers: new Headers({'Content-Type':  'application/json'}),
        body:  JSON.stringify(this.state),
      })
      .then(res => res.json())
      .then(data => {
        if(!data.user) {
        }
        else {
          this.setState({"token": data.token, "isLogin": true, "id":data.user.user_id, "user": data.user.user_id})
          localStorage.setItem('token', this.state.token);
          this.props.addLogin(Object.assign({}, {user : data.user.user_id, isAuthenticated: true} ))          
        }
      })
    }

    //ROUTE LOGOUT
    handelClickDisconnected = (event) => {
      // event.preventDefault();
      localStorage.clear()
      this.setState({"token": '', isLogin: false, username: '' })
      // console.log(localStorage)
    }

  render() {
    const  redirectToReferrer  = this.state.isLogin
    if (redirectToReferrer)
            return (<Redirect to={{
                pathname: '/home/${this.state.id.id',
                state: { referrer: this.state.user }
            }} />)

    const isLogin = this.state.isLogin
    const token = localStorage.getItem('token')
    return(
      <div>
          {!isLogin ? <Form horizontal onSubmit={this.handelSubmit}>
          <h1>Connexion</h1>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={12} xl={12}>
              Email
            </Col>
            <Col sm={12} xl={12} lg={12}>
              <FormControl
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={ (event) => this.setState({ username: event.target.value }) }
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={12}>
              <FormControl
                value={this.state.password}
                onChange={ (event) => this.setState({ password: event.target.value }) }
                type="password"
                placeholder="Password"
                name="password"
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={12} sm={12}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={12} sm={12}>
              <Button bsStyle='success' type="submit">Login</Button>
            </Col>
          </FormGroup>
        </Form> : '' }
        <p className="status-message">
          {this.state.isLogin ? `Bonjour ${JSON.stringify(this.state.username)} vous êtes bien connécté` : 'Vous n etes pas connecter'}
        </p>
        {this.state.isLogin ? <Button onClick={this.handelClickDisconnected} bsStyle='warning' id="disconnected">Se deconnecter</Button> : '' }
        <Button onClick={this.handelClick} bsStyle='success' type="submit">Route test</Button>
      </div>
    )
  }
}

export default LoginForm