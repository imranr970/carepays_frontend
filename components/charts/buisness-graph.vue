<template>

  <div>
    <h4 class="heading-4">Buisness IQ</h4>

    <div class="form float--right w-25">

      <select class="form__input-control" v-model="range" @change="reload">
        <option value="yearly">View yearly</option>
        <option value="quarterly">View quarterly</option>
        <option value="monthly">View monthly</option>
        <option value="daily">View daily</option>
      </select>

    </div>

    <div class="clearfix"></div>

    <canvas ref="canvas"></canvas>

  </div>

</template>

<script>

import graph from './graph.vue';

export default graph.extend ({

  data() {

    return {
      range   : 'quarterly'
    };

  },

  methods: {

    fetchData() {
      return this.$axios.get(this.url, {
        params: {
          range : this.range
        }
      })
    }

  }

})

</script>

