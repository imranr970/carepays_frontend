<template>

  <div class="popup" id="reference_doctor">

    <!-- popup__content--center -->
    <div class="popup__content popup__content--xl">

      <a href="#" class="popup__close" @click.prevent="$emit('close', 'reference_doctor')">&times;</a>

      <h4 class="heading-4 px-sm py-xs">
        Quality of care! Guaranteed Savings!
      </h4>
      <hr>

        <form class="form px-sm">

          <div class="form__group mb-sm">

            <label class="form__label d--inline">
              Were you referred by a doctor?*
            </label>
            <label class="switch switch--sm d--inline ml-sm">
              <input type="checkbox">
              <span class="slider slider--sm round"></span>
            </label>

          </div>

          <p>Please complete the referred doctor details.</p>

          <div class="grids grids--three">
            <div class="form__group">
              <input type="text" class="form__input-control form__input-control--xs" placeholder="Zip code">
            </div>

            <div class="form__group">
              <input type="text" class="form__input-control form__input-control--xs" placeholder="Specilaity">
            </div>

            <div class="form__group">
              <input type="text" class="form__input-control form__input-control--xs" placeholder="Name">
            </div>
          </div>

          <hr>

          <div class="grids grids--two">

            <div class="form__group">
              <label for="" class="form__label form__label--sm">
                Referring doctor's first name*
              </label>
              <input type="text" class="form__input-control form__input-control--grey form__input-control--xs" placeholder="First name">
            </div>

            <div class="form__group">
              <label for="" class="form__label form__label--sm">
                Referring doctor's Contact person*
              </label>
              <input type="text" class="form__input-control form__input-control--grey form__input-control--xs" placeholder="Contact person">
            </div>

            <div class="form__group">
              <label for="" class="form__label form__label--sm">
                Referring doctor's last name
              </label>
              <input type="text" class="form__input-control form__input-control--grey form__input-control--xs" placeholder="Last name">
            </div>

            <div class="form__group">
              <label for="" class="form__label form__label--sm">
                Referring doctor's zip code*
              </label>
              <input type="text" class="form__input-control form__input-control--grey form__input-control--xs" placeholder="Zip code">
            </div>

            <div class="form__group">
              <label for="" class="form__label form__label--sm">
                Referring doctor's Email*
              </label>
              <input type="text" class="form__input-control form__input-control--grey form__input-control--xs" placeholder="Email">
            </div>

            <div class="form__group">
              <label for="" class="form__label form__label--sm">
                Referring doctor's Phone*
              </label>
              <input type="text" class="form__input-control form__input-control--grey form__input-control--xs" placeholder="Phone">
            </div>
          </div>

          <hr>

          <div class="form__group my-xs">

            <label for="" class="form__label form__label--sm d--inline">
              Do you know the test or treatment that you will need?*
            </label>

            <label class="switch switch--sm d--inline ml-sm">
              <input type="checkbox">
              <span class="slider round slider--sm"></span>
            </label>

          </div>

          <div class="form__group my-xs">
            <label class="form__label form__label--sm">
              Please search for treatment or enter cpt code
            </label>
            <input type="text" class="form__input-control form__input-control--xs" placeholder="Search by treatment name or cpt code">
          </div>

          <div class="form__group mt-xs">
            <label for="" class="form__label form__label--sm d--inline">
              To ensure the accuracy of your information we can contact your referring doctor?
            </label>

            <label class="switch switch--sm d--inline">
              <input type="checkbox">
              <span class="slider round slider--sm"></span>
            </label>

          </div>

        </form>

      <hr>
      <div class="popup__content--footer px-sm py-xs">
        <button class="btn btn--secondary btn--sm popup__close">
          Confirm
        </button>

        <a href="#" class="btn btn--default btn--sm">Cancel</a>
      </div>

    </div><!--popup__content-->

  </div><!--popup-->

</template>

<script>
export default {

}
</script>

