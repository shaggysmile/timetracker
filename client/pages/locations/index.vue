<template>
  <div class="container">
    Locations
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  methods: {
    ...mapActions('auth', {
      authenticate: 'authenticate'
    })
  },
  async beforeMount () {

  }
}
</script>
