<template>
  <nuxt-link
    class="timetracker-logo"
    to="/">
    <div class="timetracker-logo-clock">
      <div
        :style="{ transform: 'rotateZ('+hour+'deg)' }"
        class="timetracker-logo-clock-hand timetracker-logo-clock-hand--hour"/>
      <div
        :style="{ transform: 'rotateZ('+minute+'deg)' }"
        class="timetracker-logo-clock-hand timetracker-logo-clock-hand--minute"/>
      <div
        :style="{ transform: 'rotateZ('+second+'deg)' }"
        class="timetracker-logo-clock-hand timetracker-logo-clock-hand--second"/>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  name: 'Logo',
  data () {
    return {
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  methods: {
    update () {
      const date = new Date()
      const seconds = date.getSeconds()
      const minutes = date.getMinutes()
      const hours = date.getHours()
      this.hour = (hours * 30) + (minutes / 2)
      this.minute = minutes * 6
      this.second = seconds * 6
    }
  },
  created () {
    this.update()
  },
  mounted () {
    this.update()
  }
}
</script>
<style lang="scss">
  .timetracker-logo {
    display: inline-block;
    width: 100px;
    height: 100px;
    &-clock {
      position: relative;
      background: #13a89d;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: 5px solid #fff;
      box-shadow:
        0 0 0 5px rgba(0,0,0,0.1),
        inset 0 0 5px rgba(0,0,0,.1);
      &:after {
        background: #fff;
        border-radius: 50%;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 17px;
        height: 17px;
        z-index: 1;
      }
      &:before {
        background: #f5a71c;
        border-radius: 50%;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 9px;
        height: 9px;
        z-index: 10;

      }
      &-hand {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        &--hour {
          background: #fff;
          height: 20%;
          left: 48.75%;
          position: absolute;
          top: 30%;
          transform-origin: 50% 100%;
          width: 2.5%;
          animation: rotate 43200s infinite linear;
        }
        &--minute {
          background: #fff;
          height: 40%;
          left: 49%;
          position: absolute;
          top: 10%;
          transform-origin: 50% 100%;
          width: 4%;
          animation: rotate 3600s infinite linear;
        }
        &--second {
          background: #f5a71c;
          height: 45%;
          left: 49.5%;
          position: absolute;
          top: 14%;
          transform-origin: 50% 80%;
          width: 3%;
          z-index: 10;
          animation: rotate 60s infinite linear;
          &:after {
            background: #f5a71c;
            border-radius: 50%;
            content: "";
            position: absolute;
            margin-left: -6px;
            left: 50%;
            top: 0;
            width: 12px;
            height: 12px;
            z-index: 10;
          }
        }
      }
    }

    @keyframes rotate {
      100% {
        transform: rotateZ(360deg);
      }
    }

  }
</style>
