import API from '../services/API'
export default {
  addUser (user) {
    console.log(user)
    return API().post('addUser', user)
    /* return API().push('addUser', {
      username: user.username,
      password: user.password // add our data to the request body
    }) */
  },
  deleteUser (userID) {
    return API().post('deleteUser', {
      userID: userID // add our data to the request body
    })
  },
  getUsers () {
    return API().get('user')
  }
}
