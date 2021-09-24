<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link @click="getPosts()" class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="../assets/img/cw-logo.png"
          height="45"
        />
      </div>
    </router-link>
    <PostSearch />
    <div>
      <button type="button" class="btn btn-success mx-4" data-bs-target="#post-form" data-bs-toggle="modal">
        Create Post
      </button>
    </div>
    <Modal id="post-form">
      <template #modal-title>
        create a post
      </template>
      <template #modal-body>
        form will go here
      </template>
    </Modal>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
import { postsService } from '../services/PostsService.js'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async getPosts() {
        await postsService.getPosts()
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active{
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
