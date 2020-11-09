<template>

	<div class="popup" id="warningModal" v-if="data">

    <div class="popup__content">

      <a href="#" class="popup__close" @click.prevent="close('warningModal')">&times;</a>

        <div class="d-flex justify-content-between">

          <div>
            <h5 class="heading-5 py-xs px-sm">
              Warning
            </h5>
          </div>

        </div>

        <span class="clearfix"></span>

        <hr>

        <div class="px-sm">

          <p>{{data.warning_text}}</p>

        </div>


        <div class="popup__content--footer px-sm py-xs border-top mt-sm">

          <div class="float--right">
            <a href="#" class="btn btn--default btn--sm" @click.prevent="close('warningModal')">Close</a>
          </div>
          <span class="clearfix"></span>

        </div>

      </div>

  </div><!--popup-->


</template>

<script>
	export default {

    name:'warningModal',

    props:['data'],

    methods: {
			close(id) {
				this.$emit('close', id);
			}
    }

	}
</script>

<style scoped>
.modal-content {
    border:1px solid #bf5252;
}

.card{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:inherited;
}

</style>
