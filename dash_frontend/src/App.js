import React, { Component } from 'react';
import UserContainer from './containers/UserContainer'
import Navbar from './containers/Navbar'
import Footer from './containers/Footer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <UserContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
