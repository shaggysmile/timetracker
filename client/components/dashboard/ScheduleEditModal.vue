<template>
  <div class="schedule-edit-modal">
    Hello
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import DashboardSchedulesTodayItem from '~/components/dashboard/DashboardSchedulesTodayItem'

export default {
  name: 'ScheduleEditModal',
  components: {
    DashboardSchedulesTodayItem
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
    filter: {
      handler () {},
      deep: true
    }
  },
  computed: {
    ...mapState('schedules', {
      isFindSchedulesPending: 'isFindPending'
    })
  },
  methods: {
    ...mapActions({
      findSchedules: 'schedules/find',
      saveSchedule: 'schedules/patch'
    }),

  },
  async mounted () {
  }
}
</script>
