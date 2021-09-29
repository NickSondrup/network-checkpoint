<template>
  <form @submit.prevent="editProfile()" class="">
    <div class="form-group d-flex mb-2 d-flex">
      <label for="name"></label>
      <input v-model="editable.name"
             type="text"
             name="name"
             id="name"
             placeholder="Name"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group d-flex mb-2">
      <label for="picture"></label>
      <input v-model="editable.picture"
             type="text"
             name="picture"
             id="picture"
             placeholder="PictureUrl"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group d-flex mb-2">
      <label for="coverImg"></label>
      <input v-model="editable.coverImg"
             type="text"
             name="coverImg"
             id="coverImg"
             placeholder="Cover Image Url"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group d-flex mb-2">
      <label for="bio"></label>
      <textarea v-model="editable.bio"
                type="text"
                name="bio"
                id="bio"
                placeholder="Bio"
                class="form-control bg-tyranid-darker text-light border-dark"
      >
        </textarea>
    </div>
    <div class="form-group d-flex mb-2">
      <label for="github"></label>
      <input v-model="editable.github"
             type="text"
             name="github"
             id="github"
             placeholder="Github"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group d-flex mb-2">
      <label for="linkedin"></label>
      <input v-model="editable.linkedin"
             type="text"
             name="linkedin"
             id="linkedin"
             placeholder="LinkedIn"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group d-flex mb-2">
      <label for="resume"></label>
      <input v-model="editable.resume"
             type="text"
             name="resume"
             id="resume"
             placeholder="resume"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group d-flex mb-2">
      <label for="class"></label>
      <input v-model="editable.class"
             type="text"
             name="class"
             id="class"
             placeholder="Class"
             class="form-control bg-tyranid-darker text-light border-dark"
      >
    </div>
    <div class="form-group">
      <label for="graduated">Have you Graduated? </label>
      <input v-model="editable.graduated" type="checkbox" name="graduated" id="class" placeholder="Class">
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

    account: { type: Profile, default: () => new Profile() }
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
          Pop.toast('Profile Mutated', 'success')
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
