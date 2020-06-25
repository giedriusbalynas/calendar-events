<template>
    <v-app>
        <v-app-bar app color="primary" class="d-flex justify-center" dark>
            <div class="text-center">
                <h2>CalendarEvents</h2>
            </div>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
     };
</script>


