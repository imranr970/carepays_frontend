<template>

  <div class="filters-bar">

    <form class="form" @submit.prevent="submit" @keydown="removeError($event.target.name)" @change="removeError($event.target.name)">

      <label class="form__label" for="treatment_name">
        <input type="text" class="form__input" id="treatment_name" placeholder="Treatment name" v-model="treatment_description" autocomplete="off">
      </label>

      <label class="form__label" for="location">
        <input type="text" class="form__input" id="location" placeholder="Location" v-model="filters.location">
      </label>

      <label class="form__label" for="reason_visit">
        <input type="text" class="form__input" id="reason_visit" placeholder="Reason for visit" v-model="reason_for_visit">
      </label>

      <label class="form__label mt-xs px-xs" for="dateTimePicker">
        <span id="dateTimePicker">
          <!-- format="'YYYY-MM-DD HH:mm'" 24 hrs format-->
          <VueCtkDateTimePicker v-model="filters.date" label="Select date and time" />
        </span>
      </label>

      <div>

        <label class="form__label dropdown--cta pointer">

          <p class="form__input">
            More
            <i class="fa fa-angle-down fa-fw"></i>
          </p>

          <div class="dropdown--menu dropdown--menu-2">

            <!-- <div class="form__group dropdown--menu-2--1">
              <div class="form__group">
                  <label for="" class="mb-xs">Experience</label>
                  <select name="expeience" class="form__input-control" v-model="filters.experience">
                      <option value="0">Please select</option>
                      <option value="&lt;2">Less than 2 years</option>
                      <option value="&lt;5">Less than 5 years</option>
                      <option value="&lt;10">Less than 10 years</option>
                      <option value="&gt;10">More than 10 years</option>
                  </select>
              </div>
            </div> -->

            <div class="form__group dropdown--menu-2--2">
              <div class="form__group">
                <label for="" class="mb-xs">Credentialed</label>
                <select name="credentialed" class="form__input-control" v-model="filters.credentialed">
                  <option value="0">Please select</option>
                  <option v-for="(cred, index) in creds" :key="index" :value="cred">{{cred}}</option>
                </select>
              </div>
            </div>

            <div class="form__group dropdown--menu-2--3">
              <div class="form__group">
                <label for="" class="mb-xs">Language</label>
                <select name="language" class="form__input-control" v-model="filters.language">
                    <option value="0">Please select</option>
                    <option :value="language.iso2" v-for="language in languages" :key="language.iso2">
                      {{language.name}}
                    </option>
                </select>
              </div>
            </div>

            <div class="form__group dropdown--menu-2--4">
              <div class="form__group">
                <label for="" class="mb-xs">Gender</label>
                <select name="gender" class="form__input-control" v-model="filters.gender">
                  <option value="0">Please select</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
            </div>

            <div class="form__group dropdown--menu-2--5">
              <label for="">Miles</label>
              <input name="miles" type="range" class="form__input-control custom-range" v-model="filters.miles">
            </div>

          </div>

        </label>

      </div>

      <div class="form__group form__last-input">

          <label class="form__label" for="reset">
            <input @click="reset" type="reset" class="btn btn--sm no-shadow btn--primary mx-xs" id="reset">
          </label>

          <label class="form__label" for="submit">
            <input type="submit" class="btn btn--sm no-shadow btn--secondary mx-xs" id="submit" value="update">
          </label>

      </div>

    </form>

  </div><!--filters-bar-->

</template>

<script>
export default {

  data() {

    return {
      filters: {
        date:null,
        credentialed : null,
        miles:0,
        location:null,
        reason_for_visit,
        language:0,
        gener:0
      },
      treatment_description,

    };

  },

  watch: {

  },


  computed: {

    ...mapGetters({
      languages : 'languages'
    })

  },

  methods: {

    ...mapAction({
      removeError : 'validation/removeError',
      languages   : 'languages'
    }),

    submit() {

    },

    reset() {

    }


  }

}
</script>

