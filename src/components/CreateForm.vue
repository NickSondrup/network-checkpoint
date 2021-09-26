<template>
  <form @submit.prevent="createPost()">
    <div class="form-group">
      <label for="post-imgUrl">Post a picture!</label>
      <input v-model="editable.imgUrl" type="text" name="post-imgUrl" id="post-imgUrl">
    </div>
    <div class="form-group">
      <label for="post-body">What's on your mind?</label>
      <textarea v-model="editable.body" name="post-body" id="post-body" rows="5"></textarea>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn btn-primary selectable">
        <b>Submit</b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { postsService } from '../services/PostsService.js'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,

      async createPost() {
        try {
          await postsService.createPost(editable.value)
          editable.value = {}
          Pop.toast('Post Created!', 'success')
          const modal = Modal.getInstance(document.getElementById('post-form'))
          modal.hide()
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
