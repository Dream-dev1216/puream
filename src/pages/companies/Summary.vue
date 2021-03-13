<template>
  <div class="d-flex flex-column flex-grow-1">
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
      answers: (state) => state.subjects.answers,
      loadingAnswers: (state) => state.subjects.loadingAnswers
    })
  },

  mounted() {
    this.getCompanyAnswers(this.$route.params.id)
    this.getCompany(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getCompanyAnswers: 'subjects/getCompanyAnswers',
      getCompany: 'companies/getCompany'
    })
  }
}
</script>
