<template>
  <section class="section auth-section">
    <div class="logo">
      <Logo />
    </div>
    <div class="container">
      <div class="columns">
        <nuxt/>
      </div>
    </div>
  </section>
</template>
<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>
<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  .auth-section {
    min-height: 100vh;
    background: #7F00FF url("~/assets/images/hrbg.png") no-repeat;
    .logo {
      text-align: center;
      margin: 20px 0 50px;
    }
    @include mobile {
      .logo {
        margin: -20px 0 20px;
      }
    }
  }
</style>
