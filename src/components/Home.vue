<template>
    <div id="app">
        <div class='authentification'>
            <h2>Calendar events</h2>
            Authentificate to use the app
            <button v-if='!authorized' @click="handleAuthClick">Sign In</button>
            <button v-if='authorized' @click="handleSignoutClick">Sign Out</button>
        </div>
        <hr>
        <button v-if='authorized' @click="getData">Get Data</button>
        <div class="item-container" v-if="authorized && items">
            <pre v-html="items"></pre>
        </div>
    </div>
</template>

<script>
    /*global gapi*/

    const CLIENT_ID = '474153570141-cpc9u6hi91vitm282pn45mvujeg13e22.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyCAI5ZT-E_qXFvHtZjfZY2oWo4jDV6U_9w';
    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    export default {
        name: 'App',

        data() {
            return {
                items: undefined,
                api: undefined,
                authorized: false
            }
        },

        created() {
            // let googleApi = document.createElement('script');
            // googleApi.setAttribute('async', '');
            // googleApi.setAttribute('defer', '');
            // googleApi.setAttribute('src', 'https://apis.google.com/js/api.js');
            // googleApi.setAttribute('onload', 'this.onload=function(){};handleClientLoad()');
            // googleApi.setAttribute('onreadystatechange', 'if (this.readyState === \'complete\') this.onload()');
            // document.head.appendChild(googleApi);
            // console.log(googleApi);

            this.api = gapi;
            console.log(this.api);
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
                    });
            },

            handleSignoutClick() {
                Promise.resolve(this.api.auth2.getAuthInstance().signOut())
                    .then(() => {
                        this.authorized = false;
                    });
            },

            getData() {
                let vm = this;

                vm.api.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                    'timeMax': new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                }).then(response => {
                    vm.items = this.syntaxHighlight(response.result.items);
                    console.log(vm.items);
                });
            },

            syntaxHighlight(json) {
                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, match => {
                    let cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
        }
    };
</script>
