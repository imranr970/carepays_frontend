<template>

  <div class="popover"  :id="id">
    <div class="popover--inner" :class="direction">

      {{text}}

      <!-- <span class="icon" @click="$emit('close', this.id)">
        <i class="fas fa-times-circle"></i>
      </span> -->

    </div>
  </div>

</template>

<script>
export default {
  props: {
    text: {
      required:true,
      type:String
    },
    direction: {
      required:true,
      type:String
    },
    id: {
      required:true,
      type:String
    }
  }
}
</script>

<style lang="scss">
  .popover {
    position: absolute;
    top:50%;
    left:-10rem;
    display:inline-block;
    font-size:1.4rem;
    transform: translate(-50%,-50%);
    background:#fff;
    border:1px solid #ddd;

    &--inner {
      padding:1rem;

      .icon {
        color:rgb(180, 7, 7);
        cursor:pointer;
        &:hover {
          opacity: .7;
        }
      }

    }

    &::after {
      content:'';
      position:absolute;
      right:-1rem;
      top:50%;
      border-color:#ddd;
      border-style:solid;
      transform:translate(50%, -50%);
      border-left-width:10px;
      border-right-width:7px;
      border-top-width:7px;
      border-bottom-width:7px;
      border-bottom-color:transparent;
      border-top-color:transparent;
      border-right-color:transparent;
    }

    .left {
      left:-7rem !important;
    }

    .right {
      right:-7rem !important;
    }

    .top {
      top:50% !important;
    }

    .bottom {
      bottom:50% !important;
    }

  }
</style>
