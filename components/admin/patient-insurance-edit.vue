<template>

  <div class="card">
     <h4 class="card-header">
      Insurance
      <template>
        <button class="btn btn--secondary btn--xs no-shadow" @click.prevent="save">save</button>
        <button class="btn btn--default btn--xs no-shadow" @click.prevent="$emit('cancel')">cancel</button>
      </template>
    </h4>

    <div class="card-body">

      <table class="w-100 claim-table" border="2">

        <tr>
          <td colspan="2">
            <div v-if="hasInsurance" class="form-group">

              Company name: <input type="text" class="form-control form-control--sm mb-xs" v-model="claimInsurance.company_name" />
              Insurance type: <input type="text" class="form-control form-control--sm mb-xs" v-model="claimInsurance.insurance_type" />
              Payer id: <input type="text" class="form-control form-control--sm" v-model="claimInsurance.payer_id" />

            </div>

          </td>
        </tr>

        <tr>
          <td class="text--dark">Relation:</td>
          <td>
            <input v-if="hasInsurance" class="form-control form-control--sm" v-model="claimInsurance.person" />
          </td>
        </tr>

        <tr>
          <td class="text--dark">Member:</td>
          <td>45678</td>
        </tr>

      </table>

    </div>

  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {

  computed: {

    ...mapGetters('claims', {
      insurance: 'insurance',
      hasInsurance: 'hasInsurance'
    }),

    claimInsurance() {
      return {...this.insurance}
    }

  },

  methods: {

    ...mapActions('claims', {
      updatePatientInsurance: 'updatePatientInsurance'
    }),

    save() {
      this.updatePatientInsurance({insurance: this.claimInsurance})
      this.$emit('cancel')
    }
  }

}
</script>

