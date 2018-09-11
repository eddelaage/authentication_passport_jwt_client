import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js'
import RegistrationForm from './components/RegistrationForm.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Exercice de connection deconnexion</h1>
        <LoginForm />
        <RegistrationForm />
      </div>
    );
  }
}

export default App;
