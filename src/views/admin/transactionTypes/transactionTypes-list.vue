<template>
  <div>
    <v-breadcrumbs :items="breadcrumbsItems" />
    <v-container
      fluid
    >
      <base-material-card
        icon=""
        title="Tipos de Transacción"
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
          <span>Nuevo Tipo de Transacción</span>
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
          :items="transactionTypes"
          :search="search"
          :loading="loading"
          height="220px"
          class="mt-5"
        >
          <template v-slot:item.type="{ item }">
            <span
              v-show="item.type == 1"
              class="text-blue"
            >
              CRÉDITO (+)
            </span>
            <span
              v-show="item.type == 0"
              class="text-red"
            >
              DÉBITO (-)
            </span>
          </template>

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
            color="blue"
            text
            v-bind="attrs"
            @click="snackShow = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>

    <transactiontypecreateoredit
      ref="transactiontypecreateoredit"
      @loadInitialData="loadInitialData"
    />
    <confirm
      ref="confirm"
    />
  </div>
</template>

<script>
  import config from '../../../config.json'
  import axios from 'axios'
  import confirm from '../../shared/ConfirmDialog'
  import transactiontypecreateoredit from './transactionTypes-createOrEdit'

  export default {
    name: 'TransactionTypesList',

    components: {
      transactiontypecreateoredit,
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
          text: 'Listado de Tipos de Transacción',
          disabled: true,
          to: '',
        },
      ],
      search: '',
      headers: [
        {
          text: 'Código', align: 'start', sortable: true, value: 'code',
        },
        {
          text: 'Descripción', align: 'start', sortable: true, value: 'description',
        },
        {
          text: 'Tipo de transacción', align: 'start', sortable: true, value: 'type',
        },
        {
          text: 'Acciones', align: 'center', sortable: false, value: 'actions',
        },
      ],
      transactionTypes: [],
      loading: false,
      snackShow: false,
      snackText: '',
      snackColor: '',
      snackTimeOut: 2500,
    }),

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
          } else {
            console.info(result.data)
          }
        }).catch((error) => {
          console.log(error)
        })
      },

      createItem () {
        this.$refs.transactiontypecreateoredit.show()
      },

      editItem (rowData) {
        const item = rowData
        this.$refs.transactiontypecreateoredit.show(item)
      },

      async deleteItem (rowData) {
        const message = '¿Seguro de Eliminar el tipo de transacción ' + rowData.code + ' ' + rowData.description + '?'
        if (await this.$refs.confirm.open('Eliminar', message, { color: 'error', confirmText: 'Si, eliminar', cancelText: 'No, cerrar' })) {
          const url = config.API_ENDPOINT + 'transactiontypes/' + rowData._id
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

<style scoped>
  .text-red {
    color: red;
  }
  .text-blue {
    color: blue;
  }
</style>
