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
                  <v-toolbar-title>Авторизация</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-alert
                  :value="!!error"
                  type="warning"
                >
                  {{error}}
                </v-alert>
                <v-form>
                  <v-text-field
                    label="E-mail"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/register">Регистрация</router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="signIn" :disabled="processing">Войти</v-btn>
              </v-card-actions>
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
      isUserAuthenticated(val) {
        if(val === true)
          this.$router.push("/");
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('SIGNIN', {email: this.email, password: this.password});
      }
    }
  }
</script>

<style>

</style>