<template>

  <div class="popup" id="shouldiceWarningModal">

    <div class="popup__content">

      <a href="#" class="popup__close" @click.prevent="$emit('close', 'shouldiceWarningModal')">&times;</a>

        <div class="d-flex justify-content-between">

          <div class="px-sm py-xs">

            <h5 class="heading-5">
              <span>Warning</span>
            </h5>

          </div>

        </div>

        <span class="clearfix"></span>

        <hr>

        <div class="px-sm mt-xs">

          <h4 class="my-xs heading-5"></h4>

          <p>
            Your symptoms may indicate an emergency. don’t wait, seek immediate medical care or call 911.
          </p>

        </div>


        <div class="popup__content--footer px-sm py-xs border-top mt-sm">

          <div class="float--right">
            <a href="#" class="btn btn--default btn--sm" @click.prevent="$emit('close', 'shouldiceWarningModal')">
              Close
            </a>
          </div>
          <span class="clearfix"></span>

        </div>

      </div>

  </div><!--popup-->

</template>


<script>
export default {

  props: {

  }

}
</script>
