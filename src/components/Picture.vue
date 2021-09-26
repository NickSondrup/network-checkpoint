<template>
  <div class="my-1">
    <img :src="picture.banner" alt="" class="img-fluid">
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
export default {
  props: {
    picture: { type: Object, required: true }
  },
  setup() {
    return {
      pictures: computed(() => AppState.pictures)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
