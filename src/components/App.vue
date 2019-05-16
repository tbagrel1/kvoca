<template lang="pug">
  div#app
    nav(class="navbar navbar-dark bg-dark")
      a(class="navbar-brand" @click="onGoHome" href="#") KVoca
      span(class="navbar-text") Réviser le vocabulaire de Karen facilement !
    b-container(fluid align-v="center")#app-actions
      b-row#app-row(align-h="center")
        b-col#app-col(xs="12" sm="11" md="10" lg="8" xl="7")
          Menu(
            v-if="config === null"
            @go="onGo"
          )
          Practice(
            v-else
            :config="config"
          )
</template>

<script>
  import Menu from './Menu'
  import Practice from './Practice'

  const SITE_URL = 'http://kvoca.tbagrel1.com'

  export default {
    name: 'App',
    components: {
      Menu,
      Practice
    },
    data: () => ({
      config: null,
      windowWidth: window.innerWidth
    }),
    methods: {
      onGo (config) {
        this.config = config
      },
      onGoHome () {
        if (window.location.href === SITE_URL) {
          window.location.reload()
        } else {
          window.location.href = SITE_URL
        }
      }
    },
    watch: {
      windowWidth (newWidth, oldWidth) {
        this.$cu.update(newWidth)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$cu.update(this.windowWidth)
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth
        })
      })
      this.$nextTick(() => {
        console.log(this.$cu.get())
      })
    }
  }
</script>

<style scoped lang="stylus">
  #app
    height 100%
    display flex
    flex-direction column
    align-content center
    justify-content start
  #app-actions
    flex-grow 1
    display flex
    flex-direction column
    align-content center
    justify-content center
</style>
