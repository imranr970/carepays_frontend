<template>

  <main class="admin claim">

    <h4 class="heading-4 my-sm">Invoices Report</h4>

    <template v-if="loading">
      <div><i class="fas fa-spinner fa-spin-alt"></i></div>
    </template>

    <template v-else>

      <template v-if="invoice">

        <div class="card my-xs">
          <div class="card__body">

            <claim-basic-info :claimStatus="claimStatus" />

            <div class="row">

              <div class="col-md-6">

                <patient-info-edit v-if="isEditing('patientInfo')" @cancel="cancelEdit" />
                <patient-info-view v-else @edit="setEditing('patientInfo')" />

              </div>

              <div class="col-md-6">

                <patient-insurance-edit v-if="isEditing('patientInsurance')" @cancel="cancelEdit" />
                <patient-insurance-view v-else @edit="setEditing('patientInsurance')" />

              </div>

            </div>

            <hr>

            <icd-codes-edit v-if="isEditing('patientIcdCodes')" @cancel="cancelEdit" />
            <icd-codes-view v-else @edit="setEditing('patientIcdCodes')" />

            <div class="date my-sm text--dark">
              Date of service :
              <span v-if="hasOrder">
                {{AppDate(order.date_of_service, 'LL')}}
              </span>
            </div>

            <line-items-edit v-if="isEditing('patientLineItems')" @cancel="cancelEdit" />
            <line-items-view v-else @edit="setEditing('patientLineItems')" />


            <div class="float--right total-bill w--25">
              <table class="w--100 float--right claim-table">
                <tr>
                  <td>Totals:</td>
                  <td>{{totalCheckoutCost}}</td>
                  <td>{{totalDoctorAllowedAmount}}</td>
                  <td>$0</td>
                </tr>
              </table>
            </div>

            <span class="clearfix"></span>

            <hr>

            <p class="text--dark">Referring UPIN: NPI:</p>

            <billing-provider-edit v-if="isEditing('billingProvider')" @cancel="cancelEdit" />
            <billing-provider-view v-else @edit="setEditing('billingProvider')" />

            <rendering-provider-edit v-if="isEditing('renderingProvider')" @cancel="cancelEdit" />
            <rendering-provider-view v-else @edit="setEditing('renderingProvider')" />

            <facility-edit v-if="isEditing('facility')" @cancel="cancelEdit" />
            <facility-view v-else @edit="setEditing('facility')" />

            <div class="claim">

              <table class="my-xs claim-table" border="2">
                <tr class="t-head">
                  <td colspan="4" class="text--dark">Additional Information</td>
                </tr>
                <tr>
                  <td class="text--dark">Current Illness Date:</td>
                  <td></td>
                  <td>Same Illness Date:</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="text--dark">Hospitalization From:</td>
                  <td></td>
                  <td class="text--dark">Hospitalization To:</td>
                  <td></td>
                </tr>

                <tr>
                  <td class="text--dark">Unable to work From:</td>
                  <td></td>
                  <td class="text--dark">Unable to work From:</td>
                  <td></td>
                </tr>

                <tr>
                  <td class="text--dark">Outside Lab:</td>
                  <td>N</td>
                  <td class="text--dark">Outside Lab Charge:</td>
                  <td></td>
                </tr>

                <tr>
                  <td class="text--dark">Patient Signature:</td>
                  <td>Y</td>
                  <td class="text--dark">Patient Signed date:</td>
                  <td>Some date</td>
                </tr>

                <tr>
                  <td class="text--dark">Date Last Seen:</td>
                  <td>Y</td>
                  <td class="text--dark">Acute manifestation Date:</td>
                  <td></td>
                </tr>

                <tr>
                  <td class="text--dark">Payer Level:</td>
                  <td>P</td>
                  <td class="text--dark"></td>
                  <td></td>
                </tr>

              </table>

            </div>

            <hr>

            <h5><i class="fas fa-plus text--sm"></i> Claim History</h5>

            <button class="btn btn--secondary float--right" @click.prevent="submit" :disabled="claimStatus=='sent' || sending">Submit</button>

            <span class="clearfix"></span>

          </div>
        </div>

        <warning-alerts :status="status" :messages="messages" />

      </template>

      <template v-else>
        <p>No invoice found</p>
      </template>

    </template>


  </main>

</template>

<script>

  import axios from 'axios';
  import {mapActions, mapGetters} from 'vuex'
  import {makeid} from '@/plugins/logistics/uniqueIdGenerator';
  import claimBasicInfo from '@/components/admin/claim-basic-info'
  import patientInfoView from '@/components/admin/patient-info-view'
  import patientInfoEdit from '@/components/admin/patient-info-edit'
  import patientInsuranceView from '@/components/admin/patient-insurance-view'
  import patientInsuranceEdit from '@/components/admin/patient-insurance-edit'
  import icdCodesView from '@/components/admin/icd-codes-view'
  import icdCodesEdit from '@/components/admin/icd-codes-edit'
  import lineItemsView from '@/components/admin/line-items-view'
  import lineItemsEdit from '@/components/admin/line-items-edit'
  import billingProviderView from '@/components/admin/billing-provider-view'
  import billingProviderEdit from '@/components/admin/billing-provider-edit'
  import renderingProviderView from '@/components/admin/rendering-provider-view'
  import renderingProviderEdit from '@/components/admin/rendering-provider-edit'
  import facilityView from '@/components/admin/facility-view'
  import facilityEdit from '@/components/admin/facility-edit'
  import warningAlerts from '@/components/admin/warning-alerts'

  export default {

    name:'invoice_view',
    middelware:'auth',

    head() {
      return {
        title: '837 claim edit'
      }
    },

    components: {
      claimBasicInfo,
      patientInfoView,
      patientInfoEdit,
      patientInsuranceView,
      patientInsuranceEdit,
      icdCodesView,
      icdCodesEdit,
      lineItemsView,
      lineItemsEdit,
      billingProviderView,
      billingProviderEdit,
      renderingProviderView,
      renderingProviderEdit,
      facilityView,
      facilityEdit,
      warningAlerts
    },

    data() {

      return {
        invoice  : [],
        loading  : false,
        messages : [],
        status   : 0,
        claimStatus : 'hold',
        sending: false,
        editing: true,
        editingId: ''
      };

    },

    computed: {

      ...mapGetters('claims', {
        order: 'order',
        getCheckout: 'getCheckout',
        doctor: 'doctor',
        hasOrder: 'hasOrder',
        checkout: 'checkout',
        hasCheckout: 'hasCheckout',
        doctorTreatments: 'doctorTreatments',
        icds: 'icds'
      }),

      ...mapGetters('cart', {
        amountPayable: 'amountPayable'
      }),

      totalCheckoutCost() {
        if(this.hasCheckout) {
          return this.formatter(this.checkout.map(checkout => this.amountPayable(checkout))
          .reduce((acc, value) => acc + value))
        }
      },

      totalDoctorAllowedAmount() {
        if(this.hasCheckout) {
          return this.formatter(this.checkout.map(checkout => this.doctorTreatments(checkout.id).avg_medicare_allowed_amount)
          .reduce((acc, value) => acc + value))
        }
      }

    },

    methods: {

      ...mapActions('claims', {
        fillInvoice: 'fillInvoice'
      }),

      isEditing(id) {
        return this.editing && this.editingId === id
      },

      setEditing(id) {
        this.editingId = id
        this.editing = true
      },

      cancelEdit() {
        this.editing = false
        this.editingId = ''
      },

      async getInvoiceReport() {

        this.loading = true;
        await axios.get(`${process.env.api.baseURL}/reports/invoices/${this.$route.params.id}`)
        .then(({data}) => {

          if(!Object.entries(data).length) {
            this.$router.push({name:'admin'})
            return
          }

          this.invoice = data;
          this.fillInvoice(data);
          this.loading = false;
          this.getClaimIfExists(data);

        })
        .catch((err) => {

          this.loading = false;

        });

      },


      claimIsSent() {
        return this.claimStatus == 'sent' ? true : false;
      },

      async submit() {

        this.status = null;
        this.messages = [];
        this.sending = true;

        if(this.claimIsSent()) {
          return false;
        }

        let senderId = makeid(4);
        let receiverId = makeid(4);
        let claimId = makeid(9, 'numeric').toString();

        let response = {
          "Authorization Information Qualifier" : "00",
          "Authorization Information" : "          ",
          "Security Information Qualifier" : "00",
          "Security Information" : "          ",
          "Interchange ID Qualifier" : "ZZ",
          "Interchange Sender ID" : `${senderId}           `,
          "Interchange Receiver ID" : `${receiverId}           `,
          "Interchange Date" : this.$moment().format(''),
          "Interchange Time" : this.$moment().format('HHmm'),
          "Interchange Control Standards Identifier" : '^',
          "Interchange Control Version Number" : '00501',
          "Interchange Control Number" : makeid(9, 'numeric').toString(),
          "Acknowledgment Requested" : '0',
          "Usage Indicator" : 'T',
          "Component Element Separator" :  ':',
          "Functional Identifier Code" : "HC",
          "Application Senders Code" : `${senderId}`,
          "Application Receivers Code": `${receiverId}`,
          "Date" : this.$moment().format('YYYYMMDD'),
          "Time" : this.$moment().format('HHmm'),
          "Group Control Number" : "1",
          "Responsible Agency Code" : "X",
          "Version / Release / Industry Identifier Code" : "005010X222A1",
          "Transaction Set Identifier Code" : "837",
          "Transaction Set Control Number" : "0021",
          "Implementation Convention Reference" : "005010X222A1",
          "Hierarchical Structure Code" : "0019",
          "Transaction Set Purpose Code" : "00",
          "Originator Application Transaction Identifier" : claimId,
          "Transaction Set Creation Date" : this.$moment().format('YYYYMMDD'),
          "Transaction Set Creation Time" : this.$moment().format('HHmm'),
          "Claim or Encounter Identifier" : "CH",
          "submitter" : {
            "Entity Identifier Code" : "41",
            "Entity Type Qualifier" : "2",
            "Name"  : process.env.appName,
            "Identification Code Qualifier" : "46",
            "Identification Code" : `${this.doctor(this.checkout[0].id).id}`, //submitter id,
            "Contact Function Code" : 'IC',
            "Submitter Contact Name" : process.env.appOwner.name,
            "Communication Number Qualifier" : 'TE',
            "Communication Number" : `${process.env.appOwner.phone}`
          },
          "receiver" : {
            "Entity Identifier Code"  : "40",
            "Entity Type Qualifier" : "2",
            "Name" : this.insurance.company_name,
            "Identification Code Qualifier" : "46",
            "Identification Code" : makeid(2, 'numeric').toString()
          },
          "billing_provider" : {
            "Hierarchical ID Number" : "1",
            "Hierarchical Parent ID Number" : "",
            "Hierarchical Level Code" : "20",
            "Hierarchical Child Code" : "1",
            "Entity Identifier Code" :"85",
            "Entity Type Qualifier" :  "1",
            "Name": this.doctor(this.checkout[0].id).first_name,
            "First Name": this.doctor(this.checkout[0].id).first_name,
            "Middle Name": this.doctor(this.checkout[0].id).middle_name_initial,
            "Identification Code Qualifier" : "XX",
            "Identification Code": `${this.doctor(this.checkout[0].id).npi}`,
            "Address Line" : `${this.checkout[0].doctor_address.street_address1}`,
            "City": `${this.checkout[0].doctor_address.city}`,
            "State": `${this.checkout[0].doctor_address.state}`,
            "Zip": `${this.checkout[0].doctor_address.zip_code}`,
            "Identification Qualifier" :"EI",
            "Identification" : `${this.doctor(this.checkout[0].id).id}`
          },

          "Provider Code" : "BI",
          "Reference Identification Qualifier" : "PXC",
          "Provider Taxonomy Code" : `${this.doctor(this.checkout[0].id).doctor_taxonomy_codes[0]}` || "203BF0100Y",
          "referring provider secondary identifier" : "17312345600006351",
          "hierarchical parent ID number" : "2",
          "payer responsibility sequence number code" : "P",
          "insured group or policy number" : `${this.insurance.policy_number}`,
          "claim filing indicator code" : "CI",
          "name first" : "TED",
          "date time Period format qualifier" : "D8",
          "patient birth date" : this.usersFormattedDob,
          "patient gender code" : this.user.gender == 1 ? 'M' : 'F',
          "individual relationship code" : "19",
          "Total Claim Charge Amount" : `${this.totalCheckoutCost}`,
          "Provider or Supplier Signature Indicator" : "Y",
          "Assignment or Plan Participation Code" : "A",
          "Benefits Assignment Certification Indicator" : "Y",
          "Release of Information Code" : "Y",

          "Transaction Segment Count" : "",
          "Number of Transaction Sets Included" : "1",
          "Number of Included Functional Groups" : "1",

          "subscriber": {
            "Hierarchical ID Number": "2",
            "Hierarchical Parent ID Number": "1",
            "Hierarchical Level Code": "22",
            "Hierarchical Child Code": "0",

            "Entity Identifier Code" :"IL",
            "Entity Type Qualifier" :  "1",
            "Name": this.user.first_name + ' ' + this.user.last_name,
            "First Name": this.user.first_name,
            "Middle Name": this.user.middle_name || "",
            "Identification Code Qualifier" : "MI",
            "Identification Code": makeid(9, 'numeric').toString(),
            "Address Line" : this.user.address.address != null ? `${this.user.address.address.substr(0, 55)}` : '',
            "City": this.user.address.user_city != null ? `${this.user.address.user_city}` : '',
            "State": this.user.address.user_state != null ? `${this.user.address.user_state}` : '',
            "Zip": this.user.address.zipcode != null ? `${this.user.address.zipcode}` : '',

            "Identification Qualifier" :"SY",
            "Identification" : this.insurance.insured_ssn

          },

          "Payer Responsibility Sequence Number Code": "P",
          "Individual Relationship Code": "18",
          "Subscriber Group or Policy Number": "2222-SV",
          "Claim Filing Indicator Code": "CI",

          "Date Time Period Format Qualifier": "D8",
          "Subscriber Birth Date": this.$moment().format('YYYYMMDD'),
          "Subscriber Gender Code": "M",


          "payer": {
            "Entity Identifier Code" : "PR",
            "Entity Type Qualifier" :"2",
            "Name" : this.insurance.company_name,
            "Identification Code Qualifier" : "PI",
            "Identification Code" : `${this.insurance.payer_id}`
          },

          "Claim ID": claimId,

        };

        let diagnoses = this.icdsForResponse();
        response['diagnoses'] = diagnoses;
        response['no_of_proc'] = this.checkout.length;

        let cpts = this.cptsForResponse();
        response['proc'] = cpts;

        await this.$axios.post(`${process.env.api.ediURL}`, {
          ...response
        })
        .then(({data}) => {

          if(data.result == 'Success' && data.Status == 1) {
            this.status = 1;
            this.saveClaim(response);
            this.markOrderComplete();
          }
          else {
            this.status = 0;
            let result = data.result;

            if(typeof result == 'string' && result.toLowerCase() == 'something wrong') {
              this.messages.push(data.result);
            }
            else {
              this.messages.push(...data.result);
            }
          }
          this.sending = false;

        })
        .catch((err) => {
          this.sending = false;
        });

      },

      icdsForResponse() {
        let diagnoses = {};
        if(this.hasCheckout && this.icds) {

          this.icds.forEach((icd, index) => {
            let code = index == 0 ? 'BK' : 'BF';
            let indexKey = index + 1;
            let key = indexKey < 10 ? '0' + indexKey : indexKey.toString();

            diagnoses[(index+1).toString()] = {
              id:key,
              code:code,
              dx:icd.icd_code
            };

          });

        }
        let diagnose = [];
        diagnose.push(diagnoses);
        return diagnose;
      },

      cptsForResponse() {

        let cpts = {};
        if(this.hasCheckout()) {

          this.checkout.forEach((checkout, index) => {

            cpts[(index+1).toString()] = {
              "cpt": checkout.cpt,
              "qualifier" : "HC",
              "mod1": "",
              "mod2": "",
              "mod3": "",
              "mod4": "",
              "charge_amount": checkout.average_cost.toString(),
              "unit_qualifier": "UN",
              "units": "4",
              "dx1": "1",
              "dx2": "2",
              "dx3": "3",
              "dx4": "4",
              "date_qualifier": "472",
              "date_format": "D8",
              "date":this.$moment().format('YYYYMMDD')
            };

          });

        }
        let wrapper = [];
        wrapper.push(cpts);
        return wrapper;
      },

      async saveClaim(response) {

        await this.$axios.post(`claim/create`, {

          claim_id : response["Claim ID"],
          order_id : this.order.id,
          user_id : this.user.id,
          provider_id : this.doctor(this.checkout[0].id).id,
          patient_insurance_id : this.insurance.id,
          date_of_service : this.order.date_of_service,
          claim_status : 'sent',
          claim_time : this.$moment().format('HH:mm:SS'),
          transaction_date : this.$moment().format('HH:mm:SS'),
          transaction_time : this.$moment().format('YYYY-MM-DD'),
          interchange_date : this.$moment().format('YYYY-MM-DD'),
          interchange_time : this.$moment().format('HH:mm:SS'),
          submitter_entity_identifier_code : response["submitter"]["Entity Identifier Code"],
          submitter_name  : response["submitter"]["Name"],
          submitter_contact_name : response["submitter"]["Submitter Contact Name"],
          submitter_communication_number : response["submitter"]["Communication Number"],
          receiver_entity_identifier_code : response["receiver"]["Entity Identifier Code"],
          receiver_name : response["receiver"]["Name"],
          receiver_identification_code : response["receiver"]["Identification Code"],
          total_claim_charge_amount : this.totalCheckoutCost,
          no_of_proc : response["no_of_proc"],
          no_of_dx : this.icds.length,
          claim_treatments: response["proc"],
          diagnoses: response["diagnoses"]

        })
        .then((res) => {
          this.claimStatus = 'sent';
        })

      },

      async markOrderComplete() {

        await this.$axios.post(`order/complete/${this.order.id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.claimStatus = 'hold';
        });

      },

      async getClaimIfExists(data = []) {

        await this.$axios.post('auth/claim', {
          doctor_id : this.doctor(this.checkout[0].id).id,
          order_id  : this.order.id
        })
        .then(({data}) => {
          if(data && data.hasOwnProperty('claim_status')) {
            this.claimStatus = data.claim_status
          }
        });

      }

    },

    created() {

      this.getInvoiceReport();

    }

  }

</script>

<style lang="scss">

  .claim {

    &-table {
      border-collapse: collapse;

      &, tr, td {
        border: 2px solid #ccc;
      }

      th, td, tr {
        padding: .5rem !important;
      }

      tr:not(:first-child) {
        background: #fff;
      }

      .t-head {
        background: #ccc !important;
      }

      textarea, input, select {
        font-size:13px;
        resize:none;
      }

    }

    a {
      &,
      &:link,
      &:visited {
        color:#222;
      }
      &:hover {
        color: #333;
      }
    }

    hr {
      border-bottom:3px solid #222;
    }

    .text--dark {
      font-weight: bold !important;
      color:#222;
    }

    thead {
      tr {
        td {
          color:#222 !important;
          font-weight:700 !important;
        }
      }
    }

    .total-bill {
      font-weight: bold;
      border-top:3px solid #222;
      padding-top:.6rem;
      display:block;
      margin-bottom:1rem;
    }
    .facility-table {
      width:40rem;
    }


  }
</style>
