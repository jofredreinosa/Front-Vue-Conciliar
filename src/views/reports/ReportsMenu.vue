<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col
        cols="12"
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
