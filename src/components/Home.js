import React from 'react'
import {withRouter} from 'react-router'
import getJwt from '../helpers/jwt'
import {Button} from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      // user : this.props.state.user,
      isLoad: false,
      token: localStorage.getItem('token')
    }
  }

  componentWillMount() {
    this.setState({isLogin: true})
    
  }

  handelClickDisconnected = (event) => {
    // event.preventDefault();
    localStorage.clear()
    this.setState({"token": '', isLogin: false, username: '' })
    // console.log(localStorage)
  }
  

  render() {
    {console.log(this.props.location.state && this.props.location.state.referrer)}
    console.log('Is Login', this.state.isLogin)
    const  redirectToReferrer  = this.state.isLogin
    if (!redirectToReferrer)
            return (<Redirect to={{
                pathname: '/'
               }
            } />)

    return(
      <div>
      <h2>Home page</h2>
      Hello bienvenue sur ta page profil : {this.props.location.state && this.props.location.state.referrer.firstName} {this.props.location.state && this.props.location.state.referrer.lastName}
      <p>
      {this.state.isLogin ? <Button onClick={this.handelClickDisconnected} bsStyle='warning' id="disconnected">Se deconnecter</Button> : '' }
      </p>
    </div>
    )
  }
}

export default withRouter(Home)
