import React from 'react'
import {connect} from 'react-redux'
import {createUser} from '../actions/users'

const Signup = (props) => {

  const handleSignup = (event) => {
    event.preventDefault()
    let user = {
      name: event.target.name.value,
      password: event.target.password.value,
      password_confirmation: event.target.passwordConfirmation.value,
      email: event.target.email.value,
      hometown: event.target.hometown.value
    }
    props.createUser(user)
  }

  return (
    <div>
      <h3>BETTA SIGNUP, YALL</h3>
      <form onSubmit={handleSignup}>
        <h3>Username: </h3>
        <input type="text" name="name" placeholder="name" />
        <h3>Password: </h3>
        <input type="password" name="password" placeholder="Password" />
        <h3>Password Confirmation: </h3>
        <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
        <h3>Email: </h3>
        <input type="email" name="email" placeholder="email" />
        <h3>Hometown: </h3>
        <input type="hometown" name="hometown" placeholder="hometown" />
        <br />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(null, { createUser })(Signup)
