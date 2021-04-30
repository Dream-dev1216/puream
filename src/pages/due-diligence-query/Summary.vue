<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="display-1 my-2">
      <v-btn
        color="success"
        :loading="loadingStartPoint"
        :disabled="!myCompany || myCompany.is_completed || loadingStartPoint"
        @click="submitAll"
      >
        Submit
      </v-btn>
      <router-link to="/">
        <v-btn
          class="ml-3"
          color="primary"
        >
          Back
        </v-btn>
      </router-link>
    </div>

    <summary-table
      :loading="loadingAnswers"
      title="Due Diligence Summary"
      :answers="answers"
    >
    </summary-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SummaryTable from '../../components/SummaryTable'

export default {
  components: {
    SummaryTable
  },

  data() {
    return {
      headers: [
        { text: 'Topic', value: 'name' },
        { text: 'Actions', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      answers: (state) => state.subjects.answers,
      loadingAnswers: (state) => state.subjects.loadingAnswers,
      myCompany: (state) => state.companies.company,
      loadingStartPoint: (state) => state.subjects.loadingStartPoint
    })
  },

  async mounted() {
    this.getAnswers()
    await this.getCompany(this.user.company_id)
  },

  methods: {
    ...mapActions({
      getAnswers: 'subjects/getAnswers'
    }),

    ...mapActions('companies', ['submitCompany', 'getCompany']),

    submitAll() {
      this.submitCompany(this.user.company_id)
    }
  }
}
</script>
