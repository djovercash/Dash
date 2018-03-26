import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import UserContainer from './containers/UserContainer'
import Navbar from './containers/Navbar'
import Footer from './containers/Footer'
import Login from './components/UserLogin'
import Signup from './components/UserSignup'
import { fetchUser } from './actions/users'
import { fetchEvents } from './actions/events'
import {connect} from 'react-redux'
import './App.css';

class App extends Component {

  componentDidMount() {
    if (localStorage["user_id"]) {
      let id = localStorage.user_id
      this.props.fetchUser(id)
      this.props.history.push('/home')
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/home" render={(routerParams) => {
            return (
              <div>
                <Navbar {...routerParams}/>
                <UserContainer />
                <Footer />
              </div>
            )
          }}/>
          <Route path="/signup" render={(routerParams) => {
            return <Signup {...routerParams}/>
          }}/>
          <Route path="/login" render={(routerParams) => {
            return <Login {...routerParams}/>
          }}/>
        </Switch>
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

export default withRouter(connect(mapStateToProps, {fetchUser, fetchEvents})(App));
