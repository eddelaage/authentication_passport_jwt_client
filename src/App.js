import React, { Component } from 'react';
import './App.css';
import Form from './components/Form.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Exercice de connection deconnexion</h1>
        <Form />
      </div>
    );
  }
}

export default App;
