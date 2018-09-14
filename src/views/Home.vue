<template>
  <div class="home">
    <ul class="operators">
      <li @click="setOperator('-')">-</li>
      <li @click="setOperator('+')">+</li>
      <li @click="setOperator('*')">*</li>
      <li @click="setOperator('/')">/</li>
    </ul>
    <operator v-if="operator" :operator="operator" />
  </div>
</template>

<script>
// @ is an alias to /src
import operator from '@/components/operator.vue';

export default {
  name: 'home',
  components: {
    operator,
  },
  data() {
    return {
      operator: null,
    };
  },
  methods: {
    setOperator(op) {
      this.operator = op;
    },
  },
};
</script>
