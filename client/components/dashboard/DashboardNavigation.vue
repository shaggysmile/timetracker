<template>
  <nav
    class="navbar is-link navbar-is-dashboard "
    role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <Logo class="navbar-item navbar-logo" />
        <div
          class="navbar-burger burger"
          @click="toggleNav()"
          :class="{ 'is-active': isToggleNav }">
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
      </div>
      <div
        class="navbar-menu"
        v-if="application"
        :class="{ 'is-active': isToggleNav }">
        <div class="navbar-start">
          <nuxt-link
            class="navbar-item"
            to="/locations">
            {{ $t('Locations') }}
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/schedules">
            {{ $t('Schedules') }}
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/employees">
            {{ $t('Employees') }}
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/positions">
            {{ $t('Positions') }}
          </nuxt-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link navbar-item-link--user is-size-7">
              {{ $t("Hi, {title}", { title: application.company.name }) }}
            </div>
            <div class="navbar-dropdown">
              <nuxt-link
                class="navbar-item"
                to="/settings">
                {{ $t('Settings') }}
              </nuxt-link>
              <hr class="navbar-divider">
              <nuxt-link
                class="navbar-item"
                to="/help">
                {{ $t('Help Center') }}
              </nuxt-link>
              <nuxt-link
                class="navbar-item"
                to="/logout">
                {{ $t('Logout') }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from 'vuex'
import Logo from '~/components/core/Logo'
export default {
  name: 'DashboardNavigation',
  components: {
    Logo
  },
  data () {
    return {
      isToggleNav: false
    }
  },
  computed: {
    ...mapState('auth', {
      application: 'user'
    }),
    ...mapState({
      isAuthenticated: state => !!(state.auth && state.auth.user)
    })
  },
  methods: {
    toggleNav () {
      this.isToggleNav = !this.isToggleNav
    }
  }
}
</script>
<style lang="scss">
  .navbar-is-dashboard {
    background: none!important;
    .navbar-logo {
      padding-top: 15px;
      width: 90px;
      height: 87px;
      padding-bottom: 15px;
    }
  }
</style>
