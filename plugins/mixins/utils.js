import Vue from 'vue';

const utils = {

  install(Vue) {

    Vue.mixin({

      methods: {

        AppDate(date, format = 'LL') {
          return this.$moment(date).format(format)
        },

        formattedDesc(desc, len=80) {
          return desc.length > len ? desc.substring(0, len) + '...' : desc;
        },

        hideBaloon(item) {
          item.parentNode.style.display="none";
        },

        openModal(id) {

          try {
            $(`#${id}`).css({
              opacity:'1',
              visibility:'visible'
            });
            $(`#${id} .popup__content`).css({
              opacity:'1',
              transform: 'translate(-50%, -50%) scale(1)',
            });
          }
          catch(e) {
            console.log(e);
          }

        },

        closeModal(id) {

          try {
            $(`#${id}`).css({
              opacity:'0',
              visibility:'hidden'
            });
            $(`#${id} .popup__content`).css({
              opacity:'0',
              transform: 'translate(-50%, -50%) scale(0.5)',
            });
          }
          catch(e) {
            console.log(e);
          }
        }

      }

    })
  }

}

Vue.use(utils)
