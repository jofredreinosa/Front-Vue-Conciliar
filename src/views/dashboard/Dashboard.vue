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
        cols="4"
      >
        <v-card
          color="#385F73"
          dark
        >
          <v-card-title
            class="headline"
          >
            Cuentas Bancarias
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Consulte el listado de sus cuentas bancarias.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              text
            >
              Ir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        cols="4"
      >
        <v-card
          color="#952175"
          dark
        >
          <v-card-title
            class="headline"
          >
            Saldos
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Consulte el listado de saldos de sus cuentas bancarias.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              text
            >
              Ir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        cols="4"
      >
        <v-card
          color="#1F7087"
          dark
        >
          <v-card-title
            class="headline"
          >
            Transacciones
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Registrar transacciones de sus diferentes cuentas bancarias.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              text
            >
              Ir
            </v-btn>
          </v-card-actions>
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
