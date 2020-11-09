<template>

  <main>

    <impactHeader />

    <div class="site-padding">

      <div class="card">
        <div class="card__body">

          <div class="chart">
            <buisness-graph />
          </div>

        </div>
      </div>

      <div class="card">

        <div class="card__body">

          <div class="flex">

            <div class="flex-1">

              <div class="chart">
                <denial-trends />
              </div>

            </div>

            <div class="flex-1">

              <div class="chart">
                <denial-trends-collectors />
              </div>

            </div>

          </div>

        </div>
      </div>

      <div class="card">
        <div class="card__body">

          <div class="chart">
            <timesheet />
          </div>

        </div>
      </div>

      <div class="card">
        <div class="card__body">

          <div>
            <compliance-issues />
          </div>

        </div>
      </div>

      <div class="flex">

        <div class="card flex-1">
          <div class="card-body">
            <impact-summary />
          </div>
        </div>

        <div class="card flex-1">
          <div class="card-body">
            <denials-fruits />
          </div>
        </div>

      </div>

    </div>

  </main>
</template>

<script>

import impactHeader from '@/components/impact-analysis/header.vue'
import buisnessGraph from '@/components/charts/buisness-graph'
import denialTrends from '@/components/charts/denial-trends'
import denialTrendsCollectors from '@/components/charts/denial-trends-collectors'
import timesheet from '@/components/charts/timesheet'
import complianceIssues from '@/components/charts/compliance-issues'
import impactSummary from '@/components/charts/impact-summary'
import denialsFruits from '@/components/charts/denials-fruits'

export default {

  components : {
    impactHeader,
    buisnessGraph,
    denialTrends,
    denialTrendsCollectors,
    timesheet,
    complianceIssues,
    impactSummary,
    denialsFruits
  }


}
</script>

<style lang="scss" scoped>
 .chart {
    width:40rem;
    height:40rem;
    display:block;

    &__full {
      width:100% !important;
      height:50rem !important;
    }

  }
  .card {
    margin:1rem 0;
    overflow:auto;
  }
</style>

