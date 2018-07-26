<template>
  <div class="column is-one-quarter schedules-today-item">
    <article class="media">
      <figure class="media-left ">
        <p class="image is-64x64 schedules-today-item-avatar">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/96x96.png">
        </p>
      </figure>
      <div class="media-content schedules-today-item-content">
        <div class="schedules-today-item-header">
          <h4 class="is-size-5 has-text-weight-semibold">{{ getFullName }}</h4>
          <small>{{ getPosition }}</small>
        </div>
        <p>
          <b-icon
            class="has-text-grey-lighter"
            icon="clock-o"
            size="is-small"/>
          <span class="has-text-grey-light">
            {{ getFormattedWorkSchedule }}
            <b
              v-if="hasDiffOnOpen"
              class="has-text-danger"
              :title="getFormattedWorkSchedule">
              {{ getFormattedDiffDate }}
            </b>
          </span>
        </p>
        <p>
          <b-icon
            class="has-text-grey-lighter"
            icon="calendar-o"
            size="is-small"/>
          <time class="has-text-grey-light">
            {{ getFormattedStartDate }}
          </time>
        </p>
        <!--<p>
          <b-icon
            class="has-text-grey-lighter"
            icon="map-marker"
            size="is-small"/>
          {{ item.location.name }}
        </p>-->
      </div>
    </article>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'DashboardSchedulesTodayItem',
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
  computed: {
    getFullName () {
      return `${this.item.employee.profile.firstname} ${this.item.employee.profile.lastname}`
    },
    getPosition () {
      return `${this.item.position.title}`
    },
    getFormattedWorkSchedule () {
      return `${this.$moment(this.getScheduleStartDate).format('HH:mm')} - ${this.$moment(this.getScheduleEndDate).format('HH:mm')}`
    },
    getFormattedStartDate () {
      return this.$moment(this.item.startDate).tz(this.item.application.timezone).format('lll')
    },
    getScheduleStartDate () {
      const startOfSchedule = new Date(this.item.startDate)
      return this.$moment(startOfSchedule)
        .hours(this.item.position.startTime)
        .minutes(0)
    },
    getScheduleEndDate () {
      const endOfSchedule = new Date(this.item.endDate)
      return this.$moment(endOfSchedule)
        .hours(this.item.position.endTime)
        .minutes(0)
    },
    hasDiffOnOpen () {
      return this.$moment(this.item.startDate).diff(this.getScheduleStartDate) > 0
    },
    getFormattedDiffDate () {
      return this.$moment(this.item.startDate).from(this.getScheduleStartDate, true)
    }
  },
  methods: {
    ...mapActions({
      findSchedules: 'schedules/find',
      save: 'schedules/create'
    })
  }
}
</script>
<style lang="scss">
  .schedules-today-item {
    // padding: 40px 0;
    transition: all .2s;
    // border-bottom: 1px solid #eee;
    &-avatar {
      // display: inline-block;
      img {
        border: 4px solid #eee;
      }
    }
    &-header {
      margin-bottom: 20px;
    }
    &-content {
      //font-size: 1rem;
    }
  }
  .list-complete-item {
    transition: all .2s;
    //display: inline-block;
    // margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: relative;
  }
</style>
