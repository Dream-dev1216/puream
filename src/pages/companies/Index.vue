<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-row dense justify="center">
      <v-col cols="12" md="8">
        <div class="d-flex align-center py-3">
          <div class="display-1">Dashboard</div>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="add" :append="true">
            Create New
          </v-btn>
        </div>

        <v-card>
          <v-data-table
            :headers="headers"
            :items="companies"
            class="flex-grow-1"
            hide-default-footer
            :loading="loadingCompanies"
          >
            <template v-slot:item.is_completed="{ item }">
              <div>
                <template v-if="item.is_completed == 1 || item.is_completed == '1'">
                  Completed
                </template>
                <v-btn
                  v-else
                  depressed
                  color="primary"
                  @click="onConfirmClicked(item)"
                >
                  Confirm
                </v-btn>
              </div>
            </template>
            <template v-slot:item.action="{ item }">
              <div class="actions">
                <v-btn icon @click="gotoSummary(item.id)">
                  <v-icon small>mdi-open-in-new</v-icon>
                </v-btn>
                <v-btn icon @click="onDeleteClicked(item)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
        <v-dialog
          v-model="confirmDelDialog"
          width="500"
        >
          <v-card>
            <v-card-title class="grey lighten-2">
              Confirm
            </v-card-title>

            <v-card-text>
              <div class="text-center py-2">Are you sure?</div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="confirmDelDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                :disabled="deletingCompany"
                :loading="deletingCompany"
                @click="confirmDeleteCompany"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="completeDialog"
          width="500"
        >
          <v-card>
            <v-card-title class="grey lighten-2">
              Confirm
            </v-card-title>

            <v-card-text>
              <div class="text-center py-2">Are you sure?</div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="completeDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                :disabled="completingCompany"
                :loading="completingCompany"
                @click="confirmCompleteCompany"
              >
                Complete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      headers: [
        { text: 'Company Name', value: 'name' },
        { text: 'DD Completed', value: 'is_completed' },
        { text: 'Actions', sortable: false, align: 'right', value: 'action' }
      ],
      confirmDelDialog: false,
      index: -1,
      deletingCompany: false,

      completeIndex: -1,
      completeDialog: false,
      completingCompany: false
    }
  },
  computed: {
    ...mapState({
      companies: (state) => state.companies.companies,
      loadingCompanies: (state) => state.companies.loadingCompanies
    })
  },
  mounted() {
    this.getCompanies()
  },
  methods: {
    ...mapActions({
      getCompanies: 'companies/getCompanies',
      deleteCompany: 'companies/deleteCompany',
      updateCompany: 'companies/updateCompany'
    }),

    gotoSummary(id) {
      this.$router.push({
        name: 'companies-summary',
        params: {
          id
        }
      })
    },

    onConfirmClicked(item) {
      this.completeIndex = item.id
      this.completeDialog = true
    },

    async confirmCompleteCompany() {
      this.completingCompany = true

      try {
        const response = await this.updateCompany({
          id: this.completeIndex,
          is_completed: true
        })

        this.completeDialog = false
        this.getCompanies()
      } catch (err) {
        console.log(err)
      } finally {
        this.completingCompany = false
      }
    },

    onDeleteClicked(item) {
      this.index = item.id
      this.confirmDelDialog = true
    },

    async confirmDeleteCompany() {
      this.deletingCompany = true

      try {
        const response = await this.deleteCompany(this.index)

        this.confirmDelDialog = false
        this.getCompanies()
      } catch (err) {
        console.log(err)
      } finally {
        this.deletingCompany = false
      }
    }
  }
}
</script>
