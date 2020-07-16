<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row
      dense
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="#952175"
          dark
          class="clickable py-3"
          :to="'/admin/accounts/balance'"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-currency-usd
              </v-icon>
              Saldos
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Consulte el listado de los saldos de sus diferentes cuentas bancarias.
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="#1F7087"
          dark
          class="py-3"
          :to="'/process/transactionsbooks'"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-cash-register
              </v-icon>
              Transacciones
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Registrar transacciones en el libro de bancos.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
      }
    },

    methods: {
    },
  }
</script>
<style scoped>
  .clickable {
    cursor: pointer;
  }
</style>
