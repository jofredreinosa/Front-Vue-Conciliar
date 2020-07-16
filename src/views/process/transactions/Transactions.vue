<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-breadcrumbs :items="breadcrumbsItems" />
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Registrar Transacciones de Libros
            </div>

            <div class="subtitle-1 font-weight-light">
              Cuenta:
              <span
                v-if="getActualSelectedAccount.accountName"
                class="ml-2"
              >
                {{ getActualSelectedAccount.accountName }} -
                {{ getActualSelectedAccount.accountNumber }}
              </span>
              <span
                v-else
                class="ml-2"
              >
                No hay ninguna cuenta seleccionada
                <span
                  class="ml-2 item-link"
                  @click="selectAccount()"
                >
                  Click aquí para seleccionar una
                </span>
              </span>
            </div>
          </template>

          <v-form
            id="form"
            ref="form"
            v-model="valid"
            autocomplete="off"
          >
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-autocomplete
                    ref="transactionType"
                    v-model="form.transactionType"
                    :items="transactionTypes"
                    return-object
                    label="Tipo de Transacción"
                    item-text="description"
                    :rules="codeRules"
                    autofocus
                    outlined
                    dense
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                >
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateFormatted"
                        dense
                        label="Fecha de transacción"
                        hint="DD/MM/YYYY"
                        persistent-hint
                        :rules="dateRules"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        outlined
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      @input="menu1 = false"
                    />
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    v-model="form.transactionNumber"
                    dense
                    label="N° de Documento"
                    class="purple-input"
                    :rules="numberRules"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  class="text-right"
                >
                  <v-text-field
                    v-model="form.transactionAmount"
                    dense
                    label="Monto"
                    :rules="amountRules"
                    class="purple-input text-right"
                    type="number"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="form.transactionMotive"
                    dense
                    label="Detalle de transacción"
                    :rules="motiveRules"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    :loading="saving"
                    :disabled="saving"
                    @click="save"
                  >
                    <v-icon>mdi-content-save</v-icon>
                    <span class="ml-2">Registrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackShow"
      :timeout="snackTimeOut"
      :color="snackColor"
    >
      {{ snackText }}

      <template
        v-slot:action="{ attrs }"
      >
        <v-btn
          color="accent"
          text
          v-bind="attrs"
          @click="snackShow = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import router from '../../../router'
  import config from '../../../config.json'
  import axios from 'axios'

  export default {
    data: (vm) => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      transactionTypes: [],
      form: {
        accountId: null,
        transactionType: null,
        transactionDate: null,
        transactionNumber: null,
        transactionMotive: null,
        transactionAmount: 0,
      },
      valid: false,
      breadcrumbsItems: [
        {
          text: 'Procesos',
          disabled: false,
          to: '/process/processmenu',
        },
        {
          text: 'Registrar transacciones en libros',
          disabled: true,
          to: '',
        },
      ],
      codeRules: [
        v => !!v || 'Tipo es obligatorio',
      ],
      dateRules: [
        v => !!v || 'La fecha es obligatoria',
      ],
      numberRules: [
        v => !!v || 'El número de transacción es obligatorio',
      ],
      amountRules: [
        v => !!v || 'El monto debe ser diferente de cero',
        v => (!!v && v !== '0') || 'El monto debe ser diferente de cero',
      ],
      motiveRules: [
        v => !!v || 'La descripción es obligatoria',
      ],
      saving: false,
      snackShow: false,
      snackText: '',
      snackColor: '',
      snackTimeOut: 4500,
    }),

    computed: mapGetters(['getActualSelectedAccount']),
    computedDateFormatted () {
      return this.formatDate(this.date)
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    mounted () {
      this.loadInitialData()
    },

    methods: {
      loadInitialData () {
        const url = config.API_ENDPOINT + 'transactiontypes'
        this.loading = true
        axios.get(url).then((result) => {
          if (result.data.success) {
            this.loading = false
            this.transactionTypes = result.data.data
          }
        }).catch((error) => {
          this.loading = false
          // eslint-disable-next-line no-console
          console.log(error)
        })
      },

      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
        // return `${month}/${day}/${year}`
      },

      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

      selectAccount () {
        router.push({ path: '/utilities/selectaccount' })
      },

      save () {
        if (this.$refs.form.validate() && this.getActualSelectedAccount.accountName) {
          this.saving = true
          this.form.transactionDate = this.date
          this.form.accountId = this.getActualSelectedAccount._id
          const url = config.API_ENDPOINT + 'transactions'
          axios.post(url, this.form).then((result) => {
            this.saving = false
            if (result.data.success) {
              this.saving = false
              this.snackText = result.data.message
              this.snackColor = 'success'
              this.snackShow = true
              this.clearForm()
            } else {
              this.snackText = result.data.message
              this.snackColor = 'error'
              this.snackShow = true
            }
          }).catch((error) => {
            this.saving = false
            this.snackText = error
            this.snackColor = 'error'
            this.snackShow = true
          })
        } else {
          if (!this.getActualSelectedAccount.accountName) {
            this.snackText = 'Debe seleccionar una cuenta para registrar una transacción'
            this.snackColor = 'warning'
            this.snackShow = true
          }
        }
      },

      clearForm () {
        this.$refs.form.reset()
        this.date = new Date().toISOString().substr(0, 10)
        this.$refs.transactionType.focus()
      },
    },

  }
</script>

<style scoped>
  .item-link {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
