<script setup lang="ts">
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { ref } from "vue";

import Card from "../components/CardView.vue";

const cards = [
    {
        title: "Add Record",
        content:
            "Add in medical records to keep track your personal medical data.",
        button_text: "+",
        route: "/add",
    },
    {
        title: "View My Records",
        content: "View your personal medical records in a list view.",
        button_text: "View",
        route: "/records",
    },
    {
        title: "About",
        content:
            "Check out some more information on this app, and its development!",
        button_text: "Read more",
        route: "/about",
    },
];
</script>

<template>
    <h1 class="_text:center _margin-bottom:8">
        Welcome to the MyHealth homepage!
    </h1>
    <i-container>
        <i-row around>
            <i-column md="3" sm="8" v-for="card in cards" :key="card.title">
                <Card :card="card" />
            </i-column>
        </i-row>
    </i-container>
</template>
