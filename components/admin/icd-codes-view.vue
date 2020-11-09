<template>

  <table class="table my-sm claim-table">

    <thead>
      <tr>
        <td>Item</td>
        <td>Icd</td>
        <td>
          Description
          <a href="#" @click.prevent="$emit('edit', 'patientIcdCodes')">
            <i class="fas fa-pen"></i>edit
          </a>
        </td>

      </tr>
    </thead>

    <tbody v-if="hasCheckout && icds">

      <tr v-for="(icd, index) in icds" :key="index">
        <td>{{index + 1}}</td>
        <td>

          {{icd.icd_code}}

        </td>
        <td>

        </td>
      </tr>
    </tbody>

  </table>

</template>

<script>
import {mapGetters} from 'vuex'
export default {

  computed: {

    ...mapGetters('claims', {
      hasCheckout: 'hasCheckout',
      icds: 'icds'
    })

  }

}
</script>

