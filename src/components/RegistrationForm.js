import React from 'react'
import FormValidator from './FormValidator'

import {Form} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {ControlLabel} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {Radio} from 'react-bootstrap'
import {Button} from 'react-bootstrap'


class RegistrationForm extends React.Component {
  constructor () {
    super()

    this.validator = new FormValidator([
      {
        field: 'firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Merci de reseigner votre prénom'
      },
      {
        field: 'lastName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Merci de reseigner votre nom'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'Ce mail n\'est pas valide'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Merci de définir un mot de passe'
      },
      {
        field: 'password',
        method: 'matches',
        args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/],
        // "^"" The password string will start this way
        // "(?=.*[a-z])" The string must contain at least 1 lowercase alphabetical character
        // "(?=.*[A-Z])" The string must contain at least 1 uppercase alphabetical character
        // "(?=.*[0-9])" The string must contain at least 1 numeric character
        // "(?=.[!@#\$%\^&])" The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
        // "(?=.{8,})" The string must be eight characters or longer
        validWhen: true,
        message: 'Ce mot de passe n\'est pas valide : Le mot de passe doit contenir au minimum 8 character, 1 minuscule, 1 maguscule et 1 chiffre'
      },
      {
        field: 'birthDate',
        method: 'isEmpty',
        validWhen: false,
        message: 'Merci de reseigner votre date de naissance'
      },
      {
        field: 'gender',
        method: 'isEmpty',
        validWhen: false,
        message: 'Merci de définir votre genre'
      }
      //{
      //   field: 'tel',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'Merci de reseigner votre téléphone'
      // },
      // {
      //   field: 'tel',
      //   method: 'matches',
      //   args: [/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/], // args is an optional array of arguements that will be passed to the validation method
      //   validWhen: true,
      //   message: 'Ce numéro de télpéhone n\'est pas valide'
      // }
    ])

    this.state = {
      email: '',
      password:'',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      flash: '',
      tel: '',
      validation: this.validator.valid()
    }
    this.submitted = false
  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handelSubmit = (event) => {
    event.preventDefault()
    // this.props.addEmail(this.state)
    console.log(this.state)
    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    this.submitted = true

    if (validation.isValid) {
      fetch('http://localhost:3249/auth/signup/', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'
        }),
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        // .then(
        //   res => this.setState({'flash': res.flash}),
        //   err => this.setState({'flash': err.flash})
        // )
        .catch(err => console.log(err))

    //   fetch('https://edouarddelaage-server.herokuapp.com/auth/send-email', {
    //     method: 'POST',
    //     headers: new Headers({'Content-Type': 'application/json'
    //     }),
    //     body: JSON.stringify(this.state)
    //   })
    // }
    }
  }

  render () {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation

    return (
      <div>
        <h1>Inscription</h1>
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
          {this.submitted ? <span className="alert alert-danger">{validation.email.message}</span> : ''}

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
          {this.submitted ? <span className="alert alert-danger">{validation.password.message}</span> : ''}

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
          {this.submitted ? <span className="alert alert-danger">{validation.firstName.message}</span> : ''}

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
          {this.submitted ? <span className="alert alert-danger">{validation.lastName.message}</span> : ''}

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
          {this.submitted ? <span className="alert alert-danger">{validation.birthDate.message}</span> : ''}

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
          {this.submitted ? <span className="alert alert-danger">{validation.gender.message}</span> : ''}

          <FormGroup>
            <Col smOffset={12} sm={12}>
              <Button bsStyle='success' type="submit">Inscription</Button>
            </Col>
          </FormGroup>


        </Form>
        <p className="status-message">
          {this.state.flash ? JSON.stringify(this.state.flash) : ''}
        </p>
      </div>
    )
  }
}

export default RegistrationForm
