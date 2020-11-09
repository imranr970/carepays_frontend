<template>

  <div class="sidebar">

    <div class="align--center">
      <div>
        <figure class="sidebar__img">
          <img :src="src" alt="User photo">
        </figure>
      </div>

      <div class="sidebar__profile-name">
        {{user_formatted_name}}
      </div>
    </div>

    <ul class="sidebar__list-items">
      <li :class="{'active':path == 'profile-edit'}"><nuxt-link :to="{path:'/profile/edit'}">Basic Info</nuxt-link></li>
      <li :class="{'active':path == 'profile-edit-address'}"><nuxt-link :to="{path:'/profile/edit/address'}">Address</nuxt-link></li>
      <li :class="{'active':path == 'profile-edit-photo'}"><nuxt-link :to="{path:'/profile/edit/photo'}">Photo</nuxt-link></li>
      <li :class="{'active':path == 'profile-edit-account'}" ><nuxt-link :to="{path:'/profile/edit/account'}">Account</nuxt-link></li>
      <li :class="{'active':path == 'profile-edit-payment-methods'}"><nuxt-link :to="{path:'/profile/edit/payment-methods'}">Payment Methods</nuxt-link></li>
      <li :class="{'active':path == 'insurance'}"><nuxt-link :to="{path:'/insurance'}">Insurances</nuxt-link></li>
      <li :class="{'active':path == 'profile-orders'}"><nuxt-link :to="{path:'/profile/orders'}">Orders</nuxt-link></li>
      <li :class="{'active':path == 'profile-eob'}"><nuxt-link :to="{path:'/profile/eob'}">EOBs</nuxt-link></li>
    </ul>

  </div>

</template>

<script>
export default {
  computed : {

    user_formatted_name() {
      let first, middle, last;

      first = this.user.first_name;
      middle = this.user.middle_name || '';
      last = this.user.last_name;

      if(middle && !middle.includes(".")) {
        middle = middle.toUpperCase() + ".";
      }

      return first + " " + middle + " " + last;

    },

    path() {
      return this.$route.name;
    },

    src() {
      return this.user ? this.user.user_image : null;
    }

  }


}
</script>
