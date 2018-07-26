<template>
  <div class="dashboard-layout">
    <DashboardNavigation/>
    <nuxt v-if="isAuthenticated"/>
    <footer class="footer is-transparent">
      <div class="container">
        <div class="content">
          <p class="has-text-white">
            Bulma by Jeremy Thomas. The source code is licensed MIT.<br>
            The website content is licensed CC BY NC SA 4.0.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DashboardNavigation from '~/components/dashboard/DashboardNavigation'

export default {
  components: {
    DashboardNavigation
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate',
      findSchedules: 'schedules/find'
    })
  },
  computed: {
    ...mapState('auth', {
      application: 'user'
    }),
    ...mapState({
      isAuthenticated: state => !!(state.auth && state.auth.user)
    })
  },
  async mounted () {
    await this.authenticate()
      .then()
      .catch(_ => this.$router.replace('/signin'))
  }
}
</script>
<style>
  .dashboard-layout {
    min-height: 100vh;
  }
</style>
