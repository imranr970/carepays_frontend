<template>

  <main class="user-profile">

    <profileSidebar />

    <div class="main w-100">
      <h4 class="heading-4 mb-sm">Your Orders</h4>
      <div class="clearfix"></div>

      <!-- <div class="form form__group float--right">
        <select name="sort" class="form__input-control form__input-control--xs">
          <option value="none">Sort by</option>
          <option value="asc">Date Asc</option>
          <option value="desc">Date Desc</option>
          <option value="latest">Date of service Asc</option>
          <option value="oldest">Date of service Desc</option>
          <option value="oldest">Price Highest</option>
          <option value="oldest">Lowest</option>
        </select>
      </div> -->

      <div class="clearfix"></div>

      <div class="card">

        <div class="card__body">

          <ul class="nav nav-pills" id="pills-tab" role="tablist">

            <li class="nav-item">
              <a @click.prevent="$router.replace({path:'/profile/orders', query:{page:1}})" href="#completed_and_upcoming" class="nav-link active" data-toggle="pill" role="tab" aria-controls="completed_and_upcoming" id="pills-home-tab">
                All
              </a>
            </li>

            <li class="nav-item">
              <a @click.prevent="$router.replace({path:'/profile/orders', query:{page:1, status:'complete'}})" href="#completed_and_upcoming" class="nav-link" data-toggle="pill" role="tab" aria-controls="completed_and_upcoming" id="pills-home-tab">
                Completed
              </a>
            </li>

            <li class="nav-item">
              <a @click.prevent="$router.replace({path:'/profile/orders', query:{page:1, status:'processing'}})" href="#pending" class="nav-link" id="pills-pending-tab" data-toggle="pill" role="tab" aria-controls="pending">
                Processing
              </a>
            </li>

            <li class="nav-item">
              <a @click.prevent="$router.replace({path:'/profile/orders', query:{page:1, status:'payment-failed'}})" href="#missed" class="nav-link" id="pills-missed-tab" data-toggle="pill" role="tab" aria-controls="missed">
                Failed
              </a>
            </li>

          </ul>

          <div class="tab-content" id="myTabContent">

            <div class="tab-pane fade show active" id="completed_and_upcoming" role="tabpanel" aria-labelledby="completed_and_upcoming-tab">
              <orders />
            </div><!--tab-pane-->

            <div class="tab-pane fade" id="pending" role="tabpanel" aria-labelledby="pending-tab">
              <orders />
            </div><!--tab-pane-->

            <div class="tab-pane fade" id="missed" role="tabpanel" aria-labelledby="missed-tab">

              <orders />

            </div><!--tab-pane-->

            <div class="tab-pane fade" id="rescheduled" role="tabpanel" aria-labelledby="rescheduled-tab">
              <orders />
            </div><!--tab-pane-->

          </div><!--tab-content-->

        </div><!--card__body-->

      </div><!--card-->


    </div>

  </main>

</template>

<script>

import profileSidebar from '@/components/layouts/profile-sidebar'
import orders from '@/components/orders/orders'

export default {

  middleware:'auth',
  components: {
    profileSidebar,
    orders
  }


}
</script>

<style lang="scss" scoped>

  .nav {

    margin-bottom:1rem;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align:center;

  }

  .nav-pills {
    border-bottom:1px solid #f0f0f0 !important;
    &:focus {
      border:0 !important;
    }
  }

  .nav-link {
    color:#222;
    padding-bottom:1.5rem;
  }

  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color:#7fd6d6 !important;
    background:#fff;
    border-bottom:2px solid #7fd6d6;
  }

  .table {
    border-top: 0;
    tr{
      border-top:0;
    }
  }

</style>
