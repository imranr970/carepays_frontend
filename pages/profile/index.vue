<template>

  <div class="user-profile-view-mode">

    <div class="card">

      <div class="card__body">
        <h3 class="heading-3">Insurance & Patient Information</h3>

        <div class="user-info-text-view">

          <div class="user-image-section">
            <img :src="user.user_image" alt="user profile photo">
            <div>
              <nuxt-link :to="{name:'profile-edit'}">Edit profile</nuxt-link>
            </div>
          </div>

          <div class="user-bio-section">

            <table>

              <tr class="user-key">
                <td>Name:</td>
                <td>{{user.first_name}} {{user.last_name}}</td>
              </tr>
              <tr class="user-key">
                <td>DOB:</td>
                <td>{{ userDateOfBirth(user.dob) }}</td>
              </tr>
              <tr class="user-key">
                <td>Email:</td>
                <td>{{user.email}}</td>
              </tr>
              <tr class="user-key">
                <td>Number:</td>
                <td>{{user.phone || '--'}}</td>
              </tr>
              <tr class="user-key">
                <td>Address:</td>
                <td v-if="user.address">
                  {{user.address.address}}
                </td>
                <td v-else>--</td>
              </tr>
              <!-- <tr class="user-key">
                <td>Benefits:</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
              </tr> -->

            </table>

          </div>

        </div>

        <ul class="nav nav-pills" id="pills-tab" role="tablist">

          <li class="nav-item">
            <a href="#home" class="nav-link active" data-toggle="pill" role="tab" aria-controls="home" id="pills-home-tab">
              Referred Doctor
            </a>
          </li>

          <li class="nav-item">
            <a href="#profile" class="nav-link" id="pills-profile-tab" data-toggle="pill" role="tab" aria-controls="profile">
              Insurance Information
            </a>
          </li>

        </ul>

        <div class="tab-content" id="myTabContent">

          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

            <table class="table">
              <tr>
                <td>First/Last name:</td>
                <td>Muhammad Imran</td>
              </tr>
              <tr>
                <td>Office contact Person:</td>
                <td>Sania Ijaz</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>+1 896 167 5689</td>
              </tr>
              <tr>
                <td>Recommended Treatment:</td>
                <td>Dolar sit amet</td>
              </tr>
              <tr>
                <td>Cpt or Treatment Name:</td>
                <td>Lorem ipsum dolor sit amet.</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</td>
              </tr>
            </table>

          </div><!--tab-pane-->

          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">


            <nuxt-link :to="{name:'insurance-new'}" class="mt-xs btn btn--secondary btn--sm float--right">
              Add Insurance
            </nuxt-link>

            <span class="clearfix"></span>

            <template v-if="auth_insurances.length > 0">

              <div id="accordion" class="mt-xs" v-for="(insurance, index) in auth_insurances" :key="insurance.id">

                <div class="card">

                  <div class="card-header py-xs" id="headingOne">
                    <span data-toggle="collapse" :data-target='accordionTarget(index, "target")'>

                      <span class="badge badge-primary" v-if="insurance.insurance_package == 'primary'">
                        Primary
                      </span>
                      <span class="badge badge-secondary" v-if="insurance.insurance_package == 'secondary'">
                        Secondary
                      </span>
                      <span class="badge badge-warning" v-if="insurance.insurance_package == 'tertiary'">
                        Tertiary
                      </span>

                      Insurance plan: {{insurance.company_name}}

                      <span class="float--right">

                        <a class="mr-xs users-popup-icon" href="#" @click.prevent="fillCurrentInsurance(insurance), openModal('dependantsForm')">
                          <i class="fa fa-users" title="dependants"></i>
                        </a>

                        <i class="fas fa-trash pointer mr-xs" @click.prevent="confirmDeleteInsurance(insurance.id)" title="delete"></i>

                        <i class="fa fa-pencil-alt pointer mr-xs" title="edit" @click.prevent="$router.push(`/insurance/edit/${insurance.id}`)"></i>

                        <i class="fas fa-plus pointer" title="open"></i>

                      </span>

                    </span>
                  </div>

                  <div :id='accordionTarget(index, "id")' class="collapse" aria-labelledby="headingOne" data-parent="#accordion">

                    <div class="card-body">

                      <table class="no--border">
                        <tr>
                          <td>Company Name:</td>
                          <td>{{insurance.company_name}}</td>
                        </tr>
                        <tr>
                          <td>Insured's ID number:</td>
                          <td>{{insurance.id}}</td>
                        </tr>
                        <tr>
                          <td>Insured's Name:</td>
                          <td>
                            {{insuredName(user)}}
                          </td>
                        </tr>
                        <tr>
                          <td>Email Address:</td>
                          <td>{{user.email}}</td>
                        </tr>
                        <tr>
                          <td>Address:</td>
                          <td v-if="user.address">
                            {{user.address.address}}
                          </td>
                          <td v-else>--</td>
                        </tr>
                        <tr>
                          <td>City/State/Zip:</td>
                          <td v-if="user.address">
                            {{
                              user.address.city
                              + "/" + user.address.state
                              + "/" + user.address.zipcode
                            }}
                          </td>
                          <td v-else>--</td>
                        </tr>
                        <tr>
                          <td>Phone Number:</td>
                          <td>{{user.phone || '--'}}</td>
                        </tr>
                        <tr>
                          <td>Policy Group or FECA Number:</td>
                          <td>{{insurance.policy_number}}</td>
                        </tr>
                        <tr>
                          <td>Birthdate:</td>
                          <td>{{userDateOfBirth(user.dob)}}</td>
                        </tr>
                        <tr>
                          <td>Plan or program name:</td>
                          <td>{{insurance.plan_name}}</td>
                        </tr>
                        <tr>
                          <td>Employer's or School Name:</td>
                          <td>{{insurance.employer_name || '--'}}</td>
                        </tr>
                        <tr>
                          <td>Insurance Type:</td>
                          <td>{{insurance.insurance_type}}</td>
                        </tr>
                        <tr>
                          <td>Spouse Coverage:</td>
                          <td>No</td>
                        </tr>
                        <tr>
                          <td>Child Coverage:</td>
                          <td>No</td>
                        </tr>
                      </table>

                      <div class="buttons my-sm">
                        <button class="btn btn--secondary btn--sm mr-xs" @click="$router.push(`/insurance/edit/${insurance.id}`)">Edit</button>
                        <button class="btn btn--default btn--sm" @click.prevent="confirmDeleteInsurance(insurance.id)">Delete</button>
                      </div>

                    </div><!--card-body-->

                  </div><!--collapse-->

                </div><!--card-->

              </div><!--accordion-->

            </template><!--auth have insurances-->

            <template v-else>
              <p>You do not have any insurances yet</p>
            </template>


          </div><!--tab-pane-->

        </div><!--tab-content-->

      </div><!--card__body-->

    </div><!--card-->

    <dependantsForm @close="closeModal($event)" />


  </div>

</template>

<script>

import {mapActions} from 'vuex';
import dependantsForm from '@/components/dependantsForm';

export default {

    middleware:'auth',

    components: {
      dependantsForm
    },

    data() {

      return  {
        auth_insurances:[]
      };

    },

    computed: {

      momentDate() {
        return this.user.dob;
      }

    },

    methods: {

      ...mapActions('insurance', {
        deleteInsurance : 'deleteInsurance',
        addDependants   : 'addDependants',
        fillCurrentInsurance : 'fillCurrentInsurance'
      }),

      confirmDeleteInsurance(id) {
        if(confirm("Are you sure? Insurance will be deleted!")) {

          this.deleteInsurance(id)
          .then(() => {
            this.$toast.success("Insurance deleted").goAway(2000);
            this.updateAuthInsurance(id);
          })
          .catch(() => {
            this.$toast.error("Something went wrong").goAway(2000);
          });
        }
      },

      updateAuthInsurance(id) {
        this.auth_insurances = this.auth_insurances.filter(term => term.id !== id);
      },

      insuredName(insurance) {
        let name = '';
        let fname = insurance.first_name || '';
        let mname = insurance.middle_name || '';
        let lname = insurance.last_name || '';
        return fname + " " + mname + " " + lname;
      },

      async getAuthInsurances() {
        await this.$axios.post(`auth/insurance/getAll`)
        .then(({data}) => {
          this.auth_insurances = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      },

      accordionTarget(index, type) {
        return type == 'target' ? '#collapse'+index : 'collapse'+index
      },

      userDateOfBirth(date) {
        if(date) {
          date = date.split('-');
          date = this.$moment(new Date(date[0] +'-'+ date[1] + '-' + date[2])).format('LL');
          return date;
        }
        return null;
      }

    },

    created() {
      this.getAuthInsurances();
    }

}
</script>

<style lang="scss">

.user-profile-view-mode {

  .tab-content {

    .tab-pane {

      .table {
        & > * {
          font-size:1.4rem;
        }
      }

      table, tr {
        border:0 !important;
      }

      tr:not(:first-child) {
          background: none !important;
      }

      tr:not(:last-child) {
          border-bottom:1px solid #f7f7f7 !important;
      }

      tr:first-child {
        border:0;
      }

      td:nth-child(even) {
        font-weight:500;
        color:#2E251D;
      }

      td {
        margin:0 !important;
      }

      .no--border {
        border:0;
        tr {
          border:0;
        }
      }


    }

  }

  .user-bio-section {

    tr {
      border:0 !important;
    }
    tr:not(:first-child) {
      background: none;
    }
    th, td, tr {
      padding:.7rem 1rem !important;
    }
    tr:first-child {
      color:inherit;
    }
    td:nth-child(even) {
      color:#222;
    }

  }

  .nav {

    margin-bottom:1rem;
    display:grid;
    grid-template-columns: 1fr 1fr;

  }

  .nav-pills {
    border-bottom:1px solid #f0f0f0 !important;
    &:focus {
      border:0 !important;
    }
  }

  .nav-link {
    color:#222;
  }

  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color:#222;
    background:#fff;
    border-bottom:2px solid #7fd6d6;
  }

  .users-popup-icon {
    &:link,
    &:visited {
      color:#777;
    }
  }

}

</style>
