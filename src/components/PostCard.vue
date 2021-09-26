<template>
  <div class="col-lg-3 col-md-6 p-2">
    <div class="card bg-tyranid text-light elevation-5 shadow-lg border-dark border-2">
      <div class="card-header">
        <div>
          <p>
            <b class="">Posted on: </b>{{ new Date(post.createdAt).toLocaleDateString() }}
          </p>
        </div>
        <div v-if="account.id === post.creatorId" @click="deletePost()" class="on-hover position-absolute" style="right: 1rem; top: 1rem">
          <i class="mdi mdi-close text-danger f-20 selectable"></i>
        </div>
        <div class="text-center">
          <img :src="post.imgUrl" alt="" class="img-fluid rounded post-img">
        </div>
      </div>
      <div class="card-body">
        <p>{{ post.body }}</p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <router-link :to="{name: 'Profile', params: {id: post.creatorId}}">
          <img :src="post.creator.picture" alt="" class="profile-picture rounded">
          <i v-if="post.creator.graduated" class="mdi mdi-school text-light f-20"></i>
        </router-link>
        <div>
          <button @click="likePost(account.id)" type="button" class="btn btn-tyranid">
            <b>Likes:</b> {{ post.likes.length }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'
export default {
  props: {
    post: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async likePost(accountId) {
        try {
          await postsService.likePost(props.post.id)
          if (route.params.id) {
            postsService.getPosts({ creatorId: route.params.id })
          } else {
            postsService.getPosts()
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deletePost() {
        try {
          await postsService.deletePost(props.post.id)
          Pop.toast('Your Post has been reassimilated', 'success')
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-img{
  max-height: 20rem;
}
.profile-picture{
  max-height: 100px;
  max-width: 100px;
}

.btn-tyranid{
  background-color: #a751cc;
}

.bg-tyranid{
  background-color:  #452c58;
}
</style>
