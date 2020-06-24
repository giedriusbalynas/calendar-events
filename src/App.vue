<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h2>CalendarEvents</h2>
            </div>
            <v-spacer></v-spacer>
<!--            <v-btn to="/" v-if='!authorized' @click="handleAuthClick">Sign In</v-btn>-->
<!--            <v-btn v-if='authorized' @click="handleSignoutClick">Sign Out</v-btn>-->
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    // /*global gapi*/
    // // import Home from './components/Home';
    //
    // const CLIENT_ID = '474153570141-cpc9u6hi91vitm282pn45mvujeg13e22.apps.googleusercontent.com';
    // const API_KEY = 'AIzaSyCAI5ZT-E_qXFvHtZjfZY2oWo4jDV6U_9w';
    // const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    // const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
    //
    export default {
        name: 'App',

        data() {
            return {
                authorized: false
            }
        }
    //     // components: {
    //     //     Home
    //     // },
    //
    //     created() {
    //         // let googleApi = document.createElement('script');
    //         // googleApi.setAttribute('async', '');
    //         // googleApi.setAttribute('defer', '');
    //         // googleApi.setAttribute('src', 'https://apis.google.com/js/api.js');
    //         // googleApi.setAttribute('onload', 'this.onload=function(){};handleClientLoad()');
    //         // googleApi.setAttribute('onreadystatechange', 'if (this.readyState === \'complete\') this.onload()');
    //         // document.head.appendChild(googleApi);
    //         // console.log(googleApi);
    //
    //         this.api = gapi;
    //         console.log(this.api);
    //         this.handleClientLoad();
    //     },
    //
    //     methods: {
    //         handleClientLoad() {
    //             this.api.load('client:auth2', this.initClient);
    //         },
    //
    //         initClient() {
    //             let vm = this;
    //
    //             vm.api.client.init({
    //                 apiKey: API_KEY,
    //                 clientId: CLIENT_ID,
    //                 discoveryDocs: DISCOVERY_DOCS,
    //                 scope: SCOPES
    //             }).then(() => {
    //                 // Listen for sign-in state changes.
    //                 vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
    //             });
    //         },
    //
    //         handleAuthClick() {
    //             Promise.resolve(this.api.auth2.getAuthInstance().signIn())
    //                 .then(() => {
    //                     this.authorized = true;
    //                     this.$router.push(this.$route.redirect || '/events')
    //                     // if(this.authorized){
    //                     //     this.$router.push(this.$route.redirect || '/events')
    //                     // }
    //                 });
    //         },
    //
    //         handleSignoutClick() {
    //             Promise.resolve(this.api.auth2.getAuthInstance().signOut())
    //                 .then(() => {
    //                     this.authorized = false;
    //                     this.$router.push(this.$route.redirect || '/')
    //                 });
    //         },
    //     }
    };
</script>


