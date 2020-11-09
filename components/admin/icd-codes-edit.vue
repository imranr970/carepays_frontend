<template>

  <div>

    <table class="table my-sm claim-table" ref="icdCodesTable">

      <thead>
        <tr>

          <td>Item</td>
          <td>Icd</td>
          <td>Description</td>
          <td>
            <button class="btn btn--secondary btn--xs no-shadow" @click.prevent="save">save</button>
            <button class="btn btn--default btn--xs no-shadow" @click.prevent="cancel">cancel</button>
          </td>

        </tr>
      </thead>

      <tbody v-if="hasCheckout && icds">

        <tr v-for="(icd, index) in claimIcds" :key="index">
          <td>{{parseInt(index) + 1}}</td>
          <td>
            <input :value="icd.icd_code" @blur="updateIcdCode($event.target.value, icd)" class="form-control form-control--xs w-50" />
          </td>
          <td></td>
          <td>
            <button class="btn btn--danger btn--xs no-shadow" @click.prevent="removeIcdCode(icd)">
              Remove <i class="fas fa-time"></i>
            </button>
          </td>
        </tr>

      </tbody>

    </table>

    <button :disabled="maxThreashold" class="btn btn--secondary btn--xs no-shadow" @click.prevent="saveNewIcdCode">
      Add new <i class="fas fa-plus"></i>
    </button>

  </div>


</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {

  computed: {

    ...mapGetters('claims', {
      hasCheckout: 'hasCheckout',
      icds: 'icds',
      checkout: 'checkout'
    }),

    claimIcds() {
      return {...this.icds}
    },

    claimCheckout() {
      return {...this.checkout}
    },

    maxThreashold() {
      return this.icds.length >= 12
    }

  },
  methods: {

    ...mapActions('claims', {
      addNewIcdCode: 'addNewIcdCode',
      removeIcdCode: 'removeIcdCode',
      updateExistingIcdCode: 'updateExistingIcdCode'
    }),

    save() {
      this.$emit('cancel')
    },

    cancel() {
      this.$emit('cancel')
    },

    saveNewIcdCode() {
      if(this.maxThreashold) return
      console.log("%c Saving new icd code...", "color:orange;font-weight:bold")
      this.addNewIcdCode({icd_code: null})
      console.log("%c Saved", "color:green;font-weight:bold")
    },

    updateIcdCode(value, icd) {
      console.log("%c updating icd code...", "color:orange;font-weight:bold")
      this.updateExistingIcdCode({value, icd})
      console.log("%c updated icd code", "color:green;font-weight:bold")
    }

  }


}
</script>


