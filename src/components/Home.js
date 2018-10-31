import React from 'react'
import {withRouter} from 'react-router'
import getJwt from '../helpers/jwt'

import { Redirect } from 'react-router-dom'

import {Form} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {ControlLabel} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {Radio} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      isInEditMode: false,
      firstName: this.props.location.state && this.props.location.state.referrer.firstName,
      lastName: this.props.location.state && this.props.location.state.referrer.lastName,
      email: this.props.location.state && this.props.location.state.referrer.email,
      // user : this.props.state.user,
      isLoad: false,
      token: localStorage.getItem('token')
    }
  }

  componentWillMount() {
    this.setState({isLogin: true})
    
  }

  handelUpdateData = (event) => {
     !this.state.isInEditMode ? this.setState({isInEditMode: true}) : this.setState({isInEditMode: false})
  }

  

  handelClickDisconnected = (event) => {
    // event.preventDefault();
    localStorage.clear()
    this.setState({"token": '', isLogin: false, username: '' })
    // console.log(localStorage)
  }
  

  render() {
    // {console.log('Props Location State sur Home', this.props.location.state && this.props.location.state.referrer)}
    // console.log('Is in edit mode', this.state.isInEditMode)
    const  redirectToReferrer  = this.state.isLogin
    if (!redirectToReferrer)
            return (<Redirect to={{
                pathname: '/'
               }
            } />)

    return(
      <div>
      <h2>Home page</h2>
      Hello bienvenue sur ta page profil : 
      {!this.state.isInEditMode ? 
        <div>
          <p>Nom / prenom : {this.state.firstName + ' ' + this.state.lastName}</p>  
          <p>email : {this.state.email}</p>
        </div>
      : 

        <Form onSubmit={this.handelSubmit}>
        
        <FormGroup controlId="formHorizontalRegistrationEmail">
          <Col componentClass={ControlLabel} sm={12} xl={12}>
            Email
          </Col>
          <Col sm={12} xl={12} lg={12}>
            <FormControl
              type="email"
              name="email"
              className="email"
              value={this.state.email}
              onChange={ (event) => this.setState({ email: event.target.value }) }
            />
          </Col>
        </FormGroup>

              
        <FormGroup controlId="formHorizontalRegistrationPassword">
          <Col componentClass={ControlLabel} sm={12} xl={12}>
            Mot de Passe
          </Col>
          <Col sm={12} xl={12} lg={12}>
            <FormControl
              type="password"
              name="password"
              className="password"
              value={this.state.password}
              onChange={ (event) => this.setState({ password: event.target.value }) }
            />
          </Col>
        </FormGroup>

              
        <FormGroup controlId="formHorizontalFirstName">
          <Col componentClass={ControlLabel} sm={12} xl={12}>
            Prénom
          </Col>
          <Col sm={12} xl={12} lg={12}>
            <FormControl
              type="text"
              name="firstName"
              className="firstName"
              value={this.state.firstname}
              onChange={ (event) => this.setState({ firstName: event.target.value }) }
            />
          </Col>
        </FormGroup>
        
              
         <FormGroup controlId="formHorizontalLastName">
            <Col componentClass={ControlLabel} sm={12} xl={12}>
              Nom
            </Col>
            <Col sm={12} xl={12} lg={12}>
              <FormControl
                type="text"
                name="lastName"
                className="lastName"
                value={this.state.lastname}
                onChange={ (event) => this.setState({ lastName: event.target.value }) }
              />
            </Col>
        </FormGroup>

              
        <FormGroup controlId="formHorizontalBirthDate">
          <Col componentClass={ControlLabel} sm={12} xl={12}>
            Date de naissance
          </Col>
          <Col sm={12} xl={12} lg={12}>
            <FormControl
              type="date"
              name="birthDate"
              className="birthDate"
              value={this.state.birthDate}
              onChange={ (event) => this.setState({ birthDate: event.target.value }) }
            />
          </Col>
        </FormGroup>

              
        <FormGroup controlId="formHorizontalHomme">
          <Col componentClass={ControlLabel} sm={12} xl={12}>
            Homme
          </Col>
          <Col sm={12} xl={12} lg={12}>
            <FormControl
              type="radio"
              name="gender"
              checked={this.state.gender==='homme'}
              className="homme"
              value="homme"
              onChange={ (event) => this.setState({ gender: event.target.value }) }
            />
          </Col>
        </FormGroup>


        <FormGroup controlId="formHorizontalFemme">
          <Col componentClass={ControlLabel} sm={12} xl={12}>
            Femme
          </Col>
          <Col sm={12} xl={12} lg={12}>
            <FormControl
              type="radio"
              name="gender"
              className="femme"
              checked={this.state.gender==='femme'}
              value="femme"
              onChange={ (event) => this.setState({ gender: event.target.value }) }
            />
          </Col>
        </FormGroup>


        <FormGroup>
          <Col smOffset={12} sm={12}>
            <Button bsStyle='success' type="submit">Inscription</Button>
          </Col>
        </FormGroup>


      </Form>


      
       }
      {/* {this.props.location.state && this.props.location.state.referrer.firstName} {this.props.location.state && this.props.location.state.referrer.lastName} */}
      <p>
      {<Button onClick={this.handelUpdateData} bsStyle='success' id="updateData">Modifier mon profil</Button>}
      {this.state.isLogin ? <Button onClick={this.handelClickDisconnected} bsStyle='warning' id="disconnected">Se deconnecter</Button> : '' }
      </p>
    </div>
    )
  }
}

export default withRouter(Home)
