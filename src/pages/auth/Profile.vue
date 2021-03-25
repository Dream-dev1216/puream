<template>
  <div>
    <v-card class="pa-12 mx-12 mt-12">
      <v-card-title class="justify-center display-1 mb-2">Profile</v-card-title>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            :value="user.name"
            placeholder="User Name"
            name="username"
            label="Username"
            outlined
          ></v-text-field>
          <v-text-field
            :value="user.email"
            placeholder="Email"
            name="email"
            label="Email"
            outlined
          ></v-text-field>

          <v-text-field
            :value="user.company != null ? user.company.name : ''"
            placeholder="Company"
            name="company"
            label="Company"
            outlined
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            block
            color="primary"
            large
            class="mt-4"
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
      email: '',
      password: '',

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
      user: (state) => state.auth.user
    })
  },
  mounted() {
    console.log(this.user)
  },
  methods: {
  }
}
</script>