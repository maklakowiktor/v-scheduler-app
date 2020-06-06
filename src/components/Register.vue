<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-spacer />
            <v-toolbar-title>Регистрация</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-alert :value="!!error" type="warning">{{error}}</v-alert>
            <v-form v-model="valid">
              <v-container>
                <span>Персональные данные:</span>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Фамилия" name="surname" type="text" v-model="surname" :rules="personRules"
                      required></v-text-field>
                    <v-text-field label="Отчество" name="patronymic" type="text" v-model="patronymic"
                      :rules="personRules" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Имя" name="name" type="text" v-model="name" :rules="personRules" required>
                    </v-text-field>
                    <v-text-field label="Должность" name="position" type="text" v-model="position" :rules="personRules"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="E-mail" name="login" prepend-icon="person" type="text" v-model="email"
                      :rules="emailRules" required></v-text-field>
                    <v-text-field label="Секретный ключ" name="secretkey" prepend-icon="mdi-key-variant" type="text"
                      v-model="secretkey" :rules="compareKey" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field id="password" label="Пароль" name="password" prepend-icon="lock" v-model="password"
                      :rules="passwordRules" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" required></v-text-field>
                    <v-text-field id="repeatpassword" label="Повторите пароль" name="repeat-password"
                      prepend-icon="repeat" v-model="repeatPassword" :rules="repeatPasswordRules"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"
                      @click:append="show2 = !show2" required></v-text-field>
                  </v-col>
                  <span>* Все поля обязательны для заполнения</span>
                </v-row>
              </v-container>
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
  import {
    db
  } from '@/main.js';

  export default {
    name: 'register',
    props: {
      source: String,
    },
    data() {
      return {
        email: null,
        password: null,
        surname: null,
        name: null,
        patronymic: null,
        position: null,
        show1: false,
        show2: false,
        valid: false,
        secretkey: null,
        repeatPassword: null,
        emailRules: [
          v => !!v || 'Введите E-mail',
          v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неверный E-mail'
        ],
        passwordRules: [
          v => !!v || 'Введите пароль',
          v => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
        ],
        repeatPasswordRules: [
          v => !!v || 'Повторите пароль',
          v => (v === this.password) || 'Пароли не совпадают'
        ],
        personRules: [
          v => !!v || 'Заполните поле'
        ],
        compareKey: [
          v => !!v || 'Введите секретный ключ',
          v => (!!this.$store.getters.getSecretKey) || 'Ошибка сервера. Перезагрузите страницу',
          v => (v === this.$store.getters.getSecretKey) || 'Ключи не совпадают'
        ]
      }
    },
    created() {
      this.$store.dispatch('FETCH_SECRET_KEY');
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
        this.$store.dispatch('SIGNUP', {
          email: this.email,
          password: this.password,
          surname: this.surname,
          name: this.name,
          patronymic: this.patronymic,
          position: this.position,
        });
      }
    }
  }
</script>

<style>

</style>