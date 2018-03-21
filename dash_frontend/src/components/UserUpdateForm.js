import React from 'react'
import ReactFilestack from 'filestack-react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {updateUser, deleteAccount} from '../actions/users'

class UserUpdateForm extends React.Component {

  state = {
    id: null,
    first_name: '',
    last_name: '',
    hometown: '',
    email: '',
    photo: '',
  }

  componentDidMount() {
    const nameArray = this.props.user.name.split(" ")
    this.setState({
      id: this.props.user.id,
      first_name: nameArray[0].toString(),
      last_name: nameArray[1].toString(),
      hometown: this.props.user.hometown,
      email: this.props.user.email,
      photo: this.props.user.photo
    })
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSuccess = (response) => {
    this.setState({
      photo: response.filesUploaded[0].url
    })
  }

  handleSignup = (event) => {
    event.preventDefault()
      let user = {
      id: this.state.id,
      name: event.target.first_name.value + " " + event.target.last_name.value,
      email: event.target.email.value,
      hometown: event.target.hometown.value,
      photo: this.state.photo,
      events: this.props.user.events,
      friends: this.props.user.friends
    }
    this.props.updateUser(user)
  }

  deleteAccount = (event) => {
    this.props.deleteAccount(this.state.id)
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignup}>
          <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleOnChange} placeholder="First Name" />
          <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleOnChange} placeholder="Last Name" />
          <input type="email" name="email" value={this.state.email} onChange={this.handleOnChange} placeholder="Email" />
          <input type="hometown" name="hometown" value={this.state.hometown} onChange={this.handleOnChange} placeholder="Hometown" />
          <ReactFilestack
            apikey={'AO1rF1TdISrSzbwTPEHFez'}
            buttonText="Select a photo"
            buttonClass="classname"
            onSuccess={this.onSuccess}
          />
          <input id="submit" type="submit" value="Submit" /><br/>
        </form>
        <button onClick={this.deleteAccount}>Delete Account</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, {updateUser, deleteAccount})(UserUpdateForm))
