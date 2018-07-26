<template>
  <b-select
    v-model="currentTimeZone"
    :size="size"
    :placeholder="$t('Choose your timezone')"
    expanded>
    <option
      v-for="timezone in timezonesList"
      :key="timezone"
      :value="timezone">
      {{ timezone }}
    </option>
  </b-select>
</template>
<script>
export default {
  name: 'UISelectTimezone',
  props: {
    timezone: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'is-medium'
    }
  },
  watch: {
    currentTimeZone (val) {
      this.$emit('update:timezone', val)
    }
  },
  data () {
    return {
      currentTimeZone: null
    }
  },
  computed: {
    timezonesList () {
      return this.$moment.tz.names()
    },
    getCurrentTimeZone () {
      const timezone = Intl && Intl.DateTimeFormat().resolvedOptions().timeZone
      return timezone || ''
    }
  },
  mounted () {
    this.currentTimeZone = this.getCurrentTimeZone
  }
}
</script>
