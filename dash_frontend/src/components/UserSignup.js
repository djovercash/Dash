import React from 'react'
import ReactFilestack from 'filestack-react';
import {FlexyFlipCard} from 'flexy-flipcards'
import {connect} from 'react-redux'
import {createUser, noSignup} from '../actions/users'

class Signup extends React.Component {

  state = {
    photo: ''
  }

  handleSignup = (event) => {
    event.preventDefault()
    let user = {
      name: event.target.firstName.value + " " + event.target.lastName.value,
      password: event.target.password.value,
      password_confirmation: event.target.passwordConfirmation.value,
      email: event.target.email.value,
      hometown: event.target.hometown.value,
      photo: this.state.photo
    }
    this.props.createUser(user)
    this.setState({
      photo: ''
    })
  }

  onSuccess = (response) => {
    this.setState({
      photo: response.filesUploaded[0].url
    })
  }

  render() {
    return (
      <div id="signup">
        <FlexyFlipCard
          frontBackgroundColor="rgba(0, 0, 0, 0.6)"
          backBackgroundColor="rgba(0, 0, 0, 0.6)">
          <div>
            <form id="loginForm" onSubmit={this.handleSignup}>
              <input className="signupInput" type="text" name="firstName" placeholder="First Name" />
              <input className="signupInput" type="text" name="lastName" placeholder="Last Name" />
              <input className="signupInput" type="password" name="password" placeholder="Password" />
              <input className="signupInput" type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
              <input className="signupInput" type="email" name="email" placeholder="Email" />
              <input className="signupInput" type="hometown" name="hometown" placeholder="Hometown" />
              <ReactFilestack
                apikey={'AO1rF1TdISrSzbwTPEHFez'}
                buttonText="Select a photo"
                buttonClass="classname"
                onSuccess={this.onSuccess}
              />
              <input id="submit" type="submit" value="Submit" /><br/>
            </form>
            <button onClick={() => {this.props.history.push("/login")}}>Go Back</button>
          </div>
          <div>
            <h1 ref='flipper'>DASH</h1>
          </div>
        </FlexyFlipCard>
      </div>
    )
  }
}

export default connect(null, { createUser, noSignup })(Signup)
