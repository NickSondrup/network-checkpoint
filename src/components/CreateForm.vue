<template>
  <form @submit.prevent="createPost()">
    <div class="form-group">
      <label for="post-imgUrl"></label>
      <input v-model="editable.imgUrl"
             type="text"
             name="post-imgUrl"
             id="post-imgUrl"
             placeholder="Post a picture!"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group">
      <label for="post-body"></label>
      <textarea v-model="editable.body"
                name="post-body"
                id="post-body"
                rows="5"
                placeholder="What's on our mind?"
                class="form-control bg-tyranid-darker text-light border-dark"
      ></textarea>
    </div>
    <div class="btn-group">
      <button type="submit" class="btn btn-tyranid selectable mt-2">
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
          Pop.toast('Post Spawned!', 'success')
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
