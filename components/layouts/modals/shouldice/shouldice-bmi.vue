<template>

  <div class="popup" id="bmiModal">

    <div class="popup__content">

      <a href="#" class="popup__close" @click.prevent="$emit('close', 'bmiModal')">&times;</a>

        <div class="d-flex justify-content-between">

          <div>
            <h4 class="heading-5 py-xs px-sm">Your status</h4>
          </div>

        </div>

        <span class="clearfix"></span>

        <hr>

        <div class="px-sm mt-xs">

          <h4 class="my-xs heading-5">{{bmi.message}}</h4>

          <p v-if="bmi.score">Your BMI is {{bmi.score.toFixed(2)}}</p>

        </div>


        <div class="popup__content--footer px-sm py-xs border-top mt-sm">

          <div class="float--right">
            <a href="#" class="btn btn--default btn--sm" @click.prevent="$emit('close', 'bmiModal')">
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
    bmi: {
      type : Object,
      required : true
    }
  }

}
</script>
