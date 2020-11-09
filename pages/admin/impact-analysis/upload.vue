<template>

  <main>

    <impactHeader />

    <div class="upload-edi-page">

      <h4 class="heading-4 my-sm">Upload Edi files and generate claim</h4>

      <div class="card">

        <div class="card__body">

          <form enctype="multipart/form-data" @submit.prevent="submit">

            <div class="form__group mb-sm mt-xs">

              <p class="form__label">File type</p>
              <input type="radio" name="type_of_claim" id="837" value="837" v-model="type">
              <label for="837">837 file
                  <span class="radio-button"></span>
              </label>

              <input type="radio" name="type_of_claim" id="835" value="835" v-model="type">
              <label for="835">835 file
                  <span class="radio-button"></span>
              </label>

            </div>

            <div class="form__group">
              <label class="form__label" for="ediupload">Upload Edi file</label>
              <input id="ediupload" type="file" class="form__input-control" @change="onChange" accept="application/x-zip-compressed">
            </div>

            <div class="file-results hidden" id="result"></div>

            <button type="submit" class="btn btn--secondary btn--sm mt-sm">
              Upload
            </button>

          </form>

        </div>

      </div>

    </div>



  </main>

</template>

<script>
import jszip from 'jszip';
import impactHeader from '@/components/impact-analysis/header.vue'
import axios from 'axios';

export default {

  components: {
    impactHeader
  },

  data() {
    return {
      type:837,
      files:[]
    };
  },

  methods: {

    onChange(e) {

      this.files = [];
      $("#result").html('');

      if(!e.target.files) return false;

      let files = e.target.files[0];

      this.files = files;
      return;
      // let data = new FormData();
      // data.append(files);

      // // this.$axios.get('http://169.61.216.28:4000/eob_load', data)
      // // .then((res) => {
      // //   console.log(res);
      // // });

      // // return;

      var $result = $("#result");

      for (var i = 0; i < files.length; i++) {
        handleFile(files[i]);
      }

      // be sure to show the results
      $("#result_block").removeClass("hidden").addClass("show");

      var app = this;

      function handleFile(f) {
        var $title = $("<h4>", {
            text : f.name
        });
        var $fileContent = $("<ul class='list-unstyled'>");
        $result.append($title);
        $result.append($fileContent);

        var dateBefore = new Date();
        jszip.loadAsync(f)
        .then(function(zip) {
            var dateAfter = new Date();
            $title.append($("<span>", {
                "class": "small",
                text:" (loaded in " + (dateAfter - dateBefore) + "ms)"
            }));

            zip.forEach(function (relativePath, zipEntry) {  // 2) print entries

              zip.file(zipEntry.name).async('blob')
              .then((file) => {
                //console.log(file);
                app.files.push({name:zipEntry.name, file});

              })

              $fileContent.append($("<li>", {
                  text : zipEntry.name
              }));
            });
        }, function (e) {
            $result.append($("<div>", {
                "class" : "alert alert-danger",
                text : "Error reading " + f.name + ": " + e.message
            }));
        });
      }



    },

    submit() {

      // this.files.forEach((contents) => {
      //   let data = new FormData();
      //   data.append('file', contents.file);
      //   data.append('name', contents.name);
      //   this.$axios.post('auth/update/image', data)
      //   .then(res => console.log(res));
      // });

      /**
       * above code is original
       */

      let data = new FormData();
      data.append('file', this.files);
      data.append('date_upload', this.$moment().format('YYYY-MM-DD'));
      data.append('time_upload', this.$moment().format('HH:ss'));
      data.append('provider_id', 1);

      axios.post('http://169.61.216.28:4000/eob_load', data)
      .then((res) => {
        console.log(res);
      });

      return;

      // let data = new FormData();

      // this.files.forEach((contents, index) => {
      //   data.append(`file${index}`, contents.file);
      //   data.append(`name${index}`, contents.name);
      // });

      // data.append('count_of_files', this.files.length);
      // data.append('type', this.type);

      // this.$axios.post('auth/update/image', data)
      // .then((res) => {
      //   this.files = [];
      //   $("#result").html('');
      // });

    }

  }

}
</script>

<style scoped lang="scss">

  .upload-edi-page {
    width:60%;
    margin:3rem auto 8rem auto;
  }
  .file-results {
    margin:1rem 0 1rem 0;
  }

</style>
