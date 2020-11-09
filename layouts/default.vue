<template>
  <div>
    <Header />
    <!-- <staticIcon /> -->
    <searchModal />
      <!-- <no-ssr placeholder=""> -->
        <!-- <notifications group="app" closeOnClick=true /> -->
      <!-- </no-ssr> -->
      <nuxt />
    <Footer />
  </div>
</template>
<script>
  import Header from '@/components/layouts/header';
  import Footer from '@/components/layouts/footer';
  import searchModal from '@/components/layouts/searchModal';
  import staticIcon from '@/components/staticIcon';

  export default {

    components:{
      Header,
      Footer,
      staticIcon,
      searchModal
    },

    head() {
      return {
        titleTemplate: '%s - CarePays',
        meta: [
          { charset: 'utf-8' },
          {
            hid: 'description',
            name: 'description',
            content: 'Carepays Healthcare IQ Project'
          }
        ]

      };
    }

}
</script>
