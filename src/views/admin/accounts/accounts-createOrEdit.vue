<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="70%"
      persistent
    >
      <v-card
        v-if="itemToHandleView"
      >
        <v-toolbar
          dark
          color="primary"
          dense
          flat
        >
          <v-toolbar-title
            class="white--text"
          >
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              autocomplete="off"
            >
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="itemToHandleView.name"
                    dense
                    :rules="nameRules"
                    label="Nombre"
                    placeholder="Nombre de la cuenta"
                    outlined
                    autofocus
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="4"
                >
                  <v-text-field
                    v-model="itemToHandleView.number"
                    dense
                    :rules="numberRules"
                    label="Nro. Cuenta"
                    maxlength="20"
                    placeholder="12345678901234567890"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="4"
                >
                  <v-select
                    v-model="itemToHandleView.accountType"
                    dense
                    :items="accountTypeItems"
                    :rules="accountTypeRules"
                    item-text="text"
                    item-value="value"
                    label="Tipo de Cuenta"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="4"
                >
                  <v-radio-group
                    v-model="itemToHandleView.bankType"
                    row
                    class="mt-n1"
                    :rules="bankTypeRules"
                  >
                    <v-radio
                      label="Público"
                      value="PÚBLICO"
                    />
                    <v-radio
                      label="Privado"
                      value="PRIVADO"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            outlined
            @click="close"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            outlined
            :loading="saving"
            :disabled="saving"
            @click="save"
          >
            Guardar
            <template v-slot:loader>
              <v-progress-circular
                :width="3"
                :size="20"
                indeterminate
                color="info"
              />
              <span class="ml-1">Guardando...</span>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script>
  /* eslint-disable */
  import config from '../../../config.json'
  import axios from 'axios'

  export default {
    name: 'TransactionTypesCreateOrEdit',

    data: () => ({
      edit: false,
      saving: false,
      valid: false,
      dialog: false,
      loading: false,
      title: '',
      snackShow: false,
      snackText: '',
      snackColor: '',
      snackTimeOut: 2500,
      itemToHandleView: null,
      accountTypeItems: [
        { value: '', text: 'Seleccione...' },
        { value: 'CORRIENTE', text: 'CORRIENTE' },
        { value: 'AHORRO', text: 'AHORRO' },
        { value: 'VISTA', text: 'VISTA' },
        { value: 'CUENTA RUT', text: 'CUENTA RUT' },
      ],
      nameRules: [
        v => !!v || 'Nombre de la cuenta es obligatorio',
      ],
      numberRules: [
        v => !!v || 'El número de cuenta es obligatorio',
        v => (v.length <= 20) || 'El máximo es de 20 caracteres',
        v => /^[0-9]+/.test(v) || 'Debe contener solo números'
      ],
      accountTypeRules: [
        v => !!v || 'El tipo de cuenta es obligatorio',
      ],
      bankTypeRules: [
        v => !!v || 'El tipo de banco es obligatorio',
      ],
    }),

    methods: {
      show (item) {
        this.dialog = true
        this.itemToHandleView = item
        if (this.itemToHandleView) {
          
          this.title = 'Editar Cuenta'
          this.edit = true
        } else {
          this.itemToHandleView = {
            name: '',
            number: '',
            accountType: '',
            bankType: 'PÚBLICO',
          }
          this.title = 'Crear Cuenta'
          this.edit = false
          setTimeout(()=> {
            this.$refs.form.reset();
          })
          
        }
      },

      close () {
        //this.$refs.form.reset()
        this.$emit('loadInitialData')
        this.dialog = false
      },

      save () {
        if ( this.$refs.form.validate() ) {
          //this.saving = true;
          let url = ''
          if ( ! this.edit ) { // Creando 
            /* url = config.API_ENDPOINT + 'transactiontypes'
            axios.post(url, this.itemToHandleView).then((result) => {
              if (result.data.success) {
                this.saving = false
                this.snackText = result.data.message
                this.snackColor = 'success'
                this.snackShow = true
                this.close()
              } else {
                this.snackText = result.data.message
                this.snackColor = 'error'
                this.snackShow = true;
              }
            }).catch((error) => {
              this.snackText = error
              this.snackColor = 'error'
              this.snackShow = true
            }) */
          }
          else { // editando
            url = config.API_ENDPOINT + 'transactiontypes/' + this.itemToHandleView._id
            axios.put(url, this.itemToHandleView).then((result) => {
              if (result.data.success) {
                this.saving = false
                this.snackText = result.data.message
                this.snackColor = 'success'
                this.snackShow = true;
                this.close()
              } else {
                this.snackText = result.data.message
                this.snackColor = 'error'
                this.snackShow = true;
              }
            }).catch((error) => {
              this.snackText = error
              this.snackColor = 'error'
              this.snackShow = true;
            })
          }
        }
      },
    },
  }
</script>
