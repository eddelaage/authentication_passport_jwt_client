import React from 'react'
import {withRouter} from 'react-router'
import getJwt from '../helpers/jwt'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // user : this.props.state.user,
      isLoad: false,
      token: localStorage.getItem('token')
    }
  }
  

  render() {

    return(
      <div>
      <h2>Home page</h2>
      Hello bienvenue sur ta page profil : {this.props.location.state && this.props.location.state.referrer.firstName} {this.props.location.state && this.props.location.state.referrer.lastName}
    </div>
    )
  }
}

export default withRouter(Home)
