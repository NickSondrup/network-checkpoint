<template>
  <div class="">
    <div v-if="profile">
      <div class="row cover-img" :style="{backgroundImage: `url(${profile.coverImg})`}">
        <div class="col-12 col-lg-6 d-flex">
          <div class="card m-5 bg-tyranid text-light p-2">
            <img :src="profile.picture" alt="" height="100" width="100" class="m-auto">
            <h2 class="text-center">
              {{ profile.name }}
              <i v-if="profile.graduated" class="mdi mdi-school"></i>
            </h2>
            <p v-if="profile.bio">
              <b>Bio:</b> {{ profile.bio }}
            </p>
            <p><b>Email:</b> {{ profile.email }}</p>
            <p v-if="profile.github">
              <b>Github:</b> {{ profile.github }}
            </p>
            <p v-if="profile.linkedin">
              <b>LinkedIn:</b> {{ profile.linkedin }}
            </p>
            <p v-if="profile.resume">
              <b>Resume:</b> {{ profile.resume }}
            </p>
            <p v-if="profile.class">
              <b>Class:</b> {{ profile.class }}
            </p>
            <div class="d-flex justify-content-center">
              <button v-if="account.id === profile.id" class="btn btn-info" data-bs-target="#edit-form" data-bs-toggle="modal">
                Mutate Profile
              </button>
            </div>
          </div>
        </div>
        {{ }}
      </div>
    </div>
    <div v-else>
      <h4>
        .....loading.....
      </h4>
    </div>
    <div class="row" v-if="posts.length > 0">
      <PostCard v-for="p in posts" :key="p.id" :post="p" />
      <div class="m-2 d-flex justify-content-end">
        <button @click="getNewerPage()" v-if="postsData.newer" class="btn btn-info mx-1">
          Newer Posts
        </button>
        <button @click="getOlderPage()" v-if="postsData.older" class="btn btn-info mx-1">
          Older Posts
        </button>
      </div>
    </div>
    <div class="row" v-else>
      <h3>No posts yet</h3>
    </div>
    <Modal id="edit-form">
      <template #modal-title>
        Mutate Profile
      </template>
      <template #modal-body>
        <EditForm />
      </template>
    </Modal>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { profilesService } from '../services/ProfilesService.js'
export default {
  setup() {
    const route = useRoute()
    async function getPosts() {
      try {
        await postsService.getPosts({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await profilesService.getProfileById(route.params.id)
        getPosts()
      }
    })
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      postsData: computed(() => AppState.postsData),
      async getOlderPage() {
        try {
          await profilesService.getOlderProfilePage(route.params.id)
        } catch (error) {
          Pop.toast('error', error)
        }
      },
      async getNewerPage() {
        try {
          await profilesService.getNewerProfilePage(route.params.id)
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-img{
  background-position: center center;
  background-size: cover;
}
.btn-tyranid{
  background-color: #a751cc;
}

.bg-tyranid{
  background-color:  #452c58;
}
.bg-tyranid-darker{
  background-color:  #2e1d3b;
}
</style>
