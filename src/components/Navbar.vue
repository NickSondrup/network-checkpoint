<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-tyranid border-bottom border-4 border-dark px-3 d-flex">
    <router-link @click="getPosts()" class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex">
        <img
          alt="logo"
          src="../assets/img/Hivemind.png"
          height="90"
        />
        <div class="text-center px-4">
          <h1>The Hivemind</h1>
          <h6>Get Assimilated</h6>
        </div>
      </div>
    </router-link>

    <PostSearch />

    <div>
      <button type="button" class="btn btn-info mx-4" data-bs-target="#post-form" data-bs-toggle="modal">
        Spawn a Post
      </button>
    </div>
    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarText">
      <span class="navbar-text">
        <button
          class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown my-2 my-lg-0" v-else>
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3 text-success lighten-30">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Manage Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable text-danger"
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
    <Modal id="post-form">
      <template #modal-title>
        create a post
      </template>
      <template #modal-body>
        <CreateForm />
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
.btn-tyranid{
  background-color: #a751cc;
}

.bg-tyranid{
  background-color:  #452c58;
}

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
