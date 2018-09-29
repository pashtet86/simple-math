<template>
  <div class="home">
    <div class="desk">
      <div>
        <ul class="operators">
          <li v-for="(op, index) in operatorsList" :key="index">
            <a @click="setOperator(op)">{{op}}</a>
          </li>
        </ul>
        <h1>
          Range
          <input type="number" v-model.number="MIN" width="10">
          -
          <input type="number" v-model.number="MAX" width="10">
        </h1>
        <form action="" @submit.prevent>
          <table>
            <tr>
              <td width="200">
                <strong>history:</strong>
                <ul v-if="historyList.length">
                  <li
                    v-for="(ex, index) in historyList"
                    :key="index"
                    :class="[ ex.correct ? 'green' : 'red' ]"
                    v-text="ex.text"
                  />
                </ul>
              </td>
              <td>
                <table>
                  <tr>
                    <td>
                      <div class="current-example">
                        <strong>{{numberOne || '?'}}</strong>
                        {{operator}}
                        <strong>{{numberTwo || '?'}}</strong> =
                        <input type="number" ref="answer" v-model.number="answer" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        @click="checkResult"
                        type="submit"
                        :disabled="answer.length < 1"
                      >Check</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        @click="clear"
                        type="submit"
                        :disabled="!historyList.length"
                      >Clear all</button>
                    </td>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'operator',

  // props: {
  //   operator: {
  //     type: String,
  //   },
  // },

  data() {
    return {
      MIN: 5,
      MAX: 13,
      answer: '',
      correct: null,
      historyList: [],
      numberOne: null,
      numberTwo: null,
      correctCount: 0,
      operator: null,
      operatorsList: ['-', '+', '*', '/'],
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

      // this.$refs.answer.focus();
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
      // this.$refs.answer.focus();
      this.numberOne = this.createRandom();
      this.numberTwo = this.createRandom();
    },

    setOperator(op) {
      this.operator = op;
    },
  },
};
</script>
