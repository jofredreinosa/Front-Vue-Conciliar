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
    }),
  }
</script>
