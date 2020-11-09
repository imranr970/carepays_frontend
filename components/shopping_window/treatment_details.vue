<template>

  <main>

    <div>
        <img src="@/assets/images/treatment-logo.jpg" class="card__img logo">
    </div>

    <h4 class="heading-4 card__heading">
        {{treatment.provider_type}}
    </h4>

    <p class="card__text mb-sm" v-if="treatment.distance">
      <strong> {{treatment.distance.toFixed(2)}} miles </strong>
    </p>
    <p class="card__text mb-sm" v-else>
      <strong>0 miles</strong>
    </p>

    <ul class="card__list">
      <li class="card__item">
        Average cost:
          <span class="strong">
            ${{treatment.average_cost}}
          </span>
      </li>
      <li class="card__item">
        Purchase cost: ${{treatment.purchase_cost}}
      </li>
      <li class="card__item">
        Covered cost:
        ${{treatment.covered_cost}}
      </li>
      <li class="card__item">
        Out of pocket cost:
        ${{treatment.out_of_pocket_cost}}
      </li>
      <li class="card__item">
        Average saved:
        ${{treatment.average_saved}}
      </li>
    </ul>

    <div class="services-buttons mt-sm">

      <button class="btn btn--xs no-shadow btn--primary to--upper mr-xs" @click="insertTreatment(treatment), openModal('popup')">
        Negotiate
      </button>

      <button class="btn btn--xs no-shadow btn--secondary btn--secondary-outline to--upper" @click="addToCart(treatment)">
        Purchase care
      </button>

    </div>

  </main>


</template>

<script>
export default {
  props: {

    treatment: {
      required:true,
      type:Object
    }

  },

  methods: {

    insertTreatment(treatment) {
      this.$emit('insert', treatment);
    },

    openModal(id) {
      this.$emit('open', id);
    },

    addToCart(treatment) {
      this.$emit('add', treatment);
    }

  }

}
</script>

