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
      token: ''
    };

    handelSubmit = (event) => {
      event.preventDefault();
      // console.log(this.state)
      const token = this.state.token
      // this.setState({ username: '', password: '' })

      fetch("http://localhost:3249/auth/login", {
        method: 'POST',
        headers: new Headers({'Content-Type':  'application/json'
      }),
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
        // console.log(data.token)
        this.setState({"token": data.token})
        window.localStorage.setItem(token, token)
      }
    })
    // .then(data => console.log(data.token))

    // .then(
    //   res => this.setState({"token": res.token})
    // //   res  =>  this.setState({"flash":  res.flash}),
    // //   err  =>  this.setState({"flash":  err.flash})
    // )
  };

  render() {
    return(
      <div>
        <h2>Formulaire de connexion</h2>
        <Form horizontal onSubmit={this.handelSubmit}>
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
        </Form>
        <p className="status-message">
          {this.state.token ? JSON.stringify(this.state.username) : 'Vous n etes pas connecter'}
        </p>
      </div>
    )
  }
}

export default LoginForm