import React from 'react'
import { login, signup } from '../actions/users'
import { connect } from 'react-redux'


const Login = (props) => {

  const handleLogin = (event) => {
    event.preventDefault()
    let user = {
      name: event.target.name.value,
      password: event.target.password.value
    }
    props.login(user)
  }

  return (
    <div>
      <h1>Login</h1><br />
        <form onSubmit={handleLogin}>
          <input name="name" placeholder="name" /><br />
          <input name="password" type="password" placeholder="password" /><br />
          <input id="submit" type="submit"/>
        </form>
        <button onClick={props.signup}>Sign up</button>
    </div>
  )
}

export default connect(null, { login, signup })(Login)
