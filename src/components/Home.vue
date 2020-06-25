<template>
    <v-card class="mx-auto my-16 py-6 px-8 text-center" width="550px">
        <h2>Calendar events app</h2>
        <br/>
        <p>This application lists the names of today's google calendar events.</p>
        <h5>In order to use the app, please sign in to your Google account.</h5>
        <br/>
        <div class="d-flex justify-center">
            <v-btn x-large @click="handleAuthClick" color="primary">Sign In</v-btn>
        </div>

    </v-card>

</template>

<script>
    import {handleClientLoad} from '../util';

    export default {
        name: 'Home',

        data() {
            return {
                authorized: false
            }
        },

        mounted() {
            handleClientLoad();
        },

        methods: {
            handleAuthClick() {
                Promise.resolve(window.gapi.auth2.getAuthInstance().signIn())
                    .then(() => {
                        this.authorized = true;
                        localStorage.setItem('token', window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
                        this.$router.push({name: 'events', params: {auth: this.authorized.toString()}})
                    });
            }
        }
    };
</script>
