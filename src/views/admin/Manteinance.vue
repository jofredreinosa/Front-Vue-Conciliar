<template>
  <v-container
    id="maintenancemenu"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="4"
      >
        <v-card
          color="#385F73"
          dark
          class="clickable py-3"
          :to="'/admin/accounts/list'"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-bank
              </v-icon>
              Cuentas Bancarias
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Cree, edite y/o elimine cuentas bancarias de su sistema.
          </v-card-subtitle>
          <v-card-actions />
        </v-card>
      </v-col>

      <v-col
        cols="4"
      >
        <v-card
          color="#952175"
          dark
          class="clickable py-3"
          :to="'/admin/transactionTypes/list'"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-format-list-bulleted-type
              </v-icon>
              Tipos de Transacción
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Cree, edite y/o elimine los diferentes tipos de transacciones
          </v-card-subtitle>

          <v-card-actions />
        </v-card>
      </v-col>

      <v-col
        cols="3"
      >
        <v-card
          color="#1F7087"
          dark
          class="clickable py-3"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-cog
              </v-icon>
              Configuración
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Ajustes de las variables de ambiente de la aplicación
          </v-card-subtitle>

          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ManteinanceMenu',

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
