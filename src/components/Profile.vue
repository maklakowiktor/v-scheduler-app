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
                        v-model="form.initials"
                        label="FirstName"></v-text-field>
                    <v-text-field
                        v-model="form.initials"
                        label="Last Name"></v-text-field>
                    <v-text-field
                        v-model="form.email"
                        label="Email Address"></v-text-field>
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
        form: {},
        showAvatarPicker: false
    }),
    computed: {
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated;
        },
        authUser() {
            return this.form = this.$store.getters.authUser;
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
    }
}
</script>

<style>

</style>