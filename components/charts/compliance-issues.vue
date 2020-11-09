<template>
  <div>

    <h4 class="heading-4">Complicance issues</h4>

    <div class="form float--right w-25">

      <select class="form__input-control" v-model="range" @change="reload">
        <option value="yearly">View yearly</option>
        <option value="quarterly">View quarterly</option>
        <option value="monthly">View monthly</option>
        <option value="daily">View daily</option>
      </select>

    </div>

    <div class="clearfix"></div>

    <div class="flex">

      <div class="flex-1">

        <h4 class="heading-4">Summary</h4>

        <p>Total Monetary value: $98457</p>
        <p>Total Count: $11214</p>
        <p>Average: $518</p>
        <p>Total No of Batches: 1</p>
        <p>Total No of Claims: 1</p>
        <i>80% of denials have a compliance related issues</i>

      </div>

      <div class="flex-2">
        <canvas ref="canvas"></canvas>
      </div>

    </div>

  </div>
</template>

<script>

import graph from './graph.vue';

export default graph.extend({

  data() {

    return {
      range:'quarterly'
    };

  },


  methods: {

    fetchData() {

      return this.$axios.get(this.url, {
        params: {
          range : this.range
        }
      })

    },

    load() {
      this.fetchData()
      .then(response => this.render(response.data, {}, "horizontalBar"))
    }

  },

  mounted() {
    this.load();
  }

})

</script>
