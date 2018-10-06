<template>
  <div class="main-wrapper">
    <div class="desk">
      <div class="desk__in">
        <div class="desk__top">
          <div class="wrapper">
            <ul class="operators">
              <li
                v-for="(op, index)
                in operatorsList"
                :key="index"
                :class="{ active: operator === op.op }"
                @click="setOperator(op.op)"
              >
                <img
                  :src="`/imgs/operators/${op.img}.png`"
                />
              </li>
            </ul>
          </div>
          <div class="wrapper level" >
            <a @click="changeLevel({ MIN: 1, MAX: 10 })">easy 🤓</a>
            <a @click="changeLevel({ MIN: 5, MAX: 15 })">hard 😎</a>
          </div>
          <!-- <div class="wrapper">
            <a class="start-btn" v-if="operator">Start</a>
            <a class="start-btn" v-if="false">Start</a>
          </div> -->
          <!-- <Countdown
            v-if="coundownOn"
            :endDate="Date.now() + 100000"
            @ended="timerEnded"
          /> -->
          <!-- <h1>
            Range
            <input type="number" v-model.number="MIN" width="10">
            -
            <input type="number" v-model.number="MAX" width="10">
          </h1> -->
        </div>
        <form @submit.prevent class="middle-section" v-if="operator">
          <div class="current-example">
            <span>{{numberOne || '?'}}</span>
            <img :src="`/imgs/operators/${imgName}.png`" />
            <span>{{numberTwo || '?'}}</span>
            <img :src="`/imgs/operators/equal.png`" />
            <input type="number" ref="answer" v-model.number="answer" />
          </div>
          <div class="check-btn-wrapper">
            <button
              @click="checkResult"
              type="submit"
              class="check-btn"
              :disabled="answer.length < 1"
              v-text="'Check!'"
            />
          </div>
          <!-- <button
            @click="clear"
            type="submit"
            :disabled="!historyList.length"
            v-text="'Clear all'"
          /> -->
          <ul v-if="historyList.length" class="answers-list">
            <li
              v-for="(ex, index) in historyList"
              :key="index"
            >
              <img v-if="ex.correct" src="/imgs/lamp.png" alt="">
              <img v-else src="/imgs/red-lamp.png" alt="">
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from '@/helpers/Countdown.vue';

export default {
  name: 'board',

  components: { Countdown },

  data() {
    return {
      MIN: 5,
      MAX: 13,
      answer: '',
      coundownOn: false,
      correct: null,
      historyList: [],
      numberOne: null,
      numberTwo: null,
      correctCount: 0,
      operator: '*',
      operatorsList: [
        // { img: 'divide', op: '/' },
        { img: 'minus', op: '-' },
        { img: 'plus', op: '+' },
        { img: 'multiply', op: '*' },
      ],
    };
  },

  mounted() {
    this.getRandom();
  },

  computed: {
    imgName() {
      if (this.operator) {
        return this.operatorsList.filter(obj => obj.op === this.operator)[0].img || null;
      }
      return null;
    },
  },

  methods: {
    clear() {
      this.answer = '';
      this.historyList = [];
      this.correctCount = 0;
      this.$refs.answer.focus();
    },

    playSound(sound) {
      const audio = new Audio(`./sounds/${sound}.mp3`);
      audio.play();
    },

    checkResult() {
      const {
        numberOne,
        numberTwo,
        operator,
        answer,
        playSound,
      } = this;

      const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
      };

      this.correct = operators[operator](numberOne, numberTwo) === answer;

      if (this.correct) {
        this.correctCount += 1;
        playSound('correct');
      } else {
        playSound('no');
      }

      this.$refs.answer.focus();
      this.historyList.push({
        correct: this.correct,
        text: `${numberOne} ${operator} ${numberTwo} = ${answer}`,
      });

      this.getRandom();
    },

    createRandom() {
      const { MIN, MAX } = this;
      return Math.floor((Math.random() * (MAX - MIN)) + MIN);
    },

    getRandom() {
      this.answer = '';
      this.numberOne = this.createRandom();
      this.numberTwo = this.createRandom();
    },

    setOperator(op) {
      this.operator = op;
      this.getRandom();
    },

    timerEnded() {
      console.log('↘️ ', 'yes');
    },

    changeLevel(level) {
      const { MIN, MAX } = level;
      this.MIN = MIN;
      this.MAX = MAX;
      this.getRandom();
    },
  },
};
</script>
