<template>
  <form @submit.prevent="findPosts" class bg-white>
    <div class="form-group">
      <label for="search" class="sr-only"></label>
      <input v-model="query"
             type="text"
             name="search"
             required
             class="form-control bg-white border-0"
             placeholder="Search Posts"
      >
    </div>
    <button class="btn btn-success" type="submit">
      Search
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { postsService } from '../services/PostsService.js'
export default {
  setup() {
    const query = ref('')

    return {
      query,
      async findPosts() {
        try {
          await postsService.findPostByQuery(query.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
