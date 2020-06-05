<template>
    <v-container fluid>
        <v-layout 
            row 
            wrap 
            align-center
        >
            <v-row justify="center" >
                <v-card class="ma-5" min-width="45%">
                    <v-col class="shrink">
                        <v-card-text>
                            <v-row justify="center" align="center">
                                <v-avatar size="96" class="mr-4">
                                    <img :src="require('../assets/logo.png')" alt="Avatar">
                                </v-avatar>
                            </v-row>
                            <v-text-field
                                v-model="form.initials "
                                label="ФИО"
                                readonly
                                >
                            </v-text-field>
                            <v-text-field
                                v-model="form.position"
                                label="Должность"
                                readonly
                                >
                            </v-text-field>
                            <v-text-field
                                v-model="form.email"
                                label="Электронная почта"
                                readonly
                                >
                            </v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" :loading="loading" @click="dialog = true" outlined>
                                <v-icon left dark>check</v-icon>
                                Изменить пароль
                            </v-btn>

                            <v-dialog v-model="dialog" max-width="290">
                            <v-card>
                                <v-card-title class="headline">Изменить пароль</v-card-title>

                                <v-card-text>
                                    <v-form v-model="validPass">
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
                                            :disabled="!valid"
                                            required
                                        ></v-text-field>
                                        <v-text-field 
                                            id="repeatpassword" 
                                            label="Повторите пароль" 
                                            name="repeat-password" 
                                            prepend-icon="repeat" 
                                            v-model="repeatPassword" 
                                            :rules="repeatPasswordRules" 
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                                            :type="show1 ? 'text' : 'password'" 
                                            @click:append="show1 = !show1"
                                            :disabled="!valid"
                                            required
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>

                                <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="cancelPass"
                                >
                                    Отмена
                                </v-btn>

                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="dialog = false"
                                    :disabled="!validPass"
                                >
                                    Сохранить
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        </v-card-actions>
                    </v-col>
                </v-card>
                <v-card class="ma-5 scroll" min-width="45%" max-height="500px">
                    <v-card-text>
                        <v-card-title class="headline">
                            Категории
                            <v-spacer></v-spacer>
                            <v-btn color="green" dark @click="dialog2 = true" fab outlined>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-card-title>
                        

                        <v-dialog v-model="dialog2" max-width="290">
                            <v-card>
                                <v-card-title class="headline">Добавить категорию</v-card-title>

                                <v-card-text>
                                    <v-text-field v-model="category" label="Название" :rules="maxLength" hint="До 15 символов" counter></v-text-field>
                                            <v-row justify="center" align="center">
                                                <v-col style="min-width: 220px;">
                                                    <v-text-field v-model="color" v-mask="mask" hide-details class="ma-0 pa-0" solo>
                                                        <template v-slot:append>
                                                            <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                                                                <template v-slot:activator="{ on }">
                                                                    <div :style="swatchStyle" v-on="on" />
                                                                </template>
                                                                <v-card>
                                                                    <v-card-text class="pa-0">
                                                                        <v-color-picker v-model="color" flat/>
                                                                    </v-card-text>
                                                                </v-card>
                                                            </v-menu>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn
                                        color="green darken-1"
                                        text
                                        @click="dialog2 = false"
                                    >
                                        Отмена
                                    </v-btn>

                                    <v-btn
                                        color="green darken-1"
                                        text
                                        @click="addCategory"
                                        :disabled="valid"
                                    >
                                        Сохранить
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card-text>
                    <v-list-item
                        v-for="item in categories"
                        :key="item.id"
                        color="#FFEBEE"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="item.category"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content class="mr-5">
                            <v-chip  :color="item.color">{{ item.color }}</v-chip>
                        </v-list-item-content>
            
                        <!-- <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                            </v-btn>
                        </v-list-item-action> -->

                        <v-list-item-action>
                            <v-btn icon @click="deleteCategory(item.id)">
                                <v-icon color="grey lighten-1">mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-card>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
import { db } from '@/main.js';

export default {
    name: 'Profile',
    data() {
        return {
            loading: false,
            form: {
                position: '',
                initials: '',
                email: ''
            },
            showAvatarPicker: false,
            category: '',
            dialog: false,
            dialog2: false,
            color: '#1976D2FF',
            mask: '!#XXXXXXXX',
            menu: false,
            validPass: false,
            show1: false,
            password: null,
            repeatPassword: null,
            maxLength: [
                (v) => v.length < 15 || 'До 15 символов'
            ],
            passwordRules: [
                v => !!v || 'Введите пароль',
                v => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
            ],
            repeatPasswordRules: [
                v => !!v || 'Повторите пароль',
                v => (v === this.password) || 'Пароли не совпадают'
            ],
        }
    },
    created() {
        let auth = this.$store.getters.authUser;
        let pos = auth.initials.indexOf('&');

        let user = {
            position: auth.initials.substr(pos + 1),
            initials: auth.initials.slice(0, pos),
            email: auth.email,
        }
        
        this.form = user;
    },
    mounted() {
        this.queryCategories;
    },
    computed: {
        comparedPassword() {
            return this.password;
        },
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated;
        },
        authUser() {
            return this.$store.getters.authUser;
        },
        categories() {
            return this.$store.getters.getCategories;
        },
        swatchStyle() {
            const { color, menu } = this
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out'
            }
        },
        valid() {
            if( this.category.length > 0 && this.category.length <= 15 ) {
                return false;
            } else {
                return true;
            }
        },
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated;
        },
    },
    watch: {
        isUserAuthenticated(val) {
            if (val !== true)
                this.$router.push("/auth");
        },
    },
    methods: {
        async deleteCategory(id) {
            await db
                .collection('categories')
                .doc(id)
                .delete();
            
            this.queryCategories();
        },
        queryCategories() {
            this.$store.dispatch('setCategories', this.authUser.uid); 
        },
        cancelPass() {
            this.password = '';
            this.repeatPassword = '';
            this.dialog = false;
        },
        openAvatarPicker () {
            this.showAvatarPicker = true;
        },
        selectAvatar (avatar) {
            this.form.avatar = '';
        },
        async update () {
            console.log(this.form);
        },
        async addCategory() {
            await db.collection('categories').add({
                category: this.category,
                color: this.color,
                ownerUid: this.authUser.uid
            })
            this.$store.dispatch('setCategories',  this.authUser.uid);
            this.dialog2 = false;
            this.category = '';
            this.color = '#1976D2FF';
        }
    },
    filters: {
        filterInitials: (ev) => {
            let pos = ev.indexOf('&');
            return ev.slice(0, pos);
        }
    }
}
</script>

<style scoped>
    .scroll {
      overflow-y: scroll;
    }

    .scroll::-webkit-scrollbar {
        width: 6px;
        background-color: rgb(255, 255, 255)
    }
    
    .scroll::-webkit-scrollbar-thumb {
        background-color: rgb(230, 230, 230);
        border-radius: 5px;
        border: 1px solid lightgray;
    }
</style>