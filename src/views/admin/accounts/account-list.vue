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
        >
          <template
            v-slot:item.actions="{ item }"
          >
            <v-icon
              small
              dark
              class="mr-8"
              color="info"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>

            <v-icon
              small
              dark
              color="error"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
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
  import confirm from '../../shared/ConfirmDialog'
  import accountscreateoredit from './accounts-createOrEdit'
  import config from '../../../config.json'
  import axios from 'axios'

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
          text: 'Acciones', align: 'center', sortable: false, value: 'actions',
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

      createItem () {
        this.$refs.accountscreateoredit.show()
      },

      editItem (rowData) {
        const item = rowData
        this.$refs.accountscreateoredit.show(item)
      },

      async deleteItem (rowData) {
        const message = {
          title: '¿Seguro de Eliminar esta cuenta?',
          subtitle: rowData.accountName + ' - ' + rowData.accountNumber,
        }
        if (await this.$refs.confirm.open('Eliminar', message, { color: 'error', confirmText: 'Si, eliminar', cancelText: 'No, cerrar' })) {
          const url = config.API_ENDPOINT + 'accounts/' + rowData._id
          this.loading = true
          axios.delete(url).then((result) => {
            if (result.data.success) {
              this.loading = false
              this.snackText = result.data.message
              this.snackColor = 'success'
              this.snackShow = true
              this.loadInitialData()
            } else {
              this.loading = false
              this.snackText = result.data.message
              this.snackColor = 'error'
              this.snackShow = true
            }
          }).catch((error) => {
            this.loading = false
            this.snackText = error
            this.snackColor = 'error'
            this.snackShow = true
          })
        } else {
          // cancel
        }
      },
    },

  }
</script>
