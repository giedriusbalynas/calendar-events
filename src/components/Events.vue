<template>
    <div>
        <div v-if='authorized'>
            <div class="d-flex justify-center my-10">
                <v-btn @click="getData" color="primary">Refresh</v-btn>
                <v-btn @click="handleSignoutClick" class="ml-3" color="error">Sign Out</v-btn>
            </div>
            <div class="item-container" v-if="items.length > 0">
                <v-card v-for="item in items" v-bind:key="item.id" class="mx-auto my-3" max-width="80%" tile>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>{{item.summary}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </div>
            <div v-else>
                <v-card class="mx-auto my-4 py-3 px-4" max-width="80%" tile>
                    There is no events today.
                </v-card>
            </div>
        </div>
        <div v-else class="text-center my-10">
            <h2>You must be singed in to reach this path!</h2>
            <router-link to="/" class="">Go home to sign in</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {handleClientLoad} from '../util';

    export default {
        name: 'Events',

        data() {
            return {
                items: [],
                authorized: false,
                token: null
            }
        },

        props: ['auth'],

        mounted() {
            this.token = localStorage.getItem('token');

            if (this.token) {
                this.authorized = true;
            }
            handleClientLoad();
            this.getData();
        },

        methods: {
            getData() {
                let config = {
                    headers: {
                        authorization: 'Bearer ' + this.token
                    }
                };

                const encodeGetParams = p =>
                    Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

                const params = {
                    timeMax: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
                    maxResults: 10,
                    showDeleted: false,
                    timeMin: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                    orderBy: 'startTime',
                    singleEvents: true,
                };

                axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?' + encodeGetParams(params), config)
                    .then(response => {
                        this.items = response.data.items;
                    });
            },

            handleSignoutClick() {
                Promise.resolve(window.gapi.auth2.getAuthInstance().signOut())
                    .then(() => {
                        this.authorized = false;
                        localStorage.clear();
                        this.$router.push('/')
                    });
            }
        }
    }

</script>