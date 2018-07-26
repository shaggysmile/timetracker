<template>
  <p>{{ $t('Moment. Logout...') }}</p>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  layout: 'logout',
  head () {
    return {
      title: this.$i18n.t('Logout')
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  },
  mounted () {
    this.logout().then(() => {
      setTimeout(() => {
        window.location.replace('/signin')
      }, 500)
    })
  }
}
</script>
