<template>

  <div class="user-profile-view-mode user-appointments">

    <div class="card">

      <div class="card__body">

        <h4 class="heading-4">Appointments</h4>
        <hr>

        <ul class="nav nav-pills" id="pills-tab" role="tablist">

          <li class="nav-item">
            <a href="#completed_and_upcoming" class="nav-link active" data-toggle="pill" role="tab" aria-controls="completed_and_upcoming" id="pills-home-tab">
              Completed & Upcoming
            </a>
          </li>

          <li class="nav-item">
            <a href="#pending" class="nav-link" id="pills-pending-tab" data-toggle="pill" role="tab" aria-controls="pending">
              Pending
            </a>
          </li>

          <li class="nav-item">
            <a href="#missed" class="nav-link" id="pills-missed-tab" data-toggle="pill" role="tab" aria-controls="missed">
              Missed
            </a>
          </li>

          <li class="nav-item">
            <a href="#rescheduled" class="nav-link" id="pills-rescheduled-tab" data-toggle="pill" role="tab" aria-controls="rescheduled">
              Rescheduled
            </a>
          </li>

        </ul>

        <div class="tab-content" id="myTabContent">

          <div class="tab-pane fade show active" id="completed_and_upcoming" role="tabpanel" aria-labelledby="completed_and_upcoming-tab">

            <a class="float--right text--black" href="#">Newest First</a>
            <span class="clearfix"></span>

            <div id="accordion" class="mt-xs">
              <div class="card">
                <div class="card-header py-xs" id="headingOne">
                  <span data-toggle="collapse" data-target="#collapseOne">
                    Dependant care plan: UnitedHealthCare compass Catastrophic ST INN pedeatric Dental Dep 30
                    <i class="fas fa-plus pointer float--right"></i>
                  </span>
                </div>

                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">

                   <table class="no--border">
                      <tr>
                        <td>Company Name:</td>
                        <td>Dimensions</td>
                      </tr>
                      <tr>
                        <td>Insured's ID number:</td>
                        <td>000</td>
                      </tr>
                      <tr>
                        <td>Insured's Name:</td>
                        <td>name</td>
                      </tr>
                      <tr>
                        <td>Email Address:</td>
                        <td>email@gmail.com</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>address...</td>
                      </tr>
                      <tr>
                        <td>City/State/Zip:</td>
                        <td>city</td>
                      </tr>
                      <tr>
                        <td>Phone Number:</td>
                        <td>000000</td>
                      </tr>
                      <tr>
                        <td>Policy Group or FECA Number:</td>
                        <td>164578</td>
                      </tr>
                      <tr>
                        <td>Birthdate:</td>
                        <td>23 Jul 1995</td>
                      </tr>
                      <tr>
                        <td>Plan or program name:</td>
                        <td>lorem dolor simit</td>
                      </tr>
                      <tr>
                        <td>Employer's or School Name:</td>
                        <td>Deep</td>
                      </tr>
                      <tr>
                        <td>Insurance Type:</td>
                        <td>Health Insurance</td>
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
                      <button class="btn btn--secondary btn--sm mr-xs">Edit</button>
                      <button class="btn btn--default btn--sm">Delete</button>
                    </div>

                  </div><!--card-body-->

                </div><!--collapse-->
              </div><!--card-->

            </div>

          </div><!--tab-pane-->

          <div class="tab-pane fade" id="pending" role="tabpanel" aria-labelledby="pending-tab">
            Pending
          </div><!--tab-pane-->

          <div class="tab-pane fade" id="missed" role="tabpanel" aria-labelledby="missed-tab">

            <table class="table table-striped">
              <tr>
                <th>Speciality</th>
                <th>Appointment Type</th>
                <th>Reason for visit</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Appointment Date & Time</th>
              </tr>

              <tr>
                <td>Dentist</td>
                <td>Consultation</td>
                <td>Bleeding Gum</td>
                <td>New york</td>
                <td>NY</td>
                <td>11010</td>
                <td>17 August, 2019
                  <br>
                  9:30am to 11:00am
                </td>
              </tr>

              <tr>
                <td>Dentist</td>
                <td>Consultation</td>
                <td>Bleeding Gum</td>
                <td>New york</td>
                <td>NY</td>
                <td>11010</td>
                <td>17 August, 2019
                  <br>
                  9:30am to 11:00am
                </td>
              </tr>

              <tr>
                <td>Dentist</td>
                <td>Consultation</td>
                <td>Bleeding Gum</td>
                <td>New york</td>
                <td>NY</td>
                <td>11010</td>
                <td>17 August, 2019
                  <br>
                  9:30am to 11:00am
                </td>
              </tr>

              <tr>
                <td>Dentist</td>
                <td>Consultation</td>
                <td>Bleeding Gum</td>
                <td>New york</td>
                <td>NY</td>
                <td>11010</td>
                <td>17 August, 2019
                  <br>
                  9:30am to 11:00am
                </td>
              </tr>

              <tr>
                <td>Dentist</td>
                <td>Consultation</td>
                <td>Bleeding Gum</td>
                <td>New york</td>
                <td>NY</td>
                <td>11010</td>
                <td>17 August, 2019
                  <br>
                  9:30am to 11:00am
                </td>
              </tr>

            </table>

          </div><!--tab-pane-->

          <div class="tab-pane fade" id="rescheduled" role="tabpanel" aria-labelledby="rescheduled-tab">

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

        </div><!--tab-content-->

      </div><!--card__body-->

    </div><!--card-->

    <div class="">
      <button class="btn btn--secondary">
        Add new Treatment
      </button>
    </div>


  </div>

</template>

<script>

export default {
    middleware:'auth'
}
</script>

<style lang="scss">

.user-profile-view-mode {

  // .tab-content {

  //   .tab-pane {

  //     .table {
  //       & > * {
  //         font-size:1.4rem;
  //       }
  //     }

  //     table, tr {
  //       border:0 !important;
  //     }

  //     tr:not(:first-child) {
  //         background: none !important;
  //     }

  //     tr:not(:last-child) {
  //         border-bottom:1px solid #f7f7f7 !important;
  //     }

  //     tr:first-child {
  //       border:0;
  //     }

  //     td:nth-child(even) {
  //       font-weight:500;
  //       color:#2E251D;
  //     }

  //     td {
  //       margin:0 !important;
  //     }

  //     .no--border {
  //       border:0;
  //       tr {
  //         border:0;
  //       }
  //     }


  //   }

  // }

  // .user-bio-section {

  //   tr {
  //     border:0 !important;
  //   }
  //   tr:not(:first-child) {
  //     background: none;
  //   }
  //   th, td, tr {
  //     padding:.7rem 1rem !important;
  //   }
  //   tr:first-child {
  //     color:inherit;
  //   }
  //   td:nth-child(even) {
  //     color:#222;
  //   }

  // }

  .nav {

    margin-bottom:1rem;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr !important;
    text-align:center;

  }

  .nav-pills {
    border-bottom:1px solid #f0f0f0 !important;
    &:focus {
      border:0 !important;
    }
  }

  .nav-link {
    color:#222;
    padding-bottom:1.5rem;
  }

  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color:#7fd6d6 !important;
    background:#fff;
    border-bottom:2px solid #7fd6d6;
  }

}

</style>
