<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>

import Chart from 'chart.js';
import Vue from 'vue';

export default Vue.extend ({

  props: {
    url: {
      type:String,
      default:'report'
    }
  },

  data() {
    return {
      chart:null
    }
  },

  methods: {

    load() {
      this.fetchData()
      .then(response => this.render(response.data))
    },

    fetchData() {
      return this.$axios.get(this.url)
    },

    render(data, options = {}, type = "line") {

      let ctx = this.$refs.canvas.getContext('2d');

      this.chart = new Chart(ctx, {

        type,

        data: {
          labels:Object.keys(data),
          datasets: [
            {
              label:'collecion report',
              backgroundColor:'#ccc',
              borderColor:'#444',
              data: Object.keys(data).map(key => data[key])
            }
          ]
        },

        options

      })
    },

    reload() {

      this.chart.destroy();
      this.load();

    }

  },

  mounted() {
    this.load();
  }

})

</script>
