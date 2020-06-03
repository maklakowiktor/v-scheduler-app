<template>
    <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                        <v-avatar size="96" class="mr-4">
                            <img :src="require('../assets/logo.png')" alt="Avatar"> <!-- + (form.avatar.toLowerCase()) +  -->
                        </v-avatar>
                        <!-- <v-btn @click="openAvatarPicker">Изменить аватар</v-btn> -->
                    </v-flex>
                    <v-text-field
                        v-model="form.initials "
                        label="ФИО"
                        readonly>
                    </v-text-field>
                    <v-text-field
                        v-model="form.initials"
                        label="Должность"
                        readonly>
                    </v-text-field>
                    <v-text-field
                        v-model="form.email"
                        label="Электронная почта"
                        readonly>
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" :loading="loading" @click.native="update" disabled>
                        <v-icon left dark>check</v-icon>
                        Сохранить изменения
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'Profile',
    data: () => ({
        loading: false,
        form: {
            initials: '',
            email: ''
        },
        showAvatarPicker: false
    }),
    mounted() {
        this.form = this.authUser;
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated;
        },
        authUser() {
            this.form = this.$store.getters.authUser;
            return this.$store.getters.authUser;
        }
    },
    methods: {
        openAvatarPicker () {
            this.showAvatarPicker = true;
        },
        selectAvatar (avatar) {
            this.form.avatar = '';
        },
        async update () {
            console.log(this.form);
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

<style>

</style>