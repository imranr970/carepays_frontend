<template>

  <main class="user-profile">

    <profileSidebar />

    <div class="main">
      <h4 class="heading-4 mb-sm">Your Address</h4>

      <div class="card">
        <div class="card__body">

          <form class="address-form" @keydown="removeError($event.target.name)" @change="removeError($event.target.name)">

            <div class="form__group form__group--inline">
              <label :class="{'text-danger':errors.address}" for="profileAddress" class="form__label form__label--inline">Address line 1</label>

              <div>
                <textarea id="profileAddress" name="address" class="form__input-control form__input-control--inline" :class="{'has-error':errors.address}" v-model="address" maxlength="255"></textarea>
                <span class="error-message" v-if="errors.address">
                  {{errors.address[0]}}
                </span>
              </div>

            </div>

            <div class="form__group form__group--inline">
              <label for="profileAddress2" :class="{'text-danger':errors.address2}" class="form__label">
                Address line 2
              </label>

              <div>
                <textarea id="profileAddress2" name="address2" class="form__input-control" :class="{'has-error':errors.address2}" v-model="address2" maxlength="255"></textarea>
                <span class="error-message" v-if="errors.address2">
                  {{errors.address2[0]}}
                 </span>
              </div>

            </div>

            <div class="form__group form__group--inline">

              <label for="profileZipcode" :class="{'text-danger':errors.zipcode}" class="form__label">Zip code</label>

              <div>
                <input id="profileZipcode" type="text" name="zipcode" class="form__input-control" :class="{'has-error':errors.zipcode}" placeholder="Enter zip code" v-model="zipcode" maxlength="5" minlength="5">
                <span class="error-message" v-if="errors.zipcode">
                  {{errors.zipcode[0]}}
                </span>
              </div>

            </div>

            <div class="form__group form__group--inline">

              <label for="profileState" :class="{'text-danger':errors.state}" class="form__label">State</label>

              <div>

                <select id="profileState" name="state" class="form__input-control" :class="{'has-error':errors.state}" v-model="state" @change="getCities({namespace:'auth', change:0})">

                  <option value="null">Please select</option>
                  <option :value="state.id" v-for="state in states" :key="state.id">
                    {{state.state}}
                  </option>

                </select>

                <span class="error-message" v-if="errors.state">
                  {{errors.state[0]}}
                </span>

              </div>

            </div>

            <div class="form__group form__group--inline">

              <label for="profileCity" :class="{'text-danger':errors.city}" class="form__label">City</label>

              <div>
                <select id="profileCity" name="city" class="form__input-control" :class="{'has-error':errors.city}" v-model="city">
                  <option value="null">Please select</option>

                  <template v-if="cities.length">
                    <option :value="city.id" v-for="city in cities" :key="city.id">
                      {{city.city}}
                    </option>
                  </template>

                </select>

                <span class="error-message" v-if="errors.city">
                  {{errors.city[0]}}
                </span>

              </div>


            </div>

          </form>

        </div>
      </div>

      <div class="buttons-group my-sm float--right">
        <button :disabled="updating" class="btn btn--secondary less-shadow" @click.prevent="update">Save</button>
      </div>
      <span class="clearfix"></span>

    </div><!--main-->

  </main>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { validate } from '@/plugins/validationForm/profile/validateProfileAddress.js'
import profileSidebar from '@/components/layouts/profile-sidebar'

export default {

  middleware:'auth',

  components: {
    profileSidebar
  },

  head: {
    title: `Edit Profile Address - ${process.env.appName}`
  },

  data() {
    return {
      updating:false
    }
  },

  computed: {

    ...mapGetters({
      profile : 'auth/profile',
      cities:'cities',
      states:'states'
    }),


    state: {
      set(key) {
        this.editInfo({param:'state', value:key, section:'profile'});
      },
      get() {
        return this.profile.state;
      }
    },

    city: {
      set(key) {
        this.editInfo({param:'city', value:key, section:'profile'});
      },
      get() {
        return this.profile.city;
      }
    },

    address: {
      set(key) {
        this.editInfo({param:'address', value:key, section:'profile'});
      },
      get() {
        return this.profile.address;
      }
    },

    address2: {
      set(key) {
        this.editInfo({param:'address2', value:key, section:'profile'});
      },
      get() {
        return this.profile.address2;
      }
    },

    zipcode: {
      set(key) {
        this.editInfo({param:'zipcode', value:key, section:'profile'});
      },
      get() {
        return this.profile.zipcode;
      }
    }

  },

  methods: {

    ...mapActions({
      autoFillAuthInfo     : 'autoFillAuthInfo',
      getStates            : 'getStates',
      getCities            : 'getCities',
      removeError          : 'validation/removeError',
      editInfo             : 'auth/editInfo',
      updateProfileAddress : 'auth/updateProfileAddress',
      updateUser           : 'auth/updateUser'
    }),

    update() {

      if(!validate(this.$store)) {

        this.$toast.error('Please fix errors below').goAway(5000);

        window.scrollTo({
          top:20,
          behavior:'smooth'
        });

      }

      if(!Object.entries(this.errors).length > 0) {
        this.updateProfileAddress()
        .catch(() => {
          window.scrollTo({
            top:20,
            behavior:'smooth'
          });
        });
      }

    },

  },

  created() {
    this.autoFillAuthInfo({section:'profile', module:'auth'});
    this.getStates();
    this.getCities({namespace:'auth', change:1});
  }

}
</script>

<style lang="scss" scoped>
  .has-error {
      border:1px solid #dc3545 !important;
    }

  .error-message {
    color:#dc3545;
    font-size:1.2rem;
    font-weight:500;
  }
</style>
