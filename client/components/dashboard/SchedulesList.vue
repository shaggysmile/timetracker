<template>
  <div class="schedules-list">
    <div class="schedules-list-filter notification">
      <h2>{{ $t('Filter by Schedules') }}</h2>
      <b-field
        grouped
        group-multiline>
        <div class="control">
          <b-datepicker
            v-model="startDate"
            native-size="2"
            :placeholder="$t('Start Date')"
            icon="calendar"/>
        </div>
        <div class="control">
          <b-datepicker
            v-model="endDate"
            :placeholder="$t('End Date')"
            icon="calendar"/>
        </div>
        <div class="control">
          <b-select
            v-model="filter.employee"
            :placeholder="$t('Choose Employee')"
            :loading="isFindEmployeesPending">
            <option :value="null">
              {{ $t('All') }}
            </option>
            <option
              v-for="option in listEmployees"
              :value="option._id"
              :key="option._id">
              {{ `${option.profile.firstname} ${option.profile.lastname}` }}
            </option>
          </b-select>
        </div>
        <div class="control">
          <b-select
            v-model="filter.location"
            :placeholder="$t('Choose Location')"
            :loading="isFindLocationsPending">
            <option :value="null">
              {{ $t('All') }}
            </option>
            <option
              v-for="option in listLocations"
              :value="option._id"
              :key="option._id">
              {{ option.name }}
            </option>
          </b-select>
        </div>
      </b-field>
    </div>
    <div class="schedules-list-table">
      <!--<pre>{{ getSchedules }}</pre>-->
      <b-table
        :data="schedules"
        :loading="isFindSchedulesPending"
        paginated
        backend-pagination
        :pagination-simple="false"
        :total=total
        :current-page.sync="filter.$skip"
        :per-page=filter.$limit>
        <template slot-scope="props">
          <b-table-column
            width="250"
            field="employee._id"
            :label="$t('Employee')"
            sortable>
            {{ getFullName(props.row) }}
          </b-table-column>
          <b-table-column
            field="position.title"
            :label="$t('Position')"
            width="150"
            sortable>
            <div class="has-text-grey-light">
              {{ props.row.position.title }}
            </div>
          </b-table-column>
          <b-table-column
            width="200"
            field="startDate"
            :label="$t('Start Date')"
            sortable>
            <time class="has-text-grey-light">
              {{ $moment(props.row.startDate).tz(props.row.application.timezone).format('lll') }}
            </time>
          </b-table-column>
          <b-table-column
            field="endDate"
            width="200"
            :label="$t('End Date')"
            sortable>
            <time class="has-text-grey-light">
              {{ props.row.endDate && $moment(props.row.endDate).tz(props.row.application.timezone).format('lll') }}
            </time>
          </b-table-column>
          <b-table-column
            field="position.rate"
            :label="$t('Hours')"
            width="150">
            <div class="has-text-grey has-text-right">
              <b> {{ Math.floor(calculateTotalHours(props.row)) }}</b>
            </div>
          </b-table-column>
          <b-table-column
            field="position.rate"
            :label="$t('Rate')"
            width="150"
            sortable>
            <div class="has-text-grey-light has-text-right">
              <b>{{ props.row.position.rate }}</b> {{ props.row.application.currency.name }}
            </div>
          </b-table-column>
          <b-table-column
            field="position.rate"
            :label="$t('Total')"
            width="180">
            <div class="has-text-success has-text-right">
              <b>{{ calculateRate(props.row) }}</b> {{ props.row.application.currency.name }}
            </div>
          </b-table-column>
          <b-table-column
            width="180">
            <div class="has-text-right">
              <button
                class="button is-light is-small"
                @click="editSchedule">
                {{ $t('Edit') }}
              </button>
              <button class="button is-small is-danger">
                <b-icon
                  icon="trash" />
              </button>
            </div>
          </b-table-column>
        </template>
        <template slot="footer">
          <div class="has-text-right is-size-4">
            <span class="has-text-grey-light">{{ $t('Total Rate:') }}</span>
            <span class="has-text-success">{{ getTotalRate }}</span>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import DashboardSchedulesTodayItem from '~/components/dashboard/DashboardSchedulesTodayItem'

export default {
  name: 'SchedulesList',
  components: {
    DashboardSchedulesTodayItem
  },
  data () {
    return {
      filter: {
        $limit: 20,
        $skip: 1,
        employee: null,
        location: null,
        $sort: { startDate: -1 },
        startDate: {
          $gte: this.$moment().subtract(7, 'day'),
          $lte: this.$moment().add(1, 'day')
        }
      },
      total: 0,
      schedules: []
    }
  },
  watch: {
    filter: {
      handler () {
        this.filterSchedules()
      },
      deep: true
    }
  },
  computed: {
    startDate: {
      get: function () {
        return this.$moment().subtract(7, 'day').toDate()
      },
      set: function (value) {
        Object.assign(this.filter.startDate, {
          $gte: new Date(value).getTime()
        })
      }
    },
    endDate: {
      get: function () {
        return new Date()
      },
      set: function (value) {
        Object.assign(this.filter.startDate, {
          $lte: new Date(value).getTime()
        })
      }
    },
    ...mapState('schedules', {
      isFindSchedulesPending: 'isFindPending'
    }),
    ...mapState('employees', {
      isFindEmployeesPending: 'isFindPending'
    }),
    ...mapState('locations', {
      isFindLocationsPending: 'isFindPending'
    }),
    ...mapGetters('schedules', {
      listSchedules: 'list',
      findSchedulesInStore: 'find',
      currentSchedule: 'current'
    }),
    ...mapGetters('employees', {
      findEmployeesInStore: 'find',
      currentEmployee: 'current',
      listEmployees: 'list'
    }),
    ...mapGetters('locations', {
      findLocationsInStore: 'find',
      currentLocation: 'current',
      listLocations: 'list'
    }),
    getTotalRate () {
      return this.schedules.map(item => this.calculateRate(item)).reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    ...mapActions({
      findSchedules: 'schedules/find',
      saveSchedule: 'schedules/create',
      findEmployees: 'employees/find',
      findLocations: 'locations/find'
    }),
    calculateRate (item) {
      if (!item.position) {
        return 0
      }
      let total = Math.floor(this.calculateTotalHours(item) * item.position.rate)
      if (item.position.charge) {
        total += item.position.charge
      }
      return total
    },
    calculateTotalHours (item) {
      const a = this.$moment(item.startDate)
      const b = this.$moment(item.endDate ? item.endDate : item.startDate)
      return (b.diff(a, 'seconds') / 60 / 60).toFixed(2)
    },
    getFullName (item) {
      return item.employee
        ? `${item.employee.profile.firstname} ${item.employee.profile.lastname}`
        : `${this.$i18n.t('Not working')}`
    },
    async filterSchedules () {
      const query = {}
      Object.assign(query, this.filter, {
        $skip: (this.filter.$skip - 1) * this.filter.$limit
      })
      if (query.employee === null) {
        delete query.employee
      }
      if (query.location === null) {
        delete query.location
      }
      const response = await this.findSchedules({ query })
      this.schedules = response.data || []
      this.total = response.total || 0
    },
    editSchedule () {

    }
  },
  async mounted () {
    await this.filterSchedules()
    await this.findEmployees()
    await this.findLocations()
  }
}
</script>
