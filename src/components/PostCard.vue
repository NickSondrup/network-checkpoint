<template>
  <div class="col-md-4 p-2">
    <div class="card">
      <div class="card-header">
        <img :src="post.imgUrl" alt="" class="img-fluid">
      </div>
      <div class="card-body">
        <p>{{ post.body }}</p>
      </div>
      <div class="card-footer">
        <router-link :to="{name: 'Profile', params: {id: post.creatorId}}">
          <button class="btn btn-primary">
            Profile
          </button>
        </router-link>
        <div>
          <button @click="likePost()" type="button" class="btn btn-primary">
            <b>Likes:</b> {{ post.likes.length }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    post: { type: Object, required: true }
  },
  setup(props) {
    return {
      async likePost() {
        try {
          await postsService.likePost(props.post.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
