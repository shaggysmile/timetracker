<template>
  <div class="schedules-today">
    <transition-group
      class="columns is-multiline is-centered"
      name="list-complete"
      tag="div">
      <DashboardSchedulesTodayItem
        v-for="item in getOpenedSchedules"
        :item="item"
        :key="item._id" />
    </transition-group>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import DashboardSchedulesTodayItem from '~/components/dashboard/DashboardSchedulesTodayItem'
export default {
  name: 'DashboardSchedulesToday',
  components: {
    DashboardSchedulesTodayItem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('schedules', {
      isFindPending: 'isFindPending'
    }),
    ...mapGetters('schedules', {
      find: 'find',
      current: 'current',
      list: 'list'
    }),
    getOpenedSchedules () {
      const DAY = new Date().getTime() - (24 * 60 * 60 * 1000)
      return this.find({
        query: {
          endDate: null,
          $sort: { startDate: -1 }
        }
      }).data.filter(schedule => new Date(schedule.startDate).getTime() > DAY)
    }
  },
  methods: {
    ...mapActions({
      findSchedules: 'schedules/find',
      save: 'schedules/create'
    })
  },
  async mounted () {
    await this.findSchedules({
      query: {
        $limit: 100,
        $sort: { startDate: -1 }
      }
    })
  }
}
</script>
<style lang="scss">
  .schedules-today {
    padding-bottom: 20px;
  }
</style>
