<template>
  <div>
    <v-breadcrumbs :items="breadcrumbsItems" />
    <v-container
      fluid
    >
      <base-material-card
        icon=""
        title="Cuentas Bancarias"
      >
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              color="primary"
              absolute
              right
              v-bind="attrs"
              v-on="on"
              @click="createItem()"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Nueva Cuenta</span>
        </v-tooltip>

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

    <accountscreateoredit
      ref="accountscreateoredit"
      @loadInitialData="loadInitialData"
    />

    <confirm
      ref="confirm"
    />
  </div>
</template>

<script>
  // import config from '../../../config.json'
  // import axios from 'axios'
  import confirm from '../../shared/ConfirmDialog'
  import accountscreateoredit from './accounts-createOrEdit'
  export default {
    name: 'AccountList',

    components: {
      accountscreateoredit,
      confirm,
    },

    data: () => ({
      breadcrumbsItems: [
        {
          text: 'Mantenimiento',
          disabled: false,
          to: '/admin/maintenance',
        },
        {
          text: 'Listado de cuentas',
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
          text: 'Acciones', align: 'center', sortable: false, value: '',
        },
      ],
      bankAccounts: [],
      loading: false,
    }),

    methods: {

      loadInitialData () {
        console.log('loadinitdata')
      },

      createItem () {
        this.$refs.accountscreateoredit.show()
      },
    },

  }
</script>
