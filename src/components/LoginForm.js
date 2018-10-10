import React from 'react'
import {Form} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {ControlLabel} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {Checkbox} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

class LoginForm extends React.Component {
    state= {
      username: '',
      password:'',
      flash: '',
      token: '',
      isLogin: false
    }

    handelSubmit = (event) => {
      event.preventDefault();
      // console.log(this.state)
      const token = this.state.token
      // this.setState({ username: '', password: '' })

      fetch("http://localhost:3249/auth/login", {
        method: 'POST',
        headers: new Headers({'Content-Type':  'application/json'}),
        body:  JSON.stringify(this.state),
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      if(!data.user) {
        //alert class danger user don't exist
      }
      else {
        //store the token
        console.log(data.token)
        this.setState({"token": data.token, "isLogin": true})
        localStorage.setItem('token', this.state.token)
        // console.log(localStorage)
        // console.log(this.state)
      }
    })
    // .then(data => console.log(data.token))

    // .then(
    //   res => this.setState({"token": res.token})
    // //   res  =>  this.setState({"flash":  res.flash}),
    // //   err  =>  this.setState({"flash":  err.flash})
    // )

    }

    handelClick = (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token')
      console.log(token)
      fetch("http://localhost:3249/test/", {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    }

    handelClickDisconnected = (event) => {
      // event.preventDefault();
      localStorage.clear()
      this.setState({"token": '', isLogin: false, username: '', username: '' })
      console.log(localStorage)
    }





  render() {
    const isLogin = this.state.isLogin
    const token = localStorage.getItem('token')
    return(
      <div>
          {!isLogin ? <Form horizontal onSubmit={this.handelSubmit}>
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
          {this.state.token ? `Bonjour ${JSON.stringify(this.state.username)} vous êtes bien connécté` : 'Vous n etes pas connecter'}
        </p>
        {this.state.isLogin ? <Button onClick={this.handelClickDisconnected} bsStyle='warning' id="disconnected">Se deconnecter</Button> : '' }
        <Button onClick={this.handelClick} bsStyle='success' type="submit">Route test</Button>
      </div>
    )
  }
}

export default LoginForm