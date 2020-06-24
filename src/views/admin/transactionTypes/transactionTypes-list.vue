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
        <v-tooltip top>
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
          height="220px"
          class="mt-5"
        />
      </base-material-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'AccountList',
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
          text: 'Código', align: 'start', sortable: true, value: 'typeTransactionCode',
        },
        {
          text: 'Descripción', align: 'start', sortable: true, value: 'typeTransactionName',
        },
        {
          text: 'Tipo de transacción', align: 'start', sortable: true, value: 'typeTransactionMode',
        },
        {
          text: 'Acciones', align: 'center', sortable: false, value: '',
        },
      ],
      transactionTypes: [],
    }),
  }
</script>
