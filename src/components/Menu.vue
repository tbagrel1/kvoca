<template lang="pug">
  b-card#menu-card(
    title="Configuration"
  )
    b-container#menu-card-actions
      b-row#mode-row(class="mb-2")
        b-col#mode-col
          b-container#mode-zone
            b-row#mode-label-row
              b-col#mode-label-col(xs="12")
                span#mode-label Mode
            b-row#mode-choice-row
              b-col#mode-choice-col(xs="12")
                b-form-radio-group#mode-choice(
                  v-model="modeChoice"
                  :options="possibleModes"
                  name="mode-choice"
                  buttons
                )
      b-row#category-row(class="mb-2")
        b-col#category-col
          b-container#category-zone
            b-row#category-label-row
              b-col#category-label-col(xs="12")
                span#category-label Catégorie
            b-row#category-choice-row
              b-col#category-choice-col(xs="12")
                b-form-select#category-choice(
                  v-model="categoryChoice"
                  :options="possibleCategories"
                  name="category-choice"
                )
      b-row#controls-row
        b-col#controls-col
          b-container#controls-zone
            b-row#go-row
              b-col#go-col
                b-button#go-button(
                  @click="onGo"
                ) Go !

</template>

<script>
  import words from '../assets/words.json'

  export const FR_EN = 'fr_en'
  export const EN_FR = 'en_fr'
  export const FR = 'fr'
  export const EN = 'en'
  export const ALL = '* All *'

  const possibleCategories = [ALL]
  for (let possibleCategory of Object.keys(words)) {
    possibleCategories.push(possibleCategory)
  }

  export default {
    name: 'Menu',
    data: () => ({
      modeChoice: FR_EN,
      possibleModes: [
        { text: 'FR vers EN', value: FR_EN },
        { text: 'EN vers FR', value: EN_FR }
      ],
      categoryChoice: ALL,
      possibleCategories: possibleCategories
    }),
    methods: {
      onGo () {
        this.$emit('go', {
          mode: this.modeChoice,
          category: this.categoryChoice
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  #mode-choice
    width 100%
  #go-button
    width 100%
</style>
