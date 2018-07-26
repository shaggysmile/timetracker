<template>
  <div class="column is-half-desktop is-offset-one-quarter-desktop">
    <div class="box">
      <section class="content">
        <h1 class="has-text-info is-size-2-desktop">{{ $t('Sign in') }}</h1>
      </section>
      <form
        action="/auth/signin"
        method="post"
        @submit.prevent="submit">
        <b-field>
          <b-input
            v-model="form.email"
            type="email"
            name="email"
            :placeholder="$t('Your Email')"
            size="is-medium"
            autocomplete="email"
            autofocus="autofocus" />
        </b-field>
        <b-field>
          <b-input
            v-model="form.password"
            type="password"
            name="password"
            size="is-medium"
            minlength="6"
            autocomplete="password"
            :placeholder="$t('Your Password')"/>
        </b-field>
        <b-field>
          <div class="help">
            <nuxt-link to="/auth/forgot">{{ $t('Forgot password?') }}</nuxt-link>
          </div>
        </b-field>
        <b-field>
          <button
            class="button is-primary is-large is-fullwidth"
            type="submit"
            :class="{ 'is-loading': isAuthenticatePending }">
            {{ $t('Sign in') }}
          </button>
        </b-field>
        <b-field class="has-text-centered">
          <nuxt-link
            to="/signup">
            {{ $t('Not a member? Sign up now') }}
          </nuxt-link>
        </b-field>
      </form>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
  layout: 'auth',
  middleware: 'anonymous',
  head () {
    return {
      title: this.$i18n.t('Sign in')
    }
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('auth', {
      isAuthenticatePending: 'isAuthenticatePending'
    })
  },
  methods: {
    ...mapActions('auth', {
      authenticate: 'authenticate'
    }),
    async submit () {
      try {
        await this.authenticate({
          strategy: 'local',
          email: this.form.email,
          password: this.form.password
        })
        // this.$router.replace('/dashboard')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 500)
      } catch (err) {
        this.$toast.open({
          duration: 5000,
          message: `${err.message}`,
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
