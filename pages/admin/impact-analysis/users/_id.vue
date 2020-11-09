<template>

  <main>

    <impactHeader/>

    <div class="site-padding">

      <h4 class="heading-4 mb-sm">User's Details</h4>

      <table class="table mb-lg">

          <thead>

            <th>Money gained</th>
            <th>Responsibility</th>
            <th>Avg money collected</th>
            <th>Avg days</th>
            <th>Action</th>

          </thead>

          <tbody>
            <tr>
              <td>$45645</td>
              <td>Aetna, NA</td>
              <td>$30</td>
              <td>7</td>
              <td>
                <a href="#" class="link">Action</a>
              </td>
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

