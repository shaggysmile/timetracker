<template>
  <p>{{ $t('Moment...') }}</p>
</template>
<script>
export default {
  middleware: 'anonymous',
  mounted () {
    this.$router.replace('/dashboard')
  }
}
</script>
