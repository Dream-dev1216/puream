<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div class="display-1">Create New Company</div>
    </div>
    <div class="d-flex flex-column flex-sm-row">
      <v-row dense>
        <v-col cols="12" md="6">
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-form ref="companyForm" v-model="isCompanyFormValid" lazy-validation @submit.prevent="submit">
              <div class="mb-1">Company Name</div>
              <v-text-field
                v-model="companyForm.name"
                :rules="[$rules.required]"
                dense
                outlined
                placeholder="Company Name"
              >
              </v-text-field>

              <div>Private or Public?</div>
              <v-radio-group
                v-model="companyForm.private"
                row
              >
                <v-radio
                  label="Private"
                  value="private"
                ></v-radio>
                <v-radio
                  label="Public"
                  value="public"
                ></v-radio>
              </v-radio-group>

              <div class="mb-1">Add Due Diligence Manager(s)</div>
              <v-form ref="managerForm" v-model="isManagerFormValid" lazy-validation @submit.prevent="">
                <div v-for="(manager, i) in managers" :key="i">
                  <v-text-field
                    v-model="manager.first_name"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager First Name"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="manager.last_name"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager Last Name"
                  >
                  </v-text-field>
                  <!-- <v-text-field
                    v-model="manager.name"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager Name"
                  >
                  </v-text-field> -->
                  <v-text-field
                    v-model="manager.email"
                    :rules="[$rules.required, $rules.emailFormat]"
                    dense
                    outlined
                    placeholder="Manager Email"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="manager.mobile"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager Mobile Number"
                    @keypress="onlyNumber"
                  >
                  </v-text-field>

                  <v-divider></v-divider>
                </div>
                <div>
                  <v-text-field
                    v-model="managerForm.first_name"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager First Name"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="managerForm.last_name"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager Last Name"
                  >
                  </v-text-field>
                  <!-- <v-text-field
                    v-model="managerForm.name"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager Name"
                  >
                  </v-text-field> -->
                  <v-text-field
                    v-model="managerForm.email"
                    :rules="[$rules.required, $rules.emailFormat]"
                    dense
                    outlined
                    placeholder="Manager Email"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="managerForm.mobile"
                    :rules="[$rules.required]"
                    dense
                    outlined
                    placeholder="Manager Mobile Number"
                    @keypress="onlyNumber"
                  >
                  </v-text-field>
                </div>
                <a @click.prevent="addAnotherManager">Add another</a>
              </v-form>
              <div class="mt-2">
                <v-btn
                  type="submit"
                  color="primary"
                  :loading="creatingCompanies"
                >Create Company</v-btn>
              </div>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      companyForm: {
        name: '',
        private: 'private'
      },

      managerForm: {
        name: '',
        first_name: '',
        last_name: '',
        mobile: '',
        email: ''
      },

      managers: [],

      isCompanyFormValid: true,
      isManagerFormValid: true
    }
  },
  computed: {
    ...mapState({
      creatingCompanies: (state) => state.companies.loadingCompanies,
      companies: (state) => state.companies.companies
    })
  },
  mounted() {
  },
  methods: {
    onlyNumber ($event) {
      console.log($event.keyCode) //keyCodes value
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which)
      
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault()
      }
    },
    ...mapActions({
      createCompany: 'companies/createCompany'
    }),
    submit() {
      if (this.$refs.companyForm.validate()) {
        if (this.$refs.managerForm.validate()) {
          this.managerForm.name = this.managerForm.first_name + ' ' + this.managerForm.last_name
          const managers = this.managers.concat([this.managerForm])

          this.createCompany({
            name: this.companyForm.name,
            private: this.companyForm.private,
            managers
          })
        }
      }
    },

    addAnotherManager() {
      if (this.$refs.managerForm.validate()) {
        this.managers.push(this.managerForm)
        this.managerForm = {
          name: '',
          first_name: '',
          last_name: '',
          mobile: '',
          email: ''
        }
        this.$refs.managerForm.resetValidation()
      }
    }
  }
}
</script>
