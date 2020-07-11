<template>
  <v-container
    id="maintenancemenu"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <underconstruction
          ref="underconstruction"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="#385F73"
          dark
          class="clickable py-3"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-book-open-page-variant
              </v-icon>
              Transacciones Libros
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Cree, edite y/o elimine transacciones en su libro de bancos.
          </v-card-subtitle>
          <v-card-actions />
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="#952175"
          dark
          class="clickable py-3"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-format-list-bulleted-type
              </v-icon>
              Transacciones Bancos
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Cree, edite y/o elimine transacciones del estado de cuenta.
          </v-card-subtitle>

          <v-card-actions />
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="success"
          dark
          class="clickable py-3"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-calculator-variant
              </v-icon>
              Conciliar cuentas
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Ejecute el proceso de conciliación de una cuenta.
          </v-card-subtitle>

          <v-card-actions />
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="accent"
          dark
          class="clickable py-3"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-file-upload-outline
              </v-icon>
              Carga masiva
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Cargue las transacciones de su estado de cuenta
            desde un archivo descargado de la web del banco.
          </v-card-subtitle>

          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import underconstruction from '../shared/UnderConstruction'
  export default {
    name: 'ProcessMenu',

    components: {
      underconstruction,
    },

    data () {
      return {
      }
    },

    methods: {
    },

  }
</script>
<style scoped>
  /* .clickable {
    cursor: pointer;
  } */
</style>
