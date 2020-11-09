<template>

  <div class="claim">
    <table class="table claim-table">
      <tr>
        <td>
          <span class="text--dark">Claim Date:</span> {{$moment().format('LL')}}
        </td>
        <td class="text--dark">Primary</td>
        <td class="text--dark">Group Health Plan</td>
        <td :class="claimStatusClass">{{claimStatus}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  props: {
    claimStatus: String
  },

  computed: {

    claimStatusClass() {
      return this.claimStatus == 'sent' ? 'status-field status-field--sent' : 'status-field status-field--hold'
    }

  }

}

</script>

<style lang="scss" scoped>
  .status-field {
    text-align:center;
    color:#fff;
    text-transform: uppercase;
    font-weight:bold;
    border:0;
    outline:0;
    &--sent {
      background:green;
    }
    &--hold {
      background:red;
    }
  }
</style>
