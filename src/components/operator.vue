<template>
  <div id="app">
    <h1>Trainer ({{MIN}} - {{MAX}})</h1>
    <form action="" @submit.prevent>
      <table>
        <tr>
          <td width="200">
            <strong>history:</strong>
            <ul v-if="historyList.length">
              <li v-for="(ex, index) in historyList" :key="index" :class="[ ex.correct ? 'green' : 'red' ]">
                {{ ex.text }}
              </li>
            </ul>
          </td>
          <td>
            <table>
              <tr>
                <td>
                  <strong>{{numberOne || '?'}}</strong> {{operator}} <strong>{{numberTwo || '?'}}</strong> =
                  <input type="number" ref="answer" v-model.number="answer" /></td>
              </tr>
              <tr>
                <td><button @click="checkResult" type="submit" :disabled="answer.length < 1">Check</button></td>
              </tr>
              <tr>
                <td><button @click="clear" type="submit" :disabled="!historyList.length">Clear all</button></td>
              </tr>
              <tr>
                <td class="tcenter" v-if="historyList.length">
                  <span class="green" v-if="correct">You are right!</span>
                  <span class="red" v-else>Wrong answer</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="green">Correct: {{correctCount}} </div>
                  <div class="red">Incorrect: {{historyList.length - correctCount}}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

    </form>
  </div>
</template>

<script>
export default {
  name: 'operator',

  props: {
    operator: {
      type: String,
    },
  },

  data() {
    return {
      numberOne: null,
      numberTwo: null,
      answer: '',
      correctCount: 0,
      correct: null,
      MIN: 5,
      MAX: 13,
      historyList: [],
    };
  },

  created() {
    this.getRandom();
  },

  methods: {
    clear() {
      this.historyList = [];
      this.correctCount = 0;
      this.answer = '';
      this.$refs.answer.focus();
    },

    playSound(sound) {
      const audio = new Audio(`./sounds/${sound}.mp3`);
      audio.play();
    },

    checkResult() {
      const { numberOne, numberTwo, operator } = this;
      const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
      };
      this.correct = operators[operator](numberOne, numberTwo) === this.answer;
      if (this.correct) {
        this.correctCount += 1;
        this.playSound('correct');
      } else {
        this.playSound('no');
      }
      // this.$refs.answer.focus();
      this.historyList.push({
        correct: this.correct,
        text: `${this.numberOne} * ${this.numberTwo} = ${this.answer}`,
      });
      this.getRandom();
    },

    createRandom() {
      return Math.floor((Math.random() * (this.MAX - this.MIN)) + this.MIN);
    },

    getRandom() {
      this.answer = '';
      // this.$refs.answer.focus();
      this.numberOne = this.createRandom();
      this.numberTwo = this.createRandom();
    },
  },
};
</script>
