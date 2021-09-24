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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
