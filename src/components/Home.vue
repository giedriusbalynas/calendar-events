<template>
        <v-card class="mx-auto my-16 py-6 px-8 text-center" width="550px">
            <h2>Calendar events app</h2>
            <br />
            <p>This application lists the names of today's google calendar events.</p>
            <h5>In order to use app, please sign in to your Google account</h5>
            <br />
            <div class="d-flex justify-center">
                <v-btn x-large @click="handleAuthClick" color="secondary" >Sign In</v-btn>
            </div>

        </v-card>

</template>

<script>
    /*global gapi*/
    const CLIENT_ID = '474153570141-cpc9u6hi91vitm282pn45mvujeg13e22.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyCAI5ZT-E_qXFvHtZjfZY2oWo4jDV6U_9w';
    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    export default {
        name: 'Home',

        data() {
            return {
                authorized: false
            }
        },

        created() {
            this.api = gapi;
            // console.log(this.api);
            this.handleClientLoad();
        },

        methods: {
            handleClientLoad() {
                this.api.load('client:auth2', this.initClient);
            },

            initClient() {
                let vm = this;

                vm.api.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES
                }).then(() => {
                    // Listen for sign-in state changes.
                    vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
                });
            },

            handleAuthClick() {
                Promise.resolve(this.api.auth2.getAuthInstance().signIn())
                    .then(() => {
                        this.authorized = true;
                        this.$router.push({name: 'events', params: {auth: this.authorized.toString()}})
                    });
            },

            handleSignoutClick() {
                Promise.resolve(this.api.auth2.getAuthInstance().signOut())
                    .then(() => {
                        this.authorized = false;
                        this.$router.push('/')
                    });
            },
        }
    };
</script>
