<template>
  <body class="bg-img">
    <header class="">
      <Navbar />
    </header>
    <main class="">
      <router-view />
    </main>
    <footer class="">
      <div class="row text-center">
        <Picture v-for="picture in pictures" :key="picture.id" :picture="picture" />
        <!-- ad pictures will go here -->
      </div>
    </footer>
  </body>
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
.bg-img{
  background-image: url(https://previews.123rf.com/images/hurvajs11/hurvajs111601/hurvajs11160100133/50455489-alien-skin-organic-color-seamless-generated-texture-or-background.jpg);
   background-size: 20rem;
}

.btn-tyranid{
  background-color: #a751cc;
}

.bg-tyranid{
  background-color:  #452c58;
}
</style>
