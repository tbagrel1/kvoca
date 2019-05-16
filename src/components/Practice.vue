<template lang="pug">
  b-card#voca-card(
    title="Vocabulaire"
  )
    b-container#voca-card-actions
      b-row#count-row(class="mb-2")
        b-col#count-col
          span#count-label Mot
          span#count
            span#count-no {{ this.wordNo + 1 }}
            span#count-slash /
            span#count-nb {{ this.wordList.length }}
      b-row#word-row(class="mb-2")
        b-col#left-col
          div#left
            span#left-label {{ this.config.mode === FR_EN ? 'FR: ' : 'EN: ' }}
            span#left-word {{ this.currentWord.left }}
        b-col#right-col
          div#right
            span#right-label {{ this.config.mode === FR_EN ? 'EN: ' : 'FR: ' }}
            span#right-word {{ this.answerShown ? this.currentWord.right : '???' }}
      b-row#action-row
        b-col#action-col
          b-button#next-button(
            @click="onNext"
            :disabled="answerShown && !isNext"
          ) {{ this.answerShown ? this.isNext ? 'Suivant' : 'Fini !' : 'Afficher' }}

</template>

<script>
  import words from '../assets/words.json'

  import {
    FR, EN, FR_EN, EN_FR, ALL
  } from './Menu'

  export default {
    name: 'Practice',
    props: [
      'config'
    ],
    data: function () { return {
      wordList: this.generateWordList(),
      wordNo: 0,
      answerShown: false,
      FR_EN,
      EN_FR
    } },
    mounted () {
    },
    computed: {
      isNext () {
        return this.wordNo < this.wordList.length - 1
      },
      currentWord () {
        return this.wordList[this.wordNo]
      }
    },
    methods: {
      onNext () {
        if (!this.answerShown) {
          this.answerShown = true
        } else {
          this.answerShown = false
          this.wordNo += 1
        }
      },
      generateWordList () {
        const wordList = []
        const categories = []
        if (this.config.category === ALL) {
          for (let category in words) {
            if (words.hasOwnProperty(category)) {
              categories.push(category)
            }
          }
        } else {
          categories.push(this.config.category)
        }
        for (let category of categories) {
          for (let i = 0; i < words[category].length; i++) {
            let word = words[categories][i];
            if (this.config.mode === FR_EN) {
              wordList.push({ left: word[FR], right: word[EN] })
            } else {
              wordList.push({ left: word[EN], right: word[FR] })
            }
          }
        }
        this.shuffle(wordList)
        return wordList
      },
      shuffle (array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1))
          var temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  #count-col
    display flex
    flex-direction row
    justify-content space-between
    align-content center
  #count
    display flex
    flex-direction row
    justify-content space-between
    align-content center
  #count-slash
    padding-left calc(0.3 * var(--cu))
    padding-right calc(0.3 * var(--cu))
  #next-button
    width 100%

  boxed-word()
    border-style solid
    border-radius calc(0.3 * var(--cu))
    border-width calc(0.12 * var(--cu))
    border-color grey
    padding-top calc(0.15 * var(--cu))
    padding-bottom calc(0.15 * var(--cu))
    padding-left calc(0.4 * var(--cu))
    padding-right calc(0.4 * var(--cu))
    display flex
    flex-direction row
    justify-content space-between
    align-content center

  #left
    boxed-word()
  #right
    boxed-word()
</style>
