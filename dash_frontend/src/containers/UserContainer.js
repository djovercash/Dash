import React from 'react'
import { connect } from 'react-redux'
import UserSidebarContainer from './UserSidebarContainer'
import UserDetailContainer from './UserDetailContainer'

class UserContainer extends React.Component{

  render() {
    return (
      <div id="userContainer">
        <UserSidebarContainer />
        <UserDetailContainer />
      </div>
    )
  }
}

export default connect()(UserContainer)
