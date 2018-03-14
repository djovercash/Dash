const USERURL = 'http://localhost:3000/users'

class UserApi {
  static fetchUser(id) {
    return fetch(`${USERURL}/${id}`).then(res => res.json())
  }
}

export default UserApi
