<template>
<body>
<div class="container">
  <h2>Sign in</h2>
  <form class="form-inline" @submit.prevent="login">
    <div class="form-group">
      <label for="username"  class="mb-2 mr-sm-2">Username:</label>
      <input  id="username" type="text" class="form-control mb-2 mr-sm-2"  v-model="username" placeholder="Enter username" required autofocus>
      <label for="password"  class="mb-2 mr-sm-2">Password:</label>
      <input id="password" type="password"  class="form-control mb-2 mr-sm-2" pattern=".{6,}" title="Six or more characters" v-model="password" placeholder="Enter password" required>
    <button type="submit" class="btn btn-primary mb-2">Login</button>
    </div>
  </form>
  </div>
</body>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    login: function () {
      let username = this.username
      let password = this.password
      this.$store
        .dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
