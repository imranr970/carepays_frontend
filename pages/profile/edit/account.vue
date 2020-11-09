<template>

  <main class="user-profile">

    <profileSidebar />

    <div class="main">

      <div class="mb-sm">
        <h4 class="heading-4">Account & security</h4>
        <p class="paragraph">
          Edit your account settings and change your password here.
        </p>
      </div>

      <div class="card">

        <div class="card__body p-0">

          <form class="form my-sm" @keydown="removeError($event.target.name)">

            <div class="form__group my-xs address-form">

              <label for="oldPassword" class="form__label mb-xs">Email</label>

              <div class="bordered-email">
                Your email address is
                <span class="text--dark">{{user.email}}</span>
                <a title="Change Email" class="icon" href="#" @click.prevent="openModal('email-change')">
                  <i class="fas fa-pencil-alt"></i>
                </a>
              </div>

            </div>

            <hr>

            <div class="form address-form">

              <div class="form__group my-xs">

                <label :class="{'text-danger':errors.old_password}" for="oldPassword" class="form__label">Old Password</label>

                <input :class="{'has-error':errors.old_password}" id="oldPassword" v-model="old_password" type="password" class="form__input-control" placeholder="Enter your old password" name="old_password">

                <span class="error-message" v-if="errors.old_password">
                  {{errors.old_password[0]}}
                </span>

              </div>

              <div class="form__group my-xs">

                <label :class="{'text-danger':errors.new_password}" for="newPassword" class="form__label">New Password</label>

                <input :class="{'has-error':errors.new_password}" id="newPassword" v-model="new_password" type="password" class="form__input-control" placeholder="Enter you new password" name="new_password">

                 <span class="error-message" v-if="errors.new_password">
                  {{errors.new_password[0]}}
                </span>

              </div>

              <div class="form__group my-xs">

                <label :class="{'text-danger':errors.confirm_new_password}" for="confirmPassword" class="form__label">New Confirm Password</label>

                <input :class="{'has-error':errors.confirm_new_password}" id="confirmPassword" v-model="confirm_new_password" type="password" class="form__input-control" placeholder="Enter again new password" name="confirm_new_password">

                <span class="error-message" v-if="errors.confirm_new_password">
                  {{errors.confirm_new_password[0]}}
                </span>

              </div>

              <button class="btn btn--secondary btn--sm float--right" @click.prevent="changePassword">
                Change
              </button>
              <span class="clearfix"></span>

            </div>

            <hr>

            <questions />


          </form>

        </div>

      </div>

    </div><!--main-->

    <emailChangeModal @close="closeModal('email-change')" />

  </main>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import profileSidebar from '@/components/layouts/profile-sidebar'
import emailChangeModal from '@/components/layouts/modals/email-change-modal'
import { validatePassword } from '@/plugins/validationForm/profile/validateProfileAccountPassword.js'
import questions from '@/components/profile/questions'

export default {

  middleware:'auth',

  components: {
    profileSidebar,
    emailChangeModal,
    questions
  },

  data() {
    return {
      old_password:null,
      new_password:null,
      confirm_new_password:null
    }
  },

  computed: {

    ...mapGetters('auth', {
      profile  : 'profile'
    })

  },

  methods: {

    ...mapActions({
      changeUserPassword   : 'auth/changeUserPassword',
      editInfo             : 'auth/editInfo',
      autoFillAuthInfo     : 'autoFillAuthInfo',
      removeError          : 'validation/removeError'
    }),

    openModal(id) {

      try {
        $(`#${id}`).css({
          opacity:'1',
          visibility:'visible'
        });
        $(`#${id} .popup__content`).css({
          opacity:'1',
          transform: 'translate(-50%, -50%) scale(1)',
        });
      }
      catch(e) {
        console.log(e);
      }

    },

    closeModal(id) {
      try {
        $(`#${id}`).css({
          opacity:'0',
          visibility:'hidden'
        });
        $(`#${id} .popup__content`).css({
          opacity:'0',
          transform: 'translate(-50%, -50%) scale(0.5)',
        });
      }
      catch(e) {
        console.log(e);
      }
    },

    getData() {
      return {
        old_password:this.old_password,
        new_password:this.new_password,
        confirm_new_password:this.confirm_new_password
      };
    },

    changePassword() {

      if(!validatePassword(this.$store, this.getData())) {
         this.$toast.error('Please fix errors below').goAway(5000);

        window.scrollTo({
          top:20,
          behavior:'smooth'
        });
      }

      if(!Object.entries(this.errors).length > 0) {

        this.changeUserPassword(this.getData())
        .then((data) => {
          this.$toast.success(data).goAway(5000);
          this.resetData();
        })
        .catch(() => {

          window.scrollTo({
            top:20,
            behavior:'smooth'
          });

        });

      }

    },

    resetData() {
      this.old_password = null;
      this.new_password = null;
      this.confirm_new_password = null;
    }

  }

}
</script>

<style scoped lang="scss">

 .bordered-email {
    border:1px solid #ccc;
    padding:1rem;
    position: relative;
    .icon {
      position:absolute;
      right:0;
      top:50%;
      transform:translate(-50%, -50%);
      color:#444;
    }
  }

</style>
