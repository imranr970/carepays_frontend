<template>

  <div>

    <table border="2" class="my-xs claim-table">

      <tr class="t-head">
        <td colspan="4" class="text--dark">
          Rendering Provider
          <a href="#" @click.prevent="$emit('edit', 'renderingProvider')">
            <i class="fas fa-pen"></i>edit
          </a>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <p>Full Name and credentials</p>
          <p>Full Address</p>
        </td>
      </tr>

      <tr>
        <td class="text--dark">NPI:</td>
        <td colspan="3">npi number</td>
      </tr>

      <tr>
        <td class="text--dark">SSN:</td>
        <td></td>

        <td class="text--dark">TAXID:</td>
        <td>some tax id</td>
      </tr>

      <tr>
        <td class="text--dark">UPIN:</td>
        <td>A64817</td>

        <td class="text--dark">TaxonomyCode:</td>
        <td>20810000X</td>
      </tr>

      <tr>
        <td class="text--dark">Speciality:</td>
        <td colspan="3">25</td>
      </tr>

      <tr>
        <td class="text--dark">Provider Signature:</td>
        <td>Y</td>
        <td class="text--dark">Signature Date:</td>
        <td>Some date</td>
      </tr>

    </table>

  </div>

</template>

<script>
export default {


}
</script>

