<template>
    <div>
        <button v-if='authorized' @click="getData">Get Data</button>
        <div class="item-container" v-if="authorized && items">
            <ul>
                <li v-for="item in items" v-bind:key="item.id">{{item.summary}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    /*global gapi*/
    // import axios from 'axios';

    export default {
        name: 'Events',

        data() {
            return {
                items: undefined,
                api: undefined,
                authorized: false
            }
        },

        props: ['auth'],

            created() {
                this.authorized = JSON.parse(this.auth);
                this.api = gapi;
            //     axios
            //         .get('https://apis.google.com/js/api.js')
            //         .then(response => console.log(response))
            //     console.log(this.authorized);
            },

        methods: {
            getData() {
                let vm = this;
                console.log(vm);

                vm.api.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                    'timeMax': new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                }).then(response => {
                    // vm.items = this.syntaxHighlight(response.result.items);
                    vm.items = response.result.items;
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
    }

</script>