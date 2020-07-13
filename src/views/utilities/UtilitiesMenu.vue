<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="#385F73"
          dark
          class="clickable py-3"
          :to="'/utilities/selectaccount'"
        >
          <v-card-title
            class="headline"
          >
            <span>
              <v-icon>
                mdi-check-outline
              </v-icon>
              Seleccionar Cuenta
            </span>
          </v-card-title>

          <v-card-subtitle
            class="mt-2"
          >
            Seleccione una cuenta bancaria como predeterminada para su espacio de trabajo actual.
          </v-card-subtitle>
          <v-card-actions />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <underconstruction
          ref="underconstruction"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import underconstruction from '../shared/UnderConstruction'
  export default {
    name: 'ReportsMenu',

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
