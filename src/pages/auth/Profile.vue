<template>
  <div>
    <v-card class="pa-12 mx-12 mt-12" width="600">
      <v-card-title class="justify-center display-1 mb-2">Profile</v-card-title>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="form.name"
            placeholder="User Name"
            name="username"
            label="Username"
            :rules="nameRules"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            placeholder="Email"
            name="email"
            label="Email"
            type="email"
            :rules="emailRules"
            outlined
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            block
            color="primary"
            large
            class="mt-4"
            @click="saveProfile"
          >Save</v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign In Page Component
|---------------------------------------------------------------------
|
| Sign in template for user authentication into the application
|
*/
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      // form
      isFormValid: true,
      nameRules: [
        function(v) {
          return !!v || 'Name is required'
        },
        function(v) {
          return (v && v.length >= 5) || 'Name must be more than 5 characters'
        }
      ],
      emailRules: [
        function(v) {
          return !!v || 'E-mail is required'
        },
        function(v) {
          return /.+@.+\..+/.test(v) || 'E-mail must be valid'
        }
      ],
      form: {
        email: '',
        password: '',
        company: null
      },

      // form error
      error: false,

      errorProvider: false,
      errorProviderMessages: '',

      // show password field
      showPassword: false
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.button_loading,
      user: (state) => state.auth.user,
      companies: (state) => state.companies.companies,
      loadingCompanies: (state) => state.companies.loadingCompanies
    }),
    companyItems() {
      return [{
        label: 'First',
        value: 1
      }]
    }
  },
  mounted() {
    this.form.email = this.user.email
    this.form.name = this.user.name
    this.form.company = this.user.company_id
    this.getCompanies()
  },
  methods: {
    ...mapActions({
      getCompanies: 'companies/getCompanies',
      updateProfile: 'auth/updateProfile'
    }),

    saveProfile() {
      if (!this.isFormValid)
        return
      this.updateProfile(this.form)
    }
  }
}
</script>