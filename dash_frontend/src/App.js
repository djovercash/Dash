import React, { Component } from 'react';
import UserContainer from './containers/UserContainer'
import Navbar from './containers/Navbar'
import Footer from './containers/Footer'
import Login from './components/UserLogin'
import Signup from './components/UserSignup'
import { fetchUser } from './actions/users'
import {connect} from 'react-redux'
import './App.css';

class App extends Component {

  componentDidMount() {
    if (localStorage["user_id"]) {
      let id = localStorage.user_id
      this.props.fetchUser(id)
    }
  }

  whatToRender() {
  if (this.props.loggedIn) {
    return (
      <div>
        <Navbar />
        <UserContainer />
        <Footer />
      </div>
    )
  } else if (this.props.signup) {
    return (
      <div>
        <Navbar />
        <Signup />
        <Footer />
      </div>
    )
  } else {
    return (
      <div>
        <Navbar />
        <Login />
        <Footer />
      </div>
    )
  }
}


  render() {
    return (
      <div className="App">
        {this.whatToRender()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    signup: state.signup
  }
}

export default connect(mapStateToProps, {fetchUser})(App);
