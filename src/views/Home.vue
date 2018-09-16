<template>
  <div class="home">
    <ul class="operators">
      <li v-for="(op, index) in operatorsList" :key="index">
        <a @click="setOperator(op)">{{op}}</a>
      </li>
    </ul>
    <operator v-if="operator" :operator="operator" />
  </div>
</template>

<script>
import operator from '@/components/operator.vue';

export default {
  name: 'home',

  components: {
    operator,
  },

  data() {
    return {
      operator: null,
      operatorsList: ['-', '+', '*', '/'],
    };
  },

  methods: {
    setOperator(op) {
      this.operator = op;
    },
  },
};
</script>

<style lang="scss">
  ul.operators {
    display: flex;
    justify-content: center;
    list-style-type: none;

    li {
      text-align: center;
      margin: 20px;
    }

    a {
      display: block;
      height: 50px;
      line-height: 50px;
      width: 50px;
      border: 1px solid #000;
      font-size: 25px;
      cursor: pointer;
    }

  }
</style>

