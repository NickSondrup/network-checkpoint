<template>
  <form @submit.prevent="editProfile()" class="">
    <div class="form-group py-1">
      <label for="name"></label>
      <input v-model="editable.name" type="text" name="name" id="name" placeholder="Name">
    </div>
    <div class="form-group py-1">
      <label for="picture"></label>
      <input v-model="editable.picture" type="text" name="picture" id="picture" placeholder="PictureUrl">
    </div>
    <div class="form-group py-1">
      <label for="coverImg"></label>
      <input v-model="editable.coverImg" type="text" name="coverImg" id="coverImg" placeholder="Cover Image Url">
    </div>
    <div class="form-group py-1">
      <label for="bio"></label>
      <textarea v-model="editable.bio" type="text" name="bio" id="bio" placeholder="Bio">
        </textarea>
    </div>
    <div class="form-group py-1">
      <label for="github"></label>
      <input v-model="editable.github" type="text" name="github" id="github" placeholder="Github">
    </div>
    <div class="form-group py-1">
      <label for="linkedin"></label>
      <input v-model="editable.linkedin" type="text" name="linkedin" id="linkedin" placeholder="LinkedIn">
    </div>
    <div class="form-group py-1">
      <label for="resume"></label>
      <input v-model="editable.resume" type="text" name="resume" id="resume" placeholder="resume">
    </div>
    <div class="form-group py-1">
      <label for="class"></label>
      <input v-model="editable.class" type="text" name="class" id="class" placeholder="Class">
    </div>
    <!-- Graduate checkbox will go here -->
    <div class="btn-group">
      <button type="submit" class="btn btn-success">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { profilesService } from '../services/ProfilesService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { Profile } from '../models/Profile.js'
import { watchEffect } from '@vue/runtime-core'
export default {
  props: {
    account: { type: Profile }
  },
  setup(props) {
    const editable = ref('')
    watchEffect(() => {
      editable.value = { ...props.account }
    })
    return {
      editable,
      async editProfile() {
        try {
          await profilesService.editProfile(editable.value)
          editable.value = {}
          Pop.toast('Profile edited', 'success')
          const modal = Modal.getInstance(document.getElementById('edit-form'))
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
