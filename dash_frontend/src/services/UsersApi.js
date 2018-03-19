const USERURL = 'http://localhost:3000/users'
const LOGINURL = 'http://localhost:3000/login'
const INVITEURL = 'http://localhost:3000/invites'

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

  static updateStatus(id, status) {
    return fetch(`${INVITEURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: status
      })
    }).then(res => res.json())
  }


}

export default userApi
