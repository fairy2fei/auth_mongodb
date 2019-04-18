<template>
<div><hr>
<div class="alert alert-danger"><strong>Message </strong>{{ authError }}</div>
<hr><Login /><hr><Register /><hr></div>
</template>

<script>
import { mapState } from 'vuex'
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  components: {Login, Register},
  computed: mapState(['authError'])
}
</script>
<style>
.alert{
max-width: 500px;
text-align: center;
margin: auto;
}
</style>
