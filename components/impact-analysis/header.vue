<template>
  <header class="header">

    <nav class="menu__left">

      <ul class="menu__list">

        <li class="menu__item">
          <nuxt-link :to="{name:'admin-impact-analysis'}" class="menu__link">
            Home
          </nuxt-link>
        </li>

        <li class="menu__item">
          <nuxt-link :to="{name:'admin-impact-analysis-batches'}" class="menu__link">
            Batches
          </nuxt-link>
        </li>

        <li class="menu__item">
          <nuxt-link :to="{name:'admin-impact-analysis-message-center'}" class="menu__link">
            Message center
          </nuxt-link>
        </li>

        <li class="menu__item">
          <nuxt-link :to="{name:'admin-impact-analysis-users'}" class="menu__link">
            Manage users
          </nuxt-link>
        </li>

        <li class="menu__item">
          <nuxt-link :to="{name:'admin-impact-analysis-upload'}" class="menu__link">
            Upload
          </nuxt-link>
        </li>

      </ul>

    </nav>

  </header>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

  @media only screen and (max-width:68.75em) {

    .menu__list {
      display:flex;
      flex-direction:row;
      opacity:1 !important;
      visibility: visible !important;
      text-align:center !important;
      flex-wrap: wrap;
    }

  }

</style>
