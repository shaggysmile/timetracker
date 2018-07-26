<template>
  <div class="section">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-white">
            {{ $t('On Air') }}
          </h1>
          <h1 class="subtitle has-text-white">
            {{ $t('Today:') }} {{ $moment().format('ll') }}
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="box">
        <DashboardSchedulesToday />
        <SchedulesList />
      </div>
    </div>
  </div>
</template>
<script>
import DashboardSchedulesToday from '~/components/dashboard/DashboardSchedulesToday'
import SchedulesList from '~/components/dashboard/SchedulesList'
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    DashboardSchedulesToday,
    SchedulesList
  }
}
</script>
