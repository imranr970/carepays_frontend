<template>

  <div>

    <div class="form float--right w-25">

      <select class="form__input-control" v-model="range" @change="reload">
        <option value="yearly">View yearly</option>
        <option value="quarterly">View quarterly</option>
        <option value="monthly">View monthly</option>
        <option value="daily">View daily</option>
      </select>

    </div>

    <canvas ref="canvas"></canvas>
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

  computed: {

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
      .then(response => this.render(response.data, {}, "horizontalBar"))
    }

  },

  mounted() {
    this.load();
  }


})

</script>
