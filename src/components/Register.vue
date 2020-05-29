<template>
    <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-spacer />
                  <v-toolbar-title>Регистрация</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-alert
                  :value="!!error"
                  type="warning"
                >
                  {{error}}
                </v-alert>
                <v-form v-model="valid">
                  <v-text-field
                    label="E-mail"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="lock"
                    v-model="password"
                    :rules="passwordRules"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    required
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <router-link to="/auth">Назад</router-link>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.prevent="signUp" :disabled="processing || !valid">Зарегистрироваться</v-btn>
                </v-card-actions>
              </v-card-text>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
  export default {
    name: 'register',
    props: {
      source: String,
    },
    data() {
      return {
        email: null,
        password: null,
        show1: false,
        valid: false,
        emailRules: [
          (v) => !!v || 'Введите E-mail',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неверный E-mail'
        ],
        passwordRules: [
          (v) => !!v || 'Введите пароль',
          (v) => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
        ]
      }
    },
    computed: {
      error() {
        return this.$store.getters.getError;
      },
      processing() {
        return this.$store.getters.getProcessing;
      },
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated
      }
    },
    watch: {
      isUserAuthenticated(v) {
        if (v === true) {
          this.$router.push("/");
        }
      }
    },
    methods: {
      signUp() {
        this.$store.dispatch('SIGNUP', {email: this.email, password: this.password});
      }
    }
  }
</script>

<style>

</style>