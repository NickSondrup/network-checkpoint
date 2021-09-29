<template>
  <div v-if="posts">
    <div class="row">
      <PostCard v-for="p in posts" :key="p.id" :post="p" />
      <div class="my-2 d-flex justify-content-end">
        <button @click="getNewerPage()" v-if="postsData.newer" class="btn btn-info mx-1">
          Newer Posts
        </button>
        <button @click="getOlderPage()" v-if="postsData.older" class="btn btn-info mx-1">
          Older Posts
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    .....loading.....
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js'
import { picturesService } from '../services/PicturesService.js'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.toast(error, 'error')
      }
      try {
        await picturesService.getPictures()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts),
      pictures: computed(() => AppState.pictures),
      postsData: computed(() => AppState.postsData),
      async getOlderPage() {
        try {
          await postsService.getOlderPage()
        } catch (error) {
          Pop.toast('error', error)
        }
      },
      async getNewerPage() {
        try {
          await postsService.getNewerPage()
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
