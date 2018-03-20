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
    if (this.props.users) {
      const filteredFriends = this.props.users.filter(user => user.name.toUpperCase().includes(this.state.friendFinder.toUpperCase()))
      if (filteredFriends.length > 0 && this.state.friendFinder !== '') {
        const filteredFriend = filteredFriends[0]
        const friendsAlready = this.props.user.friends.find(friend => friend.id === filteredFriend.id)
        return (
          <div className="friendFinder">
            <h3>Find Friends</h3>
            <input type="text" name="friendFinder" onChange={this.handleOnChange} />
              <h5><img src={filteredFriends[0].photo} width="50px" height="50px" alt={filteredFriends[0].name}/>{filteredFriends[0].name}</h5>
              {!friendsAlready ?
                <button onClick={() => {this.handleFriendship(filteredFriends[0])}}>Add Friend</button>
                :
                <h5>Already Friends</h5>
              }
          </div>
        )
      } else {
        return (
          <div className="friendFinder">
            <h3>Find Friends</h3>
            <input type="text" name="friendFinder" onChange={this.handleOnChange} />
          </div>
        )
      }
    } else {
      return (
        <div className="friendFinder">
          <h3>Find Friends</h3>
          <input type="text" name="friendFinder" onChange={this.handleOnChange} />
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
