import React from 'react'
import {FlexyFlipCard} from 'flexy-flipcards'
import { login, signup } from '../actions/users'
import { connect } from 'react-redux'


class Login extends React.Component {

  handleLogin = (event) => {
    event.preventDefault()
    let user = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    this.props.login(user)
  }

  render() {
    return (
      <FlexyFlipCard
        frontBackgroundColor="#231b1b"
        backBackgroundColor="#231b1b">
      <div>
        <h1 ref='flipper'>DASH</h1>
      </div>
      <div>
        <h1>Login</h1><br />
          <form onSubmit={this.handleLogin}>
            <input name="email" placeholder="email" /><br />
            <input name="password" type="password" placeholder="password" /><br />
            <input ref='flipper' id="submit" type="submit"/>
          </form>
          <button onClick={this.props.signup}>Sign up</button>
      </div>
      </FlexyFlipCard>
    )
  }
}

export default connect(null, { login, signup })(Login)
