<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="row text-center">
      <Picture v-for="picture in pictures" :key="picture.id" :picture="picture" />
      <!-- ad pictures will go here -->
    </div>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState),
      pictures: computed(() => AppState.pictures)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
