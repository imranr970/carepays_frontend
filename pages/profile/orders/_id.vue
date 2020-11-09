<template>

  <main class="user-profile-order">

    <template>

      <div class="main w-100">
        <order />
      </div>

    </template>

  </main>

</template>

<script>

import order from '@/components/orders/order'

export default {

  middleware:'auth',

  components: {
    order
  }

}
</script>
