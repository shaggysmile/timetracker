<template>
  <div class="column is-half-desktop is-offset-one-quarter-desktop">
    <div class="box">
      <section class="content">
        <h1 class="has-text-info is-size-2-desktop">{{ $t('Register') }}</h1>
      </section>
      <form
        action="/auth/signup"
        method="post"
        @submit.prevent="submit">
        <b-field :label="$t('Set your company name')">
          <b-input
            v-model="form.company.name"
            type="text"
            name="company[name]"
            :placeholder="$t('Company Name')"
            size="is-large"
            autocomplete="company[name]"
            autofocus="autofocus" />
        </b-field>
        <b-field :label="$t('Choose your timezone')">
          <UISelectTimezone :timezone.sync="form.timezone" />
        </b-field>
        <hr>
        <b-field>
          <b-input
            v-model="form.phone"
            type="tel"
            name="phone"
            :placeholder="$t('Your Phone')"
            size="is-medium"
            autocomplete="email"
          />
        </b-field>
        <b-field>
          <b-input
            v-model="form.email"
            type="email"
            name="email"
            :placeholder="$t('Your Email')"
            size="is-medium"
            autocomplete="email"
          />
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
          <button
            class="button is-primary is-large is-fullwidth"
            type="submit"
            :class="{ 'is-loading': isAuthenticatePending }">
            {{ $t('Register') }}
          </button>
        </b-field>
        <b-field class="has-text-centered">
          <nuxt-link
            to="/signin">
            {{ $t('Have an account? Sign in') }}
          </nuxt-link>
        </b-field>
      </form>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import UISelectTimezone from '~/components/ui/UISelectTimezone'
export default {
  layout: 'auth',
  middleware: 'anonymous',
  head () {
    return {
      title: this.$i18n.t('Sign in')
    }
  },
  components: {
    UISelectTimezone
  },
  data () {
    return {
      form: {
        company: {
          name: ''
        },
        email: '',
        password: '',
        timezone: ''
      }
    }
  },
  computed: {
    ...mapState('auth', {
      isAuthenticatePending: 'isAuthenticatePending'
    }),
    ...mapState('application', {
      isCreatePending: 'isCreatePending'
    })
  },
  methods: {
    ...mapActions('auth', {
      authenticate: 'authenticate'
    }),
    ...mapActions('application', {
      create: 'create'
    }),
    async submit () {
      try {
        await this.create(this.form)
        await this.authenticate({
          strategy: 'local',
          email: this.form.email,
          password: this.form.password
        })
        window.location.href = '/dashboard'
      } catch (err) {
        console.log(err)
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
