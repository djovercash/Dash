const USERURL = 'http://localhost:3000/users'
const LOGINURL = 'http://localhost:3000/login'

class userApi {
  static login(name, password) {
    return fetch(LOGINURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
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
        hometown: user.hometown
      })
    }).then(res => res.json())
  }


}

export default userApi
