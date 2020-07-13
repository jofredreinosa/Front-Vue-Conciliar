<template>
  <div>
    <v-breadcrumbs :items="breadcrumbsItems" />
    <v-container
      fluid
    >
      <base-material-card
        icon=""
        title="Consulta de Saldos"
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar..."
          hide-details
          style="width:30%;"
        />

        <v-data-table
          dense
          :headers="headers"
          :items="bankAccounts"
          :search="search"
          :loading="loading"
          height="220px"
          class="mt-5"
        />
      </base-material-card>
    </v-container>
  </div>
</template>

<script>
  import config from '../../../config.json'
  import axios from 'axios'

  export default {
    name: 'AccountBalanceList',

    data: () => ({
      breadcrumbsItems: [
        {
          text: 'Panel',
          disabled: false,
          to: '/',
        },
        {
          text: 'Consulta de Saldos',
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
          text: 'Saldo', align: 'center', sortable: false, value: 'accountBalance',
        },
      ],
      bankAccounts: [],
      loading: false,
    }),

    mounted () {
      this.loadInitialData()
    },

    methods: {

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

    },

  }
</script>
