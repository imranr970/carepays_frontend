<template>
  <main>

    <table class="table table-striped">

      <thead style="border:0">

        <tr>
          <td>Order Id#</td>
          <td>Date of service</td>
          <td>Payment method</td>
          <td>Status</td>
          <td>Total</td>
          <td>Action</td>
        </tr>

      </thead>

      <template v-if="loading">
        <i class="fas fa-spinner fa-spin"></i>
      </template>

      <template v-else>

        <tbody v-if="orders.length">
          <tr v-for="order in orders" :key="order.id">
            <td>{{order.order_id}}</td>
            <td>
              {{$moment(order.date_of_service).format('LL')}}
            </td>
            <td>{{order.payment_method.card_type}}</td>
            <td>{{order.order_status}}</td>
            <td>${{order.total}}</td>
            <td>
              <nuxt-link :to="{path:`/profile/orders/${order.id}`}">View</nuxt-link>
            </td>
          </tr>
        </tbody>

      </template>

    </table>


    <template v-if="!orders.length && !loading">
      <p class="p-4">You have no {{filters.status}} orders</p>
    </template>

    <template v-if="orders.length && meta.total > meta.per_page">
      <ul class="pagination mt-sm">
        <li :class="{'active': i == page}" class="page-item" :key="i" v-for="i in meta.last_page">
          <a href="#" class="page-link" @click.prevent="changePage(i)">
            {{i}}
          </a>
        </li>
      </ul>
    </template>

  </main>

</template>

<script>
export default {

  data() {

    return {
      filters: {
        status:null
      },
      page:1,
      orders:[],
      meta:{},
      loading:false
    };

  },

  watch: {
    $route() {
      this.routePage();
      this.routeStatus();
      this.fetchOrders(this.page, this.validateFilters());
    }
  },

  methods: {

    routePage() {
      if(this.$route.query && this.$route.query.page) {
        this.page = this.$route.query.page;
        return;
      }
      this.page = 1;
    },

    routeStatus() {
      if(this.$route.query && this.$route.query.status) {
        this.filters.status = this.$route.query.status;
        return;
      }
      this.filters.status = null;
    },

    changePage(page) {
      this.updateRoute(page, this.validateFilters());
    },

    updateRoute(page, filters) {

      this.$router.replace({
        query: {
          page,
          ...filters
        }
      });

    },

    fetchOrders(page, filters = {}) {

      this.loading = true;
      page = page == null ? this.page : page;

      this.$axios.post('orders', {
        ...filters,
        page
      })
      .then(({data}) => {
        this.orders = data.data;
        this.meta = data.meta
        this.loading = false;
      })
      .catch(() => this.loading = false);

    },

    validateFilters() {
      let filters = {};
      for(const [key, value] of Object.entries(this.filters)) {
        if(value == null || value == 0 || value == '') {
          continue;
        }
        filters[key] = value;
      }
      return filters;
    }

  },

  created() {
    this.fetchOrders();
    this.routePage();
    this.routeStatus();
  }

}
</script>
