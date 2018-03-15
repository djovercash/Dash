import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/users'
import UserSidebarContainer from './UserSidebarContainer'
import UserDetailContainer from './UserDetailContainer'

class UserContainer extends React.Component{

  componentDidMount() {
    this.props.fetchUser(61)
  }

  render() {
    return (
      <div id="userContainer">
        <UserSidebarContainer />
        <UserDetailContainer />
      </div>
    )
  }
}

export default connect(null, { fetchUser })(UserContainer)
