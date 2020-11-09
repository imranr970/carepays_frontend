import webpack from "webpack";

export default {

  /*
  ** Headers of the page
  */
  head: {

    title: process.env.npm_package_name || 'Carepays - Healthcare IQ Project',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,700i&display=swap' }
    ],

    script: [

      { src: '/js/jquery.min.js', defer:true},
      { src: '/js/popper.js', defer:true},
      { src: '/js/bootstrap.js', defer:true},
      { src: '/js/back-parts.js',defer:true},
      { src: '/js/back-spots.js', defer:true},
      { src: '/js/front-parts.js', defer:true },
      { src: '/js/front-spots.js', defer:true },
      { src: '/js/interact-script.js', defer:true},
      { src: 'https://js.stripe.com/v3/'},

      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjmzNlPIeeD5qk9ZxXz4ihXx5b1Wh9esk&libraries=places', defer:true}

    ]

  },
  /*
  ** Customize the progress-bar color/
  */
  loading: { color: '#323d5e' },

  env: {
    appName:'CarePays',
    appDesc:'Healthcare IQ project',
    appOwner: {
      name  : 'ART GELBER',
      phone : '4321457'
    },
    api:{
      baseURL : 'http://localhost/carepays/public/api',
      ediURL  : 'http://169.61.216.28:9000/edi'
    }
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/bootstrap.css',
    '@/assets/sass/main.scss'
  ],

  router: {
    middleware: ['clearValidationErrors']
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/filters/index.js',
    '~/plugins/mixins/user.js',
    '~/plugins/mixins/validations.js',
    '~/plugins/mixins/utils.js',
    '~/plugins/mixins/priceFormatter.js',
    '~/plugins/globalComponents/readMore.js',
    '~/plugins/axios.js',
    '~/plugins/moment.js',
    '~/plugins/vue_observe_visibility.js',
    '~/plugins/date-picker.js',
    '~/plugins/vue-debouce.js',
    '~/plugins/lodash.js',
    {src:'~/plugins/vue-text-highlight.js', mode:'client'},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],

  toast: {
    position: 'top-right',
    iconPack:'fontawesome',
    register: [ // Register custom toasts
      {
        name: 'my_error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL:'http://localhost/carepays/public/api/'
  },

  auth: {

    strategies: {
      local: {
        endpoints: {

          login: {
            url:'auth/login', method:'post', propertyName:'meta.token'
          },

          user: {
            url:'me', method:'get', propertyName:'data'
          },

          logout: {
            url:'auth/logout', method:'post'
          }

        },

        redirect: {
          login: '/login',
          logout: '/',
          callback: '/login',
          home: '/'
        }

      }
    },


  },

  buildModules: [

  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },

    // vendor: ['loadash'],

    plugins:[
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jquery":"jquery",
        "_" : "lodash"
      })
    ]
  }
}
