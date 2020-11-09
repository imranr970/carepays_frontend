<template>
  <main class="user-profile">

    <profileSidebar />

    <div class="main">

      <h4 class="heading-4 mb-sm">Profile photo</h4>

      <div class="card">

        <div class="card__body">

          <form class="form profile-photo" enctype="multipart/form-data">

            <h5 class="heading-5 my-sm">Image preview</h5>

            <div class="image-preview">
              <figure class="image-preview__img">
                <img :src="image" alt="user image" />
                <span v-if="!defaultImage">
                  <a href="#" class="delete-button text-danger" @click.prevent="deleteImage">Delete</a>
                </span>
              </figure>
            </div>

            <div class="form__group my-sm">
              <label for="" class="form__label">Add/Change Image</label>
              <imageUpload @onload="onload" />
            </div>

          </form><!--form-->

        </div><!--card__body-->

      </div><!--card-->

      <div class="buttons-group my-sm float--right">
        <button class="btn btn--secondary mr-xs less-shadow" @click.prevent="persist">Save</button>
      </div>
      <span class="clearfix"></span>

    </div>

  </main>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import profileSidebar from '@/components/layouts/profile-sidebar';
import imageUpload from '@/components/utilities/imageUpload'

export default {

  middleware:'auth',

  components: {
    profileSidebar,
    imageUpload
  },

  head: {
    title: `Edit Profile Photo - ${process.env.appName}`
  },

  data() {
    return {
      src:'',
      uploaded:false
    };
  },

  computed: {

    ...mapGetters('auth', {
      profile      : 'profile',
    }),

    image: {
      set(key) {
        this.editInfo({param:'user_image', value:key, section:'profile'});
      },
      get() {
        return this.profile.user_image
      }
    },

    imageName () {
      let path = this.user.user_image.split('/');
      let image = path[(path.length) - 1];
      return image;
    },

    defaultImage() {
      if(this.image) {
        if(this.imageName == 'default.png') {
          return true;
        }
      }
      return false;
    }

  },

  methods: {

    ...mapActions({
      autoFillAuthInfo : 'autoFillAuthInfo',
      editInfo         : 'auth/editInfo',
      updateUserOriginalImage : 'auth/updateUserOriginalImage'
    }),

    onload(data) {
      this.image = data.filename;
      this.src = data.image;
    },

    persist() {

      if(this.src == '') return false;

      let data = new FormData();
      data.append('image', this.src);

      this.$axios.post('auth/update/image', data)
      .then(() => {
        this.$toast.success("Image Saved").goAway('5000')
        this.updateUserOriginalImage(this.image);
      })

    },

    deleteImage() {
      this.$axios.post('auth/delete/image')
      .then(({data}) => {
        if(data) {
          this.image = data;
          this.updateUserOriginalImage(this.image);
        }
      })
    }

  },

  created() {
    this.autoFillAuthInfo({section:'profile', module:'auth'});
  }

}

</script>
