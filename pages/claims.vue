<template>
  <main class="claims site-padding site-padding--lg">

    <div class="card">

      <div class="card-body">
        <h4 class="heading-4 mb-sm">Payments & Claims</h4>
        <div class="float-right">
          <a href="#" class="sort text--black text--sm">
            Sort by
          </a>
        </div>
        <span class="clearfix"></span>
        <table class="table table-striped">
          <tr>
            <th>Transaction ID</th>
            <th>Date of Service</th>
            <th>CPT</th>
            <th>Supplier</th>
            <th>Speciality</th>
            <th>Purchase prices</th>
            <th>Insurance Covered</th>
            <th>Payment Method</th>
          </tr>

          <tr>
            <td>3256489</td>
            <td>{{new Date("dd-mm-yyyy")}}</td>
            <td>32564</td>
            <td>Spruce Spring clean</td>
            <td>General Surgery</td>
            <td>$236</td>
            <td>587</td>
            <td>Credit Card</td>
          </tr>

           <tr>
            <td>3256489</td>
            <td>{{new Date("dd-mm-yyyy")}}</td>
            <td>32564</td>
            <td>Spruce Spring clean</td>
            <td>General Surgery</td>
            <td>$236</td>
            <td>587</td>
            <td>Credit Card</td>
          </tr>

           <tr>
            <td>3256489</td>
            <td>{{new Date("dd-mm-yyyy")}}</td>
            <td>32564</td>
            <td>Spruce Spring clean</td>
            <td>General Surgery</td>
            <td>$236</td>
            <td>587</td>
            <td>Credit Card</td>
          </tr>

           <tr>
            <td>3256489</td>
            <td>{{$moment("7-23-1995").format("LL")}}</td>
            <td>32564</td>
            <td>Spruce Spring clean</td>
            <td>General Surgery</td>
            <td>$236</td>
            <td>587</td>
            <td>Credit Card</td>
          </tr>

           <tr>
            <td>3256489</td>
            <td>{{new Date("dd-mm-yyyy")}}</td>
            <td>32564</td>
            <td>Spruce Spring clean</td>
            <td>General Surgery</td>
            <td>$236</td>
            <td>587</td>
            <td>Credit Card</td>
          </tr>

        </table>
      </div>

    </div>

  </main>
</template>

<script>
export default {

}
</script>

<style>

</style>
