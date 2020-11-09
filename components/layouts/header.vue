<template>
  <header class="header" :class="{'header--secondary':$route.name !== 'index'}">

    <nav class="menu__left">
        <div class="logo">
            <nuxt-link :to="{name:'index'}" class="d--block" title="CarePays HOME">
              <img src="@/assets/images/logo1-color.png" alt="Carepays Logo" class="d--block logo__img">
            </nuxt-link>
        </div>
        <!-- <div class="search_icon">
            <i class="fas fa-search"></i>
        </div> -->

    </nav>


        <nav class="menu__right">

            <ul class="menu__list">

                <!-- <li class="menu__item">
                    <a href="#" class="menu__link">List your practises</a>
                </li> -->

                <li class="menu__item">
                    <nuxt-link :to="{name:'anatomy'}" class="menu__link">
                      Anatomy
                    </nuxt-link>
                </li>

                <li class="menu__item">
                    <nuxt-link :to="{name:'preventive-care'}" class="menu__link">
                      Save a Life
                    </nuxt-link>
                </li>

                <template v-if="!authenticated">
                  <li class="menu__item">
                    <nuxt-link :to="{name:'login'}" class="menu__link">
                        <i class="fas fa-user"></i> Login
                    </nuxt-link>
                  </li>

                  <li class="menu__item">
                    <nuxt-link :to="{name:'register'}" class="menu__link">
                        <i class="fas fa-user"></i> Register
                    </nuxt-link>
                  </li>
                </template>

                <template v-else>

                  <li class="menu__item">
                    <nuxt-link :to="{name:'profile'}" class="menu__link">
                      {{user.first_name}}
                    </nuxt-link>
                  </li>

                  <li class="menu__item">
                    <a class="menu__link" href="#" @click.prevent="logout">
                      Logout
                    </a>
                  </li>

                </template>

                <li class="menu__item" title="Notifications">
                  <a href="#" class="menu__link">
                      <i class="far fa-bell"></i>
                  </a>
                </li>

                <li class="menu__item">
                  <nuxt-link :to="{name:'cart'}" class="menu__link" title="Cart">
                    <i class="fas fa-shopping-cart"></i>
                    <sup>
                      <template v-if="authenticated">
                        <span class="badge badge-danger">
                          {{cartCount}}
                        </span>
                      </template>

                      <template v-else>
                        <span class="badge badge-danger">
                          0
                        </span>
                      </template>
                    </sup>  
                  </nuxt-link>
                </li>

            </ul>

        </nav>

        <!-- Navigation button -->
        <div class="navigation">

            <input type="checkbox" name="" id="navi-toggle" class="navigation__checkbox">
            <label class="navigation__button" for="navi-toggle"  @click="openMenu">
                <span class="navigation__icon">&nbsp;</span>
            </label>

            <div class="navigation__background">&nbsp;</div>

        </div>

        <nav class="navigation__menu" v-show="opened">

          <ul class="navigation__list">

              <li class="navigation__item">
                  <a href="#" class="navigation__link">List your practises</a>
              </li>

              <li class="navigation__item">
                  <a href="#" class="navigation__link">Valued Benefits</a>
              </li>

              <li class="navigation__item">
                  <a href="#" class="navigation__link">
                      Money4Care
                  </a>
              </li>

              <li class="navigation__item">
                  <a href="#" class="navigation__link">
                      About Carepays
                  </a>
              </li>

              <li class="navigation__item">
                  <a href="#" class="navigation__link">
                      <i class="fas fa-user"></i> Login
                  </a>
              </li>

          </ul>

        </nav>

  </header>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

  data() {

    return {
      opened:false
    };

  },

  computed: {
    ...mapGetters({
      'cartCount' : 'cart/count'
    })
  },

  methods: {

    ...mapActions({
      'getCartCount' : 'cart/getCartCount'
    }),

    openMenu () {

      if(this.opened == false) {
        this.opened = true;
      }
      else {
        this.opened = false;
      }

    },

    async logout() {

      await this.$auth.logout();
      this.$toast.success('Logged out successfully').goAway(2000);

    }

  }


}
</script>
