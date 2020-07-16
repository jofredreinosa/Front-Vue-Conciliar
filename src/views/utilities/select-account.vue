<template>
  <div>
    <v-breadcrumbs :items="breadcrumbsItems" />
    <v-container
      fluid
    >
      <v-row dense>
        <v-col
          cols="12"
          class="mt-n3"
        >
          <p>
            <span
              class="headline ml-2"
            >
              Cuenta Seleccionada:
            </span>
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
            </span>
          </p>
        </v-col>
      </v-row>

      <base-material-card
        icon=""
        title="Cuentas Bancarias"
        class="mt-1"
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar..."
          hide-details
          style="width:30%;"
        />
        <v-data-table
          :headers="headers"
          :items="bankAccounts"
          :search="search"
          :loading="loading"
          height="220px"
          class="mt-5"
        >
          <template
            v-slot:item.select="{ item }"
          >
            <v-icon
              size="30"
              dark
              class="mr-8"
              color="info"
              @click="selectItem(item)"
            >
              mdi-check-circle
            </v-icon>
          </template>
        </v-data-table>
      </base-material-card>
    </v-container>

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

    <confirm
      ref="confirm"
    />
  </div>
</template>

<script>
  import confirm from '../shared/ConfirmDialog'
  import config from '../../config.json'
  import axios from 'axios'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'AccountList',

    components: {
      confirm,
    },

    data: () => ({
      breadcrumbsItems: [
        {
          text: 'Utilidades',
          disabled: false,
          to: '/utilities/utilitiesmenu',
        },
        {
          text: 'Seleccionar Cuenta',
          disabled: true,
          to: '',
        },
      ],
      search: '',
      headers: [
        {
          text: 'Nombre Cuenta', align: 'start', sortable: true, value: 'accountName',
        },
        {
          text: 'Nro Cta', align: 'start', sortable: true, value: 'accountNumber',
        },
        {
          text: 'Tipo de Cuenta', align: 'start', sortable: true, value: 'accountType',
        },
        {
          text: 'Tipo de Banco', align: 'start', sortable: true, value: 'accountBankType',
        },
        {
          text: 'Seleccionar', align: 'center', sortable: false, value: 'select',
        },
      ],
      bankAccounts: [],
      loading: false,
      snackShow: false,
      snackText: '',
      snackColor: '',
      snackTimeOut: 3500,
    }),

    computed: mapGetters(['getActualSelectedAccount']),

    mounted () {
      this.loadInitialData()
    },

    methods: {

      ...mapMutations({
        setActualAccount: 'SET_ACTUAL_ACCOUNT',
      }),

      loadInitialData () {
        const url = config.API_ENDPOINT + 'accounts'
        this.loading = true
        axios.get(url).then((result) => {
          if (result.data.success) {
            this.loading = false
            this.bankAccounts = result.data.data
          } else {
            this.loading = false
          }
        }).catch((error) => {
          this.loading = false
          // eslint-disable-next-line no-console
          console.log(error)
        })
      },

      async selectItem (rowData) {
        const message = {
          title: rowData.accountName + ' - ' + rowData.accountNumber,
          subtitle: '¿Desea seleccionar esta cuenta para su espacio de trabajo actual?',
        }
        const options = {
          color: 'success',
          confirmText: 'Si, seleccionar',
          cancelText: 'No, cerrar',
          width: 550,
        }
        if (await this.$refs.confirm.open('Seleccionar Cuenta', message, options)) {
          this.setActualAccount(rowData)
          this.snackText = 'Cuenta seleccionada con éxito'
          this.snackColor = 'success'
          this.snackShow = true
        }
      },
    },

  }
</script>
