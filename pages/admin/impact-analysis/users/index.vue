<template>
  <main>
    <impactHeader />

    <div class="site-padding">

      <div class="mb-xs">
        <button class="btn btn--secondary btn--sm" @click.prevent="$router.push({name:'admin-impact-analysis-users-new'})">Add new</button>
      </div>

      <h4 class="heading-4 mb-sm">Members</h4>

      <div class="clearfix"></div>

      <div class="form float--right clearfix">

        <div class="form__group">
          <select class="form__control">
            <option value="0">Select Filter</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
        </div>

      </div>

      <div class="clearfix"></div>

      <table class="table mb-lg">

        <thead>

          <th>Role</th>
          <th>Name</th>
          <th>Money gained</th>
          <th>Money remained in bucket</th>
          <th>Avg days to get money</th>
          <th>Insurance company</th>
          <th>Number of lines</th>

        </thead>

        <tbody>
          <tr>
            <td>Collector</td>
            <td>John Doe</td>
            <td>$45645</td>
            <td>$456</td>
            <td>3</td>
            <td>Aetna</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Collector</td>
            <td>Jim</td>
            <td>$3564756</td>
            <td>$4506</td>
            <td>7</td>
            <td>Aetna</td>
            <td>5</td>
          </tr>
        </tbody>

      </table>

    </div>


  </main>
</template>

<script>

import impactHeader from '@/components/impact-analysis/header.vue'

export default {
  components : {
    impactHeader
  }
}
</script>

