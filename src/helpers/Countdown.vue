<template>
  <div class='coutdown'>
    <div v-if="isEnded">
      Ended.
    </div>

    <div v-else>
      <div v-if="days">Days: {{ days }}</div>
      <div v-if="hours">Hours: {{ hours }}</div>
      <div v-if="minutes">Minutes: {{ minutes }}</div>
      <div>Seconds: {{ seconds }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    endDate: {
      type: Number, // Date.parse(this.endDate)
    },
  },
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      isEnded: null,
    };
  },
  methods: {
    updateRemaining(distance) {
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    },

    tick() {
      const currentTime = new Date();
      const distance = Math.max(this.endDate - currentTime, 0);
      this.updateRemaining(distance);

      if (distance === 0) {
        clearInterval(this.timer);
        this.isEnded = true;
        this.$emit('ended');
      }
    },
  },

  mounted() {
    this.tick();
    this.timer = setInterval(this.tick.bind(this), 1000);
  },

  destroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
  .coutdown {
    font-size: 35px;
    color: #fff;
  }
</style>
