<template>
  <div>
    <h4 class="heading-4 mb-sm">Impact Analysis Summary</h4>

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
        <p>Total line items: $3958145</p>
        <p>Count: $38117</p>
        <p>Total line items: $580.3</p>
      </div>

      <div class="flex-1">
        <canvas ref="canvas"></canvas>
      </div>

      <div class="flex-1">
        <p>Total line items: $3958145</p>
        <p>Count: $38117</p>
        <p>Total line items: $580.3</p>
      </div>

    </div>

    <hr>
    <p>Total line items: $3958145</p>
    <p>Count: $38117</p>
    <p>Total line items: $580.3</p>
    <p>Batch(s):1</p>
    <p>Denial Raito:2:1</p>


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

    render(data, options = {}, type = "line") {

      let ctx = this.$refs.canvas.getContext('2d');

      this.chart = new Chart(ctx, {

        type,

        data: {
          labels:Object.keys(data),
          datasets: [
            {
              label:'collecion report',
              backgroundColor:[
                'red',
                'yellow',
                'green',
                'blue'
              ],
              borderColor:'#444',
              data: Object.keys(data).map(key => data[key])
            }
          ]
        },

        options

      })

    },

    fetchData() {

      return this.$axios.get(this.url, {
        params: {
          range : this.range
        }
      })

    },

    load() {
      this.fetchData()
      .then(response => this.render(response.data, {}, "pie"))
    }

  },

  mounted() {
    this.load();
  }


})
</script>
