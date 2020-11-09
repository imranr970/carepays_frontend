<template>

  <main>

    <impactHeader />

    <div class="site-padding new-user-box">

      <h4 class="heading-4 mb-sm">Add new member</h4>

      <div class="card">

        <div class="card-body px-sm py-sm">

          <form class="form">

            <div class="form__group">
              <label for="name" class="form__label">Name</label>
              <input type="text" class="form__input-control form__input-control--sm" placeholder="Add member name" v-model="name">
            </div>

            <div class="form__group">
              <label for="name" class="form__label">Email</label>
              <input type="text" class="form__input-control form__input-control--sm" placeholder="Email will be used for member login" v-model="email">
            </div>

            <div class="form__group">

              <label for="name" class="form__label">Roles</label>
              <select class="form__input-control form__input-control--sm" v-model="role">
                <option value="0">Please select</option>
                <option value="eob">EOB</option>
                <option value="insurance_company">Insurance company</option>
                <option value="remark_code_type">Remark code type (Avoidable)</option>
                <option value="insurance_with_remark_code">Insurance company with remark code</option>
              </select>

            </div>

            <div class="form__group"
            v-if="role=='insurance_company' || role == 'insurance_with_remark_code'">

              <label for="name" class="form__label">Insurance Company</label>
              <select class="form__input-control form__input-control--sm" v-model="insurance_companies" multiple>
                <option value="0">Please select</option>
                <option value="aetna">Aetna</option>
                <option value="aims">Aims</option>
                <option value="tricare">Tricare</option>
              </select>

            </div>

            <div class="form__group"
            v-if="role=='remark_code_type' || role == 'insurance_with_remark_code'">

              <label for="name" class="form__label">Remark code type</label>
              <select class="form__input-control form__input-control--sm" v-model="remark_codes" multiple>
                <option value="0">Please select</option>
                <option value="avoidable_denials">Avoidable denials</option>
                <option value="low_fruits">Low Fruits</option>
                <option value="compliance">Compliance</option>
              </select>

            </div>

          </form>

        </div><!--card-body-->

      </div><!--card-->

      <button class="btn btn--secondary btn--sm my-sm">
        Save
      </button>

    </div>

  </main>

</template>

<script>

import impactHeader from '@/components/impact-analysis/header.vue'

export default {

  components : {
    impactHeader
  },

  data() {

    return {
      name:null,
      email:null,
      role:0,
      insurance_companies: [],
      remark_codes: []
    };

  }

}
</script>

<style lang="scss" scoped>
  .new-user-box {
    width:50rem;
    height:auto;
    margin:0 auto;
  }
</style>

