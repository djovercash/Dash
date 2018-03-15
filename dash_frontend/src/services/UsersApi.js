const USERURL = 'http://localhost:3000/users'

class userApi {
  static fetchUser(id) {
    return fetch(`${USERURL}/${id}`).then(res => res.json())
  }
}

export default userApi
