const USERURL = 'http://localhost:3000/users'
const LOGINURL = 'http://localhost:3000/login'
const INVITEURL = 'http://localhost:3000/invites'
const FRIENDSHIPURL = 'http://localhost:3000/friendships'

class userApi {
  static login(email, password) {
    return fetch(LOGINURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
  }

  static fetchUser(id) {
    return fetch(`${USERURL}/${id}`).then(res => res.json())
  }

  static fetchUsers() {
    return fetch(USERURL).then(res => res.json())
  }

  static createUser(user) {
    return fetch(USERURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password,
        password_confirmation: user.password_confirmation,
        email: user.email,
        hometown: user.hometown,
        photo: user.photo
      })
    }).then(res => res.json())
  }

  static updateStatus(event, status) {
    return fetch(`${INVITEURL}/${event[0].id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        admin: event[0].admin,
        event_id: event[0].event_id,
        host: event[0].host,
        id: event[0].id,
        status: status,
        user_id: event[0].ids
      })
    }).then(res => res.json())
  }

  static updateUser(user) {
    return fetch(`${USERURL}/${user.id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        current_password: user.current_password,
        email: user.email,
        events: user.events,
        friends: user.friends,
        hometown: user.hometown,
        name: user.name,
        photo: user.photo,
      })
    }).then(res => res.json())
  }

  static addFriend(user_id, friend_id) {
    return fetch(FRIENDSHIPURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user_id,
        friend_id: friend_id
      })
    }).then(res => res.json())
  }

  static deleteAccount(id) {
    fetch(`${USERURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(console.log)
  }


}

export default userApi
