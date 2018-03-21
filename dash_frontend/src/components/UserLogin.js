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
    this.props.login(user).then(res => {
      if (!this.props.error) {
        this.props.history.push('/home')
      }
    })
  }

  render() {
    return (
      <div id="login">
      <FlexyFlipCard
        frontBackgroundColor="rgba(0, 0, 0, 0.6)"
        backBackgroundColor="rgba(0, 0, 0, 0.6)">
        <div>
          <h1 ref='flipper'>DASH</h1>
        </div>
        <div>
          <form id="loginForm" onSubmit={this.handleLogin}>
            <input className="loginInput" name="email" placeholder="email" />
            <input className="loginInput" name="password" type="password" placeholder="password" />
            <input ref='flipper' id="submit" type="submit"/>
          </form>
          <button onClick={() => {this.props.history.push("/signup")}}>Sign up</button>
        </div>
      </FlexyFlipCard>
      {this.props.error ? this.props.error : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.error
  }
}


export default connect(mapStateToProps, { login, signup })(Login)
