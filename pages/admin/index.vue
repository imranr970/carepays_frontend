<template>

    <main class="admin">

      <h4 class="heading-4 my-sm">Message Center</h4>

      <template v-if="loading">
        <div><i class="fas fa-spinner fa-spin"></i></div>
      </template>

      <template v-else>
        <template v-if="invoices.length">

          <div class="card my-xs" v-for="invoice in invoices" :key="invoice.id">
            <div class="card__body">

              <table class="table my-xs">

                <thead>
                  <tr class="text--dark">
                    <td>Order number</td>
                    <td>Patient name</td>
                    <td>Insurance company</td>
                    <td colspan="2">Status</td>
                    <td colspan="2">Action</td>
                  </tr>


                  <tr>
                    <td>CO# {{invoice.order.order_id}}</td>
                    <td>{{invoice.order.user.first_name || '--' }}</td>
                    <td>
                      <span v-if="invoice.order.insurance">
                        {{invoice.order.insurance_plan.company_name}}
                      </span>
                      <span v-else>
                        --
                      </span>
                    </td>
                    <td colspan="2">
                      {{invoice.order.order_status}}
                    </td>
                    <td colspan="2">
                      <nuxt-link :to="{ path:`/admin/invoices/${invoice.id}` }">
                        View
                      </nuxt-link>
                      <!-- <nuxt-link class="ml-xs" :to="{ path:`/admin/invoices/edit/${invoice.id}` }">
                        Edit
                      </nuxt-link>
                      <button type="button" class="btn btn--secondary btn--xs ml-xs less-shadow">Submit</button> -->
                    </td>
                  </tr>

                </thead>

                <tbody v-for="(checkout, index) in invoice.order.checkout" :key="checkout.id">


                  <tr class="text--dark">
                    <td>Item no</td>
                    <td>Cpt</td>
                    <td>Description</td>
                    <td>Units</td>
                    <td>Date of service</td>
                    <td>Purchase cost</td>
                    <td colspan="2">saved cost</td>
                  </tr>

                  <tr>
                    <td>{{index + 1}}</td>
                    <td>{{checkout.cpt}}</td>
                    <td>{{formattedDesc(checkout.treatment_description)}}</td>
                    <td>1</td>
                    <td>{{$moment(checkout.date_of_appointment).format('LL')}}</td>
                    <td>${{checkout.purchase_cost}}</td>
                    <td colspan="2">${{checkout.saved_cost}}</td>
                  </tr>

                </tbody>

              </table>

            </div>
          </div>

        </template>

        <template v-else>
          <p>No invoices yet</p>
        </template>
      </template>

    </main>

</template>

<script>

  import axios from 'axios';

  export default {

    name:'admin',
    middleware:'auth',

    data() {

      return {
        invoices:[],
        loading:false
      };

    },

    methods: {

      async getAllInvoicesReport() {
        this.loading = true;
        await axios.get(`${process.env.api.baseURL}/reports/invoices/all`)
        .then(({data}) => {

          this.invoices = data;
          this.loading = false;

        })
        .catch((err) => {
          this.loading = false;
        });

      },

      formattedDesc(desc) {
        return desc.length > 50 ? desc.substring(0, 50) + '...' : desc;
      },

    },

    created() {

      this.getAllInvoicesReport();

    }

  }
</script>

<style scoped lang="scss">
  .text--dark {
    td {
      font-weight: bold !important;
    }
  }
  .table {
    border-collapse: collapse;
    z-index:1;
  }
  .border {
    border:2px solid #000 !important;
  }
  .border-bottom {
    border-bottom:2px solid #000 !important;
  }
</style>
