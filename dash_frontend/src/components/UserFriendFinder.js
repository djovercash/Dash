import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, addFriend} from '../actions/users'

class UserFriendFinder extends React.Component {

  state = {
    friendFinder: ''
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFriendship = (friend) => {
    const friendship = {
      user: this.props.user,
      friend: friend
    }
    this.props.addFriend(friendship)
  }

  render() {
    const filteredFriends = this.props.users.filter(user => user.name.toUpperCase().includes(this.state.friendFinder.toUpperCase()))
    const friend = filteredFriends[0]
    if (filteredFriends.length > 0) {
      const filteredFriend = filteredFriends[0]
      const friendsAlready = this.props.user.friends.find(friend => friend.id === filteredFriend.id)
      return (
        <div>
          <h3>Find Friends</h3>
          <input type="text" name="friendFinder" onChange={this.handleOnChange} />
            <h5>{filteredFriends[0].name}</h5>
            {!friendsAlready ?
              <button onClick={() => {this.handleFriendship(filteredFriends[0])}}>Add Friend</button>
              :
              <h5>Already Friends</h5>
            }
        </div>
      )
    } else {
      return (
        <div>
          <h3>Poop</h3>
        </div>
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    users: state.users,
    user: state.user
  }
}

export default connect(mapStateToProps, {fetchUsers, addFriend})(UserFriendFinder)
